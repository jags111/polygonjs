import {BaseSopOperation} from './_Base';
import {CoreGroup} from '../../../core/geometry/Group';
import {InputCloneMode} from '../../../engine/poly/InputCloneMode';
import {DefaultOperationParams} from '../../../core/operations/_Base';
import {CoreObject} from '../../../core/geometry/Object';
import {CameraAttribute} from '../../../core/camera/CoreCamera';
import {CameraSopNodeType} from '../../poly/NodeContext';
import {Camera, Object3D, WebGLRenderer} from 'three';
import {isBooleanTrue} from '../../../core/Type';
import {
	CoreWebXRVRControllerOptions,
	DEFAULT_XR_REFERENCE_SPACE_TYPE,
	WebXRVRFeature,
	XR_REFERENCE_SPACE_TYPES,
} from '../../../core/webXR/CommonVR';
import type {PolyScene} from '../../scene/PolyScene';
import {CoreWebXRVRController} from '../../../core/webXR/CoreWebXRVRController';
import {
	WebXRFeatureStatus,
	WEBXR_FEATURE_STATUSES,
	WEBXR_FEATURE_STATUS_OPTIONAL_INDEX,
} from '../../../core/webXR/Common';
import {TypeAssert} from '../../poly/Assert';

interface CameraWebXRVRSopParams extends DefaultOperationParams {
	overrideReferenceSpaceType: boolean;
	referenceSpaceType: number;
	localFloor: number;
	boundedFloor: number;
	handTracking: number;
	layers: number;
}

interface UpdateObjectOptions {
	scene: PolyScene;
	objects: Object3D[];
	params: CameraWebXRVRSopParams;
	active: boolean;
}

export class CameraWebXRVRSopOperation extends BaseSopOperation {
	static override readonly DEFAULT_PARAMS: CameraWebXRVRSopParams = {
		overrideReferenceSpaceType: false,
		referenceSpaceType: XR_REFERENCE_SPACE_TYPES.indexOf(DEFAULT_XR_REFERENCE_SPACE_TYPE),
		localFloor: WEBXR_FEATURE_STATUS_OPTIONAL_INDEX,
		boundedFloor: WEBXR_FEATURE_STATUS_OPTIONAL_INDEX,
		handTracking: WEBXR_FEATURE_STATUS_OPTIONAL_INDEX,
		layers: WEBXR_FEATURE_STATUS_OPTIONAL_INDEX,
	};
	static override readonly INPUT_CLONED_STATE = InputCloneMode.FROM_NODE;
	static override type(): Readonly<CameraSopNodeType.WEBXR_VR> {
		return CameraSopNodeType.WEBXR_VR;
	}
	override cook(inputCoreGroups: CoreGroup[], params: CameraWebXRVRSopParams) {
		const objects = inputCoreGroups[0].objects();

		if (this._node) {
			CameraWebXRVRSopOperation.updateObject({scene: this._node.scene(), objects, params, active: true});
		}

		return this.createCoreGroupFromObjects(objects);
	}
	static updateObject(options: UpdateObjectOptions) {
		const {scene, objects, params, active} = options;
		scene.webXR.setVRControllerCreationFunction(function (
			renderer: WebGLRenderer,
			camera: Camera,
			canvas: HTMLCanvasElement,
			options: CoreWebXRVRControllerOptions
		) {
			return new CoreWebXRVRController(scene, renderer, camera, canvas, options);
		});

		const optionalFeatures: WebXRVRFeature[] = [];
		const requiredFeatures: WebXRVRFeature[] = [];
		function assignFeatureByStatus(feature: WebXRVRFeature, featureStatusIndex: number) {
			const featureStatus = WEBXR_FEATURE_STATUSES[featureStatusIndex] || WebXRFeatureStatus.NOT_USED;
			switch (featureStatus) {
				case WebXRFeatureStatus.NOT_USED: {
					return;
				}
				case WebXRFeatureStatus.OPTIONAL: {
					optionalFeatures.push(feature);
					return;
				}
				case WebXRFeatureStatus.REQUIRED: {
					requiredFeatures.push(feature);
					return;
				}
			}
			TypeAssert.unreachable(featureStatus);
		}
		assignFeatureByStatus(WebXRVRFeature.LOCAL_FLOOR, params.localFloor);
		assignFeatureByStatus(WebXRVRFeature.BOUNDED_FLOOR, params.boundedFloor);
		assignFeatureByStatus(WebXRVRFeature.HAND_TRACKING, params.handTracking);
		assignFeatureByStatus(WebXRVRFeature.LAYERS, params.layers);

		const optionalFeaturesStr = optionalFeatures.join(' ');
		const requiredFeaturesStr = requiredFeatures.join(' ');

		for (let object of objects) {
			CoreObject.addAttribute(object, CameraAttribute.WEBXR_VR, active);
			CoreObject.addAttribute(object, CameraAttribute.WEBXR_VR_FEATURES_OPTIONAL, optionalFeaturesStr);
			CoreObject.addAttribute(object, CameraAttribute.WEBXR_VR_FEATURES_REQUIRED, requiredFeaturesStr);
			CoreObject.addAttribute(
				object,
				CameraAttribute.WEBXR_VR_OVERRIDE_REFERENCE_SPACE_TYPE,
				isBooleanTrue(params.overrideReferenceSpaceType)
			);
			if (isBooleanTrue(params.overrideReferenceSpaceType)) {
				CoreObject.addAttribute(
					object,
					CameraAttribute.WEBXR_VR_REFERENCE_SPACE_TYPE,
					XR_REFERENCE_SPACE_TYPES[params.referenceSpaceType]
				);
			}
		}
	}
}
