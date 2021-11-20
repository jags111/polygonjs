/**
 * Value of the property the animation will be animated to
 *
 *
 */
import {TypedAnimNode} from './_Base';
import {TimelineBuilder} from '../../../core/animation/TimelineBuilder';
import {CoreType} from '../../../core/Type';
import {TypeAssert} from '../../poly/Assert';
import {Object3D} from 'three/src/core/Object3D';
import {Quaternion} from 'three/src/math/Quaternion';

export enum AnimPropertyValueNodeMode {
	CUSTOM = 'custom',
	FROM_SCENE_GRAPH = 'from scene graph',
	FROM_NODE = 'from node',
}
const PROPERTY_VALUE_MODES: AnimPropertyValueNodeMode[] = [
	AnimPropertyValueNodeMode.CUSTOM,
	AnimPropertyValueNodeMode.FROM_SCENE_GRAPH,
	AnimPropertyValueNodeMode.FROM_NODE,
];
const PROPERTY_VALUE_MODE_CUSTOM = PROPERTY_VALUE_MODES.indexOf(AnimPropertyValueNodeMode.CUSTOM);
const PROPERTY_VALUE_MODE_FROM_SCENE_GRAPH = PROPERTY_VALUE_MODES.indexOf(AnimPropertyValueNodeMode.FROM_SCENE_GRAPH);
const PROPERTY_VALUE_MODE_FROM_NODE = PROPERTY_VALUE_MODES.indexOf(AnimPropertyValueNodeMode.FROM_NODE);

import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {isBooleanTrue} from '../../../core/BooleanValue';
import {BaseNodeType} from '../_Base';
class PropertyValueAnimParamsConfig extends NodeParamsConfig {
	/** @param mode */
	mode = ParamConfig.INTEGER(PROPERTY_VALUE_MODE_CUSTOM, {
		menu: {
			entries: PROPERTY_VALUE_MODES.map((name, value) => {
				return {name, value};
			}),
		},
	});
	/** @param if set to a Polygonjs node, this is the node path */
	nodePath = ParamConfig.NODE_PATH('', {
		visibleIf: {mode: PROPERTY_VALUE_MODE_FROM_NODE},
	});
	/** @param if set to a THREE object, this is a mask to find the objects */
	objectMask = ParamConfig.STRING('*geo1', {
		visibleIf: {mode: PROPERTY_VALUE_MODE_FROM_SCENE_GRAPH},
	});
	/** @param print the object matching the objectMask, to help debugging */
	printResolve = ParamConfig.BUTTON(null, {
		visibleIf: {mode: PROPERTY_VALUE_MODE_FROM_SCENE_GRAPH},
		callback: (node: BaseNodeType) => {
			PropertyValueAnimNode.PARAM_CALLBACK_printResolve(node as PropertyValueAnimNode);
		},
	});
	overridePropertyName = ParamConfig.BOOLEAN(0, {
		visibleIf: [{mode: PROPERTY_VALUE_MODE_FROM_SCENE_GRAPH}, {mode: PROPERTY_VALUE_MODE_FROM_NODE}],
	});
	propertyName = ParamConfig.STRING('', {
		visibleIf: [
			{overridePropertyName: true, mode: PROPERTY_VALUE_MODE_FROM_SCENE_GRAPH},
			{overridePropertyName: true, mode: PROPERTY_VALUE_MODE_FROM_NODE},
		],
	});
	/** @param size of the parameter to animate */
	size = ParamConfig.INTEGER(3, {
		range: [1, 4],
		rangeLocked: [true, true],
		visibleIf: {mode: PROPERTY_VALUE_MODE_CUSTOM},
	});
	/** @param value for a float */
	value1 = ParamConfig.FLOAT(0, {
		visibleIf: {mode: PROPERTY_VALUE_MODE_CUSTOM, size: 1},
	});
	/** @param value for a vector2 */
	value2 = ParamConfig.VECTOR2([0, 0], {
		visibleIf: {mode: PROPERTY_VALUE_MODE_CUSTOM, size: 2},
	});
	/** @param value for a vector3 */
	value3 = ParamConfig.VECTOR3([0, 0, 0], {
		visibleIf: {mode: PROPERTY_VALUE_MODE_CUSTOM, size: 3},
	});
	/** @param value for a vector4 */
	value4 = ParamConfig.VECTOR4([0, 0, 0, 0], {
		visibleIf: {mode: PROPERTY_VALUE_MODE_CUSTOM, size: 4},
	});
}
const ParamsConfig = new PropertyValueAnimParamsConfig();

export class PropertyValueAnimNode extends TypedAnimNode<PropertyValueAnimParamsConfig> {
	paramsConfig = ParamsConfig;
	static type() {
		return 'propertyValue';
	}

	initializeNode() {
		this.io.inputs.setCount(0, 1);
	}

	async cook(inputContents: TimelineBuilder[]) {
		const timelineBuilder = inputContents[0] || new TimelineBuilder();

		await this._prepareTimelineBuilder(timelineBuilder);
		this.setTimelineBuilder(timelineBuilder);
	}
	setMode(targetType: AnimPropertyValueNodeMode) {
		this.p.mode.set(PROPERTY_VALUE_MODES.indexOf(targetType));
	}

	private async _prepareTimelineBuilder(timelineBuilder: TimelineBuilder) {
		const mode = PROPERTY_VALUE_MODES[this.pv.mode];
		switch (mode) {
			case AnimPropertyValueNodeMode.CUSTOM: {
				return this._prepareTimebuilderCustom(timelineBuilder);
			}
			case AnimPropertyValueNodeMode.FROM_SCENE_GRAPH: {
				return this._prepareTimebuilderFromSceneGraph(timelineBuilder);
			}
			case AnimPropertyValueNodeMode.FROM_NODE: {
				return await this._prepareTimebuilderFromNode(timelineBuilder);
			}
		}
		TypeAssert.unreachable(mode);
	}

	private _prepareTimebuilderCustom(timelineBuilder: TimelineBuilder) {
		const targetValue = [this.pv.value1, this.pv.value2.clone(), this.pv.value3.clone(), this.pv.value4.clone()][
			this.pv.size - 1
		];
		timelineBuilder.setPropertyValue(targetValue);
	}
	private _prepareTimebuilderFromSceneGraph(timelineBuilder: TimelineBuilder) {
		const propertyName = isBooleanTrue(this.pv.overridePropertyName)
			? this.pv.propertyName
			: timelineBuilder.propertyName();

		if (!propertyName) {
			return;
		}

		const foundObject = this._foundObjectFromSceneGraph();
		if (foundObject) {
			const value: any = foundObject[propertyName as keyof Object3D];
			if (value) {
				if (CoreType.isNumber(value) || CoreType.isVector(value) || value instanceof Quaternion) {
					timelineBuilder.setPropertyValue(value);
				}
			}
		}
	}

	private async _prepareTimebuilderFromNode(timelineBuilder: TimelineBuilder) {
		const propertyName = isBooleanTrue(this.pv.overridePropertyName)
			? this.pv.propertyName
			: timelineBuilder.propertyName();
		if (!propertyName) {
			return;
		}
		const node = this.pv.nodePath.node();
		if (!node) {
			return;
		}
		const param = node.params.get(propertyName);
		if (!param) {
			return;
		}
		if (param.isDirty()) {
			await param.compute();
		}
		const value = param.value;
		if (value) {
			if (CoreType.isNumber(value) || CoreType.isVector(value)) {
				timelineBuilder.setPropertyValue(value);
			}
		}
	}

	static PARAM_CALLBACK_printResolve(node: PropertyValueAnimNode) {
		node.printResolve();
	}
	private _foundObjectFromSceneGraph() {
		return this.scene().findObjectByMask(this.pv.objectMask);
	}
	private printResolve() {
		const foundObject = this._foundObjectFromSceneGraph();
		console.log(foundObject);
	}
}
