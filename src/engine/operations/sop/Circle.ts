import {BaseSopOperation} from './_Base';
import {DefaultOperationParams} from '../_Base';
import {CoreGroup} from '../../../core/geometry/Group';
import {Vector3} from 'three/src/math/Vector3';
import {CoreGeometryUtilCircle} from '../../../core/geometry/util/Circle';
import {ObjectType} from '../../../core/geometry/Constant';
import {CoreTransform} from '../../../core/Transform';
import {CircleBufferGeometry} from 'three/src/geometries/CircleGeometry';
import {isBooleanTrue} from '../../../core/BooleanValue';

interface CircleSopParams extends DefaultOperationParams {
	radius: number;
	segments: number;
	open: boolean;
	arcAngle: number;
	direction: Vector3;
	connectLastPoint: boolean;
}
const DEFAULT_UP = new Vector3(0, 0, 1);

export class CircleSopOperation extends BaseSopOperation {
	static readonly DEFAULT_PARAMS: CircleSopParams = {
		radius: 1,
		segments: 12,
		open: true,
		arcAngle: 360,
		direction: new Vector3(0, 1, 0),
		connectLastPoint: true,
	};
	static type(): Readonly<'circle'> {
		return 'circle';
	}

	private _core_transform = new CoreTransform();
	cook(input_contents: CoreGroup[], params: CircleSopParams) {
		if (isBooleanTrue(params.open)) {
			return this._createCircle(params);
		} else {
			return this._createDisk(params);
		}
	}
	private _createCircle(params: CircleSopParams) {
		const geometry = CoreGeometryUtilCircle.create(params);

		this._core_transform.rotateGeometry(geometry, DEFAULT_UP, params.direction);

		return this.createCoreGroupFromGeometry(geometry, ObjectType.LINE_SEGMENTS);
	}

	private _createDisk(params: CircleSopParams) {
		const geometry = new CircleBufferGeometry(params.radius, params.segments);

		this._core_transform.rotateGeometry(geometry, DEFAULT_UP, params.direction);

		return this.createCoreGroupFromGeometry(geometry);
	}
}
