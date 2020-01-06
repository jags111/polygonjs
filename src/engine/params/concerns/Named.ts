import {BaseParam} from '../_Base'

export function Named<TBase extends Constructor>(Base: TBase) {
	return class Mixin extends Base {
		protected self: BaseParam = (<unknown>this) as BaseParam

		protected _name: string

		name() {
			return this._name
		}
		set_name(name: string): void {
			this._name = name
			this.self.name_graph_node().set_dirty()
			this.self.name_graph_node().remove_dirty_state()
		}
	}
}
