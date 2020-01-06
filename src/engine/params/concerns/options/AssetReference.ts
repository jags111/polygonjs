const ALWAYS_REFERENCE_ASSET_OPTION = 'always_reference_asset';

interface ParamOptions {
	always_reference_asset?: boolean
}


export function AssetReferenceOption<TBase extends Constructor>(Base: TBase) {
	return class Mixin extends Base {
		_options: ParamOptions

		always_reference_asset(): boolean {
			return this._options[ALWAYS_REFERENCE_ASSET_OPTION] === true;
		}
	}
};

