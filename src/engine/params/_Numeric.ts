import lodash_isString from 'lodash/isString';
import lodash_isNumber from 'lodash/isNumber';
import lodash_isBoolean from 'lodash/isBoolean';
import {TypedParamVisitor} from './_Base';
import {Single} from './_Single';
import {ParamType} from '../poly/ParamType';
import {ParamInitValuesTypeMap} from '../nodes/utils/params/ParamsController';
// import {ParamInitValuesTypeMap} from '../nodes/utils/params/ParamsController';

interface NumericParamVisitor extends TypedParamVisitor {
	visit_numeric_param: (param: TypedNumericParam<any>) => any;
}

export class TypedNumericParam<T extends ParamType> extends Single<T> {
	get is_numeric() {
		return true;
	}

	accepts_visitor(visitor: NumericParamVisitor): any {
		return visitor.visit_numeric_param(this);
	}
	// init_expression() {
	// 	if (this.is_value_expression(this._default_value)) {
	// 		return this.set_expression(this._default_value)
	// 	}
	// }

	set(raw_input: ParamInitValuesTypeMap[T]): void {
		// this._raw_input = raw_input;
		// this.process_raw_input()

		const converted = this.convert(raw_input);
		console.log('converted', raw_input, converted);
		if (converted != null) {
			if (converted != this._value) {
				this._value = converted;
				this.remove_dirty_state();
				this.set_successors_dirty();
			}
		} else {
			if (lodash_isString(raw_input)) {
				if (raw_input != this.expression_controller.expression) {
					console.log('set expr', raw_input);
					this.expression_controller.set_expression(raw_input);
					this.set_dirty();
				}
			} else {
				this.states.error.set(`param input is invalid (${this.full_path()})`);
			}
		}
	}
}
//else
//	@_value = @_default_value
