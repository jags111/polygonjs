import {Vector3, BufferAttribute} from 'three';
import {ObjectGeometryMap, CoreObjectType, ObjectContent} from '../../ObjectContent';
import {CorePoint} from '../../entities/point/CorePoint';
import {PointAttributesDict} from '../../entities/point/Common';
import {QuadObject} from './QuadObject';
import {Attribute} from '../../Attribute';
import {attributeNumericValues, AttributeNumericValuesOptions} from '../../entities/utils/Common';
import {NumericAttribValue} from '../../../../types/GlobalTypes';
import {pointsCountFromObject} from '../../entities/point/CorePointUtils';
import type {CoreVertex} from '../../entities/vertex/CoreVertex';
import {QuadVertex} from './QuadVertex';
import {QuadGeometry} from './QuadGeometry';
const target: AttributeNumericValuesOptions = {
	attributeAdded: false,
	values: [],
};

export class QuadPoint extends CorePoint<CoreObjectType.QUAD> {
	protected _geometry?: ObjectGeometryMap[CoreObjectType.QUAD];
	protected override _object: QuadObject;
	constructor(object: QuadObject, index: number) {
		super(object, index);
		this._object = object;
		this._updateGeometry();
	}
	override object() {
		return this._object;
	}
	override setIndex(index: number, object?: QuadObject) {
		this._index = index;
		if (object) {
			this._object = object;
			this._updateGeometry();
		}
		return this;
	}
	private _updateGeometry() {
		const geometry = this._object.geometry;
		if (geometry) {
			this._geometry = geometry;
		}
	}
	geometry() {
		return this._geometry;
	}
	static override addAttribute<T extends CoreObjectType>(
		object: ObjectContent<T>,
		attribName: string,
		attribute: BufferAttribute
	) {
		const attributes = this.attributes(object);
		if (!attributes) {
			return;
		}
		attributes[attribName] = attribute;
	}
	static override addNumericAttribute<T extends CoreObjectType>(
		object: ObjectContent<T>,
		attribName: string,
		size: number = 1,
		defaultValue: NumericAttribValue = 0
	) {
		const geometry = (object as any as QuadObject).geometry;
		if (!geometry) {
			return;
		}
		attributeNumericValues(object, pointsCountFromObject, size, defaultValue, target);

		if (target.attributeAdded) {
			// if (markedAsInstance(geometry)) {
			// 	const valuesAsTypedArray = new Float32Array(target.values);
			// 	geometry.setAttribute(attribName.trim(), new InstancedBufferAttribute(valuesAsTypedArray, size));
			// } else {
			geometry.setAttribute(attribName.trim(), new BufferAttribute(new Float32Array(target.values), size));
			// }
		} else {
			console.warn(defaultValue);
			throw `QuadPoint.addNumericAttrib error: no other default value allowed for now (default given: ${defaultValue})`;
		}
	}
	static override attributes<T extends CoreObjectType>(object: ObjectContent<T>): PointAttributesDict | undefined {
		const geometry = (object as any as QuadObject).geometry;
		if (!geometry) {
			return;
		}
		return geometry.attributes;
	}
	static override entitiesCount<T extends CoreObjectType>(object: ObjectContent<T>): number {
		const positionAttribute = this.attribute(object, Attribute.POSITION);
		if (!positionAttribute) {
			return 0;
		}
		return positionAttribute.count;
	}
	override position(target: Vector3): Vector3 {
		if (!this._geometry) {
			return target;
		}
		const {array} = this.attribute(Attribute.POSITION) as BufferAttribute;
		return target.fromArray(array, this._index * 3);
	}
	override normal(target: Vector3) {
		if (!this._geometry) {
			return target;
		}
		const {array} = this.attribute(Attribute.NORMAL) as BufferAttribute;
		return target.fromArray(array, this._index * 3);
	}
	static override computeNormals<T extends CoreObjectType>(object: ObjectContent<T>) {
		console.warn('QuadPoint.computeNormals not implemented');
	}

	//
	//
	//
	//
	//
	static override userDataAttribs<T extends CoreObjectType>(object: ObjectContent<T>) {
		return {};
	}
	static override setIndexedAttribute<T extends CoreObjectType>(
		object: ObjectContent<T>,
		attribName: string,
		values: string[],
		indices: number[]
	) {}
	static override attribValueIndex<T extends CoreObjectType>(
		object: ObjectContent<T>,
		index: number,
		attribName: string
	): number {
		return -1;
	}
	//
	//
	//
	//
	//

	//
	//
	// RELATED ENTITIES
	//
	//
	override relatedVertices<T extends CoreObjectType>(): CoreVertex<T>[] {
		if (!this._object) {
			return [];
		}
		const geometry = (this._object as any as QuadObject).geometry as QuadGeometry | undefined;
		if (!geometry) {
			return [];
		}
		const indexArray = geometry.index;
		const vertices: CoreVertex<T>[] = [];
		let i = 0;
		for (const indexValue of indexArray) {
			if (indexValue == this._index) {
				const vertex = new QuadVertex(this._object as any as QuadObject, i) as CoreVertex<T>;
				vertices.push(vertex);
			}
			i++;
		}
		return vertices;
	}
}
