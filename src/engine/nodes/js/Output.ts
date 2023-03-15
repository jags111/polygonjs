import {TypedJsNode} from './_Base';
// import {ThreeToGl} from '../../../Core/ThreeToGl';
// import {CodeBuilder} from './Util/CodeBuilder'
// import {Definition} from './Definition/_Module';
// import {ShaderName, LineType, LINE_TYPES} from './Assembler/Util/CodeBuilder';

import {NodeParamsConfig} from '../utils/params/ParamsConfig';
import {ShadersCollectionController} from './code/utils/ShadersCollectionController';
import {JsType} from '../../poly/registers/nodes/types/Js';
class OutputJsParamsConfig extends NodeParamsConfig {}
const ParamsConfig = new OutputJsParamsConfig();

export class OutputJsNode extends TypedJsNode<OutputJsParamsConfig> {
	override paramsConfig = ParamsConfig;
	static override type() {
		return JsType.OUTPUT;
	}

	override initializeNode() {
		super.initializeNode();
		this.addPostDirtyHook('_setMatToRecompile', this._setFunctionNodeToRecompile.bind(this));

		this.lifecycle.onAfterAdded(() => {
			this.functionNode()?.assemblerController()?.add_output_inputs(this);
		});
	}

	override setLines(linesController: ShadersCollectionController) {
		// this.function_node?.assembler_controller.assembler.set_node_lines_output(this, lines_controller);
	}
}
