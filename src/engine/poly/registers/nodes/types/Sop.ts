export enum SopType {
	ACTOR = 'actor',
	ADD = 'add',
	ATTRIB_ADD_MULT = 'attribAddMult',
	ATTRIB_COPY = 'attribCopy',
	ATTRIB_CREATE = 'attribCreate',
	AXES_HELPER = 'axesHelper',
	BLEND = 'blend',
	BOX = 'box',
	BOX_LINES = 'boxLines',
	//
	CAD_BOOLEAN = 'CADBoolean',
	CAD_BOX = 'CADBox',
	CAD_CIRCLE = 'CADCircle',
	CAD_CIRCLE_2D = 'CADCircle2D',
	CAD_CIRCLE_3_POINTS = 'CADCircle3Points',
	CAD_CONE = 'CADCone',
	CAD_CONVERT_DIMENSION = 'CADConvertDimension',
	CAD_CURVE_2D_TO_SURFACE = 'CADCurve2DToSurface',
	CAD_CURVE_FROM_POINTS = 'CADCurveFromPoints',
	CAD_CURVE_FROM_POINTS_2D = 'CADCurveFromPoints2D',
	CAD_CURVE_TRIM = 'CADCurveTrim',
	CAD_ELLIPSE = 'CADEllipse',
	CAD_ELLIPSE_2D = 'CADEllipse2D',
	CAD_EXPORTER_STEP = 'CADExporterSTEP',
	CAD_EXTRUDE = 'CADExtrude',
	CAD_FILE_STEP = 'CADFileSTEP',
	CAD_FILLET = 'CADFillet',
	CAD_GROUP = 'CADGroup',
	CAD_LOFT = 'CADLoft',
	CAD_MIRROR = 'CADMirror',
	CAD_PIPE = 'CADPipe',
	CAD_POINT = 'CADPoint',
	CAD_POINT_2D = 'CADPoint2D',
	CAD_POINTS_FROM_CURVE = 'CADPointsFromCurve',
	CAD_RECTANGLE = 'CADRectangle',
	CAD_REVOLUTION = 'CADRevolution',
	CAD_SEGMENT = 'CADSegment',
	CAD_SPHERE = 'CADSphere',
	CAD_THICKNESS = 'CADThickness',
	CAD_TORUS = 'CADTorus',
	CAD_TRANSFORM = 'CADTransform',
	CAD_TRANSFORM_2D = 'CADTransform2D',
	CAD_TRIANGULATE = 'CADTriangulate',
	CAD_TUBE = 'CADTube',
	CAD_UNPACK = 'CADUnpack',
	CAD_WEDGE = 'CADWedge',
	//
	CAPSULE = 'capsule',
	CIRCLE = 'circle',
	CIRCLE_3_POINTS = 'circle3Points',
	CLOTH_SOLVER = 'clothSolver',
	CONE = 'cone',
	COPY = 'copy',
	CURVE_FROM_POINTS = 'curveFromPoints',
	//
	CSG_ARC = 'CSGArc',
	CSG_BOOLEAN = 'CSGBoolean',
	CSG_CENTER = 'CSGCenter',
	CSG_CIRCLE = 'CSGCircle',
	CSG_BOX = 'CSGBox',
	CSG_DODECAHEDRON = 'CSGDodecahedron',
	CSG_ELLIPSE = 'CSGEllipse',
	CSG_ELLIPSOID = 'CSGEllipsoid',
	CSG_EXPAND = 'CSGExpand',
	CSG_EXTRUDE_LINEAR = 'CSGExtrudeLinear',
	CSG_EXTRUDE_RECTANGULAR = 'CSGExtrudeRectangular',
	CSG_EXTRUDE_ROTATE = 'CSGExtrudeRotate',
	CSG_HULL = 'CSGHull',
	CSG_LINE = 'CSGLine',
	CSG_MIRROR = 'CSGMirror',
	CSG_OFFSET = 'CSGOffset',
	CSG_POLYGON = 'CSGPolygon',
	CSG_POLYHEDRON = 'CSGPolyhedron',
	CSG_PROJECT = 'CSGProject',
	CSG_RECTANGLE = 'CSGRectangle',
	CSG_SPHERE = 'CSGSphere',
	CSG_STAR = 'CSGStar',
	CSG_TORUS = 'CSGTorus',
	CSG_TRANSFORM_2D = 'CSGTransform2D',
	CSG_TRANSFORM_RESET = 'CSGTransformReset',
	CSG_TRIANGLE = 'CSGTriangle',
	CSG_TRIANGULATE = 'CSGTriangulate',
	CSG_TUBE = 'CSGTube',
	CSG_TUBE_ELLIPTIC = 'CSGTubeElliptic',
	//
	CSS2D_OBJECT = 'CSS2DObject',
	CSS3D_OBJECT = 'CSS3DObject',
	DATA = 'data',
	DATA_URL = 'dataUrl',
	GROUND_PROJECTED_SKYBOX = 'groundProjectedSkybox',
	ICOSAHEDRON = 'icosahedron',
	//
	IFC_FILTER_CATEGORIES = 'IFCFilterCategories',
	//
	INSTANCE = 'instance',
	// JS_SDF = 'JSSDF',
	MAPBOX_TRANSFORM = 'mapboxTransform',
	MATERIAL = 'material',
	NOISE = 'noise',
	OBJECT_BUILDER = 'objectBuilder',
	PARTICLES_SYSTEM_GPU = 'particlesSystemGpu',
	PARTICLES_SYSTEM_GPU_ATTRIBUTES = 'particlesSystemGpuAttributes',
	PARTICLES_SYSTEM_GPU_MATERIAL = 'particlesSystemGpuMaterial',
	PHYSICS_GROUND = 'physicsGround',
	PHYSICS_RBD_ATTRIBUTES = 'physicsRBDAttributes',
	PHYSICS_WORLD = 'physicsWorld',
	PHYSICS_PLAYER = 'physicsPlayer',
	PLANE = 'plane',
	POINT_BUILDER = 'pointBuilder',
	POLAR_TRANSFORM = 'polarTransform',
	POLYWIRE = 'polywire',
	RAY = 'ray',
	RING = 'ring',
	ROUNDED_BOX = 'roundedBox',
	// SDF
	// SDF_BOOLEAN = 'SDFBoolean',
	// SDF_BOX = 'SDFBox',
	SDF_BUILDER = 'SDFBuilder',
	// SDF_EXTRUDE = 'SDFExtrude',
	// SDF_REFINE = 'SDFRefine',
	// SDF_LEVEL_SET = 'SDFLevelSet',
	// SDF_SMOOTH = 'SDFSmooth',
	// SDF_SPHERE = 'SDFSphere',
	// SDF_TRIANGULATE = 'SDFTriangulate',
	// SDF_TUBE = 'SDFTube',
	//
	SHEAR = 'shear',

	SPHERE = 'sphere',
	SUBDIVIDE = 'subdivide',
	SWITCH = 'switch',
	TANGENT = 'tangent',
	//
	// TET = 'tet',
	// TET_BOX = 'tetBox',
	TET_DELETE = 'tetDelete',
	TET_EMBED = 'tetEmbed',
	// TET_GROW = 'tetGrow',
	// TET_MIRROR = 'tetMirror',
	TET_SOFT_BODY_SOLVER = 'tetSoftBodySolver',
	// TET_SPLIT = 'tetSplit',
	TET_TRIANGULATE = 'tetTriangulate',
	// TET_QUALITY = 'tetQuality',
	TETRAHEDRALIZE = 'tetrahedralize',
	TETRAHEDRON = 'tetrahedron',
	//
	TEXT = 'text',
	TORUS = 'torus',
	TORUS_KNOT = 'torusKnot',
	TRANSFORM = 'transform',
	TUBE = 'tube',
	UV_LAYOUT = 'uvLayout',
	UV_TRANSFORM = 'uvTransform',
	UV_UNWRAP = 'uvUnwrap',
}

export enum SopTypeFile {
	FILE_DRC = 'fileDRC',
	FILE_FBX = 'fileFBX',
	FILE_GEOJSON = 'fileGEOJSON',
	FILE_GLTF = 'fileGLTF',
	FILE_IFC = 'fileIFC',
	FILE_JSON = 'fileJSON',
	FILE_MPD = 'fileMPD',
	FILE_OBJ = 'fileOBJ',
	FILE_PDB = 'filePDB',
	FILE_PLY = 'filePLY',
	FILE_STL = 'fileSTL',
	FILE_SVG = 'fileSVG',
	FILE_USDZ = 'fileUSDZ',
}

export enum SopTypeFileMulti {
	FILE_DRC = 'fileMultiDRC',
	FILE_FBX = 'fileMultiFBX',
	FILE_GLTF = 'fileMultiGLTF',
	FILE_JSON = 'fileMultiJSON',
	FILE_MPD = 'fileMultiMPD',
	FILE_OBJ = 'fileMultiOBJ',
	FILE_PDB = 'fileMultiPDB',
	FILE_PLY = 'fileMultiPLY',
	FILE_STL = 'fileMultiSTL',
	FILE_SVG = 'fileMultiSVG',
}

export enum SopExporter {
	EXPORTER_GLTF = 'exporterGLTF',
	EXPORTER_OBJ = 'exporterOBJ',
	EXPORTER_PLY = 'exporterPLY',
	EXPORTER_STL = 'exporterSTL',
	EXPORTER_USDZ = 'exporterUSDZ',
}
