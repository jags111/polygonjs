/**
 * Returns the number of objects in a geometry.
 *
 * @remarks
 * It takes 1 arguments.
 *
 * objectsCount(<input_index_or_node_path\>)
 *
 * - **<input_index_or_node_path\>** returns the number of objects, as a number
 *
 * ## Usage
 *
 * - `objectsCount(0)` - returns the number of objects in the input node.
 * - `objectsCount('/geo/merge1')` - returns the number of objects in the node /geo/merge1
 *
 */
import {BaseMethod} from './_Base';
import {MethodDependency} from '../MethodDependency';
import {GeometryContainer} from '../../containers/Geometry';

export class ObjectsCountExpression extends BaseMethod {
	protected _require_dependency = true;
	// npoints(0)
	// npoints('../REF_bbox')
	static required_arguments() {
		return [['string', 'path to node']];
	}

	find_dependency(index_or_path: number | string): MethodDependency | null {
		return this.create_dependency_from_index_or_path(index_or_path);
	}

	process_arguments(args: any[]): Promise<any> {
		return new Promise(async (resolve, reject) => {
			if (args.length == 1) {
				const index_or_path = args[0];
				let container: GeometryContainer;
				try {
					container = (await this.get_referenced_node_container(index_or_path)) as GeometryContainer;
				} catch (e) {
					reject(e);
					return;
				}

				if (container) {
					const value = container.objectsCount();
					resolve(value);
				}
			} else {
				resolve(0);
			}
		});
	}
}
