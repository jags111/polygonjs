import {TypedSopNode} from './_Base';
import {InputCloneMode} from '../../poly/InputCloneMode';
import {CoreGroup} from '../../../core/geometry/Group';
import {Object3D} from 'three/src/core/Object3D';

import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
class ObjectPropertiesSopParamsConfig extends NodeParamsConfig {
	apply_to_children = ParamConfig.BOOLEAN(0);
	separator = ParamConfig.SEPARATOR();
	tname = ParamConfig.BOOLEAN(0);
	name = ParamConfig.STRING('', {visible_if: {tname: true}});
	trender_order = ParamConfig.BOOLEAN(0);
	render_order = ParamConfig.INTEGER(0, {
		visible_if: {trender_order: true},
		range: [0, 10],
		range_locked: [false, false],
	});
	frustrum_culled = ParamConfig.BOOLEAN(1);
	matrix_auto_update = ParamConfig.BOOLEAN(0);
	visible = ParamConfig.BOOLEAN(1);
	cast_shadow = ParamConfig.BOOLEAN(1);
	receive_shadow = ParamConfig.BOOLEAN(1);
}
const ParamsConfig = new ObjectPropertiesSopParamsConfig();

export class ObjectPropertiesSopNode extends TypedSopNode<ObjectPropertiesSopParamsConfig> {
	params_config = ParamsConfig;
	static type() {
		return 'object_properties';
	}

	static displayed_input_names(): string[] {
		return ['objects to change properties of'];
	}

	initialize_node() {
		this.io.inputs.set_count(1);
		this.io.inputs.init_inputs_cloned_state(InputCloneMode.FROM_NODE);
	}

	async cook(input_contents: CoreGroup[]) {
		const core_group = input_contents[0];

		for (let object of core_group.objects()) {
			if (this.pv.apply_to_children) {
				object.traverse((child) => {
					this._update_object(child);
				});
			} else {
				this._update_object(object);
			}
		}

		this.set_core_group(core_group);
	}

	private _update_object(object: Object3D) {
		if (this.pv.tname) {
			object.name = this.pv.name;
		}
		if (this.pv.trender_order) {
			object.renderOrder = this.pv.render_order;
		}
		object.frustumCulled = this.pv.frustrum_culled;
		object.matrixAutoUpdate = this.pv.matrix_auto_update;
		object.visible = this.pv.visible;
		object.castShadow = this.pv.cast_shadow;
		object.receiveShadow = this.pv.receive_shadow;
	}
}
