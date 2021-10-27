import {AttribType, ATTRIB_TYPES} from '../../../../src/engine/operations/sop/AttribCast';
import {HierarchyMode, HIERARCHY_MODES} from '../../../../src/engine/operations/sop/Hierarchy';

import {ASSETS_ROOT} from '../../../../src/core/loader/AssetsUtils';
import {BufferAttribute, Uint16BufferAttribute} from 'three/src/core/BufferAttribute';

QUnit.test('attrib cast simple', async (assert) => {
	const geo1 = window.geo1;

	const file1 = geo1.createNode('file');
	const path = 'models/Hundepaar.glb';
	file1.p.url.set(`${ASSETS_ROOT}/${path}`);

	const hierarchy = geo1.createNode('hierarchy');
	hierarchy.setInput(0, file1);
	hierarchy.p.mode.set(HIERARCHY_MODES.indexOf(HierarchyMode.REMOVE_PARENT));

	let container = await hierarchy.compute();
	let core_group = container.coreContent()!;
	let geometry = core_group.objectsWithGeo()[0].geometry;
	let index = geometry.getIndex()!;
	console.log(index.constructor)
	console.log(BufferAttribute)
	assert.ok(index instanceof BufferAttribute);
	assert.notOk(index instanceof Uint16BufferAttribute);

	const attribCast = geo1.createNode('attribCast');
	attribCast.setInput(0, hierarchy);
	attribCast.p.castAttributes.set(0);
	attribCast.p.castIndex.set(1);
	attribCast.p.type.set(ATTRIB_TYPES.indexOf(AttribType.Uint16BufferAttribute));

	container = await attribCast.compute();
	core_group = container.coreContent()!;
	geometry = core_group.objectsWithGeo()[0].geometry;
	index = geometry.getIndex()!;
	console.log(index.constructor)
	console.log(Uint16BufferAttribute)
	assert.ok(index instanceof BufferAttribute);
	assert.ok(index instanceof Uint16BufferAttribute);
});
