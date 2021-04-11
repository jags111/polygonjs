import {TypedNode} from '../_Base';
import {NodeContext} from '../../poly/NodeContext';
import {NodeParamsConfig} from '../utils/params/ParamsConfig';
import {FlagsControllerB} from '../utils/FlagsController';
import {TimelineBuilder} from '../../../core/animation/TimelineBuilder';

const INPUT_GEOMETRY_NAME = 'input animation clip';
const DEFAULT_INPUT_NAMES = [INPUT_GEOMETRY_NAME, INPUT_GEOMETRY_NAME, INPUT_GEOMETRY_NAME, INPUT_GEOMETRY_NAME];

export class TypedAnimNode<K extends NodeParamsConfig> extends TypedNode<NodeContext.ANIM, K> {
	public readonly flags: FlagsControllerB = new FlagsControllerB(this);

	static context(): NodeContext {
		return NodeContext.ANIM;
	}

	static displayedInputNames(): string[] {
		return DEFAULT_INPUT_NAMES;
	}

	initializeBaseNode() {
		this.io.outputs.setHasOneOutput();
	}
	protected setTimelineBuilder(timeline_builder: TimelineBuilder) {
		this._setContainer(timeline_builder);
	}
}

export type BaseAnimNodeType = TypedAnimNode<NodeParamsConfig>;
export class BaseAnimNodeClass extends TypedAnimNode<NodeParamsConfig> {}
