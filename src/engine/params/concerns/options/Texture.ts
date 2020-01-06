
const TEXTURE_OPTION = 'texture';
const ENV_OPTION = 'env';

interface ParamOptions {
	texture?: {
		env?: boolean
	}
}

export function TextureOption<TBase extends Constructor>(Base: TBase) {
	return class Mixin extends Base {
		_options: ParamOptions

		texture_options() {
			return this._options[TEXTURE_OPTION];
		}
		texture_as_env(): boolean {
			const texture_options = this.texture_options();
			if (texture_options != null) {
				return texture_options[ENV_OPTION] === true;
			}
		}
	};
}
