import lodash_compact from 'lodash/compact'
import {BaseParam} from 'src/engine/params/_Base'

const HIDDEN_OPTION = 'hidden'
const LABEL_OPTION = 'label'
const FIELD_OPTION = 'field'
const VISIBLE_IF_OPTION = 'visible_if'

interface AnyByString {
	[propName: string]: any
}
interface ParamOptions {
	hidden?: boolean
	label?: boolean
	field?: boolean
	visible_if?: AnyByString
}

export function VisibleOption<TBase extends Constructor>(Base: TBase) {
	return class Mixin extends Base {
		protected self: BaseParam = (<unknown>this) as BaseParam
		_options: ParamOptions
		_programatic_visible_state: boolean = true

		is_hidden(): boolean {
			return (
				this._options[HIDDEN_OPTION] === true ||
				this._programatic_visible_state === false
			)
		}
		is_visible(): boolean {
			return !this.is_hidden()
		}
		set_visible_state(state: boolean) {
			this._options[HIDDEN_OPTION] = !state
			this.self.emit('param_visible_updated')
		}

		is_label_hidden(): boolean {
			const type = this.self.type()
			return (
				this._options[LABEL_OPTION] === false ||
				type === ParamType.BUTTON ||
				type === ParamType.SEPARATOR ||
				(type === ParamType.BOOLEAN && this.is_field_hidden())
			)
		}
		is_field_hidden(): boolean {
			return this._options[FIELD_OPTION] === false
		}

		// programatic visibility
		ui_data_depends_on_other_params(): boolean {
			return VISIBLE_IF_OPTION in this._options
		}
		visibility_predecessors() {
			const predecessor_names = Object.keys(
				this._options[VISIBLE_IF_OPTION] || {}
			)
			const node = this.self.node()
			return lodash_compact(
				predecessor_names.map((name) => {
					const param = node.param(name)
					if (param) {
						return param
					} else {
						console.error(
							`param ${name} not found as visibility condition for ${this.self.name()} in node ${this.self
								.node()
								.type()}`
						)
					}
				})
			)
		}
		set_ui_data_dependency() {
			this.visibility_predecessors().forEach((predecessor) => {
				this.self.ui_data().add_graph_input(predecessor)
			})
		}

		async update_visibility() {
			const params = this.visibility_predecessors()
			const promises = params.map((p) => p.eval_p())
			const options = this._options[VISIBLE_IF_OPTION]
			this._programatic_visible_state = true
			Promise.all(promises).then(() => {
				params.forEach((param) => {
					const expected_val = options[param.name()]
					const val = param.value()
					if (expected_val != val) {
						this._programatic_visible_state = false
					}
				})
				this.self.emit('param_visible_updated')
			})
		}
	}
}
