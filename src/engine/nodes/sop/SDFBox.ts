/**
 * Creates an SDF box.
 *
 *
 */

import {SDFSopNode} from './_BaseSDF';
import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {SopType} from '../../poly/registers/nodes/types/Sop';
import {step} from '../../../core/geometry/cad/CadConstant';
import {SDFLoader} from '../../../core/geometry/sdf/SDFLoader';

class SDFBoxSopParamsConfig extends NodeParamsConfig {
	/** @param size */
	size = ParamConfig.FLOAT(1, {
		range: [0, 10],
		rangeLocked: [true, false],
		step,
	});
	/** @param sizes */
	sizes = ParamConfig.VECTOR3([1, 1, 1]);
	/** @param center */
	center = ParamConfig.VECTOR3([0, 0, 0]);
}
const ParamsConfig = new SDFBoxSopParamsConfig();

export class SDFBoxSopNode extends SDFSopNode<SDFBoxSopParamsConfig> {
	override readonly paramsConfig = ParamsConfig;
	static override type() {
		return SopType.SDF_BOX;
	}

	override async cook() {
		const manifold = await SDFLoader.core();
		const geometry = manifold.cube(
			[this.pv.size * this.pv.sizes.x, this.pv.size * this.pv.sizes.y, this.pv.size * this.pv.sizes.z],
			true
		);

		this.setSDFGeometry(geometry);
	}
}
