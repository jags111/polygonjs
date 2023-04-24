import {BufferAttribute, BufferGeometry} from 'three';

export function bufferGeometryMaxGroupEnd(geometry: BufferGeometry): number {
	const groups = geometry.groups;
	let max = -1;
	for (const group of groups) {
		const groupEnd = group.start + group.count;
		if (groupEnd > max) {
			max = groupEnd;
		}
	}
	return max;
}
export function truncateBufferGeometry(geometry: BufferGeometry, maxCount: number): void {
	const attributeNames = Object.keys(geometry.attributes);

	for (const attributeName of attributeNames) {
		const attribute = geometry.getAttribute(attributeName) as BufferAttribute;
		const originalArray = attribute.array as number[];
		const itemSize = attribute.itemSize;
		const expectedArraySize = maxCount * itemSize;
		const newArray: number[] = originalArray.slice(0, expectedArraySize); //new Array(expectedArraySize);
		// for(let i=0;i<expectedArraySize;i++){
		// 	newArray[i]=originalArray[i];
		// }
		geometry.setAttribute(attributeName, new BufferAttribute(new Float32Array(newArray), itemSize));
	}
}
