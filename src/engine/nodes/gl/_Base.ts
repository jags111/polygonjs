import {TypedNode} from '../_Base';
import {ThreeToGl} from '../../../core/ThreeToGl';
import {BaseGlShaderAssembler} from './code/assemblers/_Base';
import {AssemblerControllerNode} from './code/Controller';
import {NodeContext} from '../../poly/NodeContext';
import {NodeParamsConfig} from '../utils/params/ParamsConfig';
import {ParamConfigsController} from '../utils/code/controllers/ParamConfigsController';
import {ShadersCollectionController} from './code/utils/ShadersCollectionController';
import {ParamInitValueSerialized} from '../../params/types/ParamInitValueSerialized';
import {GlNodeSpareParamsController} from './utils/SpareParamsController';
import {GlConnectionsController} from './utils/ConnectionsController';

export class TypedGlNode<K extends NodeParamsConfig> extends TypedNode<'GL', BaseGlNodeType, K> {
	static node_context(): NodeContext {
		return NodeContext.GL;
	}
	protected _param_configs_controller: ParamConfigsController | undefined;
	protected _assembler: BaseGlShaderAssembler | undefined;

	readonly spare_params_controller: GlNodeSpareParamsController = new GlNodeSpareParamsController(this);
	public readonly gl_connections_controller: GlConnectionsController | undefined;

	initialize_base_node() {
		// this.io.inputs.set_depends_on_inputs(false);
		this.io.connections.init_inputs();
		this.ui_data.set_layout_horizontal();
		this.io.outputs.set_named_output_connection_points([]);

		this.spare_params_controller.initialize_node();
	}
	node_sibbling(name: string): BaseGlNodeType | null {
		return super.node_sibbling(name) as BaseGlNodeType | null;
	}
	cook() {
		console.warn('gl nodes should never cook');
	}

	protected _set_mat_to_recompile() {
		this.material_node?.assembler_controller.set_compilation_required_and_dirty(this);
	}
	get material_node(): AssemblerControllerNode | undefined {
		if (this.parent) {
			if (this.parent.type == this.type) {
				return (this.parent as BaseGlNodeType)?.material_node;
			} else {
				return this.parent as AssemblerControllerNode;
			}
		}
	}

	//
	//
	// VARIABLES
	//
	//
	gl_var_name(name: string) {
		return `v_POLY_${this.name}_${name}`;
	}

	variable_for_input(name: string): string {
		const input_index = this.io.inputs.get_input_index(name);
		const connection = this.io.connections.input_connection(input_index);
		if (connection) {
			const input_node = (<unknown>connection.node_src) as BaseGlNodeType;
			const output_connection_point =
				input_node.io.outputs.named_output_connection_points[connection.output_index];
			if (output_connection_point) {
				const output_name = output_connection_point.name;
				return input_node.gl_var_name(output_name);
			} else {
				console.warn(`no output called '${name}' for gl node ${input_node.full_path()}`);
				throw 'variable_for_input ERROR';
			}
		} else {
			return ThreeToGl.any(this.params.get(name)?.value);
		}
	}

	//
	//
	// ADDED LINES
	//
	//
	set_lines(shaders_collection_controller: ShadersCollectionController) {}

	reset_code() {
		this._param_configs_controller?.reset();
		// this.reset_lines();
	}

	//
	//
	// PARAM CONFIGS
	//
	//
	public set_param_configs() {}
	param_configs() {
		return this._param_configs_controller?.list;
	}
	// private reset_param_configs() {
	// 	this._param_configs = [];
	// }
	// add_param_config<T extends ParamType>(
	// 	type: T,
	// 	name: string,
	// 	default_value: ParamInitValuesTypeMap[T],
	// 	uniform_name: string
	// ) {
	// 	const param_config = new ParamConfig(type, name, default_value, uniform_name);
	// 	this._param_configs.push(param_config);
	// }
	// param_configs() {
	// 	return this._param_configs;
	// }
	//
	//
	// INPUT
	//
	//
	gl_input_default_value(name: string): ParamInitValueSerialized {
		return null;
	}

	//
	//
	// MISC
	//
	//

	//
	//
	// NEEDED?
	//
	//
	// set_assembler(assembler: BaseGlShaderAssembler) {
	// 	this._assembler = assembler;
	// }
	// get assembler(): BaseGlShaderAssembler | undefined {
	// 	return this._assembler;
	// }

	// shader_configs() {
	// 	return this.assembler?.shader_configs || [];
	// }
	// shader_config(name: string) {
	// 	return this.assembler?.shader_config(name);
	// }
	// shader_names() {
	// 	return this.assembler?.shader_names || [];
	// }
}

export type BaseGlNodeType = TypedGlNode<NodeParamsConfig>;
export class BaseGlNodeClass extends TypedGlNode<NodeParamsConfig> {}

class ParamlessParamsConfig extends NodeParamsConfig {}
const ParamsConfig = new ParamlessParamsConfig();
export class ParamlessTypedGlNode extends TypedGlNode<ParamlessParamsConfig> {
	params_config = ParamsConfig;
}
