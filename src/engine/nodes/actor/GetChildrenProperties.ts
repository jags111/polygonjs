/**
 * get an object properties
 *
 *
 */

import {ActorNodeTriggerContext, ParamlessTypedActorNode} from './_Base';
import {
	ActorConnectionPoint,
	ActorConnectionPointType,
	ACTOR_CONNECTION_POINT_IN_NODE_DEF,
	ReturnValueTypeByActorConnectionPointType,
} from '../utils/io/connections/Actor';
import {
	// Vector2,
	Vector3,
	// Vector4,
	Quaternion,
	Object3D,
} from 'three';
// import {CoreType} from '../../../core/Type';
import {
	Copyable,
	CreateCopyableItemFunc,
	updateCopyableArrayLength,
	updatePrimitiveArrayLength,
} from '../../../core/ArrayCopyUtils';

const CONNECTION_OPTIONS = ACTOR_CONNECTION_POINT_IN_NODE_DEF;

enum GetChildrenPropertiesActorNodeInputName {
	position = 'position',
	quaternion = 'quaternion',
	scale = 'scale',
	// matrix = 'matrix',
	visible = 'visible',
	castShadow = 'castShadow',
	receiveShadow = 'receiveShadow',
	frustumCulled = 'frustumCulled',
	// ptnum = 'ptnum',
	// id = 'id',
	// uuid = 'uuid',
	// name = 'name',
	// quaternion = 'quaternion',
	// rotation = 'rotation',
	up = 'up',
	matrixAutoUpdate = 'matrixAutoUpdate',
}
const OBJECT_PROPERTIES: GetChildrenPropertiesActorNodeInputName[] = [
	GetChildrenPropertiesActorNodeInputName.position,
	GetChildrenPropertiesActorNodeInputName.quaternion,
	GetChildrenPropertiesActorNodeInputName.scale,
	// GetChildrenPropertiesActorNodeInputName.matrix,
	GetChildrenPropertiesActorNodeInputName.visible,
	GetChildrenPropertiesActorNodeInputName.castShadow,
	GetChildrenPropertiesActorNodeInputName.receiveShadow,
	GetChildrenPropertiesActorNodeInputName.frustumCulled,
	// GetChildrenPropertiesActorNodeInputName.uuid,
	// GetChildrenPropertiesActorNodeInputName.name,
	GetChildrenPropertiesActorNodeInputName.up,
	GetChildrenPropertiesActorNodeInputName.matrixAutoUpdate,
];
//  const MATERIAL_OUTPUT = 'material';

/**
 *
 * We need different arrays per property.
 * Otherwise, a downstream node which would
 * query positions and scales would receive 2 identical arrays,
 * instead of 2 distinct ones
 *
 */
const tmpPositions: Vector3[] = [];
const tmpQuat: Quaternion[] = [];
const tmpScales: Vector3[] = [];
const tmpVisibles: boolean[] = [];
const tmpCastShadows: boolean[] = [];
const tmpReceiveShadows: boolean[] = [];
const tmpFrustumCulleds: boolean[] = [];
const tmpUps: Vector3[] = [];
const tmpMatrixAutoUpdates: boolean[] = [];
// const createVector2: CreateCopyableItemFunc<Vector2> = () => new Vector2();
const createVector3: CreateCopyableItemFunc<Vector3> = () => new Vector3();
const createQuaternion: CreateCopyableItemFunc<Quaternion> = () => new Quaternion();

function updateCopyableArray<V extends Copyable>(
	children: Object3D[],
	propertyName: GetChildrenPropertiesActorNodeInputName,
	targetVectors: V[],
	createItem: CreateCopyableItemFunc<V>
) {
	updateCopyableArrayLength(targetVectors, children.length, createItem);

	for (let i = 0; i < children.length; i++) {
		const val = children[i][propertyName as GetChildrenPropertiesActorNodeInputName] as V;
		targetVectors[i].copy(val as any);
	}
	return targetVectors;
}

function updatePrimitiveArray<T extends boolean | number | string>(
	children: Object3D[],
	propertyName: GetChildrenPropertiesActorNodeInputName,
	targetValues: T[],
	defaultValue: T
) {
	updatePrimitiveArrayLength(targetValues, children.length, defaultValue);
	for (let i = 0; i < children.length; i++) {
		const val = children[i][propertyName as GetChildrenPropertiesActorNodeInputName] as T;
		targetValues[i] = val;
	}
	return targetValues;
}

export class GetChildrenPropertiesActorNode extends ParamlessTypedActorNode {
	static override type() {
		return 'getChildrenProperties';
	}

	override initializeNode() {
		this.io.inputs.setNamedInputConnectionPoints([
			new ActorConnectionPoint(
				ActorConnectionPointType.OBJECT_3D,
				ActorConnectionPointType.OBJECT_3D,
				CONNECTION_OPTIONS
			),
		]);

		this.io.outputs.setNamedOutputConnectionPoints([
			new ActorConnectionPoint(
				GetChildrenPropertiesActorNodeInputName.position,
				ActorConnectionPointType.VECTOR3_ARRAY
			),
			new ActorConnectionPoint(
				GetChildrenPropertiesActorNodeInputName.quaternion,
				ActorConnectionPointType.QUATERNION_ARRAY
			),
			new ActorConnectionPoint(
				GetChildrenPropertiesActorNodeInputName.scale,
				ActorConnectionPointType.VECTOR3_ARRAY
			),
			// new ActorConnectionPoint(
			// 	GetChildrenPropertiesActorNodeInputName.matrix,
			// 	ActorConnectionPointType.MATRIX4_ARRAY
			// ),
			new ActorConnectionPoint(
				GetChildrenPropertiesActorNodeInputName.up,
				ActorConnectionPointType.VECTOR3_ARRAY
			),
			new ActorConnectionPoint(
				GetChildrenPropertiesActorNodeInputName.visible,
				ActorConnectionPointType.BOOLEAN_ARRAY
			),
			new ActorConnectionPoint(
				GetChildrenPropertiesActorNodeInputName.matrixAutoUpdate,
				ActorConnectionPointType.BOOLEAN_ARRAY
			),
			new ActorConnectionPoint(
				GetChildrenPropertiesActorNodeInputName.castShadow,
				ActorConnectionPointType.BOOLEAN_ARRAY
			),
			new ActorConnectionPoint(
				GetChildrenPropertiesActorNodeInputName.receiveShadow,
				ActorConnectionPointType.BOOLEAN_ARRAY
			),
			new ActorConnectionPoint(
				GetChildrenPropertiesActorNodeInputName.frustumCulled,
				ActorConnectionPointType.BOOLEAN_ARRAY
			),
			// new ActorConnectionPoint(GetChildrenPropertiesActorNodeInputName.id, ActorConnectionPointType.INTEGER),
			// new ActorConnectionPoint(GetChildrenPropertiesActorNodeInputName.uuid, ActorConnectionPointType.BOOLEAN),
			//  new ActorConnectionPoint(MATERIAL_OUTPUT, ActorConnectionPointType.MATERIAL),
		]);
	}

	public override outputValue(
		context: ActorNodeTriggerContext,
		outputName: GetChildrenPropertiesActorNodeInputName
	): ReturnValueTypeByActorConnectionPointType[ActorConnectionPointType] | undefined {
		const Object3D =
			this._inputValue<ActorConnectionPointType.OBJECT_3D>(ActorConnectionPointType.OBJECT_3D, context) ||
			context.Object3D;
		const children = Object3D.children;
		const firstChild = children[0];
		if (!firstChild) {
			return [];
		}
		if (OBJECT_PROPERTIES.includes(outputName)) {
			switch (outputName) {
				case GetChildrenPropertiesActorNodeInputName.position: {
					return updateCopyableArray(children, outputName, tmpPositions, createVector3);
				}
				case GetChildrenPropertiesActorNodeInputName.quaternion: {
					return updateCopyableArray(children, outputName, tmpQuat, createQuaternion);
				}
				case GetChildrenPropertiesActorNodeInputName.scale: {
					return updateCopyableArray(children, outputName, tmpScales, createVector3);
				}
				case GetChildrenPropertiesActorNodeInputName.visible: {
					return updatePrimitiveArray(children, outputName, tmpVisibles, true);
				}
				case GetChildrenPropertiesActorNodeInputName.castShadow: {
					return updatePrimitiveArray(children, outputName, tmpCastShadows, true);
				}
				case GetChildrenPropertiesActorNodeInputName.receiveShadow: {
					return updatePrimitiveArray(children, outputName, tmpReceiveShadows, true);
				}
				case GetChildrenPropertiesActorNodeInputName.frustumCulled: {
					return updatePrimitiveArray(children, outputName, tmpFrustumCulleds, true);
				}
				case GetChildrenPropertiesActorNodeInputName.up: {
					return updateCopyableArray(children, outputName, tmpUps, createVector3);
				}
				case GetChildrenPropertiesActorNodeInputName.matrixAutoUpdate: {
					return updatePrimitiveArray(children, outputName, tmpMatrixAutoUpdates, true);
				}
			}
		}
	}
}
