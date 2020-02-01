import {BaseGlNodeType} from '../_Base';
import {BaseDefinition} from './_Base';

export abstract class BaseDefinitionTyped extends BaseDefinition {
	// private _if_rule: string | undefined;

	constructor(protected _node: BaseGlNodeType, protected _type: string, protected _name: string) {
		super(_node, _name);
	}

	type() {
		return this._type;
	}
	id() {
		return this.type();
	}

	// add_if_rule(if_rule: string) {
	// 	this._if_rule = if_rule;
	// }
	// if_rule() {
	// 	return this._if_rule;
	// }
}
