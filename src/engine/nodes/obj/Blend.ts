/**
 * Can blend between 2 other OBJ nodes.
 *
 *
 */
import {TypedObjNode} from './_Base';
import {Mesh} from 'three/src/objects/Mesh';
import {FlagsControllerD} from '../utils/FlagsController';
import {AxesHelper} from 'three/src/helpers/AxesHelper';
import {HierarchyController} from './utils/HierarchyController';
import {Object3D} from 'three/src/core/Object3D';
import {NodeContext} from '../../poly/NodeContext';
import {Vector3} from 'three/src/math/Vector3';
import {Quaternion} from 'three/src/math/Quaternion';

enum BlendMode {
	TOGETHER = 'translate + rotate together',
	SEPARATELY = 'translate + rotate separately',
}
const BLEND_MODES: BlendMode[] = [BlendMode.TOGETHER, BlendMode.SEPARATELY];

import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {TypeAssert} from '../../poly/Assert';
class BlendObjParamConfig extends NodeParamsConfig {
	/** @param object to blend transform from */
	object0 = ParamConfig.NODE_PATH('', {
		nodeSelection: {
			context: NodeContext.OBJ,
		},
	});
	/** @param object to blend transform to */
	object1 = ParamConfig.NODE_PATH('', {
		nodeSelection: {
			context: NodeContext.OBJ,
		},
	});
	/** @param blend mode */
	mode = ParamConfig.INTEGER(BLEND_MODES.indexOf(BlendMode.TOGETHER), {
		menu: {
			entries: BLEND_MODES.map((name, value) => {
				return {name, value};
			}),
		},
	});
	/** @param blend value */
	blend = ParamConfig.FLOAT(0, {
		visibleIf: {mode: BLEND_MODES.indexOf(BlendMode.TOGETHER)},
		range: [0, 1],
		rangeLocked: [false, false],
	});
	/** @param blend translation value */
	blendT = ParamConfig.FLOAT(0, {
		visibleIf: {mode: BLEND_MODES.indexOf(BlendMode.SEPARATELY)},
		range: [0, 1],
		rangeLocked: [false, false],
	});
	/** @param blend rotation value */
	blendR = ParamConfig.FLOAT(0, {
		visibleIf: {mode: BLEND_MODES.indexOf(BlendMode.SEPARATELY)},
		range: [0, 1],
		rangeLocked: [false, false],
	});
	/** @param updateOnRender */
	updateOnRender = ParamConfig.BOOLEAN(1);
}
const ParamsConfig = new BlendObjParamConfig();

export class BlendObjNode extends TypedObjNode<Mesh, BlendObjParamConfig> {
	paramsConfig = ParamsConfig;
	static type() {
		return 'blend';
	}
	readonly hierarchyController: HierarchyController = new HierarchyController(this);
	public readonly flags: FlagsControllerD = new FlagsControllerD(this);
	private _helper = new AxesHelper(1);

	createObject() {
		// use Mesh instead of Group in order to have the onBeforeRender
		const object = new Mesh();
		object.matrixAutoUpdate = false;
		object.onBeforeRender = this._onBeforeRender.bind(this);

		return object;
	}
	initializeNode() {
		this.hierarchyController.initializeNode();
		this.io.inputs.setCount(0);

		this.addPostDirtyHook('blend_on_dirty', () => {
			this.cookController.cookMainWithoutInputs();
		});

		// helper
		this._updateHelperHierarchy();
		this.flags.display.onUpdate(() => {
			this._updateHelperHierarchy();
		});
	}
	private _updateHelperHierarchy() {
		if (this.flags.display.active()) {
			this.object.add(this._helper);
		} else {
			this.object.remove(this._helper);
		}
	}

	private _object0: Object3D | undefined;
	private _object1: Object3D | undefined;
	async cook() {
		const objNode0 = this.pv.object0.nodeWithContext(NodeContext.OBJ, this.states.error);
		const objNode1 = this.pv.object1.nodeWithContext(NodeContext.OBJ, this.states.error);
		if (objNode0 && objNode1) {
			if (objNode0.isDirty()) {
				await objNode0.compute();
			}
			if (objNode1.isDirty()) {
				await objNode1.compute();
			}
			this._object0 = objNode0.object;
			this._object1 = objNode1.object;

			this._computeBlendedMatrix();
		} else {
			this.states.error.set('blend targets not found');
		}

		this.cookController.endCook();
	}
	private _onBeforeRender() {
		if (!this.pv.updateOnRender) {
			return;
		}
		this._computeBlendedMatrix();
	}

	private _computeBlendedMatrix() {
		if (!(this._object0 && this._object1)) {
			return;
		}
		const mode = BLEND_MODES[this.pv.mode];
		switch (mode) {
			case BlendMode.TOGETHER:
				return this._blendTogether(this._object0, this._object1);
			case BlendMode.SEPARATELY:
				return this._blendSeparately(this._object0, this._object1);
		}
		TypeAssert.unreachable(mode);
	}
	private _t0 = new Vector3();
	private _q0 = new Quaternion();
	private _s0 = new Vector3();
	private _t1 = new Vector3();
	private _q1 = new Quaternion();
	private _s1 = new Vector3();
	private _blendTogether(object0: Object3D, object1: Object3D) {
		this._decomposeMatrices(object0, object1);

		this._object.position.copy(this._t0).lerp(this._t1, this.pv.blend);
		this._object.quaternion.copy(this._q0).slerp(this._q1, this.pv.blend);
		if (!this._object.matrixAutoUpdate) {
			this._object.updateMatrix();
		}
	}
	private _blendSeparately(object0: Object3D, object1: Object3D) {
		this._decomposeMatrices(object0, object1);
		this._object.position.copy(this._t0).lerp(this._t1, this.pv.blendT);
		this._object.quaternion.copy(this._q0).slerp(this._q1, this.pv.blendR);
		if (!this._object.matrixAutoUpdate) {
			this._object.updateMatrix();
		}
	}
	private _decomposeMatrices(object0: Object3D, object1: Object3D) {
		this._updateMatrix(object0);
		this._updateMatrix(object1);

		object0.matrixWorld.decompose(this._t0, this._q0, this._s0);
		object1.matrixWorld.decompose(this._t1, this._q1, this._s1);
	}
	private _updateMatrix(object: Object3D) {
		if (!object.matrixAutoUpdate) {
			object.updateMatrix();
			object.updateMatrixWorld(true);
			object.updateWorldMatrix(true, true);
		}
	}
}
