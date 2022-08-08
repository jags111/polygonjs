import {BaseSopOperation} from './_Base';
import {InputCloneMode} from '../../poly/InputCloneMode';
import {CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer';
import {CoreString} from '../../../core/String';
import {CoreGroup} from '../../../core/geometry/Group';
import {CoreType} from '../../../core/Type';
import {isBooleanTrue} from '../../../core/BooleanValue';
import {DefaultOperationParams} from '../../../core/operations/_Base';

interface CSS2DObjectParams {
	id: string;
	className: string;
	html: string;
}
const ATTRIBUTE_NAME = {
	id: 'id',
	className: 'class',
	html: 'html',
};

interface CSS2DObjectSopParams extends DefaultOperationParams {
	useIdAttrib: boolean;
	id: string;
	useClassAttrib: boolean;
	className: string;
	useHTMLAttrib: boolean;
	html: string;
	copyAttributes: boolean;
	attributesToCopy: string;
}

export class CSS2DObjectSopOperation extends BaseSopOperation {
	static override readonly DEFAULT_PARAMS: CSS2DObjectSopParams = {
		useIdAttrib: false,
		id: 'myCSSObject',
		useClassAttrib: false,
		className: 'CSS2DObject',
		useHTMLAttrib: false,
		html: '<div>default html</div>',
		copyAttributes: false,
		attributesToCopy: '',
	};
	static override readonly INPUT_CLONED_STATE = InputCloneMode.NEVER;
	static override type(): Readonly<'CSS2DObject'> {
		return 'CSS2DObject';
	}

	override cook(input_contents: CoreGroup[], params: CSS2DObjectSopParams) {
		const core_group = input_contents[0];
		if (core_group) {
			const objects = this._create_objects_from_input_points(core_group, params);
			return this.createCoreGroupFromObjects(objects);
		} else {
			const object = this._create_object_from_scratch(params);
			return this.createCoreGroupFromObjects([object]);
		}
	}
	private _create_objects_from_input_points(core_group: CoreGroup, params: CSS2DObjectSopParams) {
		const points = core_group.points();
		const objects: CSS2DObject[] = [];
		for (let point of points) {
			const id = isBooleanTrue(params.useIdAttrib) ? (point.attribValue(ATTRIBUTE_NAME.id) as string) : params.id;
			const className = isBooleanTrue(params.useClassAttrib)
				? (point.attribValue(ATTRIBUTE_NAME.className) as string)
				: params.className;
			const html = isBooleanTrue(params.useHTMLAttrib)
				? (point.attribValue(ATTRIBUTE_NAME.html) as string)
				: params.html;

			const object = CSS2DObjectSopOperation.create_css_object({
				id,
				className,
				html,
			});
			const element = object.element;
			if (isBooleanTrue(params.copyAttributes)) {
				const attrib_names = CoreString.attribNames(params.attributesToCopy);
				for (let attrib_name of attrib_names) {
					const attrib_value = point.attribValue(attrib_name);
					if (CoreType.isString(attrib_value)) {
						element.setAttribute(attrib_name, attrib_value);
					} else {
						if (CoreType.isNumber(attrib_value)) {
							element.setAttribute(attrib_name, `${attrib_value}`);
						}
					}
				}
			}

			object.position.copy(point.position());
			object.updateMatrix();

			objects.push(object);
		}
		return objects;
	}

	private _create_object_from_scratch(params: CSS2DObjectSopParams) {
		const object = CSS2DObjectSopOperation.create_css_object({
			id: params.id,
			className: params.className,
			html: params.html,
		});

		return object;
	}

	private static create_css_object(params: CSS2DObjectParams) {
		const element = document.createElement('div');
		element.id = params.id;
		element.className = params.className;
		element.innerHTML = params.html;

		const object = new CSS2DObject(element);

		object.matrixAutoUpdate = false;

		return object;
	}
}
