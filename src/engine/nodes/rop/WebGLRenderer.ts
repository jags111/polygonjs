/**
 * Creates a WebGLRenderer
 *
 * @param
 * By default, a camera will create its own renderer, with sensible defaults. But there may be cases where you want to override those defaults. In those situation, simply create this node, and set the camera renderer param to it.
 *
 */
import {TypedRopNode} from './_Base';
import {RopType} from '../../poly/registers/nodes/types/Rop';
import {WebGLRenderer, WebGLRendererParameters} from 'three';
import {
	Mesh,
	// encoding
	LinearEncoding,
	sRGBEncoding,
	// BasicDepthPacking,
	// RGBADepthPacking,
	// tone mapping
	NoToneMapping,
	LinearToneMapping,
	ReinhardToneMapping,
	CineonToneMapping,
	ACESFilmicToneMapping,
	// shadow map
	BasicShadowMap,
	PCFShadowMap,
	PCFSoftShadowMap,
	VSMShadowMap,
} from 'three';

import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {CoreType} from '../../../core/Type';
import {Poly} from '../../Poly';
import {isBooleanTrue} from '../../../core/BooleanValue';
import {defaultPixelRatio} from '../../../core/render/defaultPixelRatio';
import {PowerPreference, POWER_PREFERENCES} from '../../../core/render/Common';
import {BaseNodeType} from '../_Base';
enum EncodingName {
	Linear = 'Linear',
	sRGB = 'sRGB',
	RGBM7 = 'RGBM7',
	// BasicDepth = 'BasicDepth',
	// RGBADepth = 'RGBADepth',
}
enum EncodingValue {
	Linear = LinearEncoding as number,
	sRGB = sRGBEncoding as number,
	// BasicDepth = BasicDepthPacking as number,
	// RGBADepth = RGBADepthPacking as number,
}
const ENCODING_NAMES: EncodingName[] = [
	EncodingName.Linear,
	EncodingName.sRGB,
	// EncodingName.BasicDepth,
	// EncodingName.RGBADepth,
];
const ENCODING_VALUES: EncodingValue[] = [
	EncodingValue.Linear,
	EncodingValue.sRGB,
	// EncodingValue.BasicDepth,
	// EncodingValue.RGBADepth,
];
export const DEFAULT_OUTPUT_ENCODING = EncodingValue.sRGB as number;

enum ToneMappingName {
	No = 'No',
	Linear = 'Linear',
	Reinhard = 'Reinhard',
	Cineon = 'Cineon',
	ACESFilmic = 'ACESFilmic',
}
enum ToneMappingValue {
	No = NoToneMapping as number,
	Linear = LinearToneMapping as number,
	Reinhard = ReinhardToneMapping as number,
	Cineon = CineonToneMapping as number,
	ACESFilmic = ACESFilmicToneMapping as number,
}
const TONE_MAPPING_NAMES: ToneMappingName[] = [
	ToneMappingName.No,
	ToneMappingName.Linear,
	ToneMappingName.Reinhard,
	ToneMappingName.Cineon,
	ToneMappingName.ACESFilmic,
];
const TONE_MAPPING_VALUES: ToneMappingValue[] = [
	ToneMappingValue.No,
	ToneMappingValue.Linear,
	ToneMappingValue.Reinhard,
	ToneMappingValue.Cineon,
	ToneMappingValue.ACESFilmic,
];
export const DEFAULT_TONE_MAPPING = ToneMappingValue.ACESFilmic as number;
const TONE_MAPPING_MENU_ENTRIES = TONE_MAPPING_NAMES.map((name, i) => {
	return {
		name: name,
		value: TONE_MAPPING_VALUES[i],
	};
});

enum RendererPrecision {
	HIGH = 'highp',
	MEDIUM = 'mediump',
	LOW = 'lowp',
}

const RENDERER_PRECISIONS: RendererPrecision[] = [
	RendererPrecision.HIGH,
	RendererPrecision.MEDIUM,
	RendererPrecision.LOW,
];

enum ShadowMapTypeName {
	Basic = 'Basic',
	PCF = 'PCF',
	PCFSoft = 'PCFSoft',
	VSM = 'VSM',
}
enum ShadowMapTypeValue {
	Basic = BasicShadowMap as number,
	PCF = PCFShadowMap as number,
	PCFSoft = PCFSoftShadowMap as number,
	VSM = VSMShadowMap as number,
}
const SHADOW_MAP_TYPE_NAMES: ShadowMapTypeName[] = [
	ShadowMapTypeName.Basic,
	ShadowMapTypeName.PCF,
	ShadowMapTypeName.PCFSoft,
	ShadowMapTypeName.VSM,
];
const SHADOW_MAP_TYPE_VALUES: ShadowMapTypeValue[] = [
	ShadowMapTypeValue.Basic,
	ShadowMapTypeValue.PCF,
	ShadowMapTypeValue.PCFSoft,
	ShadowMapTypeValue.VSM,
];
export const SHADOW_MAP_TYPES = [BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, VSMShadowMap];
export const DEFAULT_SHADOW_MAP_TYPE = ShadowMapTypeValue.PCFSoft as number;

// TODO: set debug.checkShaderErrors to false in prod
export const DEFAULT_PARAMS: WebGLRendererParameters = {
	alpha: false,
	precision: RendererPrecision.HIGH,
	premultipliedAlpha: true,
	antialias: true,
	stencil: true,
	preserveDrawingBuffer: false,
	powerPreference: PowerPreference.DEFAULT,
	depth: true,
	logarithmicDepthBuffer: false,
};

class WebGLRendererRopParamsConfig extends NodeParamsConfig {
	//
	//
	//
	//
	//
	common = ParamConfig.FOLDER();
	/** @param tone mapping */
	toneMapping = ParamConfig.INTEGER(DEFAULT_TONE_MAPPING, {
		menu: {
			entries: TONE_MAPPING_MENU_ENTRIES,
		},
		cook: false,
		callback: (node: BaseNodeType) => {
			WebGLRendererRopNode.PARAM_CALLBACK_updateToneMapping(node as WebGLRendererRopNode);
		},
	});
	/** @param tone mapping exposure */
	toneMappingExposure = ParamConfig.FLOAT(1, {
		range: [0, 2],
		cook: false,
		callback: (node: BaseNodeType) => {
			WebGLRendererRopNode.PARAM_CALLBACK_updateToneMappingExposure(node as WebGLRendererRopNode);
		},
	});
	/** @param output encoding */
	outputEncoding = ParamConfig.INTEGER(DEFAULT_OUTPUT_ENCODING, {
		menu: {
			entries: ENCODING_NAMES.map((name, i) => {
				return {
					name: name,
					value: ENCODING_VALUES[i],
				};
			}),
		},
		cook: false,
		callback: (node: BaseNodeType) => {
			WebGLRendererRopNode.PARAM_CALLBACK_updateOutputEncoding(node as WebGLRendererRopNode);
		},
	});
	/** @param physically correct lights */
	physicallyCorrectLights = ParamConfig.BOOLEAN(1, {
		cook: false,
		callback: (node: BaseNodeType) => {
			WebGLRendererRopNode.PARAM_CALLBACK_updatePhysicallyCorrect(node as WebGLRendererRopNode);
		},
	});
	/** @param sort objects, which can be necessary when rendering transparent objects */
	sortObjects = ParamConfig.BOOLEAN(1, {
		cook: false,
		callback: (node: BaseNodeType) => {
			WebGLRendererRopNode.PARAM_CALLBACK_updateSortObjects(node as WebGLRendererRopNode);
		},
	});
	/** @param toggle to override the default pixel ratio, which is 1 for mobile devices, and Math.max(2, window.devicePixelRatio) for other devices */
	tpixelRatio = ParamConfig.BOOLEAN(0, {
		cook: false,
		callback: (node: BaseNodeType) => {
			WebGLRendererRopNode.PARAM_CALLBACK_updatePixelRatio(node as WebGLRendererRopNode);
		},
	});
	/** @param higher pixelRatio improves render sharpness but reduces performance */
	pixelRatio = ParamConfig.FLOAT(2, {
		visibleIf: {tpixelRatio: true},
		range: [0.1, 4],
		rangeLocked: [true, false],
		cook: false,
		callback: (node: BaseNodeType) => {
			WebGLRendererRopNode.PARAM_CALLBACK_updatePixelRatio(node as WebGLRendererRopNode);
		},
	});
	//
	//
	//
	//
	//
	shadow = ParamConfig.FOLDER();
	/** @param toggle on to have shadow maps */
	tshadowMap = ParamConfig.BOOLEAN(1, {
		cook: false,
		callback: (node: BaseNodeType) => {
			WebGLRendererRopNode.PARAM_CALLBACK_updateShadow(node as WebGLRendererRopNode);
		},
	});
	/** @param toggle on to recompute the shadow maps on every frame. If all objects are static, you may want to turn this off */
	shadowMapAutoUpdate = ParamConfig.BOOLEAN(1, {
		visibleIf: {tshadowMap: 1},
		cook: false,
		callback: (node: BaseNodeType) => {
			WebGLRendererRopNode.PARAM_CALLBACK_updateShadow(node as WebGLRendererRopNode);
		},
	});
	/** @param toggle on to trigger shadows update */
	shadowMapNeedsUpdate = ParamConfig.BOOLEAN(0, {
		visibleIf: {tshadowMap: 1},
		cook: false,
		callback: (node: BaseNodeType) => {
			WebGLRendererRopNode.PARAM_CALLBACK_updateShadow(node as WebGLRendererRopNode);
		},
	});
	/** @param shadows type */
	shadowMapType = ParamConfig.INTEGER(DEFAULT_SHADOW_MAP_TYPE, {
		visibleIf: {tshadowMap: 1},
		menu: {
			entries: SHADOW_MAP_TYPE_NAMES.map((name, i) => {
				return {
					name: name,
					value: SHADOW_MAP_TYPE_VALUES[i],
				};
			}),
		},
		cook: false,
		callback: (node: BaseNodeType) => {
			WebGLRendererRopNode.PARAM_CALLBACK_updateShadow(node as WebGLRendererRopNode);
		},
	});

	//
	//
	//
	//
	//
	advanced = ParamConfig.FOLDER();
	/** @param toggle on to have alpha on (change requires page reload) */
	alpha = ParamConfig.BOOLEAN(1);
	/** @param toggle on to have antialias on (change requires page reload) */
	antialias = ParamConfig.BOOLEAN(1);
	/** @param premultipliedAlpha */
	premultipliedAlpha = ParamConfig.BOOLEAN(1);
	/** @param stencil */
	stencil = ParamConfig.BOOLEAN(1);
	/** @param depth */
	depth = ParamConfig.BOOLEAN(1);
	/** @param logarithmicDepthBuffer */
	logarithmicDepthBuffer = ParamConfig.BOOLEAN(0);
	/** @param preserveDrawingBuffer */
	preserveDrawingBuffer = ParamConfig.BOOLEAN(0);
	/** @param toggle on to set the precision */
	tprecision = ParamConfig.BOOLEAN(0);
	/** @param set the precision */
	precision = ParamConfig.INTEGER(RENDERER_PRECISIONS.indexOf(RendererPrecision.HIGH), {
		visibleIf: {tprecision: 1},
		menu: {
			entries: RENDERER_PRECISIONS.map((name, value) => {
				return {value, name};
			}),
		},
	});
	/** @param toggle on to set the power preferenc */
	tpowerPreference = ParamConfig.BOOLEAN(0);
	/** @param set the precision */
	powerPreference = ParamConfig.INTEGER(POWER_PREFERENCES.indexOf(PowerPreference.HIGH), {
		visibleIf: {tpowerPreference: 1},
		menu: {
			entries: POWER_PREFERENCES.map((name, value) => {
				return {value, name};
			}),
		},
	});

	// preserve_drawing_buffer = ParamConfig.BOOLEAN(0);
}
const ParamsConfig = new WebGLRendererRopParamsConfig();

export class WebGLRendererRopNode extends TypedRopNode<WebGLRendererRopParamsConfig> {
	override paramsConfig = ParamsConfig;
	static override type(): Readonly<RopType.WEBGL> {
		return RopType.WEBGL;
	}

	private _rendererByCanvas: Map<HTMLCanvasElement, WebGLRenderer> = new Map();

	// private _renderersbyCamera: Map<Camera, WebGLRenderer> = new Map();
	createRenderer(canvas: HTMLCanvasElement, gl: WebGLRenderingContext): WebGLRenderer {
		const params: WebGLRendererParameters = {};
		const keys: Array<keyof WebGLRendererParameters> = Object.keys(DEFAULT_PARAMS) as Array<
			keyof WebGLRendererParameters
		>;
		let k: keyof WebGLRendererParameters;
		for (k of keys) {
			(params[k] as any) = DEFAULT_PARAMS[k];
		}
		if (isBooleanTrue(this.pv.tprecision)) {
			const precision = RENDERER_PRECISIONS[this.pv.precision];
			params.precision = precision;
		}
		if (isBooleanTrue(this.pv.tpowerPreference)) {
			const powerPreference = POWER_PREFERENCES[this.pv.powerPreference];
			params.powerPreference = powerPreference;
		}
		params.antialias = isBooleanTrue(this.pv.antialias);
		params.alpha = isBooleanTrue(this.pv.alpha);
		params.premultipliedAlpha = isBooleanTrue(this.pv.premultipliedAlpha);
		params.depth = isBooleanTrue(this.pv.depth);
		params.stencil = isBooleanTrue(this.pv.stencil);
		params.logarithmicDepthBuffer = isBooleanTrue(this.pv.logarithmicDepthBuffer);
		params.canvas = canvas;
		params.context = gl;
		params.preserveDrawingBuffer = this.pv.preserveDrawingBuffer;
		const renderer = Poly.renderersController.createWebGLRenderer(params);
		this._rendererByCanvas.set(canvas, renderer);

		if (Poly.renderersController.printDebug()) {
			Poly.renderersController.printDebugMessage(`create renderer from node '${this.path()}'`);
			Poly.renderersController.printDebugMessage({
				params: params,
			});
		}

		this._updateRenderer(renderer);

		return renderer;
	}

	override cook() {
		this._traverseSceneAndUpdateMaterials();

		this.cookController.endCook();
	}
	private _updateRenderer(renderer: WebGLRenderer) {
		// this._renderer.setClearAlpha(this.pv.alpha);
		this._updateRendererPhysicallyCorrect(renderer);
		this._updateRendererOutputEncoding(renderer);
		this._updateRendererToneMapping(renderer);
		this._updateRendererToneMappingExposure(renderer);
		this._updateRendererShadow(renderer);
		this._updateRendererSortObjects(renderer);
		this._updateRendererPixelRatio(renderer);
	}

	private _traverseSceneAndUpdateMaterials() {
		this.scene()
			.threejsScene()
			.traverse((object) => {
				const material = (object as Mesh).material;
				if (material) {
					if (CoreType.isArray(material)) {
						for (let mat of material) {
							mat.needsUpdate = true;
						}
					} else {
						material.needsUpdate = true;
					}
				}
			});
	}

	//
	//

	static PARAM_CALLBACK_updateToneMapping(node: WebGLRendererRopNode) {
		node._rendererByCanvas.forEach((renderer, canvas) => {
			node._updateRendererToneMapping(renderer);
		});
	}
	static PARAM_CALLBACK_updateToneMappingExposure(node: WebGLRendererRopNode) {
		node._rendererByCanvas.forEach((renderer, canvas) => {
			node._updateRendererToneMappingExposure(renderer);
		});
	}
	static PARAM_CALLBACK_updateOutputEncoding(node: WebGLRendererRopNode) {
		node._rendererByCanvas.forEach((renderer, canvas) => {
			node._updateRendererOutputEncoding(renderer);
		});
	}
	static PARAM_CALLBACK_updateShadow(node: WebGLRendererRopNode) {
		node._rendererByCanvas.forEach((renderer, canvas) => {
			node._updateRendererShadow(renderer);
		});
	}
	static PARAM_CALLBACK_updateSortObjects(node: WebGLRendererRopNode) {
		node._rendererByCanvas.forEach((renderer, canvas) => {
			node._updateRendererSortObjects(renderer);
		});
	}
	static PARAM_CALLBACK_updatePhysicallyCorrect(node: WebGLRendererRopNode) {
		node._rendererByCanvas.forEach((renderer, canvas) => {
			node._updateRendererPhysicallyCorrect(renderer);
		});
	}
	static PARAM_CALLBACK_updatePixelRatio(node: WebGLRendererRopNode) {
		node._rendererByCanvas.forEach((renderer, canvas) => {
			node._updateRendererPixelRatio(renderer);
		});
		window.dispatchEvent(new Event('resize'));
	}
	//
	//
	private _updateRendererToneMapping(renderer: WebGLRenderer) {
		renderer.toneMapping = this.pv.toneMapping;
	}
	private _updateRendererToneMappingExposure(renderer: WebGLRenderer) {
		renderer.toneMappingExposure = this.pv.toneMappingExposure;
	}
	private _updateRendererOutputEncoding(renderer: WebGLRenderer) {
		renderer.outputEncoding = this.pv.outputEncoding;
	}
	private _updateRendererShadow(renderer: WebGLRenderer) {
		renderer.shadowMap.enabled = this.pv.tshadowMap;
		renderer.shadowMap.autoUpdate = this.pv.shadowMapAutoUpdate;
		renderer.shadowMap.needsUpdate = this.pv.shadowMapNeedsUpdate;
		renderer.shadowMap.type = this.pv.shadowMapType;
	}
	private _updateRendererSortObjects(renderer: WebGLRenderer): void {
		renderer.sortObjects = this.pv.sortObjects;
	}
	private _updateRendererPhysicallyCorrect(renderer: WebGLRenderer) {
		renderer.physicallyCorrectLights = this.pv.physicallyCorrectLights;
	}
	private _updateRendererPixelRatio(renderer: WebGLRenderer) {
		const pixelRatio = this.pv.tpixelRatio ? this.pv.pixelRatio : defaultPixelRatio();
		if (Poly.renderersController.printDebug()) {
			Poly.renderersController.printDebugMessage(`set renderer pixelRatio from '${this.path()}'`);
			Poly.renderersController.printDebugMessage({
				pixelRatio: pixelRatio,
			});
		}
		renderer.setPixelRatio(pixelRatio);
	}
}
