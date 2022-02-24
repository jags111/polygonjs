import {BaseSopOperation} from './_Base';
import {CoreGroup} from '../../../core/geometry/Group';
import {Color} from 'three/src/math/Color';
import {InputCloneMode} from '../../poly/InputCloneMode';
import {Reflector} from '../../../modules/core/objects/Reflector';
import {Vector3} from 'three/src/math/Vector3';
import {TransformResetSopOperation, TRANSFORM_RESET_MODES, TransformResetMode} from './TransformReset';
import {DefaultOperationParams} from '../../../core/operations/_Base';
interface ReflectorSopParams extends DefaultOperationParams {
	direction: Vector3;
	active: boolean;
	clipBias: number;
	color: Color;
	opacity: number;
	pixelRatio: number;
	multisamples: number;
	tblur: boolean;
	blur: number;
	verticalBlurMult: number;
	tblur2: boolean;
	blur2: number;
	verticalBlur2Mult: number;
}

export class ReflectorSopOperation extends BaseSopOperation {
	static override readonly DEFAULT_PARAMS: ReflectorSopParams = {
		direction: new Vector3(0, 1, 0),
		active: true,
		clipBias: 0.003,
		color: new Color(1, 1, 1),
		opacity: 1,
		pixelRatio: 1,
		multisamples: 4,
		tblur: false,
		blur: 1,
		verticalBlurMult: 1,
		tblur2: false,
		blur2: 1,
		verticalBlur2Mult: 1,
	};

	// clone needs to be on Always if we rotate the geo to align with the reflection direction
	static override readonly INPUT_CLONED_STATE = InputCloneMode.ALWAYS;
	static override type(): Readonly<'reflector'> {
		return 'reflector';
	}

	private _transformResetOptions: TransformResetSopOperation | undefined;
	override async cook(inputCoreGroups: CoreGroup[], params: ReflectorSopParams) {
		this._transformResetOptions = this._transformResetOptions || new TransformResetSopOperation(this._scene);
		const transformResetMode = TRANSFORM_RESET_MODES.indexOf(TransformResetMode.PROMOTE_GEO_TO_OBJECT);
		const inputCoreGroup = this._transformResetOptions.cook(inputCoreGroups, {mode: transformResetMode});

		const reflectors: Reflector[] = [];
		const renderer = this._node?.scene().renderersRegister.lastRegisteredRenderer();

		const objects = inputCoreGroup.objectsWithGeo();

		for (let object of objects) {
			Reflector.rotateGeometry(object.geometry, params.direction);
			const reflector = new Reflector(object.geometry, {
				clipBias: params.clipBias,
				renderer,
				scene: this.scene().threejsScene(),
				pixelRatio: params.pixelRatio,
				multisamples: params.multisamples,
				color: params.color,
				opacity: params.opacity,
				active: params.active,
				tblur: params.tblur,
				blur: params.blur,
				verticalBlurMult: params.verticalBlurMult,
				tblur2: params.tblur2,
				blur2: params.blur2,
				verticalBlur2Mult: params.verticalBlur2Mult,
			});
			reflector.matrixAutoUpdate = false;
			// make sure object attributes are up to date
			object.matrix.decompose(object.position, object.quaternion, object.scale);
			reflector.position.copy(object.position);
			reflector.rotation.copy(object.rotation);
			reflector.scale.copy(object.scale);
			reflector.updateMatrix();
			Reflector.compensateGeometryRotation(reflector, params.direction);
			reflectors.push(reflector);
		}

		return this.createCoreGroupFromObjects(reflectors);
	}
}
