import {BaseParam} from 'src/engine/params/_Base'

export function Type<TBase extends Constructor>(Base: TBase) {
	return class Mixin extends Base {
		static type(): ParamType {
			// throw "type to be overriden";
			return ParamType.COLOR
		}
		type(): ParamType {
			return (this.constructor as typeof BaseParam).type()
		}
		is_numeric(): boolean {
			return false
			// return this.is_a( ParamModule['Float'] ) ||
			// this.is_a( ParamModule['Integer'] ) ||
			// this.is_a( ParamModule['Vector2'] ) ||
			// this.is_a( ParamModule['Vector'] );
		}
	}
}
