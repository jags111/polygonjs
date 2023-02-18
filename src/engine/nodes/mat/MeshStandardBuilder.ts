/**
 * Creates a Mesh Standard Material, which can be extended with GL nodes.
 *
 * @remarks
 * This node can create children, which will be GL nodes. The GLSL code generated by the nodes will extend the Material.
 *
 * Note that when overriding some properties like metalness and roughness from the output node, the values will be mutliplied with the material top level parameters. You may therefore want to set those to 1 to have predictable results.
 *
 */
import {NodeParamsConfig} from '../utils/params/ParamsConfig';
import {
	UniformsTransparencyParamConfig,
	UniformsTransparencyController,
	UniformsTransparencyControllers,
} from './utils/UniformsTransparencyController';
import {
	AdvancedCommonController,
	AdvancedCommonControllers,
	AdvancedCommonParamConfig,
} from './utils/AdvancedCommonController';
import {MapParamConfig, TextureMapController, TextureMapControllers} from './utils/TextureMapController';
import {
	AlphaMapParamConfig,
	TextureAlphaMapController,
	TextureAlphaMapControllers,
} from './utils/TextureAlphaMapController';
import {
	TextureBumpMapController,
	BumpMapParamConfig,
	TextureBumpMapControllers,
} from './utils/TextureBumpMapController';
import {
	TextureEmissiveMapController,
	EmissiveMapParamConfig,
	TextureEmissiveMapControllers,
} from './utils/TextureEmissiveMapController';
import {TextureEnvMapController, EnvMapParamConfig, TextureEnvMapControllers} from './utils/TextureEnvMapController';
import {TextureAOMapController, AOMapParamConfig, TextureAOMapControllers} from './utils/TextureAOMapController';
import {
	TextureNormalMapController,
	NormalMapParamConfig,
	TextureNormalMapControllers,
} from './utils/TextureNormalMapController';
import {
	TextureMetalnessRoughnessMapController,
	MetalnessRoughnessMapParamConfig,
	TextureMetalnessRoughnessMapControllers,
} from './utils/TextureMetalnessRoughnessMapController';
import {
	TextureLightMapController,
	LightMapParamConfig,
	TextureLightMapControllers,
} from './utils/TextureLightMapController';
import {
	TextureDisplacementMapController,
	DisplacementMapParamConfig,
	TextureDisplacementMapControllers,
} from './utils/TextureDisplacementMapController';
import {BaseBuilderParamConfig, TypedBuilderMatNode} from './_BaseBuilder';
import {ShaderAssemblerStandard} from '../gl/code/assemblers/materials/Standard';
import {AssemblerName} from '../../poly/registers/assemblers/_BaseRegister';
import {Poly} from '../../Poly';
import {FogParamConfig, UniformFogController, UniformFogControllers} from './utils/UniformsFogController';
import {
	WireframeShaderMaterialController,
	WireframeShaderMaterialControllers,
	WireframeShaderMaterialParamsConfig,
} from './utils/WireframeShaderMaterialController';
import {DefaultFolderParamConfig} from './utils/DefaultFolder';
import {TexturesFolderParamConfig} from './utils/TexturesFolder';
import {AdvancedFolderParamConfig} from './utils/AdvancedFolder';
import {PCSSController, PCSSControllers, PCSSParamConfig} from './utils/PCSSController';
import {Material} from 'three';
import {MeshStandardMaterial} from 'three';
import {CustomMaterialName, IUniforms} from '../../../core/geometry/Material';
import {
	CustomMaterialMeshParamConfig,
	materialMeshAssemblerCustomMaterialRequested,
} from './utils/customMaterials/CustomMaterialMesh';
import {MatType} from '../../poly/registers/nodes/types/Mat';
interface MeshStandardBuilderControllers
	extends AdvancedCommonControllers,
		PCSSControllers,
		TextureAlphaMapControllers,
		TextureAOMapControllers,
		TextureBumpMapControllers,
		TextureDisplacementMapControllers,
		TextureEmissiveMapControllers,
		TextureEnvMapControllers,
		TextureLightMapControllers,
		TextureMapControllers,
		TextureMetalnessRoughnessMapControllers,
		TextureNormalMapControllers,
		UniformFogControllers,
		UniformsTransparencyControllers,
		WireframeShaderMaterialControllers {}
interface MeshStandardBuilderMaterial extends MeshStandardMaterial {
	vertexShader: string;
	fragmentShader: string;
	uniforms: IUniforms;
	customMaterials: {
		[key in CustomMaterialName]?: Material;
	};
}
class MeshStandardBuilderMatParamsConfig extends CustomMaterialMeshParamConfig(
	PCSSParamConfig(
		FogParamConfig(
			WireframeShaderMaterialParamsConfig(
				AdvancedCommonParamConfig(
					BaseBuilderParamConfig(
						/* advanced */
						AdvancedFolderParamConfig(
							MetalnessRoughnessMapParamConfig(
								NormalMapParamConfig(
									LightMapParamConfig(
										EnvMapParamConfig(
											EmissiveMapParamConfig(
												DisplacementMapParamConfig(
													BumpMapParamConfig(
														AOMapParamConfig(
															AlphaMapParamConfig(
																MapParamConfig(
																	/* textures */
																	TexturesFolderParamConfig(
																		UniformsTransparencyParamConfig(
																			DefaultFolderParamConfig(NodeParamsConfig)
																		)
																	)
																)
															)
														)
													)
												)
											)
										)
									)
								)
							)
						)
					)
				)
			)
		)
	)
) {}
const ParamsConfig = new MeshStandardBuilderMatParamsConfig();

export class MeshStandardBuilderMatNode extends TypedBuilderMatNode<
	MeshStandardBuilderMaterial,
	ShaderAssemblerStandard,
	MeshStandardBuilderMatParamsConfig
> {
	override paramsConfig = ParamsConfig;
	static override type() {
		return MatType.MESH_STANDARD_BUILDER;
	}
	public override usedAssembler(): Readonly<AssemblerName.GL_MESH_STANDARD> {
		return AssemblerName.GL_MESH_STANDARD;
	}
	protected _createAssemblerController() {
		return Poly.assemblersRegister.assembler(this, this.usedAssembler());
	}
	public override customMaterialRequested(customName: CustomMaterialName): boolean {
		return materialMeshAssemblerCustomMaterialRequested(this, customName);
	}
	readonly controllers: MeshStandardBuilderControllers = {
		advancedCommon: new AdvancedCommonController(this),
		alphaMap: new TextureAlphaMapController(this),
		aoMap: new TextureAOMapController(this),
		bumpMap: new TextureBumpMapController(this),
		displacementMap: new TextureDisplacementMapController(this),
		emissiveMap: new TextureEmissiveMapController(this),
		envMap: new TextureEnvMapController(this),
		lightMap: new TextureLightMapController(this),
		map: new TextureMapController(this),
		metalnessRoughnessMap: new TextureMetalnessRoughnessMapController(this),
		normalMap: new TextureNormalMapController(this),
		PCSS: new PCSSController(this),
		uniformFog: new UniformFogController(this),
		uniformTransparency: new UniformsTransparencyController(this),
		wireframeShader: new WireframeShaderMaterialController(this),
	};
	protected override controllersList = Object.values(this.controllers);

	override async cook() {
		this._material = this._material || this.createMaterial();
		await Promise.all(this.controllersPromises(this._material));

		this.compileIfRequired(this._material);

		this.setMaterial(this._material);
	}
}
