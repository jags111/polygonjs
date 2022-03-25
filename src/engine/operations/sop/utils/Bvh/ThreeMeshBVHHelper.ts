import {Object3D} from 'three/src/core/Object3D';
import {Mesh} from 'three/src/objects/Mesh';
import {MeshBVH, acceleratedRaycast, BufferGeometryWithBVH} from './three-mesh-bvh';

export class ThreeMeshBVHHelper {
	static assignBVH(mesh: Mesh, bvh?: MeshBVH) {
		mesh.raycast = acceleratedRaycast;
		bvh = bvh || new MeshBVH(mesh.geometry, {verbose: false});
		(mesh.geometry as BufferGeometryWithBVH).boundsTree = bvh;
		console.log('assigned', mesh, mesh.geometry, (mesh.geometry as BufferGeometryWithBVH).boundsTree);
	}
	static copyBVH(meshDest: Mesh, meshSrc: Object3D) {
		const existingBVH = (meshSrc as Mesh).geometry?.boundsTree;
		if (existingBVH) {
			meshDest.raycast = acceleratedRaycast;
			this.assignBVH(meshDest, existingBVH);
		}
	}
}
