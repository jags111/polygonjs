import {
	BaseJsShaderAssembler,
	INSERT_DEFINE_AFTER,
	INSERT_BODY_AFTER,
	INSERT_MEMBERS_AFTER,
	VelocityColliderFunctionData,
	SpareParamOptions,
} from '../_Base';
import {RegisterableVariable} from '../_BaseJsPersistedConfigUtils';
import {ThreeToGl} from '../../../../../../core/ThreeToGl';
import {JsShaderConfig} from '../../configs/ShaderConfig';
import {VariableConfig} from '../../configs/VariableConfig';
import {JsFunctionName} from '../../../../utils/shaders/ShaderName';
import {OutputJsNode} from '../../../Output';
import {GlobalsJsNode} from '../../../Globals';
import {JsConnectionPointType, JsConnectionPoint} from '../../../../utils/io/connections/Js';
import {JsLinesCollectionController} from '../../utils/JsLinesCollectionController';
import {Vector3} from 'three';
import {NamedFunctionMap} from '../../../../../poly/registers/functions/All';
import {ParamOptions} from '../../../../../params/utils/OptionsController';
import {Poly} from '../../../../../Poly';

let FORCE_DEBUG: boolean | undefined = true;
function _debug() {
	if (FORCE_DEBUG != undefined) {
		return FORCE_DEBUG;
	}
	return !Poly.playerMode();
}

function logDefault(message: string) {
	if (!_debug()) {
		return;
	}
	console.log(message);
}

export enum SoftBodyVariable {
	P = 'position',
	V = 'velocity',
	COLLISION_SDF = 'collisionSDF',
	//
	TIME = 'time',
	DELTA = 'delta',
}

const TEMPLATE = `
${INSERT_DEFINE_AFTER}
${INSERT_MEMBERS_AFTER}

${INSERT_BODY_AFTER}
`;

export class JsAssemblerSoftBody extends BaseJsShaderAssembler {
	makeFunctionNodeDirtyOnChange() {
		return true;
	}
	defaultObject3DVariable(): string {
		return 'null';
	}
	defaultObject3DMaterialVariable(): string {
		return 'null';
	}
	override templateShader() {
		return {
			velocity: TEMPLATE,
			collider: TEMPLATE,
		};
	}

	override spareParamsOptions(options: SpareParamOptions) {
		const _options: ParamOptions = {
			spare: true,
			// computeOnDirty: true, // not needed if cook option is not set
			// cook: false, // for SDFBuilder, the node needs to recook
			// important for texture nodes
			// that compute after being found by the nodepath param
			dependentOnFoundNode: true,
		};
		return _options;
	}

	functionData(): VelocityColliderFunctionData | undefined {
		const functionBodyVelocity = this._shaders_by_name.get(JsFunctionName.VELOCITY);
		const functionBodyCollider = this._shaders_by_name.get(JsFunctionName.COLLIDER);
		if (!(functionBodyVelocity && functionBodyCollider)) {
			return;
		}
		logDefault(functionBodyVelocity);
		logDefault(functionBodyCollider);
		const variableNames: string[] = [];
		const functionNames: Array<keyof NamedFunctionMap> = [];
		const variablesByName: Record<string, RegisterableVariable> = {};
		const functionsByName: Record<string, Function> = {};
		this.traverseRegisteredVariables((variable, varName) => {
			variableNames.push(varName);
			variablesByName[varName] = variable;
		});
		this.traverseRegisteredFunctions((namedFunction) => {
			functionNames.push(namedFunction.type() as keyof NamedFunctionMap);
			functionsByName[namedFunction.type()] = namedFunction.func.bind(namedFunction);
		});
		const paramConfigs = this.param_configs();
		return {
			functionBodyVelocity,
			functionBodyCollider,
			variableNames,
			variablesByName,
			functionNames,
			functionsByName,
			paramConfigs: [...paramConfigs],
		};
	}

	override updateFunction() {
		super.updateFunction();
		this._lines = new Map();
		this._shaders_by_name = new Map();
		const shaderNames = this.shaderNames();

		if (this._root_nodes.length > 0) {
			this.buildCodeFromNodes(this._root_nodes);
			this._buildLines();
		}

		for (let shaderName of shaderNames) {
			const lines = this._lines.get(shaderName);
			if (lines) {
				this._shaders_by_name.set(shaderName, lines.join('\n'));
			}
		}
	}

	//
	//
	// CHILDREN NODES PARAMS
	//
	//
	override add_output_inputs(output_child: OutputJsNode) {
		output_child.io.inputs.setNamedInputConnectionPoints([
			new JsConnectionPoint(SoftBodyVariable.V, JsConnectionPointType.VECTOR3),
			new JsConnectionPoint(SoftBodyVariable.COLLISION_SDF, JsConnectionPointType.FLOAT),
		]);
	}
	override add_globals_outputs(globals_node: GlobalsJsNode) {
		globals_node.io.outputs.setNamedOutputConnectionPoints([
			new JsConnectionPoint(SoftBodyVariable.P, JsConnectionPointType.VECTOR3),
			new JsConnectionPoint(SoftBodyVariable.V, JsConnectionPointType.VECTOR3),
			new JsConnectionPoint(SoftBodyVariable.TIME, JsConnectionPointType.FLOAT),
			new JsConnectionPoint(SoftBodyVariable.DELTA, JsConnectionPointType.FLOAT),
		]);
	}

	//
	//
	// CONFIGS
	//
	//
	override create_shader_configs() {
		return [
			new JsShaderConfig(JsFunctionName.VELOCITY, [SoftBodyVariable.V], []),
			new JsShaderConfig(JsFunctionName.COLLIDER, [SoftBodyVariable.COLLISION_SDF], []),
		];
	}
	override create_variable_configs() {
		return [
			new VariableConfig(SoftBodyVariable.V, {
				prefix: 'return ',
			}),
			new VariableConfig(SoftBodyVariable.COLLISION_SDF, {
				prefix: 'return ',
			}),
		];
	}

	override setNodeLinesOutput(outputNode: OutputJsNode, shadersCollectionController: JsLinesCollectionController) {
		const inputNames = this.inputNamesForShaderName(outputNode, shadersCollectionController.currentShaderName());
		if (inputNames) {
			for (const inputName of inputNames) {
				const input = outputNode.io.inputs.named_input(inputName);

				if (input) {
					const glVar = outputNode.variableForInput(shadersCollectionController, inputName);

					let bodyLine: string | undefined;
					if (inputName == SoftBodyVariable.V) {
						bodyLine = `return ${ThreeToGl.any(glVar)}`;
					}
					if (inputName == SoftBodyVariable.COLLISION_SDF) {
						bodyLine = `return ${ThreeToGl.any(glVar)}`;
					}
					if (bodyLine) {
						shadersCollectionController._addBodyLines(outputNode, [bodyLine]);
					}
				}
			}
		}
	}

	override setNodeLinesGlobals(globalsNode: GlobalsJsNode, shadersCollectionController: JsLinesCollectionController) {
		const shaderName = shadersCollectionController.currentShaderName();
		const shaderConfig = this.shader_config(shaderName);
		if (!shaderConfig) {
			return;
		}
		const bodyLines: string[] = [];

		const usedOutputNames = globalsNode.io.outputs.used_output_names();
		for (const outputName of usedOutputNames) {
			const varName = globalsNode.jsVarName(outputName);

			switch (outputName) {
				case 'position':
					// definitions.push(new UniformJsDefinition(globals_node, JsConnectionPointType.FLOAT, output_name));
					shadersCollectionController.addVariable(globalsNode, new Vector3(), varName);
					bodyLines.push(`${varName}.copy(${outputName})`);

					// this.setUniformsTimeDependent();
					break;
				case SoftBodyVariable.V:
					shadersCollectionController.addVariable(globalsNode, new Vector3(), varName);
					bodyLines.push(`${varName}.copy(${outputName})`);

					// this.setUniformsTimeDependent();
					break;
				case SoftBodyVariable.TIME:
					bodyLines.push(`const ${varName} = ${SoftBodyVariable.TIME}`);
					// this.setUniformsTimeDependent();
					break;
				case SoftBodyVariable.DELTA:
					bodyLines.push(`const ${varName} = ${SoftBodyVariable.DELTA}`);

					// this.setUniformsTimeDependent();
					break;
				// case 'uv':
				// 	this._handleUV(body_lines, shader_name, var_name);
				// 	break;
				// case 'gl_FragCoord':
				// 	this._handle_gl_FragCoord(body_lines, shader_name, var_name);
				// 	break;
				// case 'resolution':
				// 	this._handle_resolution(body_lines, shader_name, var_name);
				// 	break;
			}
		}
		// shadersCollectionController.addDefinitions(globalsNode, definitions, shaderName);
		shadersCollectionController._addBodyLines(globalsNode, bodyLines);
	}
}
