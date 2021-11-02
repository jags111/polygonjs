import {Object3D} from 'three/src/core/Object3D';
import {Vector3} from 'three/src/math/Vector3';
import {Box3} from 'three/src/math/Box3';
import {Line3} from 'three/src/math/Line3';
import {Matrix4} from 'three/src/math/Matrix4';
import {MeshWithBVH} from '../../engine/operations/sop/utils/Bvh/three-mesh-bvh';
import {createPlayerGeometry, CapsuleOptions} from './PlayerGeometry';
import {Mesh} from 'three/src/objects/Mesh';
import {Material} from 'three/src/materials/Material';
interface PlayerOptions {
	object: Object3D;
	collider: MeshWithBVH;
}

type ResetRequiredCallback = () => boolean;
const tmpGravity = new Vector3(0, 0, 0);
const upVector = new Vector3(0, 1, 0);
const tempVector = new Vector3();
const tempVector2 = new Vector3();
const tempBox = new Box3();
const tempMat = new Matrix4();
const tempSegment = new Line3();

export class Player {
	private _pressed = {
		forward: false,
		backward: false,
		left: false,
		right: false,
	};
	private _onGround = false;
	private _velocity = new Vector3();
	public readonly capsuleInfo = {
		radius: 0.5,
		segment: new Line3(new Vector3(), new Vector3(0, -1.0, 0.0)),
	};
	private _mesh: Mesh = new Mesh();
	public object: Object3D;
	public collider: MeshWithBVH;
	public startPosition = new Vector3(0, 5, 0);
	public jumpAllowed = true;
	public jumpStrength = 10;
	public speed = 10;
	public physicsSteps = 5;
	public gravity = new Vector3(0, -30, 0);
	private _azimuthalAngle = 0;
	private _resetRequiredCallback: ResetRequiredCallback = () => {
		return this.object.position.y < -25;
	};
	constructor(options: PlayerOptions) {
		this.object = options.object;
		this.object.matrixAutoUpdate = true;
		this.collider = options.collider;
		this._mesh.geometry = createPlayerGeometry({radius: this.capsuleInfo.radius, height: 1});
		this._mesh.receiveShadow = true;
		this._mesh.castShadow = true;
		this.addKeyEvents();
	}
	setCapsule(capsuleOptions: CapsuleOptions) {
		this.capsuleInfo.radius = capsuleOptions.radius;
		this.capsuleInfo.segment.end.y = -capsuleOptions.height;
		this._mesh.geometry = createPlayerGeometry(capsuleOptions);
	}
	setUsePlayerMesh(state: boolean) {
		if (state) {
			this.object.add(this._mesh);
		} else {
			this.object.remove(this._mesh);
		}
	}
	setMaterial(material: Material) {
		this._mesh.material = material;
	}
	reset() {
		this._velocity.set(0, 0, 0);
		this.object.position.copy(this.startPosition);
	}
	dispose() {
		this._removeKeyEvents();
	}
	setResetRequiredCallback(callback: ResetRequiredCallback) {
		this._resetRequiredCallback = callback;
	}
	setAzimuthalAngle(angle: number) {
		this._azimuthalAngle = angle;
	}
	update(delta: number) {
		const deltaBounded = Math.min(delta, 0.1);
		for (let i = 0; i < this.physicsSteps; i++) {
			this._updateStep(deltaBounded / this.physicsSteps);
		}
	}
	private _updateStep(delta: number) {
		if (!this._onGround) {
			tmpGravity.copy(this.gravity).multiplyScalar(delta);
			this._velocity.add(tmpGravity);
		}
		this.object.position.addScaledVector(this._velocity, delta);

		// move the player
		const angle = this._azimuthalAngle;
		if (this._pressed.forward) {
			tempVector.set(0, 0, -1).applyAxisAngle(upVector, angle);
			this.object.position.addScaledVector(tempVector, this.speed * delta);
		}

		if (this._pressed.backward) {
			tempVector.set(0, 0, 1).applyAxisAngle(upVector, angle);
			this.object.position.addScaledVector(tempVector, this.speed * delta);
		}

		if (this._pressed.left) {
			tempVector.set(-1, 0, 0).applyAxisAngle(upVector, angle);
			this.object.position.addScaledVector(tempVector, this.speed * delta);
		}

		if (this._pressed.right) {
			tempVector.set(1, 0, 0).applyAxisAngle(upVector, angle);
			this.object.position.addScaledVector(tempVector, this.speed * delta);
		}

		this.object.updateMatrixWorld();

		// adjust player position based on collisions
		const capsuleInfo = this.capsuleInfo;
		tempBox.makeEmpty();
		tempMat.copy(this.collider.matrixWorld).invert();
		tempSegment.copy(capsuleInfo.segment);

		// get the position of the capsule in the local space of the collider
		tempSegment.start.applyMatrix4(this.object.matrixWorld).applyMatrix4(tempMat);
		tempSegment.end.applyMatrix4(this.object.matrixWorld).applyMatrix4(tempMat);

		// get the axis aligned bounding box of the capsule
		tempBox.expandByPoint(tempSegment.start);
		tempBox.expandByPoint(tempSegment.end);

		tempBox.min.addScalar(-capsuleInfo.radius);
		tempBox.max.addScalar(capsuleInfo.radius);

		this.collider.geometry.boundsTree.shapecast({
			intersectsBounds: (box) => box.intersectsBox(tempBox),

			intersectsTriangle: (tri) => {
				// check if the triangle is intersecting the capsule and adjust the
				// capsule position if it is.
				const triPoint = tempVector;
				const capsulePoint = tempVector2;

				const distance = tri.closestPointToSegment(tempSegment, triPoint, capsulePoint);
				if (distance < capsuleInfo.radius) {
					const depth = capsuleInfo.radius - distance;
					const direction = capsulePoint.sub(triPoint).normalize();

					tempSegment.start.addScaledVector(direction, depth);
					tempSegment.end.addScaledVector(direction, depth);
				}
			},
		});

		// get the adjusted position of the capsule collider in world space after checking
		// triangle collisions and moving it. capsuleInfo.segment.start is assumed to be
		// the origin of the player model.
		const newPosition = tempVector;
		newPosition.copy(tempSegment.start).applyMatrix4(this.collider.matrixWorld);

		// check how much the collider was moved
		const deltaVector = tempVector2;
		deltaVector.subVectors(newPosition, this.object.position);

		// if the player was primarily adjusted vertically we assume it's on something we should consider ground
		this._onGround = deltaVector.y > Math.abs(delta * this._velocity.y * 0.25);

		const offset = Math.max(0.0, deltaVector.length() - 1e-5);
		deltaVector.normalize().multiplyScalar(offset);

		// adjust the player model
		this.object.position.add(deltaVector);

		if (!this._onGround) {
			deltaVector.normalize();
			this._velocity.addScaledVector(deltaVector, -deltaVector.dot(this._velocity));
		} else {
			this._velocity.set(0, 0, 0);
		}

		// if the player has fallen too far below the level reset their position to the start
		if (this._resetRequiredCallback()) {
			this.reset();
		}
	}
	static stopEvent(e: KeyboardEvent) {
		// to prevent space from pausing from the editor
		e.preventDefault();
	}
	private _onKeyDown(e: KeyboardEvent) {
		switch (e.code) {
			case 'ArrowUp':
			case 'KeyW':
				this._pressed.forward = true;
				Player.stopEvent(e);
				break;
			case 'ArrowDown':
			case 'KeyS':
				this._pressed.backward = true;
				Player.stopEvent(e);
				break;
			case 'ArrowRight':
			case 'KeyD':
				this._pressed.right = true;
				Player.stopEvent(e);
				break;
			case 'ArrowLeft':
			case 'KeyA':
				this._pressed.left = true;
				Player.stopEvent(e);
				break;
			case 'Space':
				if (this._onGround && this.jumpAllowed) {
					this._velocity.y = this.jumpStrength;
				}
				Player.stopEvent(e);
				break;
		}
	}
	private _onKeyUp(e: KeyboardEvent) {
		switch (e.code) {
			case 'ArrowUp':
			case 'KeyW':
				this._pressed.forward = false;
				break;
			case 'ArrowDown':
			case 'KeyS':
				this._pressed.backward = false;
				break;
			case 'ArrowRight':
			case 'KeyD':
				this._pressed.right = false;
				break;
			case 'ArrowLeft':
			case 'KeyA':
				this._pressed.left = false;
				break;
		}
	}
	private _bounds = {
		keydown: this._onKeyDown.bind(this),
		keyup: this._onKeyUp.bind(this),
	};
	addKeyEvents() {
		document.addEventListener('keydown', this._bounds.keydown);
		document.addEventListener('keyup', this._bounds.keyup);
	}
	private _removeKeyEvents() {
		document.removeEventListener('keydown', this._bounds.keydown);
		document.removeEventListener('keyup', this._bounds.keyup);
	}
}
