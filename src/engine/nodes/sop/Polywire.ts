/**
 * Creates a tube-like geometry around a line.
 *
 *
 */
import {TypedSopNode} from './_Base';
import {InputCloneMode} from '../../poly/InputCloneMode';
import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {CoreGroup} from '../../../core/geometry/Group';

import {PolywireSopOperation} from '../../operations/sop/Polywire';
const DEFAULT = PolywireSopOperation.DEFAULT_PARAMS;
class PolywireSopParamsConfig extends NodeParamsConfig {
	/** @param radius */
	radius = ParamConfig.FLOAT(DEFAULT.radius);
	/** @param segments count on the circle used */
	segmentsRadial = ParamConfig.INTEGER(DEFAULT.segmentsRadial, {
		range: [3, 20],
		rangeLocked: [true, false],
	});
	/** @param toggle on for the geometry to close back on itself */
	closed = ParamConfig.BOOLEAN(DEFAULT.closed);
}
const ParamsConfig = new PolywireSopParamsConfig();

export class PolywireSopNode extends TypedSopNode<PolywireSopParamsConfig> {
	paramsConfig = ParamsConfig;
	static type() {
		return 'polywire';
	}

	static displayedInputNames(): string[] {
		return ['lines to create tubes from'];
	}

	initializeNode() {
		this.io.inputs.setCount(1);
		this.io.inputs.initInputsClonedState(InputCloneMode.NEVER);
	}

	private _operation: PolywireSopOperation | undefined;
	cook(inputCoreGroups: CoreGroup[]) {
		this._operation = this._operation || new PolywireSopOperation(this._scene, this.states);
		const coreGroup = this._operation.cook(inputCoreGroups, this.pv);
		this.setCoreGroup(coreGroup);
	}
}
