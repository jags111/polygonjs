import {BaseParamType} from './_Base';
import {TypedPathParam} from './_BasePath';
import {CoreWalker, TypedParamPathParamValue} from '../../core/Walker';
import {BaseNodeType} from '../nodes/_Base';
import {ParamType} from '../poly/ParamType';
import {ParamValuesTypeMap} from './types/ParamValuesTypeMap';
import {ParamEvent} from '../poly/ParamEvent';
import {ParamInitValuesTypeMap} from './types/ParamInitValuesTypeMap';

export class ParamPathParam extends TypedPathParam<ParamType.PARAM_PATH> {
	static type() {
		return ParamType.PARAM_PATH;
	}
	protected _initializeParam() {
		this._value = new TypedParamPathParamValue();
	}

	defaultValueSerialized() {
		return this._default_value;
	}
	rawInputSerialized() {
		return `${this._raw_input}`;
	}
	valueSerialized() {
		return `${this.value}`;
	}
	protected _copyValue(param: ParamPathParam) {
		this.set(param.valueSerialized());
	}
	static areRawInputEqual(
		raw_input1: ParamInitValuesTypeMap[ParamType.PARAM_PATH],
		raw_input2: ParamInitValuesTypeMap[ParamType.PARAM_PATH]
	) {
		return raw_input1 == raw_input2;
	}
	static areValuesEqual(
		val1: ParamValuesTypeMap[ParamType.PARAM_PATH],
		val2: ParamValuesTypeMap[ParamType.PARAM_PATH]
	) {
		return val1 == val2;
	}
	isDefault(): boolean {
		return this._raw_input == this._default_value;
	}
	setParam(param: BaseParamType) {
		this.set(param.path());
	}
	protected processRawInput() {
		if (this._value.path() != this._raw_input) {
			this._value.set_path(this._raw_input);
			this.findTarget();
			this.setDirty();
			this.emitController.emit(ParamEvent.VALUE_UPDATED);
		}
	}
	protected async processComputation() {
		this.findTarget();
	}
	private findTarget() {
		if (!this.node) {
			return;
		}
		const path = this._raw_input;
		let param: BaseParamType | null = null;
		const pathNonEmpty = path != null && path !== '';

		this.scene().referencesController.resetReferenceFromParam(this); // must be before decomposed path is changed
		this.decomposed_path.reset();
		if (pathNonEmpty) {
			param = CoreWalker.findParam(this.node, path, this.decomposed_path);
		}

		const currentFoundEntity = this._value.param();
		const newlyFoundEntity = param;

		// if the param refers to itself, we set an error
		if (newlyFoundEntity) {
			if (newlyFoundEntity.graphNodeId() == this.graphNodeId()) {
				this.states.error.set(`param cannot refer to itself`);
				return;
			}
		}

		this._handleReferences(param, path);

		if (currentFoundEntity?.graphNodeId() !== newlyFoundEntity?.graphNodeId()) {
			const dependent_on_found_node = this.options.dependentOnFoundNode();

			const previously_found_node = this._value.param();
			if (previously_found_node) {
				if (dependent_on_found_node) {
					this.removeGraphInput(previously_found_node);
				} else {
					// this._found_node.remove_param_referree(this) // TODO: typescript
				}
			}

			if (param) {
				this._assign_found_node(param);
			} else {
				this._value.set_param(null);
			}

			this.options.executeCallback();
		}
		this.removeDirtyState();
	}

	private _assign_found_node(param: BaseParamType) {
		const dependent_on_found_node = this.options.dependentOnFoundNode();
		// if (this._is_node_expected_context(node)) {
		// 	if (this._is_node_expected_type(node)) {
		this._value.set_param(param);
		if (dependent_on_found_node) {
			this.addGraphInput(param);
		}
		// 	} else {
		// 		this.states.error.set(
		// 			`node type is ${node.type} but the params expects one of ${(this._expected_node_types() || []).join(
		// 				', '
		// 			)}`
		// 		);
		// 	}
		// } else {
		// 	this.states.error.set(
		// 		`node context is ${node.node_context()} but the params expects a ${this._expected_context()}`
		// 	);
		// }
	}

	// private _expected_context() {
	// 	return this.options.node_selection_context;
	// }
	// private _is_node_expected_context(node: BaseNodeType) {
	// 	const expected_context = this._expected_context();
	// 	if (expected_context == null) {
	// 		return true;
	// 	}
	// 	const node_context = node.parent?.childrenController?.context;
	// 	return expected_context == node_context;
	// }
	// private _expected_node_types() {
	// 	return this.options.node_selection_types;
	// }

	// private _is_node_expected_type(node: BaseNodeType) {
	// 	const expected_types = this._expected_node_types();
	// 	if (expected_types == null) {
	// 		return true;
	// 	}
	// 	return expected_types?.includes(node.type);
	// }

	notifyPathRebuildRequired(param: BaseParamType) {
		this.decomposed_path.update_from_name_change(param);
		const new_path = this.decomposed_path.to_path();
		this.set(new_path);
	}
	notifyTargetParamOwnerParamsUpdated(node: BaseNodeType) {
		this.setDirty();
	}
}
