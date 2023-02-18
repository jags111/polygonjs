/**
 * Creates a Volume Material, which can be used to render clouds, which can be extended with GL nodes.
 *
 * @remarks
 * This node can create children, which will be GL nodes. The GLSL code generated by the nodes will extend the Material. This is experimental.
 *
 */
import {BaseBuilderParamConfig, TypedBuilderMatNode} from './_BaseBuilder';
import {ShaderAssemblerVolume} from '../gl/code/assemblers/materials/Volume';

import {NodeParamsConfig} from '../utils/params/ParamsConfig';
import {VolumeController, VolumeParamConfig} from './utils/VolumeController';
import {AssemblerName} from '../../poly/registers/assemblers/_BaseRegister';
import {Poly} from '../../Poly';
import {ShaderMaterialWithCustomMaterials} from '../../../core/geometry/Material';
import {MatType} from '../../poly/registers/nodes/types/Mat';
// import {
// 	CustomMaterialVolumeParamConfig,
// 	materialVolumeAssemblerCustomMaterialRequested,
// } from './utils/customMaterials/CustomMaterialVolume';
class VolumeBuilderMatParamsConfig extends BaseBuilderParamConfig(VolumeParamConfig(NodeParamsConfig)) {}
const ParamsConfig = new VolumeBuilderMatParamsConfig();

export class VolumeBuilderMatNode extends TypedBuilderMatNode<
	ShaderMaterialWithCustomMaterials,
	ShaderAssemblerVolume,
	VolumeBuilderMatParamsConfig
> {
	override paramsConfig = ParamsConfig;
	static override type() {
		return MatType.VOLUME_BUILDER;
	}
	public override usedAssembler(): Readonly<AssemblerName.GL_VOLUME> {
		return AssemblerName.GL_VOLUME;
	}
	protected _createAssemblerController() {
		return Poly.assemblersRegister.assembler(this, this.usedAssembler());
	}
	// public override customMaterialRequested(customName: CustomMaterialName): boolean {
	// 	return materialVolumeAssemblerCustomMaterialRequested(this, customName);
	// }

	private _volumeController = new VolumeController(this);

	override initializeNode() {}
	override async cook() {
		this._material = this._material || this.createMaterial();
		this._volumeController.updateUniformsFromParams(this._material);

		this.compileIfRequired(this._material);

		this.setMaterial(this._material);
	}
}
