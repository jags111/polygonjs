/**
 * Layout UVs of multiple objects so that they have no overlap
 *
 * @remarks
 *
 * Using the UvLayout node is very useful to prepare geometries which a lightmap will be applied onto.
 *
 */
import {TypedSopNode} from './_Base';
import {CoreGroup} from '../../../core/geometry/Group';
import {UvLayoutSopOperation} from '../../operations/sop/UvLayout';

import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {SopType} from '../../poly/registers/nodes/types/Sop';
class UvLayoutSopParamConfig extends NodeParamsConfig {
	/** @param expected map resolution */
	res = ParamConfig.INTEGER(1024);
	/** @param padding between uv islands, in pixels */
	padding = ParamConfig.INTEGER(3);
	/** @param uv attribute to layout */
	uv = ParamConfig.STRING('uv');
	/** @param new uv attribute that will be set or created */
	uv2 = ParamConfig.STRING('uv2');
}
const ParamsConfig = new UvLayoutSopParamConfig();

export class UvLayoutSopNode extends TypedSopNode<UvLayoutSopParamConfig> {
	paramsConfig = ParamsConfig;
	static type() {
		return SopType.UV_LAYOUT;
	}

	static displayedInputNames(): string[] {
		return ['geometries to unwrap UVs'];
	}

	initializeNode() {
		this.io.inputs.setCount(1);
		this.io.inputs.initInputsClonedState(UvLayoutSopOperation.INPUT_CLONED_STATE);
	}

	private _operation: UvLayoutSopOperation | undefined;
	cook(input_contents: CoreGroup[]) {
		this._operation = this._operation || new UvLayoutSopOperation(this.scene(), this.states);
		const core_group = this._operation.cook(input_contents, this.pv);
		this.setCoreGroup(core_group);
	}
}
