/**
 * sends a trigger when an object is clicked
 *
 *
 */

import {TRIGGER_CONNECTION_NAME} from './_Base';
import {JsConnectionPoint, JsConnectionPointType, JS_CONNECTION_POINT_IN_NODE_DEF} from '../utils/io/connections/Js';
import {JsType} from '../../poly/registers/nodes/types/Js';
import {EvaluatorEventData} from './code/assemblers/actor/ActorEvaluator';
import {BaseOnObjectPointerEventJsNode} from './_BaseOnObjectPointerEvent';
import {JsLinesCollectionController} from './code/utils/JsLinesCollectionController';
import {PointerEventType} from '../../../core/event/PointerEventType';
import {inputObject3D} from './_BaseObject3D';
import {Poly} from '../../Poly';
import {RefJsDefinition} from './utils/JsDefinition';

const CONNECTION_OPTIONS = JS_CONNECTION_POINT_IN_NODE_DEF;

export class OnObjectContextMenuJsNode extends BaseOnObjectPointerEventJsNode {
	static override type() {
		return JsType.ON_OBJECT_CONTEXT_MENU;
	}
	override isTriggering() {
		return true;
	}

	override eventData(): EvaluatorEventData | undefined {
		return {
			type: PointerEventType.contextmenu,
			emitter: this.eventEmitter(),
			jsType: JsType.ON_OBJECT_CONTEXT_MENU,
		};
	}
	override initializeNode() {
		super.initializeNode();
		this.io.inputs.setNamedInputConnectionPoints([
			new JsConnectionPoint(JsConnectionPointType.OBJECT_3D, JsConnectionPointType.OBJECT_3D, CONNECTION_OPTIONS),
		]);
		this.io.outputs.setNamedOutputConnectionPoints([
			new JsConnectionPoint(TRIGGER_CONNECTION_NAME, JsConnectionPointType.TRIGGER, CONNECTION_OPTIONS),
			new JsConnectionPoint(
				JsConnectionPointType.INTERSECTION,
				JsConnectionPointType.INTERSECTION,
				CONNECTION_OPTIONS
			),
		]);
	}

	override setLines(shadersCollectionController: JsLinesCollectionController) {
		const usedOutputNames = this.io.outputs.used_output_names();
		if (usedOutputNames.includes(JsConnectionPointType.INTERSECTION)) {
			this._addIntersectionRef(shadersCollectionController);
		}
	}

	override setTriggeringLines(shadersCollectionController: JsLinesCollectionController, triggeredMethods: string) {
		const object3D = inputObject3D(this, shadersCollectionController);
		const traverseChildren = this.variableForInputParam(shadersCollectionController, this.p.traverseChildren);
		const lineThreshold = this.variableForInputParam(shadersCollectionController, this.p.lineThreshold);
		const pointsThreshold = this.variableForInputParam(shadersCollectionController, this.p.pointsThreshold);
		const outIntersection = this._addIntersectionRef(shadersCollectionController);

		const func = Poly.namedFunctionsRegister.getFunction(
			'getObjectHoveredState',
			this,
			shadersCollectionController
		);
		const bodyLine = func.asString(
			object3D,
			traverseChildren,
			lineThreshold,
			pointsThreshold,
			`this.${outIntersection}`
		);

		//
		const bodyLines = [`if( ${bodyLine} ){`, `${triggeredMethods}`, `}`];

		shadersCollectionController.addTriggeringLines(this, bodyLines, {
			gatherable: true,
			triggeringMethodName: 'onContextMenu',
		});
	}

	private _addIntersectionRef(shadersCollectionController: JsLinesCollectionController) {
		const outIntersection = this.jsVarName(JsConnectionPointType.INTERSECTION);
		shadersCollectionController.addDefinitions(this, [
			new RefJsDefinition(
				this,
				shadersCollectionController,
				JsConnectionPointType.INTERSECTION,
				outIntersection,
				`null`
			),
		]);
		return outIntersection;
	}
}
