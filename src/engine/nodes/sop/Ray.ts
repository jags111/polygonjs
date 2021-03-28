/**
 * Projects points from the left input geometry onto the faces of the right input geometry.
 *
 */
import {Vector3} from 'three/src/math/Vector3';
import {Raycaster, Intersection} from 'three/src/core/Raycaster';
import {Object3D} from 'three/src/core/Object3D';
import {MeshBasicMaterial} from 'three/src/materials/MeshBasicMaterial';
import {Mesh} from 'three/src/objects/Mesh';
import {DoubleSide} from 'three/src/constants';

import {TypedSopNode} from './_Base';
import {CoreGroup} from '../../../core/geometry/Group';
import {InputCloneMode} from '../../poly/InputCloneMode';

const MAT_DOUBLE_SIDED = new MeshBasicMaterial({
	side: DoubleSide,
});

import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {isBooleanTrue} from '../../../core/BooleanValue';
class RaySopParamsConfig extends NodeParamsConfig {
	/** @param toggle on to use the normals as the ray direction */
	useNormals = ParamConfig.BOOLEAN(1);
	/** @param if the normals are not used as the ray direction, this define the direction used */
	direction = ParamConfig.VECTOR3([0, -1, 0], {
		visibleIf: {useNormals: 0},
	});
	/** @param copies the normals from the right geometry to the left one */
	transferFaceNormals = ParamConfig.BOOLEAN(1);
}
const ParamsConfig = new RaySopParamsConfig();

export class RaySopNode extends TypedSopNode<RaySopParamsConfig> {
	paramsConfig = ParamsConfig;
	static type() {
		return 'ray';
	}

	// _material_by_object_uuid: MaterialByString
	private _bound_assign_mat = this._assign_double_sided_material_to_object.bind(this); //(Object3D)=>void;
	private _raycaster = new Raycaster();

	static double_sided_material() {
		return MAT_DOUBLE_SIDED;
	}

	static displayedInputNames(): string[] {
		return ['geometry to move', 'geometry to ray onto'];
	}

	initializeNode() {
		this.io.inputs.setCount(2);
		this.io.inputs.initInputsClonedState([
			InputCloneMode.FROM_NODE,
			InputCloneMode.ALWAYS, // to assign double sided mat
		]);
	}

	create_params() {}

	cook(input_contents: CoreGroup[]) {
		const core_group = input_contents[0];
		const core_group_collision = input_contents[1];

		this.ray(core_group, core_group_collision);
	}

	ray(core_group: CoreGroup, core_group_collision: CoreGroup) {
		// this._material_by_object_uuid = {}
		this._assign_double_sided_material_to_core_group(core_group_collision);

		let direction: Vector3, first_intersect: Intersection;
		for (let point of core_group.points()) {
			direction = isBooleanTrue(this.pv.useNormals) ? point.normal() : this.pv.direction;
			this._raycaster.set(point.position(), direction);
			first_intersect = this._raycaster.intersectObjects(core_group_collision.objects(), true)[0];
			if (first_intersect) {
				point.setPosition(first_intersect.point);
				if (isBooleanTrue(this.pv.transferFaceNormals) && first_intersect.face) {
					point.setNormal(first_intersect.face.normal);
				}
			}
		}

		this.setCoreGroup(core_group);
	}

	_assign_double_sided_material_to_core_group(core_group: CoreGroup) {
		for (let object of core_group.objects()) {
			object.traverse(this._bound_assign_mat);
		}
	}
	_assign_double_sided_material_to_object(object: Object3D) {
		(object as Mesh).material = RaySopNode.double_sided_material();
	}
}
