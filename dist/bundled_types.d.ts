
/**
 * Implementation of a quaternion. This is used for rotating things without incurring in the dreaded gimbal lock issue, amongst other advantages.
 *
 * @example
 * var quaternion = new THREE.Quaternion();
 * quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
 * var vector = new THREE.Vector3( 1, 0, 0 );
 * vector.applyQuaternion( quaternion );
 */
export class Quaternion {

	/**
	 * @param x x coordinate
	 * @param y y coordinate
	 * @param z z coordinate
	 * @param w w coordinate
	 */
	constructor( x?: number, y?: number, z?: number, w?: number );

	x: number;
	y: number;
	z: number;
	w: number;
	readonly isQuaternion: true;

	/**
	 * Sets values of this quaternion.
	 */
	set( x: number, y: number, z: number, w: number ): Quaternion;

	/**
	 * Clones this quaternion.
	 */
	clone(): this;

	/**
	 * Copies values of q to this quaternion.
	 */
	copy( q: Quaternion ): this;

	/**
	 * Sets this quaternion from rotation specified by Euler angles.
	 */
	setFromEuler( euler: Euler ): Quaternion;

	/**
	 * Sets this quaternion from rotation specified by axis and angle.
	 * Adapted from http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm.
	 * Axis have to be normalized, angle is in radians.
	 */
	setFromAxisAngle( axis: Vector3, angle: number ): Quaternion;

	/**
	 * Sets this quaternion from rotation component of m. Adapted from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm.
	 */
	setFromRotationMatrix( m: Matrix4 ): Quaternion;
	setFromUnitVectors( vFrom: Vector3, vTo: Vector3 ): Quaternion;
	angleTo( q: Quaternion ): number;
	rotateTowards( q: Quaternion, step: number ): Quaternion;

	/**
	 * Inverts this quaternion.
	 */
	inverse(): Quaternion;

	conjugate(): Quaternion;
	dot( v: Quaternion ): number;
	lengthSq(): number;

	/**
	 * Computes length of this quaternion.
	 */
	length(): number;

	/**
	 * Normalizes this quaternion.
	 */
	normalize(): Quaternion;

	/**
	 * Multiplies this quaternion by b.
	 */
	multiply( q: Quaternion ): Quaternion;
	premultiply( q: Quaternion ): Quaternion;

	/**
	 * Sets this quaternion to a x b
	 * Adapted from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm.
	 */
	multiplyQuaternions( a: Quaternion, b: Quaternion ): Quaternion;

	slerp( qb: Quaternion, t: number ): Quaternion;
	equals( v: Quaternion ): boolean;

	/**
	 * Sets this quaternion's x, y, z and w value from the provided array.
	 * @param array the source array.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray( array: number[], offset?: number ): this;

	/**
	 * Sets this quaternion's x, y, z and w value from the provided array-like.
	 * @param array the source array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray( array: ArrayLike<number>, offset?: number ): this;

	/**
	 * Returns an array [x, y, z, w], or copies x, y, z and w into the provided array.
	 * @param array (optional) array to store the quaternion to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray( array?: number[], offset?: number ): number[];

	/**
	 * Copies x, y, z and w into the provided array-like.
	 * @param array array-like to store the quaternion to.
	 * @param offset (optional) optional offset into the array.
	 * @return The provided array-like.
	 */
	toArray( array: ArrayLike<number>, offset?: number ): ArrayLike<number>;

	_onChange( callback: Function ): Quaternion;
	_onChangeCallback: Function;

	/**
	 * Adapted from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/.
	 */
	static slerp(
		qa: Quaternion,
		qb: Quaternion,
		qm: Quaternion,
		t: number
	): Quaternion;

	static slerpFlat(
		dst: number[],
		dstOffset: number,
		src0: number[],
		srcOffset: number,
		src1: number[],
		stcOffset1: number,
		t: number
	): Quaternion;

	/**
	 * @deprecated Use {@link Vector#applyQuaternion vector.applyQuaternion( quaternion )} instead.
	 */
	multiplyVector3( v: any ): any;

}


export class Euler {

	constructor( x?: number, y?: number, z?: number, order?: string );

	x: number;
	y: number;
	z: number;
	order: string;
	readonly isEuler: true;

	_onChangeCallback: Function;

	set( x: number, y: number, z: number, order?: string ): Euler;
	clone(): this;
	copy( euler: Euler ): this;
	setFromRotationMatrix( m: Matrix4, order?: string ): Euler;
	setFromQuaternion( q: Quaternion, order?: string ): Euler;
	setFromVector3( v: Vector3, order?: string ): Euler;
	reorder( newOrder: string ): Euler;
	equals( euler: Euler ): boolean;
	fromArray( xyzo: any[] ): Euler;
	toArray( array?: number[], offset?: number ): number[];
	toVector3( optionalResult?: Vector3 ): Vector3;
	_onChange( callback: Function ): this;

	static RotationOrders: string[];
	static DefaultOrder: string;

}


/**
 * ( interface Matrix&lt;T&gt; )
 */
export interface Matrix {
	/**
	 * Array with matrix values.
	 */
	elements: number[];

	/**
	 * identity():T;
	 */
	identity(): Matrix;

	/**
	 * copy(m:T):T;
	 */
	copy( m: this ): this;

	/**
	 * multiplyScalar(s:number):T;
	 */
	multiplyScalar( s: number ): Matrix;

	determinant(): number;

	/**
	 * getInverse(matrix:T):T;
	 */
	getInverse( matrix: Matrix ): Matrix;

	/**
	 * transpose():T;
	 */
	transpose(): Matrix;

	/**
	 * clone():T;
	 */
	clone(): this;
}

/**
 * ( class Matrix3 implements Matrix&lt;Matrix3&gt; )
 */
export class Matrix3 implements Matrix {

	/**
	 * Creates an identity matrix.
	 */
	constructor();

	/**
	 * Array with matrix values.
	 */
	elements: number[];

	set(
		n11: number,
		n12: number,
		n13: number,
		n21: number,
		n22: number,
		n23: number,
		n31: number,
		n32: number,
		n33: number
	): Matrix3;
	identity(): Matrix3;
	clone(): this;
	copy( m: Matrix3 ): this;
	extractBasis( xAxis: Vector3, yAxis: Vector3, zAxis: Vector3 ): Matrix3;
	setFromMatrix4( m: Matrix4 ): Matrix3;
	multiplyScalar( s: number ): Matrix3;
	determinant(): number;
	getInverse( matrix: Matrix3, throwOnDegenerate?: boolean ): Matrix3;

	/**
	 * Transposes this matrix in place.
	 */
	transpose(): Matrix3;
	getNormalMatrix( matrix4: Matrix4 ): Matrix3;

	/**
	 * Transposes this matrix into the supplied array r, and returns itself.
	 */
	transposeIntoArray( r: number[] ): Matrix3;

	setUvTransform( tx: number, ty: number, sx: number, sy: number, rotation: number, cx: number, cy: number ): Matrix3;

	scale( sx: number, sy: number ): Matrix3;

	rotate( theta: number ): Matrix3;

	translate( tx: number, ty: number ): Matrix3;

	equals( matrix: Matrix3 ): boolean;

	/**
	 * Sets the values of this matrix from the provided array.
	 * @param array the source array.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray( array: number[], offset?: number ): Matrix3;

	/**
	 * Sets the values of this matrix from the provided array-like.
	 * @param array the source array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray( array: ArrayLike<number>, offset?: number ): Matrix3;

	/**
	 * Returns an array with the values of this matrix, or copies them into the provided array.
	 * @param array (optional) array to store the matrix to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray( array?: number[], offset?: number ): number[];

	/**
	 * Copies he values of this matrix into the provided array-like.
	 * @param array array-like to store the matrix to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray( array?: ArrayLike<number>, offset?: number ): ArrayLike<number>;

	/**
	 * Multiplies this matrix by m.
	 */
	multiply( m: Matrix3 ): Matrix3;

	premultiply( m: Matrix3 ): Matrix3;

	/**
	 * Sets this matrix to a x b.
	 */
	multiplyMatrices( a: Matrix3, b: Matrix3 ): Matrix3;

	/**
	 * @deprecated Use {@link Vector3.applyMatrix3 vector.applyMatrix3( matrix )} instead.
	 */
	multiplyVector3( vector: Vector3 ): any;

	/**
	 * @deprecated This method has been removed completely.
	 */
	multiplyVector3Array( a: any ): any;
	getInverse( matrix: Matrix4, throwOnDegenerate?: boolean ): Matrix3;

	/**
	 * @deprecated Use {@link Matrix3#toArray .toArray()} instead.
	 */
	flattenToArrayOffset( array: number[], offset: number ): number[];

}


export class Spherical {

	constructor( radius?: number, phi?: number, theta?: number );

	radius: number;
	phi: number;
	theta: number;

	set( radius: number, phi: number, theta: number ): this;
	clone(): this;
	copy( other: Spherical ): this;
	makeSafe(): this;
	setFromVector3( v: Vector3 ): this;
	setFromCartesianCoords( x: number, y: number, z: number ): this;

}


export class Cylindrical {

	constructor( radius?: number, theta?: number, y?: number );

	radius: number;
	theta: number;
	y: number;

	clone(): this;
	copy( other: Cylindrical ): this;
	set( radius: number, theta: number, y: number ): this;
	setFromVector3( vec3: Vector3 ): this;
	setFromCartesianCoords( x: number, y: number, z: number ): this;

}

export const REVISION: string;

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.button
export enum MOUSE {
	LEFT,
	MIDDLE,
	RIGHT,
	ROTATE,
	DOLLY,
	PAN,
}

export enum TOUCH {
	ROTATE,
	PAN,
	DOLLY_PAN,
	DOLLY_ROTATE,
}

// GL STATE CONSTANTS
export enum CullFace {}
export const CullFaceNone: CullFace;
export const CullFaceBack: CullFace;
export const CullFaceFront: CullFace;
export const CullFaceFrontBack: CullFace;

export enum FrontFaceDirection {}
export const FrontFaceDirectionCW: FrontFaceDirection;
export const FrontFaceDirectionCCW: FrontFaceDirection;

// Shadowing Type
export enum ShadowMapType {}
export const BasicShadowMap: ShadowMapType;
export const PCFShadowMap: ShadowMapType;
export const PCFSoftShadowMap: ShadowMapType;
export const VSMShadowMap: ShadowMapType;

// MATERIAL CONSTANTS

// side
export enum Side {}
export const FrontSide: Side;
export const BackSide: Side;
export const DoubleSide: Side;

// shading
export enum Shading {}
export const FlatShading: Shading;
export const SmoothShading: Shading;

// blending modes
export enum Blending {}
export const NoBlending: Blending;
export const NormalBlending: Blending;
export const AdditiveBlending: Blending;
export const SubtractiveBlending: Blending;
export const MultiplyBlending: Blending;
export const CustomBlending: Blending;

// custom blending equations
// (numbers start from 100 not to clash with other
// mappings to OpenGL constants defined in Texture.js)
export enum BlendingEquation {}
export const AddEquation: BlendingEquation;
export const SubtractEquation: BlendingEquation;
export const ReverseSubtractEquation: BlendingEquation;
export const MinEquation: BlendingEquation;
export const MaxEquation: BlendingEquation;

// custom blending destination factors
export enum BlendingDstFactor {}
export const ZeroFactor: BlendingDstFactor;
export const OneFactor: BlendingDstFactor;
export const SrcColorFactor: BlendingDstFactor;
export const OneMinusSrcColorFactor: BlendingDstFactor;
export const SrcAlphaFactor: BlendingDstFactor;
export const OneMinusSrcAlphaFactor: BlendingDstFactor;
export const DstAlphaFactor: BlendingDstFactor;
export const OneMinusDstAlphaFactor: BlendingDstFactor;
export const DstColorFactor: BlendingDstFactor;
export const OneMinusDstColorFactor: BlendingDstFactor;

// custom blending src factors
export enum BlendingSrcFactor {}
export const SrcAlphaSaturateFactor: BlendingSrcFactor;

// depth modes
export enum DepthModes {}
export const NeverDepth: DepthModes;
export const AlwaysDepth: DepthModes;
export const LessDepth: DepthModes;
export const LessEqualDepth: DepthModes;
export const EqualDepth: DepthModes;
export const GreaterEqualDepth: DepthModes;
export const GreaterDepth: DepthModes;
export const NotEqualDepth: DepthModes;

// TEXTURE CONSTANTS
// Operations
export enum Combine {}
export const MultiplyOperation: Combine;
export const MixOperation: Combine;
export const AddOperation: Combine;

// Tone Mapping modes
export enum ToneMapping {}
export const NoToneMapping: ToneMapping;
export const LinearToneMapping: ToneMapping;
export const ReinhardToneMapping: ToneMapping;
export const Uncharted2ToneMapping: ToneMapping;
export const CineonToneMapping: ToneMapping;
export const ACESFilmicToneMapping: ToneMapping;

// Mapping modes
export enum Mapping {}
export const UVMapping: Mapping;
export const CubeReflectionMapping: Mapping;
export const CubeRefractionMapping: Mapping;
export const EquirectangularReflectionMapping: Mapping;
export const EquirectangularRefractionMapping: Mapping;
export const SphericalReflectionMapping: Mapping;
export const CubeUVReflectionMapping: Mapping;
export const CubeUVRefractionMapping: Mapping;

// Wrapping modes
export enum Wrapping {}
export const RepeatWrapping: Wrapping;
export const ClampToEdgeWrapping: Wrapping;
export const MirroredRepeatWrapping: Wrapping;

// Filters
export enum TextureFilter {}
export const NearestFilter: TextureFilter;
export const NearestMipmapNearestFilter: TextureFilter;
export const NearestMipMapNearestFilter: TextureFilter;
export const NearestMipmapLinearFilter: TextureFilter;
export const NearestMipMapLinearFilter: TextureFilter;
export const LinearFilter: TextureFilter;
export const LinearMipmapNearestFilter: TextureFilter;
export const LinearMipMapNearestFilter: TextureFilter;
export const LinearMipmapLinearFilter: TextureFilter;
export const LinearMipMapLinearFilter: TextureFilter;

// Data types
export enum TextureDataType {}
export const UnsignedByteType: TextureDataType;
export const ByteType: TextureDataType;
export const ShortType: TextureDataType;
export const UnsignedShortType: TextureDataType;
export const IntType: TextureDataType;
export const UnsignedIntType: TextureDataType;
export const FloatType: TextureDataType;
export const HalfFloatType: TextureDataType;
export const UnsignedShort4444Type: TextureDataType;
export const UnsignedShort5551Type: TextureDataType;
export const UnsignedShort565Type: TextureDataType;
export const UnsignedInt248Type: TextureDataType;

// Pixel formats
export enum PixelFormat {}
export const AlphaFormat: PixelFormat;
export const RGBFormat: PixelFormat;
export const RGBAFormat: PixelFormat;
export const LuminanceFormat: PixelFormat;
export const LuminanceAlphaFormat: PixelFormat;
export const RGBEFormat: PixelFormat;
export const DepthFormat: PixelFormat;
export const DepthStencilFormat: PixelFormat;
export const RedFormat: PixelFormat;
export const RedIntegerFormat: PixelFormat;
export const RGFormat: PixelFormat;
export const RGIntegerFormat: PixelFormat;
export const RGBIntegerFormat: PixelFormat;
export const RGBAIntegerFormat: PixelFormat;

// Internal Pixel Formats
export type PixelFormatGPU =
	'ALPHA'
	| 'RGB'
	| 'RGBA'
	| 'LUMINANCE'
	| 'LUMINANCE_ALPHA'
	| 'RED_INTEGER'
	| 'R8'
	| 'R8_SNORM'
	| 'R8I'
	| 'R8UI'
	| 'R16I'
	| 'R16UI'
	| 'R16F'
	| 'R32I'
	| 'R32UI'
	| 'R32F'
	| 'RG8'
	| 'RG8_SNORM'
	| 'RG8I'
	| 'RG8UI'
	| 'RG16I'
	| 'RG16UI'
	| 'RG16F'
	| 'RG32I'
	| 'RG32UI'
	| 'RG32F'
	| 'RGB565'
	| 'RGB8'
	| 'RGB8_SNORM'
	| 'RGB8I'
	| 'RGB8UI'
	| 'RGB16I'
	| 'RGB16UI'
	| 'RGB16F'
	| 'RGB32I'
	| 'RGB32UI'
	| 'RGB32F'
	| 'RGB9_E5'
	| 'SRGB8'
	| 'R11F_G11F_B10F'
	| 'RGBA4'
	| 'RGBA8'
	| 'RGBA8_SNORM'
	| 'RGBA8I'
	| 'RGBA8UI'
	| 'RGBA16I'
	| 'RGBA16UI'
	| 'RGBA16F'
	| 'RGBA32I'
	| 'RGBA32UI'
	| 'RGBA32F'
	| 'RGB5_A1'
	| 'RGB10_A2'
	| 'RGB10_A2UI'
	| 'SRGB8_ALPHA8'
	| 'DEPTH_COMPONENT16'
	| 'DEPTH_COMPONENT24'
	| 'DEPTH_COMPONENT32F'
	| 'DEPTH24_STENCIL8'
	| 'DEPTH32F_STENCIL8';

// Compressed texture formats
// DDS / ST3C Compressed texture formats
export enum CompressedPixelFormat {}
export const RGB_S3TC_DXT1_Format: CompressedPixelFormat;
export const RGBA_S3TC_DXT1_Format: CompressedPixelFormat;
export const RGBA_S3TC_DXT3_Format: CompressedPixelFormat;
export const RGBA_S3TC_DXT5_Format: CompressedPixelFormat;

// PVRTC compressed './texture formats
export const RGB_PVRTC_4BPPV1_Format: CompressedPixelFormat;
export const RGB_PVRTC_2BPPV1_Format: CompressedPixelFormat;
export const RGBA_PVRTC_4BPPV1_Format: CompressedPixelFormat;
export const RGBA_PVRTC_2BPPV1_Format: CompressedPixelFormat;

// ETC compressed texture formats
export const RGB_ETC1_Format: CompressedPixelFormat;
export const RGB_ETC2_Format: CompressedPixelFormat;
export const RGBA_ETC2_EAC_Format: CompressedPixelFormat;

// ASTC compressed texture formats
export const RGBA_ASTC_4x4_Format: CompressedPixelFormat;
export const RGBA_ASTC_5x4_Format: CompressedPixelFormat;
export const RGBA_ASTC_5x5_Format: CompressedPixelFormat;
export const RGBA_ASTC_6x5_Format: CompressedPixelFormat;
export const RGBA_ASTC_6x6_Format: CompressedPixelFormat;
export const RGBA_ASTC_8x5_Format: CompressedPixelFormat;
export const RGBA_ASTC_8x6_Format: CompressedPixelFormat;
export const RGBA_ASTC_8x8_Format: CompressedPixelFormat;
export const RGBA_ASTC_10x5_Format: CompressedPixelFormat;
export const RGBA_ASTC_10x6_Format: CompressedPixelFormat;
export const RGBA_ASTC_10x8_Format: CompressedPixelFormat;
export const RGBA_ASTC_10x10_Format: CompressedPixelFormat;
export const RGBA_ASTC_12x10_Format: CompressedPixelFormat;
export const RGBA_ASTC_12x12_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_4x4_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_5x4_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_5x5_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_6x5_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_6x6_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_8x5_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_8x6_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_8x8_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_10x5_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_10x6_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_10x8_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_10x10_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_12x10_Format: CompressedPixelFormat;
export const SRGB8_ALPHA8_ASTC_12x12_Format: CompressedPixelFormat;

// BPTC compressed texture formats
export const RGBA_BPTC_Format: CompressedPixelFormat;

// Loop styles for AnimationAction
export enum AnimationActionLoopStyles {}
export const LoopOnce: AnimationActionLoopStyles;
export const LoopRepeat: AnimationActionLoopStyles;
export const LoopPingPong: AnimationActionLoopStyles;

// Interpolation
export enum InterpolationModes {}
export const InterpolateDiscrete: InterpolationModes;
export const InterpolateLinear: InterpolationModes;
export const InterpolateSmooth: InterpolationModes;

// Interpolant ending modes
export enum InterpolationEndingModes {}
export const ZeroCurvatureEnding: InterpolationEndingModes;
export const ZeroSlopeEnding: InterpolationEndingModes;
export const WrapAroundEnding: InterpolationEndingModes;

// Triangle Draw modes
export enum TrianglesDrawModes {}
export const TrianglesDrawMode: TrianglesDrawModes;
export const TriangleStripDrawMode: TrianglesDrawModes;
export const TriangleFanDrawMode: TrianglesDrawModes;

// Texture Encodings
export enum TextureEncoding {}
export const LinearEncoding: TextureEncoding;
export const sRGBEncoding: TextureEncoding;
export const GammaEncoding: TextureEncoding;
export const RGBEEncoding: TextureEncoding;
export const LogLuvEncoding: TextureEncoding;
export const RGBM7Encoding: TextureEncoding;
export const RGBM16Encoding: TextureEncoding;
export const RGBDEncoding: TextureEncoding;

// Depth packing strategies
export enum DepthPackingStrategies {}
export const BasicDepthPacking: DepthPackingStrategies;
export const RGBADepthPacking: DepthPackingStrategies;

// Normal Map types
export enum NormalMapTypes {}
export const TangentSpaceNormalMap: NormalMapTypes;
export const ObjectSpaceNormalMap: NormalMapTypes;

// Stencil Op types
export enum StencilOp {}
export const ZeroStencilOp: StencilOp;
export const KeepStencilOp: StencilOp;
export const ReplaceStencilOp: StencilOp;
export const IncrementStencilOp: StencilOp;
export const DecrementStencilOp: StencilOp;
export const IncrementWrapStencilOp: StencilOp;
export const DecrementWrapStencilOp: StencilOp;
export const InvertStencilOp: StencilOp;

// Stencil Func types
export enum StencilFunc {}
export const NeverStencilFunc: StencilFunc;
export const LessStencilFunc: StencilFunc;
export const EqualStencilFunc: StencilFunc;
export const LessEqualStencilFunc: StencilFunc;
export const GreaterStencilFunc: StencilFunc;
export const NotEqualStencilFunc: StencilFunc;
export const GreaterEqualStencilFunc: StencilFunc;
export const AlwaysStencilFunc: StencilFunc;

// usage types
export enum Usage {}
export const StaticDrawUsage: Usage;
export const DynamicDrawUsage: Usage;
export const StreamDrawUsage: Usage;
export const StaticReadUsage: Usage;
export const DynamicReadUsage: Usage;
export const StreamReadUsage: Usage;
export const StaticCopyUsage: Usage;
export const DynamicCopyUsage: Usage;
export const StreamCopyUsage: Usage;


/**
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/BufferAttribute.js">src/core/BufferAttribute.js</a>
 */
export class BufferAttribute {

	constructor( array: ArrayLike<number>, itemSize: number, normalized?: boolean ); // array parameter should be TypedArray.

	name: string;
	array: ArrayLike<number>;
	itemSize: number;
	usage: Usage;
	updateRange: { offset: number; count: number };
	version: number;
	normalized: boolean;
	count: number;

	set needsUpdate( value: boolean );

	readonly isBufferAttribute: true;

	onUploadCallback: () => void;
	onUpload( callback: () => void ): this;
	setUsage( usage: Usage ): this;
	clone(): BufferAttribute;
	copy( source: BufferAttribute ): this;
	copyAt(
		index1: number,
		attribute: BufferAttribute,
		index2: number
	): this;
	copyArray( array: ArrayLike<number> ): this;
	copyColorsArray(
		colors: { r: number; g: number; b: number }[]
	): this;
	copyVector2sArray( vectors: { x: number; y: number }[] ): this;
	copyVector3sArray(
		vectors: { x: number; y: number; z: number }[]
	): this;
	copyVector4sArray(
		vectors: { x: number; y: number; z: number; w: number }[]
	): this;
	applyMatrix3( m: Matrix3 ): this;
	applyMatrix4( m: Matrix4 ): this;
	applyNormalMatrix( m: Matrix3 ): this;
	transformDirection( m: Matrix4 ): this;
	set(
		value: ArrayLike<number> | ArrayBufferView,
		offset?: number
	): this;
	getX( index: number ): number;
	setX( index: number, x: number ): this;
	getY( index: number ): number;
	setY( index: number, y: number ): this;
	getZ( index: number ): number;
	setZ( index: number, z: number ): this;
	getW( index: number ): number;
	setW( index: number, z: number ): this;
	setXY( index: number, x: number, y: number ): this;
	setXYZ( index: number, x: number, y: number, z: number ): this;
	setXYZW(
		index: number,
		x: number,
		y: number,
		z: number,
		w: number
	): this;
	toJSON(): {
		itemSize: number,
		type: string,
		array: number[],
		normalized: boolean
	};

}

/**
 * @deprecated THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead.
 */
export class Int8Attribute extends BufferAttribute {

	constructor( array: any, itemSize: number );

}

/**
 * @deprecated THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead.
 */
export class Uint8Attribute extends BufferAttribute {

	constructor( array: any, itemSize: number );

}

/**
 * @deprecated THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead.
 */
export class Uint8ClampedAttribute extends BufferAttribute {

	constructor( array: any, itemSize: number );

}

/**
 * @deprecated THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead.
 */
export class Int16Attribute extends BufferAttribute {

	constructor( array: any, itemSize: number );

}

/**
 * @deprecated THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead.
 */
export class Uint16Attribute extends BufferAttribute {

	constructor( array: any, itemSize: number );

}

/**
 * @deprecated THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead.
 */
export class Int32Attribute extends BufferAttribute {

	constructor( array: any, itemSize: number );

}

/**
 * @deprecated THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead.
 */
export class Uint32Attribute extends BufferAttribute {

	constructor( array: any, itemSize: number );

}

/**
 * @deprecated THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead.
 */
export class Float32Attribute extends BufferAttribute {

	constructor( array: any, itemSize: number );

}

/**
 * @deprecated THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead.
 */
export class Float64Attribute extends BufferAttribute {

	constructor( array: any, itemSize: number );

}

export class Int8BufferAttribute extends BufferAttribute {

	constructor(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	);

}

export class Uint8BufferAttribute extends BufferAttribute {

	constructor(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	);

}

export class Uint8ClampedBufferAttribute extends BufferAttribute {

	constructor(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	);

}

export class Int16BufferAttribute extends BufferAttribute {

	constructor(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	);

}

export class Uint16BufferAttribute extends BufferAttribute {

	constructor(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	);

}

export class Int32BufferAttribute extends BufferAttribute {

	constructor(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	);

}

export class Uint32BufferAttribute extends BufferAttribute {

	constructor(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	);

}

export class Float32BufferAttribute extends BufferAttribute {

	constructor(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	);

}

export class Float64BufferAttribute extends BufferAttribute {

	constructor(
		array: Iterable<number> | ArrayLike<number> | ArrayBuffer | number,
		itemSize: number,
		normalized?: boolean
	);

}


/**
 * ( interface Vector&lt;T&gt; )
 *
 * Abstract interface of Vector2, Vector3 and Vector4.
 * Currently the members of Vector is NOT type safe because it accepts different typed vectors.
 * Those definitions will be changed when TypeScript innovates Generics to be type safe.
 *
 * @example
 * var v:THREE.Vector = new THREE.Vector3();
 * v.addVectors(new THREE.Vector2(0, 1), new THREE.Vector2(2, 3));		// invalid but compiled successfully
 */
export interface Vector {
	setComponent( index: number, value: number ): this;

	getComponent( index: number ): number;

	set( ...args: number[] ): this;

	setScalar( scalar: number ): this;

	/**
	 * copy(v:T):T;
	 */
	copy( v: Vector ): this;

	/**
	 * NOTE: The second argument is deprecated.
	 *
	 * add(v:T):T;
	 */
	add( v: Vector, w?: Vector ): this;

	/**
	 * addVectors(a:T, b:T):T;
	 */
	addVectors( a: Vector, b: Vector ): this;

	addScaledVector( vector: Vector, scale: number ): this;

	/**
	 * Adds the scalar value s to this vector's values.
	 */
	addScalar( scalar: number ): this;

	/**
	 * sub(v:T):T;
	 */
	sub( v: Vector ): this;

	/**
	 * subVectors(a:T, b:T):T;
	 */
	subVectors( a: Vector, b: Vector ): this;

	/**
	 * multiplyScalar(s:number):T;
	 */
	multiplyScalar( s: number ): this;

	/**
	 * divideScalar(s:number):T;
	 */
	divideScalar( s: number ): this;

	/**
	 * negate():T;
	 */
	negate(): this;

	/**
	 * dot(v:T):T;
	 */
	dot( v: Vector ): number;

	/**
	 * lengthSq():number;
	 */
	lengthSq(): number;

	/**
	 * length():number;
	 */
	length(): number;

	/**
	 * normalize():T;
	 */
	normalize(): this;

	/**
	 * NOTE: Vector4 doesn't have the property.
	 *
	 * distanceTo(v:T):number;
	 */
	distanceTo?( v: Vector ): number;

	/**
	 * NOTE: Vector4 doesn't have the property.
	 *
	 * distanceToSquared(v:T):number;
	 */
	distanceToSquared?( v: Vector ): number;

	/**
	 * setLength(l:number):T;
	 */
	setLength( l: number ): this;

	/**
	 * lerp(v:T, alpha:number):T;
	 */
	lerp( v: Vector, alpha: number ): this;

	/**
	 * equals(v:T):boolean;
	 */
	equals( v: Vector ): boolean;

	/**
	 * clone():T;
	 */
	clone(): this;
}

/**
 * 2D vector.
 *
 * ( class Vector2 implements Vector<Vector2> )
 */
export class Vector2 implements Vector {

	constructor( x?: number, y?: number );

	x: number;
	y: number;
	width: number;
	height: number;
	readonly isVector2: true;

	/**
	 * Sets value of this vector.
	 */
	set( x: number, y: number ): this;

	/**
	 * Sets the x and y values of this vector both equal to scalar.
	 */
	setScalar( scalar: number ): this;

	/**
	 * Sets X component of this vector.
	 */
	setX( x: number ): this;

	/**
	 * Sets Y component of this vector.
	 */
	setY( y: number ): this;

	/**
	 * Sets a component of this vector.
	 */
	setComponent( index: number, value: number ): this;

	/**
	 * Gets a component of this vector.
	 */
	getComponent( index: number ): number;

	/**
	 * Returns a new Vector2 instance with the same `x` and `y` values.
	 */
	clone(): this;

	/**
	 * Copies value of v to this vector.
	 */
	copy( v: Vector2 ): this;

	/**
	 * Adds v to this vector.
	 */
	add( v: Vector2, w?: Vector2 ): this;

	/**
	 * Adds the scalar value s to this vector's x and y values.
	 */
	addScalar( s: number ): this;

	/**
	 * Sets this vector to a + b.
	 */
	addVectors( a: Vector2, b: Vector2 ): this;

	/**
	 * Adds the multiple of v and s to this vector.
	 */
	addScaledVector( v: Vector2, s: number ): this;

	/**
	 * Subtracts v from this vector.
	 */
	sub( v: Vector2 ): this;

	/**
	 * Subtracts s from this vector's x and y components.
	 */
	subScalar( s: number ): this;

	/**
	 * Sets this vector to a - b.
	 */
	subVectors( a: Vector2, b: Vector2 ): this;

	/**
	 * Multiplies this vector by v.
	 */
	multiply( v: Vector2 ): this;

	/**
	 * Multiplies this vector by scalar s.
	 */
	multiplyScalar( scalar: number ): this;

	/**
	 * Divides this vector by v.
	 */
	divide( v: Vector2 ): this;

	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0 ) if s == 0.
	 */
	divideScalar( s: number ): this;

	/**
	 * Multiplies this vector (with an implicit 1 as the 3rd component) by m.
	 */
	applyMatrix3( m: Matrix3 ): this;

	/**
	 * If this vector's x or y value is greater than v's x or y value, replace that value with the corresponding min value.
	 */
	min( v: Vector2 ): this;

	/**
	 * If this vector's x or y value is less than v's x or y value, replace that value with the corresponding max value.
	 */
	max( v: Vector2 ): this;

	/**
	 * If this vector's x or y value is greater than the max vector's x or y value, it is replaced by the corresponding value.
	 * If this vector's x or y value is less than the min vector's x or y value, it is replaced by the corresponding value.
	 * @param min the minimum x and y values.
	 * @param max the maximum x and y values in the desired range.
	 */
	clamp( min: Vector2, max: Vector2 ): this;

	/**
	 * If this vector's x or y values are greater than the max value, they are replaced by the max value.
	 * If this vector's x or y values are less than the min value, they are replaced by the min value.
	 * @param min the minimum value the components will be clamped to.
	 * @param max the maximum value the components will be clamped to.
	 */
	clampScalar( min: number, max: number ): this;

	/**
	 * If this vector's length is greater than the max value, it is replaced by the max value.
	 * If this vector's length is less than the min value, it is replaced by the min value.
	 * @param min the minimum value the length will be clamped to.
	 * @param max the maximum value the length will be clamped to.
	 */
	clampLength( min: number, max: number ): this;

	/**
	 * The components of the vector are rounded down to the nearest integer value.
	 */
	floor(): this;

	/**
	 * The x and y components of the vector are rounded up to the nearest integer value.
	 */
	ceil(): this;

	/**
	 * The components of the vector are rounded to the nearest integer value.
	 */
	round(): this;

	/**
	 * The components of the vector are rounded towards zero (up if negative, down if positive) to an integer value.
	 */
	roundToZero(): this;

	/**
	 * Inverts this vector.
	 */
	negate(): this;

	/**
	 * Computes dot product of this vector and v.
	 */
	dot( v: Vector2 ): number;

	/**
	 * Computes cross product of this vector and v.
	 */
	cross( v: Vector2 ): number;

	/**
	 * Computes squared length of this vector.
	 */
	lengthSq(): number;

	/**
	 * Computes length of this vector.
	 */
	length(): number;

	/**
	 * @deprecated Use {@link Vector2#manhattanLength .manhattanLength()} instead.
	 */
	lengthManhattan(): number;

	/**
	 * Computes the Manhattan length of this vector.
	 *
	 * @return {number}
	 *
	 * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanLength(): number;

	/**
	 * Normalizes this vector.
	 */
	normalize(): this;

	/**
	 * computes the angle in radians with respect to the positive x-axis
	 */
	angle(): number;

	/**
	 * Computes distance of this vector to v.
	 */
	distanceTo( v: Vector2 ): number;

	/**
	 * Computes squared distance of this vector to v.
	 */
	distanceToSquared( v: Vector2 ): number;

	/**
	 * @deprecated Use {@link Vector2#manhattanDistanceTo .manhattanDistanceTo()} instead.
	 */
	distanceToManhattan( v: Vector2 ): number;

	/**
	 * Computes the Manhattan length (distance) from this vector to the given vector v
	 *
	 * @param {Vector2} v
	 *
	 * @return {number}
	 *
	 * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanDistanceTo( v: Vector2 ): number;

	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	setLength( length: number ): this;

	/**
	 * Linearly interpolates between this vector and v, where alpha is the distance along the line - alpha = 0 will be this vector, and alpha = 1 will be v.
	 * @param v vector to interpolate towards.
	 * @param alpha interpolation factor in the closed interval [0, 1].
	 */
	lerp( v: Vector2, alpha: number ): this;

	/**
	 * Sets this vector to be the vector linearly interpolated between v1 and v2 where alpha is the distance along the line connecting the two vectors - alpha = 0 will be v1, and alpha = 1 will be v2.
	 * @param v1 the starting vector.
	 * @param v2 vector to interpolate towards.
	 * @param alpha interpolation factor in the closed interval [0, 1].
	 */
	lerpVectors( v1: Vector2, v2: Vector2, alpha: number ): this;

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals( v: Vector2 ): boolean;

	/**
	 * Sets this vector's x and y value from the provided array.
	 * @param array the source array.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray( array: number[], offset?: number ): this;

	/**
	 * Sets this vector's x and y value from the provided array-like.
	 * @param array the source array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray( array: ArrayLike<number>, offset?: number ): this;

	/**
	 * Returns an array [x, y], or copies x and y into the provided array.
	 * @param array (optional) array to store the vector to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray( array?: number[], offset?: number ): number[];

	/**
	 * Copies x and y into the provided array-like.
	 * @param array array-like to store the vector to.
	 * @param offset (optional) optional offset into the array.
	 * @return The provided array-like.
	 */
	toArray( array: ArrayLike<number>, offset?: number ): ArrayLike<number>;

	/**
	 * Sets this vector's x and y values from the attribute.
	 * @param attribute the source attribute.
	 * @param index index in the attribute.
	 */
	fromBufferAttribute( attribute: BufferAttribute, index: number ): this;

	/**
	 * Rotates the vector around center by angle radians.
	 * @param center the point around which to rotate.
	 * @param angle the angle to rotate, in radians.
	 */
	rotateAround( center: Vector2, angle: number ): this;

	/**
	 * Computes the Manhattan length of this vector.
	 *
	 * @return {number}
	 *
	 * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanLength(): number;

	/**
	 * Computes the Manhattan length (distance) from this vector to the given vector v
	 *
	 * @param {Vector2} v
	 *
	 * @return {number}
	 *
	 * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanDistanceTo( v: Vector2 ): number;

}

/**
 * 3D vector.
 *
 * @example
 * var a = new THREE.Vector3( 1, 0, 0 );
 * var b = new THREE.Vector3( 0, 1, 0 );
 * var c = new THREE.Vector3();
 * c.crossVectors( a, b );
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js">src/math/Vector3.js</a>
 *
 * ( class Vector3 implements Vector<Vector3> )
 */
export class Vector3 implements Vector {

	constructor( x?: number, y?: number, z?: number );

	x: number;
	y: number;
	z: number;
	readonly isVector3: true;

	/**
	 * Sets value of this vector.
	 */
	set( x: number, y: number, z: number ): this;

	/**
	 * Sets all values of this vector.
	 */
	setScalar( scalar: number ): this;

	/**
	 * Sets x value of this vector.
	 */
	setX( x: number ): Vector3;

	/**
	 * Sets y value of this vector.
	 */
	setY( y: number ): Vector3;

	/**
	 * Sets z value of this vector.
	 */
	setZ( z: number ): Vector3;

	setComponent( index: number, value: number ): this;

	getComponent( index: number ): number;

	/**
	 * Clones this vector.
	 */
	clone(): this;

	/**
	 * Copies value of v to this vector.
	 */
	copy( v: Vector3 ): this;

	/**
	 * Adds v to this vector.
	 */
	add( v: Vector3, w?: Vector3 ): this;

	addScalar( s: number ): this;

	addScaledVector( v: Vector3, s: number ): this;

	/**
	 * Sets this vector to a + b.
	 */
	addVectors( a: Vector3, b: Vector3 ): this;

	/**
	 * Subtracts v from this vector.
	 */
	sub( a: Vector3 ): this;

	subScalar( s: number ): this;

	/**
	 * Sets this vector to a - b.
	 */
	subVectors( a: Vector3, b: Vector3 ): this;

	multiply( v: Vector3 ): this;

	/**
	 * Multiplies this vector by scalar s.
	 */
	multiplyScalar( s: number ): this;

	multiplyVectors( a: Vector3, b: Vector3 ): this;

	applyEuler( euler: Euler ): this;

	applyAxisAngle( axis: Vector3, angle: number ): this;

	applyMatrix3( m: Matrix3 ): this;

	applyNormalMatrix( m: Matrix3 ): this;

	applyMatrix4( m: Matrix4 ): this;

	applyQuaternion( q: Quaternion ): this;

	project( camera: Camera ): this;

	unproject( camera: Camera ): this;

	transformDirection( m: Matrix4 ): this;

	divide( v: Vector3 ): this;

	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0, 0 ) if s == 0.
	 */
	divideScalar( s: number ): this;

	min( v: Vector3 ): this;

	max( v: Vector3 ): this;

	clamp( min: Vector3, max: Vector3 ): this;

	clampScalar( min: number, max: number ): this;

	clampLength( min: number, max: number ): this;

	floor(): this;

	ceil(): this;

	round(): this;

	roundToZero(): this;

	/**
	 * Inverts this vector.
	 */
	negate(): this;

	/**
	 * Computes dot product of this vector and v.
	 */
	dot( v: Vector3 ): number;

	/**
	 * Computes squared length of this vector.
	 */
	lengthSq(): number;

	/**
	 * Computes length of this vector.
	 */
	length(): number;

	/**
	 * Computes Manhattan length of this vector.
	 * http://en.wikipedia.org/wiki/Taxicab_geometry
	 *
	 * @deprecated Use {@link Vector3#manhattanLength .manhattanLength()} instead.
	 */
	lengthManhattan(): number;

	/**
	 * Computes the Manhattan length of this vector.
	 *
	 * @return {number}
	 *
	 * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanLength(): number;

	/**
	 * Computes the Manhattan length (distance) from this vector to the given vector v
	 *
	 * @param {Vector3} v
	 *
	 * @return {number}
	 *
	 * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanDistanceTo( v: Vector3 ): number;

	/**
	 * Normalizes this vector.
	 */
	normalize(): this;

	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	setLength( l: number ): this;
	lerp( v: Vector3, alpha: number ): this;

	lerpVectors( v1: Vector3, v2: Vector3, alpha: number ): this;

	/**
	 * Sets this vector to cross product of itself and v.
	 */
	cross( a: Vector3, w?: Vector3 ): this;

	/**
	 * Sets this vector to cross product of a and b.
	 */
	crossVectors( a: Vector3, b: Vector3 ): this;
	projectOnVector( v: Vector3 ): this;
	projectOnPlane( planeNormal: Vector3 ): this;
	reflect( vector: Vector3 ): this;
	angleTo( v: Vector3 ): number;

	/**
	 * Computes distance of this vector to v.
	 */
	distanceTo( v: Vector3 ): number;

	/**
	 * Computes squared distance of this vector to v.
	 */
	distanceToSquared( v: Vector3 ): number;

	/**
	 * @deprecated Use {@link Vector3#manhattanDistanceTo .manhattanDistanceTo()} instead.
	 */
	distanceToManhattan( v: Vector3 ): number;

	setFromSpherical( s: Spherical ): this;
	setFromSphericalCoords( r: number, phi: number, theta:number ): this;
	setFromCylindrical( s: Cylindrical ): this;
	setFromCylindricalCoords( radius: number, theta: number, y: number ): this;
	setFromMatrixPosition( m: Matrix4 ): this;
	setFromMatrixScale( m: Matrix4 ): this;
	setFromMatrixColumn( matrix: Matrix4, index: number ): this;
	setFromMatrix3Column( matrix: Matrix3, index: number ): this;

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals( v: Vector3 ): boolean;

	/**
	 * Sets this vector's x, y and z value from the provided array.
	 * @param array the source array.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray( array: number[], offset?: number ): this;

	/**
	 * Sets this vector's x, y and z value from the provided array-like.
	 * @param array the source array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray( array: ArrayLike<number>, offset?: number ): this;

	/**
	 * Returns an array [x, y, z], or copies x, y and z into the provided array.
	 * @param array (optional) array to store the vector to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray( array?: number[], offset?: number ): number[];

	/**
	 * Copies x, y and z into the provided array-like.
	 * @param array array-like to store the vector to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray( array: ArrayLike<number>, offset?: number ): ArrayLike<number>;

	fromBufferAttribute(
		attribute: BufferAttribute,
		index: number,
		offset?: number
	): this;

}

/**
 * A 4x4 Matrix.
 *
 * @example
 * // Simple rig for rotating around 3 axes
 * var m = new THREE.Matrix4();
 * var m1 = new THREE.Matrix4();
 * var m2 = new THREE.Matrix4();
 * var m3 = new THREE.Matrix4();
 * var alpha = 0;
 * var beta = Math.PI;
 * var gamma = Math.PI/2;
 * m1.makeRotationX( alpha );
 * m2.makeRotationY( beta );
 * m3.makeRotationZ( gamma );
 * m.multiplyMatrices( m1, m2 );
 * m.multiply( m3 );
 */
export class Matrix4 implements Matrix {

	constructor();

	/**
	 * Array with matrix values.
	 */
	elements: number[];

	/**
	 * Sets all fields of this matrix.
	 */
	set(
		n11: number,
		n12: number,
		n13: number,
		n14: number,
		n21: number,
		n22: number,
		n23: number,
		n24: number,
		n31: number,
		n32: number,
		n33: number,
		n34: number,
		n41: number,
		n42: number,
		n43: number,
		n44: number
	): Matrix4;

	/**
	 * Resets this matrix to identity.
	 */
	identity(): Matrix4;
	clone(): this;
	copy( m: Matrix4 ): this;
	copyPosition( m: Matrix4 ): Matrix4;
	extractBasis( xAxis: Vector3, yAxis: Vector3, zAxis: Vector3 ): Matrix4;
	makeBasis( xAxis: Vector3, yAxis: Vector3, zAxis: Vector3 ): Matrix4;

	/**
	 * Copies the rotation component of the supplied matrix m into this matrix rotation component.
	 */
	extractRotation( m: Matrix4 ): Matrix4;
	makeRotationFromEuler( euler: Euler ): Matrix4;
	makeRotationFromQuaternion( q: Quaternion ): Matrix4;
	/**
	 * Constructs a rotation matrix, looking from eye towards center with defined up vector.
	 */
	lookAt( eye: Vector3, target: Vector3, up: Vector3 ): Matrix4;

	/**
	 * Multiplies this matrix by m.
	 */
	multiply( m: Matrix4 ): Matrix4;

	premultiply( m: Matrix4 ): Matrix4;

	/**
	 * Sets this matrix to a x b.
	 */
	multiplyMatrices( a: Matrix4, b: Matrix4 ): Matrix4;

	/**
	 * Sets this matrix to a x b and stores the result into the flat array r.
	 * r can be either a regular Array or a TypedArray.
	 *
	 * @deprecated This method has been removed completely.
	 */
	multiplyToArray( a: Matrix4, b: Matrix4, r: number[] ): Matrix4;

	/**
	 * Multiplies this matrix by s.
	 */
	multiplyScalar( s: number ): Matrix4;

	/**
	 * Computes determinant of this matrix.
	 * Based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
	 */
	determinant(): number;

	/**
	 * Transposes this matrix.
	 */
	transpose(): Matrix4;

	/**
	 * Sets the position component for this matrix from vector v.
	 */
	setPosition( v: Vector3 | number, y?: number, z?: number ): Matrix4;

	/**
	 * Sets this matrix to the inverse of matrix m.
	 * Based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm.
	 */
	getInverse( m: Matrix4 ): Matrix4;

	/**
	 * Multiplies the columns of this matrix by vector v.
	 */
	scale( v: Vector3 ): Matrix4;

	getMaxScaleOnAxis(): number;
	/**
	 * Sets this matrix as translation transform.
	 */
	makeTranslation( x: number, y: number, z: number ): Matrix4;

	/**
	 * Sets this matrix as rotation transform around x axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	makeRotationX( theta: number ): Matrix4;

	/**
	 * Sets this matrix as rotation transform around y axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	makeRotationY( theta: number ): Matrix4;

	/**
	 * Sets this matrix as rotation transform around z axis by theta radians.
	 *
	 * @param theta Rotation angle in radians.
	 */
	makeRotationZ( theta: number ): Matrix4;

	/**
	 * Sets this matrix as rotation transform around axis by angle radians.
	 * Based on http://www.gamedev.net/reference/articles/article1199.asp.
	 *
	 * @param axis Rotation axis.
	 * @param theta Rotation angle in radians.
	 */
	makeRotationAxis( axis: Vector3, angle: number ): Matrix4;

	/**
	 * Sets this matrix as scale transform.
	 */
	makeScale( x: number, y: number, z: number ): Matrix4;

	/**
	 * Sets this matrix to the transformation composed of translation, rotation and scale.
	 */
	compose( translation: Vector3, rotation: Quaternion, scale: Vector3 ): Matrix4;

	/**
	 * Decomposes this matrix into the translation, rotation and scale components.
	 * If parameters are not passed, new instances will be created.
	 */
	decompose(
		translation?: Vector3,
		rotation?: Quaternion,
		scale?: Vector3
	): Matrix4;

	/**
	 * Creates a frustum matrix.
	 */
	makePerspective(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number
	): Matrix4;

	/**
	 * Creates a perspective projection matrix.
	 */
	makePerspective(
		fov: number,
		aspect: number,
		near: number,
		far: number
	): Matrix4;

	/**
	 * Creates an orthographic projection matrix.
	 */
	makeOrthographic(
		left: number,
		right: number,
		top: number,
		bottom: number,
		near: number,
		far: number
	): Matrix4;
	equals( matrix: Matrix4 ): boolean;

	/**
	 * Sets the values of this matrix from the provided array.
	 * @param array the source array.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray( array: number[], offset?: number ): Matrix4;

	/**
	 * Sets the values of this matrix from the provided array-like.
	 * @param array the source array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray( array: ArrayLike<number>, offset?: number ): Matrix4;

	/**
	 * Returns an array with the values of this matrix, or copies them into the provided array.
	 * @param array (optional) array to store the matrix to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray( array?: number[], offset?: number ): number[];

	/**
	 * Copies he values of this matrix into the provided array-like.
	 * @param array array-like to store the matrix to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray( array?: ArrayLike<number>, offset?: number ): ArrayLike<number>;

	/**
	 * @deprecated Use {@link Matrix4#copyPosition .copyPosition()} instead.
	 */
	extractPosition( m: Matrix4 ): Matrix4;

	/**
	 * @deprecated Use {@link Matrix4#makeRotationFromQuaternion .makeRotationFromQuaternion()} instead.
	 */
	setRotationFromQuaternion( q: Quaternion ): Matrix4;

	/**
	 * @deprecated Use {@link Vector3#applyMatrix4 vector.applyMatrix4( matrix )} instead.
	 */
	multiplyVector3( v: any ): any;

	/**
	 * @deprecated Use {@link Vector4#applyMatrix4 vector.applyMatrix4( matrix )} instead.
	 */
	multiplyVector4( v: any ): any;

	/**
	 * @deprecated This method has been removed completely.
	 */
	multiplyVector3Array( array: number[] ): number[];

	/**
	 * @deprecated Use {@link Vector3#transformDirection Vector3.transformDirection( matrix )} instead.
	 */
	rotateAxis( v: any ): void;

	/**
	 * @deprecated Use {@link Vector3#applyMatrix4 vector.applyMatrix4( matrix )} instead.
	 */
	crossVector( v: any ): void;

	/**
	 * @deprecated Use {@link Matrix4#toArray .toArray()} instead.
	 */
	flattenToArrayOffset( array: number[], offset: number ): number[];

}

export class Layers {

	constructor();

	mask: number;

	set( channel: number ): void;
	enable( channel: number ): void;
	enableAll(): void;
	toggle( channel: number ): void;
	disable( channel: number ): void;
	disableAll(): void;
	test( layers: Layers ): boolean;

}

/**
 * @author Joe Pea / http://github.com/trusktr
 */

export interface HSL {
	h: number;
	s: number;
	l: number;
}

/**
 * Represents a color. See also {@link ColorUtils}.
 *
 * @example
 * var color = new THREE.Color( 0xff0000 );
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/math/Color.js">src/math/Color.js</a>
 */
export class Color {

	constructor( color?: Color | string | number );
	constructor( r: number, g: number, b: number );

	readonly isColor: true;

	/**
	 * Red channel value between 0 and 1. Default is 1.
	 */
	r: number;

	/**
	 * Green channel value between 0 and 1. Default is 1.
	 */
	g: number;

	/**
	 * Blue channel value between 0 and 1. Default is 1.
	 */
	b: number;

	set( color: Color ): Color;
	set( color: number ): Color;
	set( color: string ): Color;
	setScalar( scalar: number ): Color;
	setHex( hex: number ): Color;

	/**
	 * Sets this color from RGB values.
	 * @param r Red channel value between 0 and 1.
	 * @param g Green channel value between 0 and 1.
	 * @param b Blue channel value between 0 and 1.
	 */
	setRGB( r: number, g: number, b: number ): Color;

	/**
	 * Sets this color from HSL values.
	 * Based on MochiKit implementation by Bob Ippolito.
	 *
	 * @param h Hue channel value between 0 and 1.
	 * @param s Saturation value channel between 0 and 1.
	 * @param l Value channel value between 0 and 1.
	 */
	setHSL( h: number, s: number, l: number ): Color;

	/**
	 * Sets this color from a CSS context style string.
	 * @param contextStyle Color in CSS context style format.
	 */
	setStyle( style: string ): Color;

	/**
	 * Sets this color from a color name.
	 * Faster than {@link Color#setStyle .setStyle()} method if you don't need the other CSS-style formats.
	 * @param style Color name in X11 format.
	 */
	setColorName( style: string ): Color;

	/**
	 * Clones this color.
	 */
	clone(): this;

	/**
	 * Copies given color.
	 * @param color Color to copy.
	 */
	copy( color: Color ): this;

	/**
	 * Copies given color making conversion from gamma to linear space.
	 * @param color Color to copy.
	 */
	copyGammaToLinear( color: Color, gammaFactor?: number ): Color;

	/**
	 * Copies given color making conversion from linear to gamma space.
	 * @param color Color to copy.
	 */
	copyLinearToGamma( color: Color, gammaFactor?: number ): Color;

	/**
	 * Converts this color from gamma to linear space.
	 */
	convertGammaToLinear( gammaFactor?: number ): Color;

	/**
	 * Converts this color from linear to gamma space.
	 */
	convertLinearToGamma( gammaFactor?: number ): Color;

	/**
	 * Copies given color making conversion from sRGB to linear space.
	 * @param color Color to copy.
	 */
	copySRGBToLinear( color: Color ): Color;

	/**
	 * Copies given color making conversion from linear to sRGB space.
	 * @param color Color to copy.
	 */
	copyLinearToSRGB( color: Color ): Color;

	/**
	 * Converts this color from sRGB to linear space.
	 */
	convertSRGBToLinear(): Color;

	/**
	 * Converts this color from linear to sRGB space.
	 */
	convertLinearToSRGB(): Color;

	/**
	 * Returns the hexadecimal value of this color.
	 */
	getHex(): number;

	/**
	 * Returns the string formated hexadecimal value of this color.
	 */
	getHexString(): string;

	getHSL( target: HSL ): HSL;

	/**
	 * Returns the value of this color in CSS context style.
	 * Example: rgb(r, g, b)
	 */
	getStyle(): string;

	offsetHSL( h: number, s: number, l: number ): this;

	add( color: Color ): this;
	addColors( color1: Color, color2: Color ): this;
	addScalar( s: number ): this;
	sub( color: Color ): this;
	multiply( color: Color ): this;
	multiplyScalar( s: number ): this;
	lerp( color: Color, alpha: number ): this;
	lerpHSL( color: Color, alpha: number ): this;
	equals( color: Color ): boolean;

	/**
	 * Sets this color's red, green and blue value from the provided array.
	 * @param array the source array.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray( array: number[], offset?: number ): this;

	/**
	 * Sets this color's red, green and blue value from the provided array-like.
	 * @param array the source array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray( array: ArrayLike<number>, offset?: number ): this;

	/**
	 * Returns an array [red, green, blue], or copies red, green and blue into the provided array.
	 * @param array (optional) array to store the color to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray( array?: number[], offset?: number ): number[];

	/**
	 * Copies red, green and blue into the provided array-like.
	 * @param array array-like to store the color to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray( xyz: ArrayLike<number>, offset?: number ): ArrayLike<number>;

	/**
	 * List of X11 color names.
	 */
	static NAMES: Record<string, number>;

}


export interface IFog {
	name: string;
	color: Color;
	clone(): this;
	toJSON(): any;
}

/**
 * This class contains the parameters that define linear fog, i.e., that grows linearly denser with the distance.
 */
export class Fog implements IFog {

	constructor( hex: number, near?: number, far?: number );

	name: string;

	/**
	 * Fog color.
	 */
	color: Color;

	/**
	 * The minimum distance to start applying fog. Objects that are less than 'near' units from the active camera won't be affected by fog.
	 */
	near: number;

	/**
	 * The maximum distance at which fog stops being calculated and applied. Objects that are more than 'far' units away from the active camera won't be affected by fog.
	 * Default is 1000.
	 */
	far: number;

	readonly isFog: true;

	clone(): this;
	toJSON(): any;

}


export interface SplineControlPoint {
	x: number;
	y: number;
	z: number;
}

export class Triangle {

	constructor( a?: Vector3, b?: Vector3, c?: Vector3 );

	a: Vector3;
	b: Vector3;
	c: Vector3;

	set( a: Vector3, b: Vector3, c: Vector3 ): Triangle;
	setFromPointsAndIndices(
		points: Vector3[],
		i0: number,
		i1: number,
		i2: number
	): Triangle;
	clone(): this;
	copy( triangle: Triangle ): this;
	getArea(): number;
	getMidpoint( target: Vector3 ): Vector3;
	getNormal( target: Vector3 ): Vector3;
	getPlane( target: Plane ): Plane;
	getBarycoord( point: Vector3, target: Vector3 ): Vector3;
	getUV( point: Vector3, uv1: Vector2, uv2: Vector2, uv3: Vector2, target: Vector2 ): Vector2;
	containsPoint( point: Vector3 ): boolean;
	intersectsBox( box: Box3 ): boolean;
	isFrontFacing( direction: Vector3 ): boolean;
	closestPointToPoint( point: Vector3, target: Vector3 ): Vector3;
	equals( triangle: Triangle ): boolean;

	static getNormal(
		a: Vector3,
		b: Vector3,
		c: Vector3,
		target: Vector3
	): Vector3;
	static getBarycoord(
		point: Vector3,
		a: Vector3,
		b: Vector3,
		c: Vector3,
		target: Vector3
	): Vector3;
	static containsPoint(
		point: Vector3,
		a: Vector3,
		b: Vector3,
		c: Vector3
	): boolean;
	static getUV(
		point: Vector3,
		p1: Vector3,
		p2: Vector3,
		p3: Vector3,
		uv1: Vector2,
		uv2: Vector2,
		uv3: Vector2,
		target: Vector2
	): Vector2;
	static isFrontFacing(
		a: Vector3,
		b: Vector3,
		c: Vector3,
		direction: Vector3
	): boolean;

}


export class Box3 {

	constructor( min?: Vector3, max?: Vector3 );

	max: Vector3;
	min: Vector3;
	readonly isBox3: true;

	set( min: Vector3, max: Vector3 ): this;
	setFromArray( array: ArrayLike<number> ): this;
	setFromBufferAttribute( bufferAttribute: BufferAttribute ): this;
	setFromPoints( points: Vector3[] ): this;
	setFromCenterAndSize( center: Vector3, size: Vector3 ): this;
	setFromObject( object: Object3D ): this;
	clone(): this;
	copy( box: Box3 ): this;
	makeEmpty(): this;
	isEmpty(): boolean;
	getCenter( target: Vector3 ): Vector3;
	getSize( target: Vector3 ): Vector3;
	expandByPoint( point: Vector3 ): this;
	expandByVector( vector: Vector3 ): this;
	expandByScalar( scalar: number ): this;
	expandByObject( object: Object3D ): this;
	containsPoint( point: Vector3 ): boolean;
	containsBox( box: Box3 ): boolean;
	getParameter( point: Vector3 ): Vector3;
	intersectsBox( box: Box3 ): boolean;
	intersectsSphere( sphere: Sphere ): boolean;
	intersectsPlane( plane: Plane ): boolean;
	intersectsTriangle( triangle: Triangle ): boolean;
	clampPoint( point: Vector3, target: Vector3 ): Vector3;
	distanceToPoint( point: Vector3 ): number;
	getBoundingSphere( target: Sphere ): Sphere;
	intersect( box: Box3 ): this;
	union( box: Box3 ): this;
	applyMatrix4( matrix: Matrix4 ): this;
	translate( offset: Vector3 ): this;
	equals( box: Box3 ): boolean;
	/**
	 * @deprecated Use {@link Box3#isEmpty .isEmpty()} instead.
	 */
	empty(): any;
	/**
	 * @deprecated Use {@link Box3#intersectsBox .intersectsBox()} instead.
	 */
	isIntersectionBox( b: any ): any;
	/**
	 * @deprecated Use {@link Box3#intersectsSphere .intersectsSphere()} instead.
	 */
	isIntersectionSphere( s: any ): any;

}


export class Sphere {

	constructor( center?: Vector3, radius?: number );

	center: Vector3;
	radius: number;

	set( center: Vector3, radius: number ): Sphere;
	setFromPoints( points: Vector3[], optionalCenter?: Vector3 ): Sphere;
	clone(): this;
	copy( sphere: Sphere ): this;
	empty(): boolean;
	containsPoint( point: Vector3 ): boolean;
	distanceToPoint( point: Vector3 ): number;
	intersectsSphere( sphere: Sphere ): boolean;
	intersectsBox( box: Box3 ): boolean;
	intersectsPlane( plane: Plane ): boolean;
	clampPoint( point: Vector3, target: Vector3 ): Vector3;
	getBoundingBox( target: Box3 ): Box3;
	applyMatrix4( matrix: Matrix4 ): Sphere;
	translate( offset: Vector3 ): Sphere;
	equals( sphere: Sphere ): boolean;

}


export class Line3 {

	constructor( start?: Vector3, end?: Vector3 );

	start: Vector3;
	end: Vector3;

	set( start?: Vector3, end?: Vector3 ): Line3;
	clone(): this;
	copy( line: Line3 ): this;
	getCenter( target: Vector3 ): Vector3;
	delta( target: Vector3 ): Vector3;
	distanceSq(): number;
	distance(): number;
	at( t: number, target: Vector3 ): Vector3;
	closestPointToPointParameter( point: Vector3, clampToLine?: boolean ): number;
	closestPointToPoint(
		point: Vector3,
		clampToLine: boolean,
		target: Vector3
	): Vector3;
	applyMatrix4( matrix: Matrix4 ): Line3;
	equals( line: Line3 ): boolean;

}


export class Plane {

	constructor( normal?: Vector3, constant?: number );

	normal: Vector3;
	constant: number;
	readonly isPlane: true;

	set( normal: Vector3, constant: number ): Plane;
	setComponents( x: number, y: number, z: number, w: number ): Plane;
	setFromNormalAndCoplanarPoint( normal: Vector3, point: Vector3 ): Plane;
	setFromCoplanarPoints( a: Vector3, b: Vector3, c: Vector3 ): Plane;
	clone(): this;
	copy( plane: Plane ): this;
	normalize(): Plane;
	negate(): Plane;
	distanceToPoint( point: Vector3 ): number;
	distanceToSphere( sphere: Sphere ): number;
	projectPoint( point: Vector3, target: Vector3 ): Vector3;
	orthoPoint( point: Vector3, target: Vector3 ): Vector3;
	intersectLine( line: Line3, target: Vector3 ): Vector3 | undefined;
	intersectsLine( line: Line3 ): boolean;
	intersectsBox( box: Box3 ): boolean;
	intersectsSphere( sphere: Sphere ): boolean;
	coplanarPoint( target: Vector3 ): Vector3;
	applyMatrix4( matrix: Matrix4, optionalNormalMatrix?: Matrix3 ): Plane;
	translate( offset: Vector3 ): Plane;
	equals( plane: Plane ): boolean;

	/**
	 * @deprecated Use {@link Plane#intersectsLine .intersectsLine()} instead.
	 */
	isIntersectionLine( l: any ): any;

}

export interface IUniform {
	value: any;
}

export let UniformsLib: {
	common: {
		diffuse: IUniform;
		opacity: IUniform;
		map: IUniform;
		uvTransform: IUniform;
		uv2Transform: IUniform;
		alphaMap: IUniform;
	};
	specularmap: {
		specularMap: IUniform;
	};
	envmap: {
		envMap: IUniform;
		flipEnvMap: IUniform;
		reflectivity: IUniform;
		refractionRatio: IUniform;
		maxMipLevel: IUniform;
	};
	aomap: {
		aoMap: IUniform;
		aoMapIntensity: IUniform;
	};
	lightmap: {
		lightMap: IUniform;
		lightMapIntensity: IUniform;
	};
	emissivemap: {
		emissiveMap: IUniform;
	};
	bumpmap: {
		bumpMap: IUniform;
		bumpScale: IUniform;
	};
	normalmap: {
		normalMap: IUniform;
		normalScale: IUniform;
	};
	displacementmap: {
		displacementMap: IUniform;
		displacementScale: IUniform;
		displacementBias: IUniform;
	};
	roughnessmap: {
		roughnessMap: IUniform;
	};
	metalnessmap: {
		metalnessMap: IUniform;
	};
	gradientmap: {
		gradientMap: IUniform;
	};
	fog: {
		fogDensity: IUniform;
		fogNear: IUniform;
		fogFar: IUniform;
		fogColor: IUniform;
	};
	lights: {
		ambientLightColor: IUniform;
		directionalLights: {
			value: any[];
			properties: {
				direction: {};
				color: {};
			};
		};
		directionalLightShadows: {
			value: any[];
			properties: {
				shadowBias: {};
				shadowRadius: {};
				shadowMapSize: {};
			};
		};
		directionalShadowMap: IUniform;
		directionalShadowMatrix: IUniform;
		spotLights: {
			value: any[];
			properties: {
				color: {};
				position: {};
				direction: {};
				distance: {};
				coneCos: {};
				penumbraCos: {};
				decay: {};
			};
		};
		spotLightShadows: {
			value: any[];
			properties: {
				shadowBias: {};
				shadowRadius: {};
				shadowMapSize: {};
			};
		};
		spotShadowMap: IUniform;
		spotShadowMatrix: IUniform;
		pointLights: {
			value: any[];
			properties: {
				color: {};
				position: {};
				decay: {};
				distance: {};
			};
		};
		pointLightShadows: {
			value: any[];
			properties: {
				shadowBias: {};
				shadowRadius: {};
				shadowMapSize: {};
			};
		};
		pointShadowMap: IUniform;
		pointShadowMatrix: IUniform;
		hemisphereLights: {
			value: any[];
			properties: {
				direction: {};
				skycolor: {};
				groundColor: {};
			};
		};
		rectAreaLights: {
			value: any[];
			properties: {
				color: {};
				position: {};
				width: {};
				height: {};
			};
		};
	};
	points: {
		diffuse: IUniform;
		opacity: IUniform;
		size: IUniform;
		scale: IUniform;
		map: IUniform;
		uvTransform: IUniform;
	};
};


export interface Shader {
	uniforms: { [uniform: string]: IUniform };
	vertexShader: string;
	fragmentShader: string;
}

export let ShaderLib: {
	[name: string]: Shader;
	basic: Shader;
	lambert: Shader;
	phong: Shader;
	standard: Shader;
	matcap: Shader;
	points: Shader;
	dashed: Shader;
	depth: Shader;
	normal: Shader;
	sprite: Shader;
	background: Shader;
	cube: Shader;
	equirect: Shader;
	distanceRGBA: Shader;
	shadow: Shader;
	physical: Shader;
};

/**
 * Event object.
 */
export interface Event {
	type: string;
	target?: any;
	[attachment: string]: any;
}

/**
 * JavaScript events for custom objects
 *
 * @source src/core/EventDispatcher.js
 */
export class EventDispatcher {

	/**
	 * Creates eventDispatcher object. It needs to be call with '.call' to add the functionality to an object.
	 */
	constructor();

	/**
	 * Adds a listener to an event type.
	 * @param type The type of event to listen to.
	 * @param listener The function that gets called when the event is fired.
	 */
	addEventListener( type: string, listener: ( event: Event ) => void ): void;

	/**
	 * Checks if listener is added to an event type.
	 * @param type The type of event to listen to.
	 * @param listener The function that gets called when the event is fired.
	 */
	hasEventListener( type: string, listener: ( event: Event ) => void ): boolean;

	/**
	 * Removes a listener from an event type.
	 * @param type The type of the listener that gets removed.
	 * @param listener The listener function that gets removed.
	 */
	removeEventListener( type: string, listener: ( event: Event ) => void ): void;

	/**
	 * Fire an event type.
	 * @param type The type of event that gets fired.
	 */
	dispatchEvent( event: { type: string; [attachment: string]: any } ): void;

}

	BlendingDstFactor,
	BlendingEquation,
	Blending,
	BlendingSrcFactor,
	DepthModes,
	Side,
	StencilFunc,
	StencilOp
} from '../constants';

// Materials //////////////////////////////////////////////////////////////////////////////////
export let MaterialIdCount: number;

export interface MaterialParameters {
	alphaTest?: number;
	blendDst?: BlendingDstFactor;
	blendDstAlpha?: number;
	blendEquation?: BlendingEquation;
	blendEquationAlpha?: number;
	blending?: Blending;
	blendSrc?: BlendingSrcFactor | BlendingDstFactor;
	blendSrcAlpha?: number;
	clipIntersection?: boolean;
	clippingPlanes?: Plane[];
	clipShadows?: boolean;
	colorWrite?: boolean;
	defines?: any;
	depthFunc?: DepthModes;
	depthTest?: boolean;
	depthWrite?: boolean;
	fog?: boolean;
	name?: string;
	opacity?: number;
	polygonOffset?: boolean;
	polygonOffsetFactor?: number;
	polygonOffsetUnits?: number;
	precision?: 'highp' | 'mediump' | 'lowp' | null;
	premultipliedAlpha?: boolean;
	dithering?: boolean;
	flatShading?: boolean;
	side?: Side;
	shadowSide?: Side;
	toneMapped?: boolean;
	transparent?: boolean;
	vertexColors?: boolean;
	visible?: boolean;
	stencilWrite?: boolean;
	stencilFunc?: StencilFunc;
	stencilRef?: number;
	stencilMask?: number;
	stencilFail?: StencilOp;
	stencilZFail?: StencilOp;
	stencilZPass?: StencilOp;
}

/**
 * Materials describe the appearance of objects. They are defined in a (mostly) renderer-independent way, so you don't have to rewrite materials if you decide to use a different renderer.
 */
export class Material extends EventDispatcher {

	constructor();

	/**
	 * Sets the alpha value to be used when running an alpha test. Default is 0.
	 */
	alphaTest: number;

	/**
	 * Blending destination. It's one of the blending mode constants defined in Three.js. Default is {@link OneMinusSrcAlphaFactor}.
	 */
	blendDst: BlendingDstFactor;

	/**
	 * The tranparency of the .blendDst. Default is null.
	 */
	blendDstAlpha: number | null;

	/**
	 * Blending equation to use when applying blending. It's one of the constants defined in Three.js. Default is {@link AddEquation}.
	 */
	blendEquation: BlendingEquation;

	/**
	 * The tranparency of the .blendEquation. Default is null.
	 */
	blendEquationAlpha: number | null;

	/**
	 * Which blending to use when displaying objects with this material. Default is {@link NormalBlending}.
	 */
	blending: Blending;

	/**
	 * Blending source. It's one of the blending mode constants defined in Three.js. Default is {@link SrcAlphaFactor}.
	 */
	blendSrc: BlendingSrcFactor | BlendingDstFactor;

	/**
	 * The tranparency of the .blendSrc. Default is null.
	 */
	blendSrcAlpha: number | null;

	/**
	 * Changes the behavior of clipping planes so that only their intersection is clipped, rather than their union. Default is false.
	 */
	clipIntersection: boolean;

	/**
	 * User-defined clipping planes specified as THREE.Plane objects in world space. These planes apply to the objects this material is attached to. Points in space whose signed distance to the plane is negative are clipped (not rendered). See the WebGL / clipping /intersection example. Default is null.
	 */
	clippingPlanes: any;

	/**
	 * Defines whether to clip shadows according to the clipping planes specified on this material. Default is false.
	 */
	clipShadows: boolean;

	/**
	 * Whether to render the material's color. This can be used in conjunction with a mesh's .renderOrder property to create invisible objects that occlude other objects. Default is true.
	 */
	colorWrite: boolean;

	/**
	 * Custom defines to be injected into the shader. These are passed in form of an object literal, with key/value pairs. { MY_CUSTOM_DEFINE: '' , PI2: Math.PI * 2 }.
	 * The pairs are defined in both vertex and fragment shaders. Default is undefined.
	 */
	defines: any;

	/**
	 * Which depth function to use. Default is {@link LessEqualDepth}. See the depth mode constants for all possible values.
	 */
	depthFunc: DepthModes;

	/**
	 * Whether to have depth test enabled when rendering this material. Default is true.
	 */
	depthTest: boolean;

	/**
	 * Whether rendering this material has any effect on the depth buffer. Default is true.
	 * When drawing 2D overlays it can be useful to disable the depth writing in order to layer several things together without creating z-index artifacts.
	 */
	depthWrite: boolean;

	/**
	 * Whether the material is affected by fog. Default is true.
	 */
	fog: boolean;

	/**
	 * Unique number of this material instance.
	 */
	id: number;

	/**
   * Whether rendering this material has any effect on the stencil buffer. Default is *false*.
   */
	stencilWrite: boolean;

	/**
   * The stencil comparison function to use. Default is {@link AlwaysStencilFunc}. See stencil operation constants for all possible values.
   */
	stencilFunc: StencilFunc;

	/**
   * The value to use when performing stencil comparisons or stencil operations. Default is *0*.
   */
	stencilRef: number;

	/**
   * The bit mask to use when comparing against or writing to the stencil buffer. Default is *0xFF*.
   */
	stencilMask: number;

	/**
   * Which stencil operation to perform when the comparison function returns false. Default is {@link KeepStencilOp}. See the stencil operation constants for all possible values.
   */
	stencilFail: StencilOp;

	/**
   * Which stencil operation to perform when the comparison function returns true but the depth test fails. Default is {@link KeepStencilOp}. See the stencil operation constants for all possible values.
   */
	stencilZFail: StencilOp;

	/**
   * Which stencil operation to perform when the comparison function returns true and the depth test passes. Default is {@link KeepStencilOp}. See the stencil operation constants for all possible values.
   */
	stencilZPass: StencilOp;

	/**
	 * Used to check whether this or derived classes are materials. Default is true.
	 * You should not change this, as it used internally for optimisation.
	 */
	readonly isMaterial: true;

	/**
	 * Material name. Default is an empty string.
	 */
	name: string;

	/**
	 * Specifies that the material needs to be updated, WebGL wise. Set it to true if you made changes that need to be reflected in WebGL.
	 * This property is automatically set to true when instancing a new material.
	 */
	needsUpdate: boolean;

	/**
	 * Opacity. Default is 1.
	 */
	opacity: number;

	/**
	 * Whether to use polygon offset. Default is false. This corresponds to the POLYGON_OFFSET_FILL WebGL feature.
	 */
	polygonOffset: boolean;

	/**
	 * Sets the polygon offset factor. Default is 0.
	 */
	polygonOffsetFactor: number;

	/**
	 * Sets the polygon offset units. Default is 0.
	 */
	polygonOffsetUnits: number;

	/**
	 * Override the renderer's default precision for this material. Can be "highp", "mediump" or "lowp". Defaults is null.
	 */
	precision: 'highp' | 'mediump' | 'lowp' | null;

	/**
	 * Whether to premultiply the alpha (transparency) value. See WebGL / Materials / Transparency for an example of the difference. Default is false.
	 */
	premultipliedAlpha: boolean;

	/**
	 * Whether to apply dithering to the color to remove the appearance of banding. Default is false.
	 */
	dithering: boolean;

	/**
	 * Define whether the material is rendered with flat shading. Default is false.
	 */
	flatShading: boolean;

	/**
	 * Defines which of the face sides will be rendered - front, back or both.
	 * Default is THREE.FrontSide. Other options are THREE.BackSide and THREE.DoubleSide.
	 */
	side: Side;

	/**
	 * Defines which of the face sides will cast shadows. Default is *null*.
	 * If *null*, the value is opposite that of side, above.
	 */
	shadowSide: Side;

	/**
	 * Defines whether this material is tone mapped according to the renderer's toneMapping setting.
	 * Default is true.
	 */
	toneMapped: boolean;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects.
	 * When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
	 * Default is false.
	 */
	transparent: boolean;

	/**
	 * Value is the string 'Material'. This shouldn't be changed, and can be used to find all objects of this type in a scene.
	 */
	type: string;

	/**
	 * UUID of this material instance. This gets automatically assigned, so this shouldn't be edited.
	 */
	uuid: string;

	/**
	 * Defines whether vertex coloring is used. Default is false.
	 */
	vertexColors: boolean;

	/**
	 * Defines whether this material is visible. Default is true.
	 */
	visible: boolean;

	/**
	 * An object that can be used to store custom data about the Material. It should not hold references to functions as these will not be cloned.
	 */
	userData: any;

	/**
	 * This starts at 0 and counts how many times .needsUpdate is set to true.
	 */
	version: number;

	/**
	 * Return a new material with the same parameters as this material.
	 */
	clone(): this;

	/**
	 * Copy the parameters from the passed material into this material.
	 * @param material
	 */
	copy( material: Material ): this;

	/**
	 * This disposes the material. Textures of a material don't get disposed. These needs to be disposed by {@link Texture}.
	 */
	dispose(): void;

	/**
	 * An optional callback that is executed immediately before the shader program is compiled. This function is called with the shader source code as a parameter. Useful for the modification of built-in materials.
	 * @param shader Source code of the shader
	 * @param renderer WebGLRenderer Context that is initializing the material
	 */
	onBeforeCompile ( shader : Shader, renderer : WebGLRenderer ) : void;

	/**
	 * Sets the properties based on the values.
	 * @param values A container with parameters.
	 */
	setValues( values: MaterialParameters ): void;

	/**
	 * Convert the material to three.js JSON format.
	 * @param meta Object containing metadata such as textures or images for the material.
	 */
	toJSON( meta?: any ): any;

}

	Mapping,
	Wrapping,
	TextureFilter,
	PixelFormat,
	PixelFormatGPU,
	TextureDataType,
	TextureEncoding
} from '../constants';

// Textures /////////////////////////////////////////////////////////////////////
export let TextureIdCount: number;

export class Texture extends EventDispatcher {

	constructor(
		image?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
		mapping?: Mapping,
		wrapS?: Wrapping,
		wrapT?: Wrapping,
		magFilter?: TextureFilter,
		minFilter?: TextureFilter,
		format?: PixelFormat,
		type?: TextureDataType,
		anisotropy?: number,
		encoding?: TextureEncoding
	);

	id: number;
	uuid: string;
	name: string;
	sourceFile: string;
	image: any; // HTMLImageElement or ImageData or { width: number, height: number } in some children;
	mipmaps: ImageData[];
	mapping: Mapping;
	wrapS: Wrapping;
	wrapT: Wrapping;
	magFilter: TextureFilter;
	minFilter: TextureFilter;
	anisotropy: number;
	format: PixelFormat;
	internalFormat: PixelFormatGPU | null;
	type: TextureDataType;
	offset: Vector2;
	repeat: Vector2;
	center: Vector2;
	rotation: number;
	generateMipmaps: boolean;
	premultiplyAlpha: boolean;
	flipY: boolean;
	unpackAlignment: number;
	encoding: TextureEncoding;
	version: number;
	needsUpdate: boolean;
	readonly isTexture: true;

	onUpdate: () => void;
	static DEFAULT_IMAGE: any;
	static DEFAULT_MAPPING: any;

	clone(): this;
	copy( source: Texture ): this;
	toJSON( meta: any ): any;
	dispose(): void;
	transformUv( uv: Vector2 ): Vector2;

}

// Scenes /////////////////////////////////////////////////////////////////////

/**
 * Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights and cameras.
 */
export class Scene extends Object3D {

	constructor();

	type: 'Scene';

	/**
	 * A fog instance defining the type of fog that affects everything rendered in the scene. Default is null.
	 */
	fog: IFog | null;

	/**
	 * If not null, it will force everything in the scene to be rendered with that material. Default is null.
	 */
	overrideMaterial: Material | null;
	autoUpdate: boolean;
	background: null | Color | Texture;
	environment: null | Texture;

	readonly isScene: true;

	toJSON( meta?: any ): any;
	dispose(): void;

}

export class WebGLExtensions {

	constructor( gl: WebGLRenderingContext );

	get( name: string ): any;

}

export class WebGLShader {

	constructor( gl: WebGLRenderingContext, type: string, string: string );

}

export interface WebGLCapabilitiesParameters {
	precision?: string;
	logarithmicDepthBuffer?: boolean;
}

export class WebGLCapabilities {

	constructor(
		gl: WebGLRenderingContext,
		extensions: any,
		parameters: WebGLCapabilitiesParameters
	);

	readonly isWebGL2: true;
	precision: string;
	logarithmicDepthBuffer: boolean;
	maxTextures: number;
	maxVertexTextures: number;
	maxTextureSize: number;
	maxCubemapSize: number;
	maxAttributes: number;
	maxVertexUniforms: number;
	maxVaryings: number;
	maxFragmentUniforms: number;
	vertexTextures: boolean;
	floatFragmentTextures: boolean;
	floatVertexTextures: boolean;

	getMaxAnisotropy(): number;
	getMaxPrecision( precision: string ): string;

}


/**
 * 4D vector.
 *
 * ( class Vector4 implements Vector<Vector4> )
 */
export class Vector4 implements Vector {

	constructor( x?: number, y?: number, z?: number, w?: number );

	x: number;
	y: number;
	z: number;
	w: number;
	width: number;
	height: number;
	readonly isVector4: true;

	/**
	 * Sets value of this vector.
	 */
	set( x: number, y: number, z: number, w: number ): this;

	/**
	 * Sets all values of this vector.
	 */
	setScalar( scalar: number ): this;

	/**
	 * Sets X component of this vector.
	 */
	setX( x: number ): this;

	/**
	 * Sets Y component of this vector.
	 */
	setY( y: number ): this;

	/**
	 * Sets Z component of this vector.
	 */
	setZ( z: number ): this;

	/**
	 * Sets w component of this vector.
	 */
	setW( w: number ): this;

	setComponent( index: number, value: number ): this;

	getComponent( index: number ): number;

	/**
	 * Clones this vector.
	 */
	clone(): this;

	/**
	 * Copies value of v to this vector.
	 */
	copy( v: Vector4 ): this;

	/**
	 * Adds v to this vector.
	 */
	add( v: Vector4, w?: Vector4 ): this;

	addScalar( scalar: number ): this;

	/**
	 * Sets this vector to a + b.
	 */
	addVectors( a: Vector4, b: Vector4 ): this;

	addScaledVector( v: Vector4, s: number ): this;
	/**
	 * Subtracts v from this vector.
	 */
	sub( v: Vector4 ): this;

	subScalar( s: number ): this;

	/**
	 * Sets this vector to a - b.
	 */
	subVectors( a: Vector4, b: Vector4 ): this;

	/**
	 * Multiplies this vector by scalar s.
	 */
	multiplyScalar( s: number ): this;

	applyMatrix4( m: Matrix4 ): this;

	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0, 0 ) if s == 0.
	 */
	divideScalar( s: number ): this;

	/**
	 * http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
	 * @param q is assumed to be normalized
	 */
	setAxisAngleFromQuaternion( q: Quaternion ): this;

	/**
	 * http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
	 * @param m assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
	 */
	setAxisAngleFromRotationMatrix( m: Matrix3 ): this;

	min( v: Vector4 ): this;
	max( v: Vector4 ): this;
	clamp( min: Vector4, max: Vector4 ): this;
	clampScalar( min: number, max: number ): this;
	floor(): this;
	ceil(): this;
	round(): this;
	roundToZero(): this;

	/**
	 * Inverts this vector.
	 */
	negate(): this;

	/**
	 * Computes dot product of this vector and v.
	 */
	dot( v: Vector4 ): number;

	/**
	 * Computes squared length of this vector.
	 */
	lengthSq(): number;

	/**
	 * Computes length of this vector.
	 */
	length(): number;

	/**
	 * Computes the Manhattan length of this vector.
	 *
	 * @return {number}
	 *
	 * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanLength(): number;

	/**
	 * Normalizes this vector.
	 */
	normalize(): this;
	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	setLength( length: number ): this;

	/**
	 * Linearly interpolate between this vector and v with alpha factor.
	 */
	lerp( v: Vector4, alpha: number ): this;

	lerpVectors( v1: Vector4, v2: Vector4, alpha: number ): this;

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals( v: Vector4 ): boolean;

	/**
	 * Sets this vector's x, y, z and w value from the provided array.
	 * @param array the source array.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray( array: number[], offset?: number ): this;

	/**
	 * Sets this vector's x, y, z and w value from the provided array-like.
	 * @param array the source array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	fromArray( array: ArrayLike<number>, offset?: number ): this;

	/**
	 * Returns an array [x, y, z, w], or copies x, y, z and w into the provided array.
	 * @param array (optional) array to store the vector to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray( array?: number[], offset?: number ): number[];

	/**
	 * Copies x, y, z and w into the provided array-like.
	 * @param array array-like to store the vector to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	toArray( array: ArrayLike<number>, offset?: number ): ArrayLike<number>;

	fromBufferAttribute(
		attribute: BufferAttribute,
		index: number,
		offset?: number
	): this;

}


export class WebGLColorBuffer {

	constructor();

	setMask( colorMask: boolean ): void;
	setLocked( lock: boolean ): void;
	setClear( r: number, g: number, b: number, a: number, premultipliedAlpha: boolean ): void;
	reset(): void;

}

export class WebGLDepthBuffer {

	constructor();

	setTest( depthTest: boolean ): void;
	setMask( depthMask: boolean ): void;
	setFunc( depthFunc: DepthModes ): void;
	setLocked( lock: boolean ): void;
	setClear( depth: number ): void;
	reset(): void;

}

export class WebGLStencilBuffer {

	constructor();

	setTest( stencilTest: boolean ): void;
	setMask( stencilMask: number ): void;
	setFunc( stencilFunc: number, stencilRef: number, stencilMask: number ): void;
	setOp( stencilFail: number, stencilZFail: number, stencilZPass: number ): void;
	setLocked( lock: boolean ): void;
	setClear( stencil: number ): void;
	reset(): void;

}

export class WebGLState {

	constructor( gl: WebGLRenderingContext, extensions: WebGLExtensions, capabilities: WebGLCapabilities );

	buffers: {
		color: WebGLColorBuffer;
		depth: WebGLDepthBuffer;
		stencil: WebGLStencilBuffer;
	};

	initAttributes(): void;
	enableAttribute( attribute: number ): void;
	enableAttributeAndDivisor( attribute: number, meshPerAttribute: number ): void;
	disableUnusedAttributes(): void;
	enable( id: number ): void;
	disable( id: number ): void;
	useProgram( program: any ): boolean;
	setBlending(
		blending: Blending,
		blendEquation?: BlendingEquation,
		blendSrc?: BlendingSrcFactor,
		blendDst?: BlendingDstFactor,
		blendEquationAlpha?: BlendingEquation,
		blendSrcAlpha?: BlendingSrcFactor,
		blendDstAlpha?: BlendingDstFactor,
		premultiplyAlpha?: boolean
	): void;
	setMaterial( material: Material, frontFaceCW: boolean ): void;
	setFlipSided( flipSided: boolean ): void;
	setCullFace( cullFace: CullFace ): void;
	setLineWidth( width: number ): void;
	setPolygonOffset( polygonoffset: boolean, factor: number, units: number ): void;
	setScissorTest( scissorTest: boolean ): void;
	activeTexture( webglSlot: number ): void;
	bindTexture( webglType: number, webglTexture: any ): void;
	unbindTexture(): void;
	// Same interface as https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/compressedTexImage2D
	compressedTexImage2D(
		target: number,
		level: number,
		internalformat: number,
		width: number,
		height: number,
		border: number,
		data: ArrayBufferView
	): void;
	// Same interface as https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
	texImage2D(
		target: number,
		level: number,
		internalformat: number,
		width: number,
		height: number,
		border: number,
		format: number,
		type: number,
		pixels: ArrayBufferView | null
	): void;
	texImage2D(
		target: number,
		level: number,
		internalformat: number,
		format: number,
		type: number,
		source: any
	): void;
	texImage3D(
		target: number,
		level: number,
		internalformat: number,
		width: number,
		height: number,
		depth: number,
		border: number,
		format: number,
		type: number,
		pixels: any
	): void;
	scissor( scissor: Vector4 ): void;
	viewport( viewport: Vector4 ): void;
	reset(): void;

}

export class WebGLProperties {

	constructor();

	get( object: any ): any;
	remove( object: any ): void;
	update( object: any, key: any, value: any ): any;
	dispose(): void;

}

export class WebGLUtils {

	constructor( gl: WebGLRenderingContext | WebGL2RenderingContext, extensions: any, capabilities: any );

	convert( p: any ): void;

}


export class WebGLTextures {

	constructor(
		gl: WebGLRenderingContext,
		extensions: WebGLExtensions,
		state: WebGLState,
		properties: WebGLProperties,
		capabilities: WebGLCapabilities,
		utils: WebGLUtils,
		info: WebGLInfo
	);

	allocateTextureUnit(): void;
	resetTextureUnits(): void;
	setTexture2D( texture: any, slot: number ): void;
	setTexture2DArray( texture: any, slot: number ): void;
	setTexture3D( texture: any, slot: number ): void;
	setTextureCube( texture: any, slot: number ): void;
	setTextureCubeDynamic( texture: any, slot: number ): void;
	setupRenderTarget( renderTarget: any ): void;
	updateRenderTargetMipmap( renderTarget: any ): void;
	updateMultisampleRenderTarget( renderTarget: any ): void;
	safeSetTexture2D( texture: any, slot: number ): void;
	safeSetTextureCube( texture: any, slot: number ): void;

}


export class WebGLUniforms {

	constructor( gl: WebGLRenderingContext, program: WebGLProgram );

	setValue( gl: WebGLRenderingContext, name: string, value: any, textures: WebGLTextures ): void;
	setOptional( gl: WebGLRenderingContext, object: any, name: string ): void;

	static upload( gl: WebGLRenderingContext, seq: any, values: any[], textures: WebGLTextures ): void;
	static seqWithValue( seq: any, values: any[] ): any[];

}


export class WebGLProgram {

	constructor(
		renderer: WebGLRenderer,
		cacheKey: string,
		parameters: object
	);

	name: string;
	id: number;
	cacheKey: string; // unique identifier for this program, used for looking up compiled programs from cache.
	usedTimes: number;
	program: any;
	vertexShader: WebGLShader;
	fragmentShader: WebGLShader;
	/**
	 * @deprecated Use {@link WebGLProgram#getUniforms getUniforms()} instead.
	 */
	uniforms: any;
	/**
	 * @deprecated Use {@link WebGLProgram#getAttributes getAttributes()} instead.
	 */
	attributes: any;

	getUniforms(): WebGLUniforms;
	getAttributes(): any;
	destroy(): void;

}


/**
 * An object with a series of statistical information about the graphics board memory and the rendering process.
 */
export class WebGLInfo {

	constructor( gl: WebGLRenderingContext );

	autoReset: boolean;
	memory: {
		geometries: number;
		textures: number;
	};
	programs: WebGLProgram[] | null;
	render: {
		calls: number;
		frame: number;
		lines: number;
		points: number;
		triangles: number;
	};
	update( count: number, mode: GLenum, instanceCount: number ): void;
	reset(): void;

}


export class WebGLShadowMap {

	constructor(
		_renderer: WebGLRenderer,
		_objects: any[],
		maxTextureSize: number
	);

	enabled: boolean;
	autoUpdate: boolean;
	needsUpdate: boolean;
	type: ShadowMapType;

	render( scene: Scene, camera: Camera ): void;

	/**
	 * @deprecated Use {@link WebGLShadowMap#renderReverseSided .shadowMap.renderReverseSided} instead.
	 */
	cullFace: any;

}


export class Group extends Object3D {

	constructor();
	type: 'Group';
	readonly isGroup: true;

}


/**
 * Triangle face.
 *
 * @source https://github.com/mrdoob/three.js/blob/master/src/core/Face3.js
 */
export class Face3 {

	/**
	 * @param a Vertex A index.
	 * @param b Vertex B index.
	 * @param c Vertex C index.
	 * @param normal Face normal or array of vertex normals.
	 * @param color Face color or array of vertex colors.
	 * @param materialIndex Material index.
	 */
	constructor(
		a: number,
		b: number,
		c: number,
		normal?: Vector3,
		color?: Color,
		materialIndex?: number
	);
	constructor(
		a: number,
		b: number,
		c: number,
		normal?: Vector3,
		vertexColors?: Color[],
		materialIndex?: number
	);
	constructor(
		a: number,
		b: number,
		c: number,
		vertexNormals?: Vector3[],
		color?: Color,
		materialIndex?: number
	);
	constructor(
		a: number,
		b: number,
		c: number,
		vertexNormals?: Vector3[],
		vertexColors?: Color[],
		materialIndex?: number
	);

	/**
	 * Vertex A index.
	 */
	a: number;

	/**
	 * Vertex B index.
	 */
	b: number;

	/**
	 * Vertex C index.
	 */
	c: number;

	/**
	 * Face normal.
	 */
	normal: Vector3;

	/**
	 * Array of 4 vertex normals.
	 */
	vertexNormals: Vector3[];

	/**
	 * Face color.
	 */
	color: Color;

	/**
	 * Array of 4 vertex normals.
	 */
	vertexColors: Color[];

	/**
	 * Material index (points to {@link Geometry.materials}).
	 */
	materialIndex: number;

	clone(): this;
	copy( source: Face3 ): this;

}


export class Ray {

	constructor( origin?: Vector3, direction?: Vector3 );

	origin: Vector3;
	direction: Vector3;

	set( origin: Vector3, direction: Vector3 ): Ray;
	clone(): this;
	copy( ray: Ray ): this;
	at( t: number, target: Vector3 ): Vector3;
	lookAt( v: Vector3 ): Ray;
	recast( t: number ): Ray;
	closestPointToPoint( point: Vector3, target: Vector3 ): Vector3;
	distanceToPoint( point: Vector3 ): number;
	distanceSqToPoint( point: Vector3 ): number;
	distanceSqToSegment(
		v0: Vector3,
		v1: Vector3,
		optionalPointOnRay?: Vector3,
		optionalPointOnSegment?: Vector3
	): number;
	intersectSphere( sphere: Sphere, target: Vector3 ): Vector3 | null;
	intersectsSphere( sphere: Sphere ): boolean;
	distanceToPlane( plane: Plane ): number;
	intersectPlane( plane: Plane, target: Vector3 ): Vector3 | null;
	intersectsPlane( plane: Plane ): boolean;
	intersectBox( box: Box3, target: Vector3 ): Vector3 | null;
	intersectsBox( box: Box3 ): boolean;
	intersectTriangle(
		a: Vector3,
		b: Vector3,
		c: Vector3,
		backfaceCulling: boolean,
		target: Vector3
	): Vector3 | null;
	applyMatrix4( matrix4: Matrix4 ): Ray;
	equals( ray: Ray ): boolean;

	/**
	 * @deprecated Use {@link Ray#intersectsBox .intersectsBox()} instead.
	 */
	isIntersectionBox( b: any ): any;

	/**
	 * @deprecated Use {@link Ray#intersectsPlane .intersectsPlane()} instead.
	 */
	isIntersectionPlane( p: any ): any;

	/**
	 * @deprecated Use {@link Ray#intersectsSphere .intersectsSphere()} instead.
	 */
	isIntersectionSphere( s: any ): any;

}


export interface Intersection {
	distance: number;
	distanceToRay?: number;
	point: Vector3;
	index?: number;
	face?: Face3 | null;
	faceIndex?: number;
	object: Object3D;
	uv?: Vector2;
	instanceId?: number;
}

export interface RaycasterParameters {
	Mesh?: any;
	Line?: { threshold: number };
	LOD?: any;
	Points?: { threshold: number };
	Sprite?: any;
}

export class Raycaster {

	/**
	 * This creates a new raycaster object.
	 * @param origin The origin vector where the ray casts from.
	 * @param direction The direction vector that gives direction to the ray. Should be normalized.
	 * @param near All results returned are further away than near. Near can't be negative. Default value is 0.
	 * @param far All results returned are closer then far. Far can't be lower then near . Default value is Infinity.
	 */
	constructor(
		origin?: Vector3,
		direction?: Vector3,
		near?: number,
		far?: number
	);

	/** The Ray used for the raycasting. */
	ray: Ray;

	/**
	 * The near factor of the raycaster. This value indicates which objects can be discarded based on the
	 * distance. This value shouldn't be negative and should be smaller than the far property.
	 */
	near: number;

	/**
	 * The far factor of the raycaster. This value indicates which objects can be discarded based on the
	 * distance. This value shouldn't be negative and should be larger than the near property.
	 */
	far: number;

	/**
	 * The camera to use when raycasting against view-dependent objects such as billboarded objects like Sprites. This field
	 * can be set manually or is set when calling "setFromCamera".
	 */
	camera: Camera;

	/**
	 * Used by Raycaster to selectively ignore 3D objects when performing intersection tests.
	 */
	layers: Layers;

	params: RaycasterParameters;

	/**
	 * Updates the ray with a new origin and direction.
	 * @param origin The origin vector where the ray casts from.
	 * @param direction The normalized direction vector that gives direction to the ray.
	 */
	set( origin: Vector3, direction: Vector3 ): void;

	/**
	 * Updates the ray with a new origin and direction.
	 * @param coords 2D coordinates of the mouse, in normalized device coordinates (NDC)---X and Y components should be between -1 and 1.
	 * @param camera camera from which the ray should originate
	 */
	setFromCamera( coords: { x: number; y: number }, camera: Camera ): void;

	/**
	 * Checks all intersection between the ray and the object with or without the descendants. Intersections are returned sorted by distance, closest first.
	 * @param object The object to check for intersection with the ray.
	 * @param recursive If true, it also checks all descendants. Otherwise it only checks intersecton with the object. Default is false.
	 * @param optionalTarget (optional) target to set the result. Otherwise a new Array is instantiated. If set, you must clear this array prior to each call (i.e., array.length = 0;).
	 */
	intersectObject(
		object: Object3D,
		recursive?: boolean,
		optionalTarget?: Intersection[]
	): Intersection[];

	/**
	 * Checks all intersection between the ray and the objects with or without the descendants. Intersections are returned sorted by distance, closest first. Intersections are of the same form as those returned by .intersectObject.
	 * @param objects The objects to check for intersection with the ray.
	 * @param recursive If true, it also checks all descendants of the objects. Otherwise it only checks intersecton with the objects. Default is false.
	 * @param optionalTarget (optional) target to set the result. Otherwise a new Array is instantiated. If set, you must clear this array prior to each call (i.e., array.length = 0;).
	 */
	intersectObjects(
		objects: Object3D[],
		recursive?: boolean,
		optionalTarget?: Intersection[]
	): Intersection[];

}


export class Mesh extends Object3D {

	constructor(
		geometry?: Geometry | BufferGeometry,
		material?: Material | Material[]
	);

	geometry: Geometry | BufferGeometry;
	material: Material | Material[];
	morphTargetInfluences?: number[];
	morphTargetDictionary?: { [key: string]: number };
	readonly isMesh: true;
	type: string;

	updateMorphTargets(): void;
	raycast( raycaster: Raycaster, intersects: Intersection[] ): void;

}


// Objects //////////////////////////////////////////////////////////////////////////////////

export class Bone extends Object3D {

	constructor();
	readonly isBone: true;
	type: 'Bone';

}

export abstract class Interpolant {

	constructor(
		parameterPositions: any,
		sampleValues: any,
		sampleSize: number,
		resultBuffer?: any
	);

	parameterPositions: any;
	sampleValues: any;
	valueSize: number;
	resultBuffer: any;

	evaluate( time: number ): any;

}


export class DiscreteInterpolant extends Interpolant {

	constructor(
		parameterPositions: any,
		samplesValues: any,
		sampleSize: number,
		resultBuffer?: any
	);

	interpolate_( i1: number, t0: number, t: number, t1: number ): any;

}


export class LinearInterpolant extends Interpolant {

	constructor(
		parameterPositions: any,
		samplesValues: any,
		sampleSize: number,
		resultBuffer?: any
	);

	interpolate_( i1: number, t0: number, t: number, t1: number ): any;

}


export class CubicInterpolant extends Interpolant {

	constructor(
		parameterPositions: any,
		samplesValues: any,
		sampleSize: number,
		resultBuffer?: any
	);

	interpolate_( i1: number, t0: number, t: number, t1: number ): any;

}


export class KeyframeTrack {

	constructor(
		name: string,
		times: any[],
		values: any[],
		interpolation?: InterpolationModes
	);

	name: string;
	times: Float32Array;
	values: Float32Array;

	ValueTypeName: string;
	TimeBufferType: Float32Array;
	ValueBufferType: Float32Array;

	DefaultInterpolation: InterpolationModes;

	InterpolantFactoryMethodDiscrete( result: any ): DiscreteInterpolant;
	InterpolantFactoryMethodLinear( result: any ): LinearInterpolant;
	InterpolantFactoryMethodSmooth( result: any ): CubicInterpolant;

	setInterpolation( interpolation: InterpolationModes ): KeyframeTrack;
	getInterpolation(): InterpolationModes;

	getValueSize(): number;

	shift( timeOffset: number ): KeyframeTrack;
	scale( timeScale: number ): KeyframeTrack;
	trim( startTime: number, endTime: number ): KeyframeTrack;
	validate(): boolean;
	optimize(): KeyframeTrack;
	clone(): KeyframeTrack;

	static toJSON( track: KeyframeTrack ): any;

}


export class AnimationClip {

	constructor( name?: string, duration?: number, tracks?: KeyframeTrack[] );

	name: string;
	tracks: KeyframeTrack[];
	duration: number;
	uuid: string;
	results: any[];

	resetDuration(): AnimationClip;
	trim(): AnimationClip;
	validate(): boolean;
	optimize(): AnimationClip;
	clone(): AnimationClip;

	static CreateFromMorphTargetSequence(
		name: string,
		morphTargetSequence: MorphTarget[],
		fps: number,
		noLoop: boolean
	): AnimationClip;
	static findByName( clipArray: AnimationClip[], name: string ): AnimationClip;
	static CreateClipsFromMorphTargetSequences(
		morphTargets: MorphTarget[],
		fps: number,
		noLoop: boolean
	): AnimationClip[];
	static parse( json: any ): AnimationClip;
	static parseAnimation(
		animation: any,
		bones: Bone[],
		nodeName: string
	): AnimationClip;
	static toJSON(): any;

}


/**
 * @deprecated Use {@link Face3} instead.
 */

export interface MorphTarget {
	name: string;
	vertices: Vector3[];
}

export interface MorphColor {
	name: string;
	colors: Color[];
}

export interface MorphNormals {
	name: string;
	normals: Vector3[];
}

export let GeometryIdCount: number;

/**
 * Base class for geometries
 *
 * @see https://github.com/mrdoob/three.js/blob/master/src/core/Geometry.js
 */
export class Geometry extends EventDispatcher {

	constructor();

	/**
	 * Unique number of this geometry instance
	 */
	id: number;

	uuid: string;

	readonly isGeometry: true;

	/**
	 * Name for this geometry. Default is an empty string.
	 */
	name: string;

	type: string;

	/**
	 * The array of vertices hold every position of points of the model.
	 * To signal an update in this array, Geometry.verticesNeedUpdate needs to be set to true.
	 */
	vertices: Vector3[];

	/**
	 * Array of vertex colors, matching number and order of vertices.
	 * Used in ParticleSystem, Line and Ribbon.
	 * Meshes use per-face-use-of-vertex colors embedded directly in faces.
	 * To signal an update in this array, Geometry.colorsNeedUpdate needs to be set to true.
	 */
	colors: Color[];

	/**
	 * Array of triangles or/and quads.
	 * The array of faces describe how each vertex in the model is connected with each other.
	 * To signal an update in this array, Geometry.elementsNeedUpdate needs to be set to true.
	 */
	faces: Face3[];

	/**
	 * Array of face UV layers.
	 * Each UV layer is an array of UV matching order and number of vertices in faces.
	 * To signal an update in this array, Geometry.uvsNeedUpdate needs to be set to true.
	 */
	faceVertexUvs: Vector2[][][];

	/**
	 * Array of morph targets. Each morph target is a Javascript object:
	 *
	 *		 { name: "targetName", vertices: [ new THREE.Vector3(), ... ] }
	 *
	 * Morph vertices match number and order of primary vertices.
	 */
	morphTargets: MorphTarget[];

	/**
	 * Array of morph normals. Morph normals have similar structure as morph targets, each normal set is a Javascript object:
	 *
	 *		 morphNormal = { name: "NormalName", normals: [ new THREE.Vector3(), ... ] }
	 */
	morphNormals: MorphNormals[];

	/**
	 * Array of skinning weights, matching number and order of vertices.
	 */
	skinWeights: Vector4[];

	/**
	 * Array of skinning indices, matching number and order of vertices.
	 */
	skinIndices: Vector4[];

	/**
	 *
	 */
	lineDistances: number[];

	/**
	 * Bounding box.
	 */
	boundingBox: Box3 | null;

	/**
	 * Bounding sphere.
	 */
	boundingSphere: Sphere | null;

	/**
	 * Set to true if the vertices array has been updated.
	 */
	verticesNeedUpdate: boolean;

	/**
	 * Set to true if the faces array has been updated.
	 */
	elementsNeedUpdate: boolean;

	/**
	 * Set to true if the uvs array has been updated.
	 */
	uvsNeedUpdate: boolean;

	/**
	 * Set to true if the normals array has been updated.
	 */
	normalsNeedUpdate: boolean;

	/**
	 * Set to true if the colors array has been updated.
	 */
	colorsNeedUpdate: boolean;

	/**
	 * Set to true if the linedistances array has been updated.
	 */
	lineDistancesNeedUpdate: boolean;

	/**
	 *
	 */
	groupsNeedUpdate: boolean;

	/**
	 * Bakes matrix transform directly into vertex coordinates.
	 */
	applyMatrix4( matrix: Matrix4 ): Geometry;

	rotateX( angle: number ): Geometry;
	rotateY( angle: number ): Geometry;
	rotateZ( angle: number ): Geometry;

	translate( x: number, y: number, z: number ): Geometry;
	scale( x: number, y: number, z: number ): Geometry;
	lookAt( vector: Vector3 ): void;

	fromBufferGeometry( geometry: BufferGeometry ): Geometry;

	center(): Geometry;

	normalize(): Geometry;

	/**
	 * Computes face normals.
	 */
	computeFaceNormals(): void;

	/**
	 * Computes vertex normals by averaging face normals.
	 * Face normals must be existing / computed beforehand.
	 */
	computeVertexNormals( areaWeighted?: boolean ): void;

	/**
	 * Compute vertex normals, but duplicating face normals.
	 */
	computeFlatVertexNormals(): void;

	/**
	 * Computes morph normals.
	 */
	computeMorphNormals(): void;

	/**
	 * Computes bounding box of the geometry, updating {@link Geometry.boundingBox} attribute.
	 */
	computeBoundingBox(): void;

	/**
	 * Computes bounding sphere of the geometry, updating Geometry.boundingSphere attribute.
	 * Neither bounding boxes or bounding spheres are computed by default. They need to be explicitly computed, otherwise they are null.
	 */
	computeBoundingSphere(): void;

	merge(
		geometry: Geometry,
		matrix?: Matrix,
		materialIndexOffset?: number
	): void;

	mergeMesh( mesh: Mesh ): void;

	/**
	 * Checks for duplicate vertices using hashmap.
	 * Duplicated vertices are removed and faces' vertices are updated.
	 */
	mergeVertices(): number;

	setFromPoints( points: Array<Vector2> | Array<Vector3> ): this;

	sortFacesByMaterialIndex(): void;

	toJSON(): any;

	/**
	 * Creates a new clone of the Geometry.
	 */
	clone(): this;

	copy( source: Geometry ): this;

	/**
	 * Removes The object from memory.
	 * Don't forget to call this method when you remove an geometry because it can cuase meomory leaks.
	 */
	dispose(): void;

	// These properties do not exist in a normal Geometry class, but if you use the instance that was passed by JSONLoader, it will be added.
	bones: Bone[];
	animation: AnimationClip;
	animations: AnimationClip[];

}

/**
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/DirectGeometry.js">src/core/DirectGeometry.js</a>
 */
export class DirectGeometry {

	constructor();

	id: number;
	uuid: string;
	name: string;
	type: string;
	indices: number[];
	vertices: Vector3[];
	normals: Vector3[];
	colors: Color[];
	uvs: Vector2[];
	uvs2: Vector2[];
	groups: { start: number; materialIndex: number }[];
	morphTargets: MorphTarget[];
	skinWeights: Vector4[];
	skinIndices: Vector4[];
	boundingBox: Box3 | null;
	boundingSphere: Sphere | null;
	verticesNeedUpdate: boolean;
	normalsNeedUpdate: boolean;
	colorsNeedUpdate: boolean;
	uvsNeedUpdate: boolean;
	groupsNeedUpdate: boolean;

	computeBoundingBox(): void;
	computeBoundingSphere(): void;
	computeGroups( geometry: Geometry ): void;
	fromGeometry( geometry: Geometry ): DirectGeometry;
	dispose(): void;

}


/**
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/InterleavedBuffer.js">src/core/InterleavedBuffer.js</a>
 */
export class InterleavedBuffer {

	constructor( array: ArrayLike<number>, stride: number );

	array: ArrayLike<number>;
	stride: number;
	usage: Usage;
	updateRange: { offset: number; count: number };
	version: number;
	length: number;
	count: number;
	needsUpdate: boolean;

	setUsage( usage: Usage ): InterleavedBuffer;
	clone(): this;
	copy( source: InterleavedBuffer ): this;
	copyAt(
		index1: number,
		attribute: InterleavedBufferAttribute,
		index2: number
	): InterleavedBuffer;
	set( value: ArrayLike<number>, index: number ): InterleavedBuffer;

}

/**
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/InterleavedBufferAttribute.js">src/core/InterleavedBufferAttribute.js</a>
 */
export class InterleavedBufferAttribute {

	constructor(
		interleavedBuffer: InterleavedBuffer,
		itemSize: number,
		offset: number,
		normalized?: boolean
	);

	data: InterleavedBuffer;
	itemSize: number;
	offset: number;
	normalized: boolean;

	get count(): number;
	get array(): ArrayLike<number>;

	readonly isInterleavedBufferAttribute: true;

	applyMatrix4( m: Matrix4 ): this;
	getX( index: number ): number;
	setX( index: number, x: number ): InterleavedBufferAttribute;
	getY( index: number ): number;
	setY( index: number, y: number ): InterleavedBufferAttribute;
	getZ( index: number ): number;
	setZ( index: number, z: number ): InterleavedBufferAttribute;
	getW( index: number ): number;
	setW( index: number, z: number ): InterleavedBufferAttribute;
	setXY( index: number, x: number, y: number ): InterleavedBufferAttribute;
	setXYZ(
		index: number,
		x: number,
		y: number,
		z: number
	): InterleavedBufferAttribute;
	setXYZW(
		index: number,
		x: number,
		y: number,
		z: number,
		w: number
	): InterleavedBufferAttribute;

}


/**
 * This is a superefficent class for geometries because it saves all data in buffers.
 * It reduces memory costs and cpu cycles. But it is not as easy to work with because of all the necessary buffer calculations.
 * It is mainly interesting when working with static objects.
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/BufferGeometry.js">src/core/BufferGeometry.js</a>
 */
export class BufferGeometry extends EventDispatcher {

	/**
	 * This creates a new BufferGeometry. It also sets several properties to an default value.
	 */
	constructor();

	static MaxIndex: number;

	/**
	 * Unique number of this buffergeometry instance
	 */
	id: number;
	uuid: string;
	name: string;
	type: string;
	index: BufferAttribute | null;
	attributes: {
		[name: string]: BufferAttribute | InterleavedBufferAttribute;
	};
	morphAttributes: {
		[name: string]: ( BufferAttribute | InterleavedBufferAttribute )[];
	};
	morphTargetsRelative: boolean;
	groups: { start: number; count: number; materialIndex?: number }[];
	boundingBox: Box3 | null;
	boundingSphere: Sphere | null;
	drawRange: { start: number; count: number };
	userData: {[key: string]: any};
	readonly isBufferGeometry: true;

	getIndex(): BufferAttribute | null;
	setIndex( index: BufferAttribute | number[] | null ): void;

	setAttribute( name: string, attribute: BufferAttribute | InterleavedBufferAttribute ): BufferGeometry;
	getAttribute( name: string ): BufferAttribute | InterleavedBufferAttribute;
	deleteAttribute( name: string ): BufferGeometry;

	addGroup( start: number, count: number, materialIndex?: number ): void;
	clearGroups(): void;

	setDrawRange( start: number, count: number ): void;

	/**
	 * Bakes matrix transform directly into vertex coordinates.
	 */
	applyMatrix4( matrix: Matrix4 ): BufferGeometry;

	rotateX( angle: number ): BufferGeometry;
	rotateY( angle: number ): BufferGeometry;
	rotateZ( angle: number ): BufferGeometry;
	translate( x: number, y: number, z: number ): BufferGeometry;
	scale( x: number, y: number, z: number ): BufferGeometry;
	lookAt( v: Vector3 ): void;

	center(): BufferGeometry;

	setFromObject( object: Object3D ): BufferGeometry;
	setFromPoints( points: Vector3[] | Vector2[] ): BufferGeometry;
	updateFromObject( object: Object3D ): void;

	fromGeometry( geometry: Geometry, settings?: any ): BufferGeometry;

	fromDirectGeometry( geometry: DirectGeometry ): BufferGeometry;

	/**
	 * Computes bounding box of the geometry, updating Geometry.boundingBox attribute.
	 * Bounding boxes aren't computed by default. They need to be explicitly computed, otherwise they are null.
	 */
	computeBoundingBox(): void;

	/**
	 * Computes bounding sphere of the geometry, updating Geometry.boundingSphere attribute.
	 * Bounding spheres aren't' computed by default. They need to be explicitly computed, otherwise they are null.
	 */
	computeBoundingSphere(): void;

	/**
	 * Computes vertex normals by averaging face normals.
	 */
	computeVertexNormals(): void;

	merge( geometry: BufferGeometry, offset?: number ): BufferGeometry;
	normalizeNormals(): void;

	toNonIndexed(): BufferGeometry;

	toJSON(): any;
	clone(): this;
	copy( source: BufferGeometry ): this;

	/**
	 * Disposes the object from memory.
	 * You need to call this when you want the bufferGeometry removed while the application is running.
	 */
	dispose(): void;

	/**
	 * @deprecated Use {@link BufferGeometry#groups .groups} instead.
	 */
	drawcalls: any;

	/**
	 * @deprecated Use {@link BufferGeometry#groups .groups} instead.
	 */
	offsets: any;

	/**
	 * @deprecated Use {@link BufferGeometry#setIndex .setIndex()} instead.
	 */
	addIndex( index: any ): void;

	/**
	 * @deprecated Use {@link BufferGeometry#addGroup .addGroup()} instead.
	 */
	addDrawCall( start: any, count: any, indexOffset?: any ): void;

	/**
	 * @deprecated Use {@link BufferGeometry#clearGroups .clearGroups()} instead.
	 */
	clearDrawCalls(): void;

	/**
	 * @deprecated Use {@link BufferGeometry#setAttribute .setAttribute()} instead.
	 */
	addAttribute(
		name: string,
		attribute: BufferAttribute | InterleavedBufferAttribute
	): BufferGeometry;

	/**
	 * @deprecated Use {@link BufferGeometry#deleteAttribute .deleteAttribute()} instead.
	 */
	removeAttribute( name: string ): BufferGeometry;

	addAttribute( name: any, array: any, itemSize: any ): any;

}


export interface RenderTarget {} // not defined in the code, used in LightShadow and WebGRenderer classes

export interface RenderItem {
	id: number;
	object: Object3D;
	geometry: BufferGeometry | null;
	material: Material;
	program: WebGLProgram;
	groupOrder: number;
	renderOrder: number;
	z: number;
	group: Group | null;
}

export class WebGLRenderList {

	opaque: Array<RenderItem>;
	transparent: Array<RenderItem>;
	init(): void;
	push(
		object: Object3D,
		geometry: BufferGeometry | null,
		material: Material,
		groupOrder: number,
		z: number,
		group: Group | null
	): void;
	unshift(
		object: Object3D,
		geometry: BufferGeometry | null,
		material: Material,
		groupOrder: number,
		z: number,
		group: Group | null
	): void;
	sort(): void;

}

export class WebGLRenderLists {

	dispose(): void;
	get( scene: Scene, camera: Camera ): WebGLRenderList;

}

	Mapping,
	Wrapping,
	TextureFilter,
	TextureDataType,
} from '../constants';

export class DepthTexture extends Texture {

	constructor(
		width: number,
		heighht: number,
		type?: TextureDataType,
		mapping?: Mapping,
		wrapS?: Wrapping,
		wrapT?: Wrapping,
		magFilter?: TextureFilter,
		minFilter?: TextureFilter,
		anisotropy?: number
	);

	image: { width: number; height: number };

}


export interface WebGLRenderTargetOptions {
	wrapS?: Wrapping;
	wrapT?: Wrapping;
	magFilter?: TextureFilter;
	minFilter?: TextureFilter;
	format?: number; // RGBAFormat;
	type?: TextureDataType; // UnsignedByteType;
	anisotropy?: number; // 1;
	depthBuffer?: boolean; // true;
	stencilBuffer?: boolean; // true;
	generateMipmaps?: boolean; // true;
	depthTexture?: DepthTexture;
}

export class WebGLRenderTarget extends EventDispatcher {

	constructor(
		width: number,
		height: number,
		options?: WebGLRenderTargetOptions
	);

	uuid: string;
	width: number;
	height: number;
	scissor: Vector4;
	scissorTest: boolean;
	viewport: Vector4;
	texture: Texture;
	depthBuffer: boolean;
	stencilBuffer: boolean;
	depthTexture: DepthTexture;
	readonly isWebGLRenderTarget: true;

	/**
	 * @deprecated Use {@link Texture#wrapS texture.wrapS} instead.
	 */
	wrapS: any;
	/**
	 * @deprecated Use {@link Texture#wrapT texture.wrapT} instead.
	 */
	wrapT: any;
	/**
	 * @deprecated Use {@link Texture#magFilter texture.magFilter} instead.
	 */
	magFilter: any;
	/**
	 * @deprecated Use {@link Texture#minFilter texture.minFilter} instead.
	 */
	minFilter: any;
	/**
	 * @deprecated Use {@link Texture#anisotropy texture.anisotropy} instead.
	 */
	anisotropy: any;
	/**
	 * @deprecated Use {@link Texture#offset texture.offset} instead.
	 */
	offset: any;
	/**
	 * @deprecated Use {@link Texture#repeat texture.repeat} instead.
	 */
	repeat: any;
	/**
	 * @deprecated Use {@link Texture#format texture.format} instead.
	 */
	format: any;
	/**
	 * @deprecated Use {@link Texture#type texture.type} instead.
	 */
	type: any;
	/**
	 * @deprecated Use {@link Texture#generateMipmaps texture.generateMipmaps} instead.
	 */
	generateMipmaps: any;

	setSize( width: number, height: number ): void;
	clone(): this;
	copy( source: WebGLRenderTarget ): this;
	dispose(): void;

}


export class WebXRManager {

	constructor( renderer: any, gl: WebGLRenderingContext );

	enabled: boolean;
	isPresenting: boolean;
	getController( id: number ): Group;
	getControllerGrip( id: number ): Group;
	setFramebufferScaleFactor( value: number ): void;
	setReferenceSpaceType( value: string ): void;
	getReferenceSpace(): any;
	getSession(): any;
	setSession( value: any ): void;
	getCamera( camera: Camera ): Camera;
	setAnimationLoop( callback: Function ): void;
	dispose(): void;

}


export interface Renderer {
	domElement: HTMLCanvasElement;

	render( scene: Scene, camera: Camera ): void;
	setSize( width: number, height: number, updateStyle?: boolean ): void;
}

export interface WebGLRendererParameters {
	/**
	 * A Canvas where the renderer draws its output.
	 */
	canvas?: HTMLCanvasElement | OffscreenCanvas;

	/**
	 * A WebGL Rendering Context.
	 * (https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext)
	 *	Default is null
	 */
	context?: WebGLRenderingContext;

	/**
	 *	shader precision. Can be "highp", "mediump" or "lowp".
	 */
	precision?: string;

	/**
	 * default is false.
	 */
	alpha?: boolean;

	/**
	 * default is true.
	 */
	premultipliedAlpha?: boolean;

	/**
	 * default is false.
	 */
	antialias?: boolean;

	/**
	 * default is true.
	 */
	stencil?: boolean;

	/**
	 * default is false.
	 */
	preserveDrawingBuffer?: boolean;

	/**
	 *	Can be "high-performance", "low-power" or "default"
	 */
	powerPreference?: string;

	/**
	 * default is true.
	 */
	depth?: boolean;

	/**
	 * default is false.
	 */
	logarithmicDepthBuffer?: boolean;
}

export interface WebGLDebug {

	/**
	 * Enables error checking and reporting when shader programs are being compiled.
	 */
	checkShaderErrors: boolean;

}

/**
 * The WebGL renderer displays your beautifully crafted scenes using WebGL, if your device supports it.
 * This renderer has way better performance than CanvasRenderer.
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js">src/renderers/WebGLRenderer.js</a>
 */
export class WebGLRenderer implements Renderer {

	/**
	 * parameters is an optional object with properties defining the renderer's behaviour. The constructor also accepts no parameters at all. In all cases, it will assume sane defaults when parameters are missing.
	 */
	constructor( parameters?: WebGLRendererParameters );

	/**
	 * A Canvas where the renderer draws its output.
	 * This is automatically created by the renderer in the constructor (if not provided already); you just need to add it to your page.
	 */
	domElement: HTMLCanvasElement;

	/**
	 * The HTML5 Canvas's 'webgl' context obtained from the canvas where the renderer will draw.
	 */
	context: WebGLRenderingContext;

	/**
	 * Defines whether the renderer should automatically clear its output before rendering.
	 */
	autoClear: boolean;

	/**
	 * If autoClear is true, defines whether the renderer should clear the color buffer. Default is true.
	 */
	autoClearColor: boolean;

	/**
	 * If autoClear is true, defines whether the renderer should clear the depth buffer. Default is true.
	 */
	autoClearDepth: boolean;

	/**
	 * If autoClear is true, defines whether the renderer should clear the stencil buffer. Default is true.
	 */
	autoClearStencil: boolean;

	/**
	 * Debug configurations.
	 */
	debug: WebGLDebug;

	/**
	 * Defines whether the renderer should sort objects. Default is true.
	 */
	sortObjects: boolean;

	clippingPlanes: any[];
	localClippingEnabled: boolean;

	extensions: WebGLExtensions;

	/**
	 * Default is LinearEncoding.
	 */
	outputEncoding: TextureEncoding;

	physicallyCorrectLights: boolean;
	toneMapping: ToneMapping;
	toneMappingExposure: number;
	toneMappingWhitePoint: number;

	/**
	 * Default is false.
	 */
	shadowMapDebug: boolean;

	/**
	 * Default is 8.
	 */
	maxMorphTargets: number;

	/**
	 * Default is 4.
	 */
	maxMorphNormals: number;

	info: WebGLInfo;

	shadowMap: WebGLShadowMap;

	pixelRatio: number;

	capabilities: WebGLCapabilities;
	properties: WebGLProperties;
	renderLists: WebGLRenderLists;
	state: WebGLState;

	xr: WebXRManager;

	/**
	 * Return the WebGL context.
	 */
	getContext(): WebGLRenderingContext;
	getContextAttributes(): any;
	forceContextLoss(): void;

	/**
	 * @deprecated Use {@link WebGLCapabilities#getMaxAnisotropy .capabilities.getMaxAnisotropy()} instead.
	 */
	getMaxAnisotropy(): number;

	/**
	 * @deprecated Use {@link WebGLCapabilities#precision .capabilities.precision} instead.
	 */
	getPrecision(): string;

	getPixelRatio(): number;
	setPixelRatio( value: number ): void;

	getDrawingBufferSize( target: Vector2 ): Vector2;
	setDrawingBufferSize( width: number, height: number, pixelRatio: number ): void;

	getSize( target: Vector2 ): Vector2;

	/**
	 * Resizes the output canvas to (width, height), and also sets the viewport to fit that size, starting in (0, 0).
	 */
	setSize( width: number, height: number, updateStyle?: boolean ): void;

	getCurrentViewport( target: Vector4 ): Vector4;

	/**
	 * Copies the viewport into target.
	 */
	getViewport( target: Vector4 ): Vector4;

	/**
	 * Sets the viewport to render from (x, y) to (x + width, y + height).
	 * (x, y) is the lower-left corner of the region.
	 */
	setViewport( x: Vector4 | number, y?: number, width?: number, height?: number ): void;

	/**
	 * Copies the scissor area into target.
	 */
	getScissor( target: Vector4 ): Vector4;

	/**
	 * Sets the scissor area from (x, y) to (x + width, y + height).
	 */
	setScissor( x: Vector4 | number, y?: number, width?: number, height?: number ): void;

	/**
	 * Returns true if scissor test is enabled; returns false otherwise.
	 */
	getScissorTest(): boolean;

	/**
	 * Enable the scissor test. When this is enabled, only the pixels within the defined scissor area will be affected by further renderer actions.
	 */
	setScissorTest( enable: boolean ): void;

	/**
	 * Sets the custom opaque sort function for the WebGLRenderLists. Pass null to use the default painterSortStable function.
	 */
	setOpaqueSort( method: Function ): void;

	/**
	 * Sets the custom transparent sort function for the WebGLRenderLists. Pass null to use the default reversePainterSortStable function.
	 */
	setTransparentSort( method: Function ): void;

	/**
	 * Returns a THREE.Color instance with the current clear color.
	 */
	getClearColor(): Color;

	/**
	 * Sets the clear color, using color for the color and alpha for the opacity.
	 */
	setClearColor( color: Color, alpha?: number ): void;
	setClearColor( color: string, alpha?: number ): void;
	setClearColor( color: number, alpha?: number ): void;

	/**
	 * Returns a float with the current clear alpha. Ranges from 0 to 1.
	 */
	getClearAlpha(): number;

	setClearAlpha( alpha: number ): void;

	/**
	 * Tells the renderer to clear its color, depth or stencil drawing buffer(s).
	 * Arguments default to true
	 */
	clear( color?: boolean, depth?: boolean, stencil?: boolean ): void;

	clearColor(): void;
	clearDepth(): void;
	clearStencil(): void;
	clearTarget(
		renderTarget: WebGLRenderTarget,
		color: boolean,
		depth: boolean,
		stencil: boolean
	): void;

	/**
	 * @deprecated Use {@link WebGLState#reset .state.reset()} instead.
	 */
	resetGLState(): void;
	dispose(): void;

	renderBufferImmediate(
		object: Object3D,
		program: WebGLProgram,
	): void;

	renderBufferDirect(
		camera: Camera,
		scene: Scene,
		geometry: Geometry | BufferGeometry,
		material: Material,
		object: Object3D,
		geometryGroup: any
	): void;

	/**
	 * A build in function that can be used instead of requestAnimationFrame. For WebXR projects this function must be used.
	 * @param callback The function will be called every available frame. If `null` is passed it will stop any already ongoing animation.
	 */
	setAnimationLoop( callback: Function | null ): void;

	/**
	 * @deprecated Use {@link WebGLRenderer#setAnimationLoop .setAnimationLoop()} instead.
	 */
	animate( callback: Function ): void;

	/**
	 * Compiles all materials in the scene with the camera. This is useful to precompile shaders before the first rendering.
	 */
	compile(
		scene: Scene,
		camera: Camera
	): void;

	/**
	 * Render a scene using a camera.
	 * The render is done to a previously specified {@link WebGLRenderTarget#renderTarget .renderTarget} set by calling
	 * {@link WebGLRenderer#setRenderTarget .setRenderTarget} or to the canvas as usual.
	 *
	 * By default render buffers are cleared before rendering but you can prevent this by setting the property
	 * {@link WebGLRenderer#autoClear autoClear} to false. If you want to prevent only certain buffers being cleared
	 * you can set either the {@link WebGLRenderer#autoClearColor autoClearColor},
	 * {@link WebGLRenderer#autoClearStencil autoClearStencil} or {@link WebGLRenderer#autoClearDepth autoClearDepth}
	 * properties to false. To forcibly clear one ore more buffers call {@link WebGLRenderer#clear .clear}.
	 */
	render(
		scene: Scene,
		camera: Camera
	): void;

	/**
	 * Returns the current active cube face.
	 */
	getActiveCubeFace(): number;

	/**
	 * Returns the current active mipmap level.
	 */
	getActiveMipmapLevel(): number;

	/**
	 * Sets the given WebGLFramebuffer. This method can only be used if no render target is set via
	 * {@link WebGLRenderer#setRenderTarget .setRenderTarget}.
	 *
	 * @param value The WebGLFramebuffer.
	 */
	setFramebuffer( value: WebGLFramebuffer ): void;

	/**
	 * Returns the current render target. If no render target is set, null is returned.
	 */
	getRenderTarget(): RenderTarget | null;

	/**
	 * @deprecated Use {@link WebGLRenderer#getRenderTarget .getRenderTarget()} instead.
	 */
	getCurrentRenderTarget(): RenderTarget | null;

	/**
	 * Sets the active render target.
	 *
	 * @param renderTarget The {@link WebGLRenderTarget renderTarget} that needs to be activated. When `null` is given, the canvas is set as the active render target instead.
	 * @param activeCubeFace Specifies the active cube side (PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5) of {@link WebGLCubeRenderTarget}.
	 * @param activeMipmapLevel Specifies the active mipmap level.
	 */
	setRenderTarget( renderTarget: RenderTarget | null, activeCubeFace?: number, activeMipmapLevel?: number ): void;

	readRenderTargetPixels(
		renderTarget: RenderTarget,
		x: number,
		y: number,
		width: number,
		height: number,
		buffer: any,
		activeCubeFaceIndex?: number
	): void;

	/**
	 * Copies a region of the currently bound framebuffer into the selected mipmap level of the selected texture.
	 * This region is defined by the size of the destination texture's mip level, offset by the input position.
	 *
	 * @param position Specifies the pixel offset from which to copy out of the framebuffer.
	 * @param texture Specifies the destination texture.
	 * @param level Specifies the destination mipmap level of the texture.
	 */
	copyFramebufferToTexture( position: Vector2, texture: Texture, level?: number ): void;

	/**
	 * Copies srcTexture to the specified level of dstTexture, offset by the input position.
	 *
	 * @param position Specifies the pixel offset into the dstTexture where the copy will occur.
	 * @param srcTexture Specifies the source texture.
	 * @param dstTexture Specifies the destination texture.
	 * @param level Specifies the destination mipmap level of the texture.
	 */
	copyTextureToTexture( position: Vector2, srcTexture: Texture, dstTexture: Texture, level?: number ): void;

	/**
	 * Initializes the given texture. Can be used to preload a texture rather than waiting until first render (which can cause noticeable lags due to decode and GPU upload overhead).
	 *
	 * @param texture The texture to Initialize.
	 */
	initTexture( texture: Texture ): void;

	/**
	 * @deprecated
	 */
	gammaFactor: number;

	/**
	 * @deprecated Use {@link WebGLRenderer#xr .xr} instead.
	 */
	vr: boolean;

	/**
	 * @deprecated Use {@link WebGLShadowMap#enabled .shadowMap.enabled} instead.
	 */
	shadowMapEnabled: boolean;

	/**
	 * @deprecated Use {@link WebGLShadowMap#type .shadowMap.type} instead.
	 */
	shadowMapType: ShadowMapType;

	/**
	 * @deprecated Use {@link WebGLShadowMap#cullFace .shadowMap.cullFace} instead.
	 */
	shadowMapCullFace: CullFace;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'OES_texture_float' )} instead.
	 */
	supportsFloatTextures(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'OES_texture_half_float' )} instead.
	 */
	supportsHalfFloatTextures(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'OES_standard_derivatives' )} instead.
	 */
	supportsStandardDerivatives(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'WEBGL_compressed_texture_s3tc' )} instead.
	 */
	supportsCompressedTextureS3TC(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'WEBGL_compressed_texture_pvrtc' )} instead.
	 */
	supportsCompressedTexturePVRTC(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'EXT_blend_minmax' )} instead.
	 */
	supportsBlendMinMax(): any;

	/**
	 * @deprecated Use {@link WebGLCapabilities#vertexTextures .capabilities.vertexTextures} instead.
	 */
	supportsVertexTextures(): any;

	/**
	 * @deprecated Use {@link WebGLExtensions#get .extensions.get( 'ANGLE_instanced_arrays' )} instead.
	 */
	supportsInstancedArrays(): any;

	/**
	 * @deprecated Use {@link WebGLRenderer#setScissorTest .setScissorTest()} instead.
	 */
	enableScissorTest( boolean: any ): any;

}


export let Object3DIdCount: number;

/**
 * Base class for scene graph objects
 */
export class Object3D extends EventDispatcher {

	constructor();

	/**
	 * Unique number of this object instance.
	 */
	id: number;

	/**
	 *
	 */
	uuid: string;

	/**
	 * Optional name of the object (doesn't need to be unique).
	 */
	name: string;

	type: string;

	/**
	 * Object's parent in the scene graph.
	 */
	parent: Object3D | null;

	/**
	 * Array with object's children.
	 */
	children: Object3D[];

	/**
	 * Up direction.
	 */
	up: Vector3;

	/**
	 * Object's local position.
	 */
	readonly position: Vector3;

	/**
	 * Object's local rotation (Euler angles), in radians.
	 */
	readonly rotation: Euler;

	/**
	 * Global rotation.
	 */
	readonly quaternion: Quaternion;

	/**
	 * Object's local scale.
	 */
	readonly scale: Vector3;

	readonly modelViewMatrix: Matrix4;

	readonly normalMatrix: Matrix3;

	/**
	 * Local transform.
	 */
	matrix: Matrix4;

	/**
	 * The global transform of the object. If the Object3d has no parent, then it's identical to the local transform.
	 */
	matrixWorld: Matrix4;

	/**
	 * When this is set, it calculates the matrix of position, (rotation or quaternion) and scale every frame and also recalculates the matrixWorld property.
	 */
	matrixAutoUpdate: boolean;

	/**
	 * When this is set, it calculates the matrixWorld in that frame and resets this property to false.
	 */
	matrixWorldNeedsUpdate: boolean;

	layers: Layers;
	/**
	 * Object gets rendered if true.
	 */
	visible: boolean;

	/**
	 * Gets rendered into shadow map.
	 */
	castShadow: boolean;

	/**
	 * Material gets baked in shadow receiving.
	 */
	receiveShadow: boolean;

	/**
	 * When this is set, it checks every frame if the object is in the frustum of the camera. Otherwise the object gets drawn every frame even if it isn't visible.
	 */
	frustumCulled: boolean;

	/**
	 * Overrides the default rendering order of scene graph objects, from lowest to highest renderOrder. Opaque and transparent objects remain sorted independently though. When this property is set for an instance of Group, all descendants objects will be sorted and rendered together.
	 */
	renderOrder: number;

	/**
	 * An object that can be used to store custom data about the Object3d. It should not hold references to functions as these will not be cloned.
	 */
	userData: { [key: string]: any };

	/**
	 * Custom depth material to be used when rendering to the depth map. Can only be used in context of meshes.
	 * When shadow-casting with a DirectionalLight or SpotLight, if you are (a) modifying vertex positions in
	 * the vertex shader, (b) using a displacement map, (c) using an alpha map with alphaTest, or (d) using a
	 * transparent texture with alphaTest, you must specify a customDepthMaterial for proper shadows.
	 */
	customDepthMaterial: Material;

	/**
	 * Same as customDepthMaterial, but used with PointLight.
	 */
	customDistanceMaterial: Material;

	/**
	 * Used to check whether this or derived classes are Object3Ds. Default is true.
	 * You should not change this, as it is used internally for optimisation.
	 */
	readonly isObject3D: true;

	/**
	 * Calls before rendering object
	 */
	onBeforeRender: (
		renderer: WebGLRenderer,
		scene: Scene,
		camera: Camera,
		geometry: Geometry | BufferGeometry,
		material: Material,
		group: Group
	) => void;

	/**
	 * Calls after rendering object
	 */
	onAfterRender: (
		renderer: WebGLRenderer,
		scene: Scene,
		camera: Camera,
		geometry: Geometry | BufferGeometry,
		material: Material,
		group: Group
	) => void;

	static DefaultUp: Vector3;
	static DefaultMatrixAutoUpdate: boolean;

	/**
	 * This updates the position, rotation and scale with the matrix.
	 */
	applyMatrix4( matrix: Matrix4 ): void;

	applyQuaternion( quaternion: Quaternion ): this;

	/**
	 *
	 */
	setRotationFromAxisAngle( axis: Vector3, angle: number ): void;

	/**
	 *
	 */
	setRotationFromEuler( euler: Euler ): void;

	/**
	 *
	 */
	setRotationFromMatrix( m: Matrix4 ): void;

	/**
	 *
	 */
	setRotationFromQuaternion( q: Quaternion ): void;

	/**
	 * Rotate an object along an axis in object space. The axis is assumed to be normalized.
	 * @param axis	A normalized vector in object space.
	 * @param angle	The angle in radians.
	 */
	rotateOnAxis( axis: Vector3, angle: number ): this;

	/**
	 * Rotate an object along an axis in world space. The axis is assumed to be normalized. Method Assumes no rotated parent.
	 * @param axis	A normalized vector in object space.
	 * @param angle	The angle in radians.
	 */
	rotateOnWorldAxis( axis: Vector3, angle: number ): this;

	/**
	 *
	 * @param angle
	 */
	rotateX( angle: number ): this;

	/**
	 *
	 * @param angle
	 */
	rotateY( angle: number ): this;

	/**
	 *
	 * @param angle
	 */
	rotateZ( angle: number ): this;

	/**
	 * @param axis	A normalized vector in object space.
	 * @param distance	The distance to translate.
	 */
	translateOnAxis( axis: Vector3, distance: number ): this;

	/**
	 * Translates object along x axis by distance.
	 * @param distance Distance.
	 */
	translateX( distance: number ): this;

	/**
	 * Translates object along y axis by distance.
	 * @param distance Distance.
	 */
	translateY( distance: number ): this;

	/**
	 * Translates object along z axis by distance.
	 * @param distance Distance.
	 */
	translateZ( distance: number ): this;

	/**
	 * Updates the vector from local space to world space.
	 * @param vector A local vector.
	 */
	localToWorld( vector: Vector3 ): Vector3;

	/**
	 * Updates the vector from world space to local space.
	 * @param vector A world vector.
	 */
	worldToLocal( vector: Vector3 ): Vector3;

	/**
	 * Rotates object to face point in space.
	 * @param vector A world vector to look at.
	 */
	lookAt( vector: Vector3 | number, y?: number, z?: number ): void;

	/**
	 * Adds object as child of this object.
	 */
	add( ...object: Object3D[] ): this;

	/**
	 * Removes object as child of this object.
	 */
	remove( ...object: Object3D[] ): this;

	/**
	 * Adds object as a child of this, while maintaining the object's world transform.
	 */
	attach( object: Object3D ): this;

	/**
	 * Searches through the object's children and returns the first with a matching id.
	 * @param id	Unique number of the object instance
	 */
	getObjectById( id: number ): Object3D | undefined;

	/**
	 * Searches through the object's children and returns the first with a matching name.
	 * @param name	String to match to the children's Object3d.name property.
	 */
	getObjectByName( name: string ): Object3D | undefined;

	getObjectByProperty( name: string, value: string ): Object3D | undefined;

	getWorldPosition( target: Vector3 ): Vector3;
	getWorldQuaternion( target: Quaternion ): Quaternion;
	getWorldScale( target: Vector3 ): Vector3;
	getWorldDirection( target: Vector3 ): Vector3;

	raycast( raycaster: Raycaster, intersects: Intersection[] ): void;

	traverse( callback: ( object: Object3D ) => any ): void;

	traverseVisible( callback: ( object: Object3D ) => any ): void;

	traverseAncestors( callback: ( object: Object3D ) => any ): void;

	/**
	 * Updates local transform.
	 */
	updateMatrix(): void;

	/**
	 * Updates global transform of the object and its children.
	 */
	updateMatrixWorld( force?: boolean ): void;

	updateWorldMatrix( updateParents: boolean, updateChildren: boolean ): void;

	toJSON( meta?: {
		geometries: any;
		materials: any;
		textures: any;
		images: any;
	} ): any;

	clone( recursive?: boolean ): this;

	/**
	 *
	 * @param object
	 * @param recursive
	 */
	copy( source: this, recursive?: boolean ): this;

}


// Cameras ////////////////////////////////////////////////////////////////////////////////////////

/**
 * Abstract base class for cameras. This class should always be inherited when you build a new camera.
 */
export class Camera extends Object3D {

	/**
	 * This constructor sets following properties to the correct type: matrixWorldInverse, projectionMatrix and projectionMatrixInverse.
	 */
	constructor();

	/**
	 * This is the inverse of matrixWorld. MatrixWorld contains the Matrix which has the world transform of the Camera.
	 */
	matrixWorldInverse: Matrix4;

	/**
	 * This is the matrix which contains the projection.
	 */
	projectionMatrix: Matrix4;

	/**
	 * This is the inverse of projectionMatrix.
	 */
	projectionMatrixInverse: Matrix4;

	readonly isCamera: true;

	getWorldDirection( target: Vector3 ): Vector3;

	updateMatrixWorld( force?: boolean ): void;

}

export declare enum ParamType {
    BOOLEAN = "boolean",
    BUTTON = "button",
    COLOR = "color",
    FLOAT = "float",
    FOLDER = "folder",
    INTEGER = "integer",
    OPERATOR_PATH = "operator_path",
    RAMP = "ramp",
    SEPARATOR = "separator",
    STRING = "string",
    VECTOR2 = "vector2",
    VECTOR3 = "vector3",
    VECTOR4 = "vector4"
}

/// <reference path="../../../../src/core/graph/dagre.d.ts" />
export declare type CoreGraphNodeId = string;
export declare class CoreGraph {
    _graph: Graph;
    _next_id: number;
    _scene: PolyScene | undefined;
    constructor();
    graph(): Graph;
    set_scene(scene: PolyScene): void;
    scene(): PolyScene | undefined;
    next_id(): CoreGraphNodeId;
    setNode(node: CoreGraphNode): void;
    removeNode(node: CoreGraphNode): void;
    nodes_from_ids(ids: string[]): CoreGraphNode[];
    node_from_id(id: string): CoreGraphNode;
    connect(src: CoreGraphNode, dest: CoreGraphNode): boolean;
    disconnect(src: CoreGraphNode, dest: CoreGraphNode): void;
    disconnect_predecessors(node: CoreGraphNode): void;
    disconnect_successors(node: CoreGraphNode): void;
    predecessor_ids(id: CoreGraphNodeId): string[];
    predecessors(node: CoreGraphNode): CoreGraphNode[];
    successor_ids(id: string): CoreGraphNodeId[];
    successors(node: CoreGraphNode): CoreGraphNode[];
    private all_next_ids;
    all_predecessor_ids(node: CoreGraphNode): CoreGraphNodeId[];
    all_successor_ids(node: CoreGraphNode): CoreGraphNodeId[];
    all_predecessors(node: CoreGraphNode): CoreGraphNode[];
    all_successors(node: CoreGraphNode): CoreGraphNode[];
}

export declare type PostDirtyHook = (caller?: CoreGraphNode) => void;
export declare class DirtyController {
    private node;
    _dirty_count: number;
    _dirty: boolean;
    _dirty_timestamp: number | undefined;
    _cached_successors: CoreGraphNode[] | undefined;
    _forbidden_trigger_nodes: string[] | undefined;
    _post_dirty_hooks: PostDirtyHook[] | undefined;
    _post_dirty_hook_names: string[] | undefined;
    constructor(node: CoreGraphNode);
    get is_dirty(): boolean;
    get dirty_timestamp(): number | undefined;
    get dirty_count(): number;
    add_post_dirty_hook(name: string, method: PostDirtyHook): void;
    remove_post_dirty_hook(name: string): void;
    has_hook(name: string): boolean;
    remove_dirty_state(): void;
    set_forbidden_trigger_nodes(nodes: CoreGraphNode[]): void;
    set_dirty(original_trigger_graph_node?: CoreGraphNode | null, propagate?: boolean): void;
    run_post_dirty_hooks(original_trigger_graph_node?: CoreGraphNode): void;
    set_successors_dirty(original_trigger_graph_node?: CoreGraphNode): void;
    clear_successors_cache(): void;
    clear_successors_cache_with_predecessors(): void;
}

export declare class CoreGraphNode {
    protected _scene: PolyScene;
    protected _name: string;
    private _graph;
    private _graph_node_id;
    private _dirty_controller;
    constructor(_scene: PolyScene, _name: string);
    get name(): string;
    set_name(name: string): void;
    get scene(): PolyScene;
    get graph(): CoreGraph;
    get graph_node_id(): CoreGraphNodeId;
    get dirty_controller(): DirtyController;
    set_dirty(trigger?: CoreGraphNode | null): void;
    set_successors_dirty(trigger?: CoreGraphNode): void;
    remove_dirty_state(): void;
    get is_dirty(): boolean;
    add_post_dirty_hook(name: string, callback: PostDirtyHook): void;
    graph_remove(): void;
    add_graph_input(src: CoreGraphNode): boolean;
    remove_graph_input(src: CoreGraphNode): void;
    graph_disconnect_predecessors(): void;
    graph_disconnect_successors(): void;
    graph_predecessor_ids(): CoreGraphNodeId[];
    graph_predecessors(): CoreGraphNode[];
    graph_successors(): CoreGraphNode[];
    graph_all_predecessors(): CoreGraphNode[];
    graph_all_successors(): CoreGraphNode[];
}

import jsep from 'jsep';
export declare class ParsedTree {
    node: jsep.Expression | undefined;
    error_message: string | undefined;
    constructor();
    parse_expression(string: string): void;
    parse_expression_for_string_param(string: string): void;
    static string_value_elements(v: string): string[];
    private reset;
}

import jsep from 'jsep';
import jsep from 'jsep';
export declare const VARIABLE_PREFIX = "$";
export declare abstract class BaseTraverser {
    param: BaseParamType;
    _error_message: string | undefined;
    constructor(param: BaseParamType);
    protected clear_error(): void;
    protected set_error(message: string): void;
    protected _set_error_from_error_bound: (error: string | Error) => void;
    private _set_error_from_error;
    get is_errored(): boolean;
    get error_message(): string | undefined;
    reset(): void;
    traverse_node(node: jsep.Expression): string | undefined;
    protected abstract traverse_CallExpression(node: jsep.CallExpression): string | undefined;
    protected traverse_BinaryExpression(node: jsep.BinaryExpression): string;
    protected traverse_LogicalExpression(node: jsep.LogicalExpression): string;
    protected traverse_MemberExpression(node: jsep.MemberExpression): string;
    protected traverse_ConditionalExpression(node: jsep.ConditionalExpression): string;
    protected traverse_Compound(node: jsep.Compound): string;
    protected abstract traverse_UnaryExpression(node: jsep.UnaryExpression): string;
    protected traverse_Literal(node: jsep.Literal): string;
    protected abstract traverse_Identifier(node: jsep.Identifier): string | undefined;
}

declare type NodeOrParam = BaseNodeType | BaseParamType;
export declare class DecomposedPath {
    private index;
    private path_elements;
    private _named_nodes;
    private graph_node_ids;
    private node_element_by_graph_node_id;
    constructor();
    add_node(name: string, node: NodeOrParam): void;
    add_path_element(path_element: string): void;
    get named_nodes(): (BaseNodeType | BaseParamType | null)[];
    update_from_name_change(node: NodeOrParam): void;
    to_path(): string;
}
export {};

import jsep from 'jsep';
export declare class MethodDependency extends CoreGraphNode {
    param: BaseParamType;
    path_argument: number | string;
    decomposed_path?: DecomposedPath | undefined;
    jsep_node: jsep.Expression | undefined;
    resolved_graph_node: CoreGraphNode | undefined;
    unresolved_path: string | undefined;
    private _update_from_name_change_bound;
    constructor(param: BaseParamType, path_argument: number | string, decomposed_path?: DecomposedPath | undefined);
    _update_from_name_change(trigger?: CoreGraphNode): void;
    reset(): void;
    listen_for_name_changes(): void;
    set_jsep_node(jsep_node: jsep.Expression): void;
    set_resolved_graph_node(node: CoreGraphNode): void;
    set_unresolved_path(path: string): void;
    static create(param: BaseParamType, index_or_path: number | string, node: CoreGraphNode, decomposed_path?: DecomposedPath): MethodDependency;
}

export declare class FunctionGenerator extends BaseTraverser {
    param: BaseParamType;
    private function;
    private _attribute_requirements_controller;
    private function_main_string;
    private methods;
    private method_index;
    method_dependencies: MethodDependency[];
    immutable_dependencies: CoreGraphNode[];
    constructor(param: BaseParamType);
    parse_tree(parsed_tree: ParsedTree): void;
    reset(): void;
    function_body(): string;
    eval_allowed(): boolean;
    eval_function(): any;
    protected traverse_CallExpression(node: jsep.CallExpression): string | undefined;
    protected traverse_BinaryExpression(node: jsep.BinaryExpression): string;
    protected traverse_LogicalExpression(node: jsep.LogicalExpression): string;
    protected traverse_MemberExpression(node: jsep.MemberExpression): string;
    protected traverse_UnaryExpression(node: jsep.UnaryExpression): string;
    protected traverse_Literal(node: jsep.Literal): string;
    protected traverse_Identifier(node: jsep.Identifier): string | undefined;
    protected traverse_Identifier_F(): string;
    protected traverse_Identifier_FPS(): string;
    protected traverse_Identifier_T(): string;
    protected traverse_Identifier_CH(): string;
    protected traverse_Identifier_CEX(): string;
    protected traverse_Identifier_CEY(): string;
    protected traverse_Identifier_CEZ(): string;
    private _method_centroid;
    private _create_method_and_dependencies;
}

import jsep from 'jsep';
export interface JsepsByString {
    [propName: string]: jsep.Expression[];
}
export declare class DependenciesController {
    param: BaseParamType;
    error_message: string | undefined;
    private cyclic_graph_detected;
    private method_dependencies;
    constructor(param: BaseParamType);
    protected set_error(message: string): void;
    reset(): void;
    update(function_generator: FunctionGenerator): void;
    private connect_immutable_dependencies;
    private handle_method_dependencies;
    private handle_method_dependency;
    private listen_for_name_changes;
}

export declare class ExpressionManager {
    param: BaseParamType;
    parse_completed: boolean;
    private parse_started;
    private function_generator;
    private expression_string_generator;
    dependencies_controller: DependenciesController;
    private parsed_tree;
    constructor(param: BaseParamType);
    parse_expression(expression: string): void;
    compute_function(): Promise<any>;
    reset(): void;
    get is_errored(): boolean;
    get error_message(): string | undefined;
    private compute_allowed;
    update_from_method_dependency_name_change(): void;
}

interface FaceLike {
    a: number;
    b: number;
    c: number;
}
declare type CorePointArray3 = [CorePoint, CorePoint, CorePoint];
declare type Vector3Array2 = [Vector3, Vector3];
declare type Vector3Array3 = [Vector3, Vector3, Vector3];
export declare class CoreFace {
    private _core_geometry;
    private _index;
    _geometry: BufferGeometry;
    _points: CorePointArray3 | undefined;
    _triangle: Triangle | undefined;
    _positions: Vector3Array3 | undefined;
    _deltas: Vector3Array2 | undefined;
    constructor(_core_geometry: CoreGeometry, _index: number);
    get index(): number;
    get points(): CorePointArray3;
    private _get_points;
    get positions(): Vector3Array3;
    private _get_positions;
    get triangle(): Triangle;
    private _get_triangle;
    get deltas(): Vector3Array2;
    private _get_deltas;
    get area(): number;
    center(target: Vector3): Vector3;
    random_position(seed: number): Vector3;
    attrib_value_at_position(attrib_name: string, position: Vector3): any;
    static interpolated_value(geometry: BufferGeometry, face: FaceLike, intersect_point: Vector3, attrib: BufferAttribute): number | Vector3 | null;
}
export {};


/**
 * A class for displaying particles in the form of variable size points. For example, if using the WebGLRenderer, the particles are displayed using GL_POINTS.
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/objects/ParticleSystem.js">src/objects/ParticleSystem.js</a>
 */
export class Points extends Object3D {

	/**
	 * @param geometry An instance of Geometry or BufferGeometry.
	 * @param material An instance of Material (optional).
	 */
	constructor(
		geometry?: Geometry | BufferGeometry,
		material?: Material | Material[]
	);

	type: 'Points';
	morphTargetInfluences?: number[];
	morphTargetDictionary?: { [key: string]: number };
	readonly isPoints: true;

	/**
	 * An instance of Geometry or BufferGeometry, where each vertex designates the position of a particle in the system.
	 */
	geometry: Geometry | BufferGeometry;

	/**
	 * An instance of Material, defining the object's appearance. Default is a PointsMaterial with randomised colour.
	 */
	material: Material | Material[];

	raycast( raycaster: Raycaster, intersects: Intersection[] ): void;
	updateMorphTargets(): void;

}


export class Line extends Object3D {

	constructor(
		geometry?: Geometry | BufferGeometry,
		material?: Material | Material[],
		mode?: number
	);

	geometry: Geometry | BufferGeometry;
	material: Material | Material[];

	type: 'Line' | 'LineLoop' | 'LineSegments';
	readonly isLine: true;

	computeLineDistances(): this;
	raycast( raycaster: Raycaster, intersects: Intersection[] ): void;

}


/**
 * @deprecated
 */
export const LineStrip: number;
/**
 * @deprecated
 */
export const LinePieces: number;

export class LineSegments extends Line {

	constructor(
		geometry?: Geometry | BufferGeometry,
		material?: Material | Material[],
		mode?: number
	);

	type: 'LineSegments';
	readonly isLineSegments: true;

}

interface MaterialsByString {
    [propName: string]: Material;
}
export declare enum ObjectType {
    MESH = "MESH",
    POINTS = "POINTS",
    LINE_SEGMENTS = "LINE_SEGMENTS"
}
export declare const ObjectTypes: ObjectType[];
export declare const ObjectTypeMenuEntries: {
    name: string;
    value: number;
}[];
export declare function ObjectTypeByObject(object: Object3D): ObjectType | undefined;
export declare enum AttribClass {
    VERTEX = 0,
    OBJECT = 1
}
export declare const AttribClassMenuEntries: {
    name: string;
    value: AttribClass;
}[];
export declare enum AttribType {
    NUMERIC = 0,
    STRING = 1
}
export declare const AttribTypeMenuEntries: {
    name: string;
    value: AttribType;
}[];
export declare const CoreConstant: {
    ATTRIB_CLASS: {
        VERTEX: AttribClass;
        OBJECT: AttribClass;
    };
    ATTRIB_TYPE: {
        NUMERIC: number;
        STRING: number;
    };
    OBJECT_TYPE: {
        MESH: ObjectType;
        POINTS: ObjectType;
        LINE_SEGMENTS: ObjectType;
    };
    OBJECT_TYPES: ObjectType[];
    CONSTRUCTOR_NAMES_BY_CONSTRUCTOR_NAME: {
        [x: string]: string;
    };
    CONSTRUCTORS_BY_NAME: {
        MESH: typeof Mesh;
        POINTS: typeof Points;
        LINE_SEGMENTS: typeof LineSegments;
    };
    MATERIALS: MaterialsByString;
};
export {};

export declare class CoreAttributeData {
    private _size;
    private _type;
    constructor(_size: number, _type: number);
    size(): number;
    type(): number;
    static from_value(attrib_value: any): CoreAttributeData;
}

export declare class CoreGeometry {
    private _geometry;
    _bounding_box: Box3 | undefined;
    private _points;
    constructor(_geometry: BufferGeometry);
    geometry(): BufferGeometry;
    uuid(): string;
    bounding_box(): Box3 | undefined;
    _create_bounding_box(): Box3 | undefined;
    mark_as_instance(): void;
    static marked_as_instance(geometry: BufferGeometry): boolean;
    marked_as_instance(): boolean;
    position_attrib_name(): string;
    compute_vertex_normals(): void;
    user_data_attribs(): any;
    indexed_attribute_names(): string[];
    user_data_attrib(name: string): any;
    is_attrib_indexed(name: string): boolean;
    has_attrib(name: string): boolean;
    attrib_type(name: string): number;
    attrib_names(): string[];
    attrib_sizes(): Dictionary<number>;
    attrib_size(name: string): number;
    set_indexed_attribute_values(name: string, values: string[]): void;
    set_indexed_attribute(name: string, values: string[], indices: number[]): void;
    add_numeric_attrib(name: string, size?: number, default_value?: NumericAttribValue): void;
    init_position_attribute(points_count: number, default_value?: Vector3): BufferGeometry;
    add_attribute(name: string, attrib_data: CoreAttributeData): void;
    rename_attribute(old_name: string, new_name: string): BufferGeometry;
    delete_attribute(name: string): BufferGeometry;
    clone(): BufferGeometry;
    static clone(src_geometry: BufferGeometry): BufferGeometry;
    points_count(): number;
    static points_count(geometry: BufferGeometry): number;
    points(): CorePoint[];
    reset_points(): void;
    points_from_geometry(): CorePoint[];
    static geometry_from_points(points: CorePoint[], object_type: ObjectType): BufferGeometry;
    static _indices_from_points(new_index_by_old_index: Dictionary<number>, old_geometry: BufferGeometry, object_type: ObjectType): number[] | undefined;
    static merge_geometries(geometries: BufferGeometry[]): BufferGeometry | undefined;
    segments(): number[][];
    faces(): CoreFace[];
    faces_from_geometry(): CoreFace[];
}

export declare class CoreEntity {
    protected _index: number;
    constructor(_index: number);
    get index(): number;
}

export declare class CorePoint extends CoreEntity {
    private _core_geometry;
    _geometry: BufferGeometry;
    _position: Vector3 | undefined;
    _normal: Vector3 | undefined;
    constructor(_core_geometry: CoreGeometry, index: number);
    geometry_wrapper(): CoreGeometry;
    geometry(): BufferGeometry;
    attrib_size(name: string): number;
    has_attrib(name: string): boolean;
    attrib_value(name: string): any;
    attrib_value_index(name: string): number;
    position(): Vector3;
    set_position(new_position: Vector3): void;
    normal(): Vector3;
    set_normal(new_normal: Vector3): void;
    set_attrib_value(name: string, value: NumericAttribValue | string): void;
    set_attrib_value_vector3(name: string, value: Vector3): void;
    set_attrib_index(name: string, new_value_index: number): number;
}

export interface RampPointJson {
    position: number;
    value: number;
}
export interface RampValueJson {
    points: RampPointJson[];
    interpolation: string;
}
export declare class RampPoint {
    private _position;
    private _value;
    constructor(_position?: number, _value?: number);
    to_json(): RampPointJson;
    get position(): number;
    get value(): number;
    copy(point: RampPoint): void;
    clone(): RampPoint;
    is_equal(other_point: RampPoint): boolean;
    is_equal_json(json: RampPointJson): boolean;
    from_json(json: RampPointJson): void;
    static are_equal_json(json1: RampPointJson, json2: RampPointJson): boolean;
    static from_json(json: RampPointJson): RampPoint;
}
export declare enum RampInterpolation {
    LINEAR = "linear"
}
export declare class RampValue {
    private _interpolation;
    private _points;
    private _uuid;
    constructor(_interpolation?: string, _points?: RampPoint[]);
    get uuid(): string;
    get interpolation(): string;
    get points(): RampPoint[];
    static from_json(json: RampValueJson): RampValue;
    to_json(): RampValueJson;
    clone(): RampValue;
    copy(ramp: RampValue): void;
    is_equal(other_ramp_value: RampValue): boolean;
    is_equal_json(json: RampValueJson): boolean;
    static are_json_equal(json1: RampValueJson, json2: RampValueJson): boolean;
    from_json(json: RampValueJson): void;
}

declare type ParamValuesTypeMapGeneric = {
    [key in ParamType]: any;
};
export interface ParamValuesTypeMap extends ParamValuesTypeMapGeneric {
    [ParamType.BOOLEAN]: boolean;
    [ParamType.BUTTON]: null;
    [ParamType.COLOR]: Color;
    [ParamType.FLOAT]: number;
    [ParamType.FOLDER]: null;
    [ParamType.INTEGER]: number;
    [ParamType.OPERATOR_PATH]: string;
    [ParamType.RAMP]: RampValue;
    [ParamType.SEPARATOR]: null;
    [ParamType.STRING]: string;
    [ParamType.VECTOR2]: Vector2;
    [ParamType.VECTOR3]: Vector3;
    [ParamType.VECTOR4]: Vector4;
}
export {};

export declare type GroupString = string;
export interface Object3DWithGeometry extends Object3D {
    geometry: BufferGeometry;
}
export declare class CoreGroup {
    private _timestamp;
    private _objects;
    private _core_objects;
    private _core_geometries;
    private _bounding_box;
    constructor();
    timestamp(): number | undefined;
    touch(): void;
    reset(): void;
    clone(): CoreGroup;
    set_objects(objects: Object3D[]): void;
    objects(): Object3DWithGeometry[];
    core_objects(): CoreObject[];
    private _create_core_objects;
    geometries(): BufferGeometry[];
    core_geometries(): CoreGeometry[];
    private create_core_geometries;
    __geometry_from_object(list: BufferGeometry[], object: Mesh): number | undefined;
    static geometry_from_object(object: Object3D): BufferGeometry | null;
    faces(): import("./Face").CoreFace[];
    points(): import("./Point").CorePoint[];
    points_count(): number;
    points_from_group(group: GroupString): import("./Point").CorePoint[];
    static from_objects(objects: Object3D[]): CoreGroup;
    objects_from_group(group_name: string): Object3D[];
    core_objects_from_group(group_name: string): CoreObject[];
    bounding_box(): Box3;
    center(): Vector3;
    size(): Vector3;
    private _compute_bounding_box;
    compute_vertex_normals(): void;
    has_attrib(name: string): boolean;
    attrib_type(name: string): number | null;
    rename_attrib(old_name: string, new_name: string, attrib_class: AttribClass): void;
    attrib_names(): string[];
    object_attrib_names(): string[];
    attrib_names_matching_mask(masks_string: GroupString): string[];
    attrib_sizes(): Dictionary<number>;
    attrib_size(attrib_name: string): number;
    add_numeric_vertex_attrib(name: string, size: number, default_value: NumericAttribValue): void;
    add_numeric_object_attrib(name: string, size: number, default_value: NumericAttribValue): void;
    static clone(src_group: Group): Group;
}

export declare class CoreObject extends CoreEntity {
    private _object;
    constructor(_object: Object3D, index: number);
    object(): Object3D;
    geometry(): BufferGeometry;
    core_geometry(): CoreGeometry;
    points(): CorePoint[];
    points_from_group(group: GroupString): CorePoint[];
    compute_vertex_normals(): void;
    add_attribute(name: string, value: AttribValue): void;
    add_numeric_attrib(name: string, value: NumericAttribValue): void;
    set_attrib_value(name: string, value: AttribValue): void;
    add_numeric_vertex_attrib(name: string, size: number, default_value: NumericAttribValue): void;
    attribute_names(): string[];
    attrib_names(): string[];
    has_attrib(name: string): boolean;
    rename_attribute(old_name: string, new_name: string): void;
    delete_attribute(name: string): void;
    attrib_value(name: string): AttribValue;
    name(): string;
    human_type(): string;
    attrib_type(name: string): number;
    attrib_size(name: string): 0 | 2 | 1 | 3;
    clone(): Object3D;
    static clone(src_object: Object3D): Object3D;
    static parallelTraverse(a: Object3D, b: Object3D, callback: (a: Object3D, b: Object3D) => void): void;
}

declare type EntityCallback<T extends ParamType> = (entity: CoreEntity, value: ParamValuesTypeMap[T] | any) => void;
declare type PointEntityCallback<T extends ParamType> = (entity: CorePoint, value: ParamValuesTypeMap[T] | any) => void;
declare type ObjectEntityCallback<T extends ParamType> = (entity: CoreObject, value: ParamValuesTypeMap[T] | any) => void;
export declare class ExpressionController<T extends ParamType> {
    protected param: BaseParamType;
    protected _expression: string | undefined;
    protected _entities: CoreEntity[] | undefined;
    protected _entity_callback: EntityCallback<T> | undefined;
    protected _manager: ExpressionManager | undefined;
    constructor(param: BaseParamType);
    get active(): boolean;
    get expression(): string | undefined;
    get is_errored(): boolean;
    get error_message(): string | null | undefined;
    get requires_entities(): boolean;
    set_expression(expression: string | undefined, set_dirty?: boolean): void;
    update_from_method_dependency_name_change(): void;
    compute_expression(): Promise<any>;
    private compute_expression_for_entities;
    compute_expression_for_points(entities: CorePoint[], callback: PointEntityCallback<T>): Promise<void>;
    compute_expression_for_objects(entities: CoreObject[], callback: ObjectEntityCallback<T>): Promise<void>;
    get entities(): CoreEntity[] | undefined;
    get entity_callback(): EntityCallback<T> | undefined;
    set_entities(entities: CoreEntity[], callback: EntityCallback<T>): void;
    reset_entities(): void;
}
export {};

export declare enum ParamEvent {
    VISIBLE_UPDATED = "param_visible_updated",
    RAW_INPUT_UPDATED = "raw_input_updated",
    VALUE_UPDATED = "param_value_updated",
    EXPRESSION_UPDATED = "param_expression_update",
    ERROR_UPDATED = "param_error_updated",
    DELETED = "param_deleted"
}

export declare class EmitController {
    protected param: BaseParamType;
    _blocked_emit: boolean;
    _blocked_parent_emit: boolean;
    _count_by_event_name: Dictionary<number>;
    constructor(param: BaseParamType);
    get emit_allowed(): boolean;
    block_emit(): boolean;
    unblock_emit(): boolean;
    block_parent_emit(): boolean;
    unblock_parent_emit(): boolean;
    increment_count(event_name: ParamEvent): void;
    events_count(event_name: ParamEvent): number;
    emit(event: ParamEvent): void;
}

declare type ParamInitValuesTypeMapGeneric = {
    [key in ParamType]: any;
};
export interface ParamInitValuesTypeMap extends ParamInitValuesTypeMapGeneric {
    [ParamType.BOOLEAN]: number | boolean | string;
    [ParamType.BUTTON]: null;
    [ParamType.COLOR]: StringOrNumber3 | Color;
    [ParamType.FLOAT]: StringOrNumber;
    [ParamType.FOLDER]: null;
    [ParamType.INTEGER]: StringOrNumber;
    [ParamType.OPERATOR_PATH]: string;
    [ParamType.RAMP]: RampValue | RampValueJson;
    [ParamType.SEPARATOR]: null;
    [ParamType.STRING]: string;
    [ParamType.VECTOR2]: StringOrNumber2 | Vector2;
    [ParamType.VECTOR3]: StringOrNumber3 | Vector3;
    [ParamType.VECTOR4]: StringOrNumber4 | Vector4;
}
export {};

declare type ParamValueSerializedTypeMapGeneric = {
    [key in ParamType]: any;
};
export interface ParamValueSerializedTypeMap extends ParamValueSerializedTypeMapGeneric {
    [ParamType.BOOLEAN]: boolean;
    [ParamType.BUTTON]: ParamInitValuesTypeMap[ParamType.BUTTON];
    [ParamType.COLOR]: Number3;
    [ParamType.FLOAT]: number;
    [ParamType.FOLDER]: null;
    [ParamType.INTEGER]: number;
    [ParamType.OPERATOR_PATH]: ParamInitValuesTypeMap[ParamType.OPERATOR_PATH];
    [ParamType.RAMP]: RampValueJson;
    [ParamType.SEPARATOR]: ParamInitValuesTypeMap[ParamType.SEPARATOR];
    [ParamType.STRING]: ParamInitValuesTypeMap[ParamType.STRING];
    [ParamType.VECTOR2]: Number2;
    [ParamType.VECTOR3]: Number3;
    [ParamType.VECTOR4]: Number4;
}
export {};

declare type ParamInitValueSerializedTypeMapGeneric = {
    [key in ParamType]: any;
};
export interface ParamInitValueSerializedTypeMap extends ParamInitValueSerializedTypeMapGeneric {
    [ParamType.BOOLEAN]: ParamInitValuesTypeMap[ParamType.BOOLEAN];
    [ParamType.BUTTON]: ParamInitValuesTypeMap[ParamType.BUTTON];
    [ParamType.COLOR]: StringOrNumber3;
    [ParamType.FLOAT]: ParamInitValuesTypeMap[ParamType.FLOAT];
    [ParamType.FOLDER]: ParamInitValuesTypeMap[ParamType.FOLDER];
    [ParamType.INTEGER]: ParamInitValuesTypeMap[ParamType.INTEGER];
    [ParamType.OPERATOR_PATH]: ParamInitValuesTypeMap[ParamType.OPERATOR_PATH];
    [ParamType.RAMP]: RampValueJson;
    [ParamType.SEPARATOR]: ParamInitValuesTypeMap[ParamType.SEPARATOR];
    [ParamType.STRING]: ParamInitValuesTypeMap[ParamType.STRING];
    [ParamType.VECTOR2]: StringOrNumber2;
    [ParamType.VECTOR3]: StringOrNumber3;
    [ParamType.VECTOR4]: StringOrNumber4;
}
export {};

export interface ParamSerializerData {
    name: string;
    type: string;
    raw_input: ParamInitValueSerializedTypeMap[ParamType];
    value: ParamValueSerializedTypeMap[ParamType];
    expression?: string;
    graph_node_id: string;
    error_message?: string;
    is_visible: boolean;
    folder_name?: string;
    components?: string[];
}
export declare class ParamSerializer {
    protected param: BaseParamType;
    constructor(param: BaseParamType);
    to_json(): ParamSerializerData;
    raw_input(): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../ramp/RampValue").RampValueJson | null;
    value(): string | number | boolean | Number2 | import("../ramp/RampValue").RampValueJson | Number3 | Number4 | null;
    expression(): string | undefined;
    error_message(): string | undefined;
    is_visible(): boolean;
}

export declare class TimeDependentState {
    protected param: BaseParamType;
    constructor(param: BaseParamType);
    get active(): boolean;
}

export declare class ErrorState {
    private param;
    private _message;
    constructor(param: BaseParamType);
    set(message: string | undefined): void;
    get message(): string | undefined;
    clear(): void;
    get active(): boolean;
}

export declare class StatesController {
    protected param: BaseParamType;
    time_dependent: TimeDependentState;
    error: ErrorState;
    constructor(param: BaseParamType);
}

export declare abstract class TypedNumericParam<T extends ParamType> extends TypedParam<T> {
    get is_numeric(): boolean;
    get is_default(): boolean;
    protected _prefilter_invalid_raw_input(raw_input: any): ParamInitValuesTypeMap[T];
    protected process_raw_input(): void;
    protected process_computation(): Promise<void>;
    private _update_value;
}

export declare class FloatParam extends TypedNumericParam<ParamType.FLOAT> {
    static type(): ParamType;
    get default_value_serialized(): string | number;
    get raw_input_serialized(): string | number;
    get value_serialized(): number;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.FLOAT], raw_input2: ParamInitValuesTypeMap[ParamType.FLOAT]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.FLOAT], val2: ParamValuesTypeMap[ParamType.FLOAT]): boolean;
    static convert(raw_val: ParamInitValuesTypeMap[ParamType.FLOAT]): number | null;
    convert(raw_val: ParamInitValuesTypeMap[ParamType.FLOAT]): number | null;
}

export declare abstract class TypedMultipleParam<T extends ParamType> extends TypedParam<T> {
    private _components_contructor;
    protected _components: FloatParam[];
    get components(): FloatParam[];
    get is_numeric(): boolean;
    get is_default(): boolean;
    get raw_input(): ParamInitValueSerializedTypeMap[T];
    get raw_input_serialized(): ParamInitValueSerializedTypeMap[T];
    init_components(): void;
    protected process_computation(): Promise<void>;
    set_value_from_components(): void;
    has_expression(): boolean;
    private compute_components;
    protected _prefilter_invalid_raw_input(raw_input: any): ParamInitValuesTypeMap[T];
    protected process_raw_input(): void;
}

declare type ComputeCallback = (value: void) => void;
export declare abstract class TypedParam<T extends ParamType> extends CoreGraphNode {
    protected _default_value: ParamInitValuesTypeMap[T];
    protected _raw_input: ParamInitValuesTypeMap[T];
    protected _value: ParamValuesTypeMap[T];
    protected _node: BaseNodeType;
    protected _parent_param: TypedMultipleParam<any> | undefined;
    protected _components: FloatParam[] | undefined;
    protected _compute_resolves: ComputeCallback[] | undefined;
    private _options;
    get options(): OptionsController;
    private _emit_controller;
    get emit_controller(): EmitController;
    protected _expression_controller: ExpressionController<T> | undefined;
    get expression_controller(): ExpressionController<T> | undefined;
    private _serializer;
    get serializer(): ParamSerializer;
    private _states;
    get states(): StatesController;
    constructor(scene: PolyScene);
    initialize_value(): void;
    initialize_param(): void;
    static type(): ParamType;
    get type(): T;
    get is_numeric(): boolean;
    set_name(name: string): void;
    get value(): ParamValuesTypeMap[T];
    abstract get default_value_serialized(): ParamInitValueSerializedTypeMap[T];
    abstract get raw_input_serialized(): ParamInitValueSerializedTypeMap[T];
    abstract get value_serialized(): ParamValueSerializedTypeMap[T];
    convert(raw_val: any): ParamValuesTypeMap[T] | null;
    static are_raw_input_equal(val1: any, val2: any): boolean;
    is_raw_input_equal(other_raw_input: ParamInitValuesTypeMap[T]): any;
    static are_values_equal(val1: any, val2: any): boolean;
    is_value_equal(other_val: ParamValuesTypeMap[T]): any;
    protected _clone_raw_input(raw_input: ParamInitValuesTypeMap[T]): ParamInitValuesTypeMap[T];
    set(raw_input: ParamInitValuesTypeMap[T]): void;
    protected _prefilter_invalid_raw_input(raw_input: any): ParamInitValuesTypeMap[T];
    get default_value(): ParamInitValuesTypeMap[T];
    get is_default(): boolean;
    get raw_input(): ParamInitValuesTypeMap[T];
    protected process_raw_input(): void;
    private _is_computing;
    compute(): Promise<void>;
    protected process_computation(): Promise<void>;
    set_init_value(init_value: ParamInitValuesTypeMap[T]): void;
    set_node(node: BaseNodeType | null): void;
    get node(): BaseNodeType;
    get parent(): BaseNodeType;
    set_parent_param(param: TypedMultipleParam<any>): void;
    get parent_param(): TypedMultipleParam<any> | undefined;
    has_parent_param(): boolean;
    full_path(): string;
    path_relative_to(node: BaseNodeType | BaseParamType): string;
    emit(event_name: ParamEvent): void;
    get components(): FloatParam[] | undefined;
    static get component_names(): string[];
    get component_names(): string[];
    get is_multiple(): boolean;
    init_components(): void;
    has_expression(): boolean;
    to_json(): import("./utils/Serializer").ParamSerializerData;
}
export declare type BaseParamType = TypedParam<ParamType>;
export declare class BaseParamClass extends TypedParam<ParamType> {
    get default_value_serialized(): string;
    get raw_input_serialized(): string;
    get value_serialized(): string;
}
export {};

export declare enum NodeContext {
    COP = "cop",
    EVENT = "event",
    GL = "gl",
    JS = "js",
    MANAGER = "managers",
    MAT = "mat",
    OBJ = "objects",
    SOP = "sop",
    POST = "post"
}
export interface NodeContextAndType {
    context: NodeContext;
    type: string;
}

export interface ParamOptionsMenuEntry {
    name: string;
    value: number;
}
export declare enum StringParamLanguage {
    TYPESCRIPT = "typescript"
}
interface BaseParamOptions {
    cook?: boolean;
    spare?: boolean;
    hidden?: boolean;
    label?: boolean;
    field?: boolean;
    visible_if?: Dictionary<number | boolean>;
}
interface MenuParamOptions {
    menu?: {
        entries: ParamOptionsMenuEntry[];
    };
}
interface ExpressionParamOptions {
    expression?: {
        for_entities?: boolean;
    };
}
interface NumberParamOptions extends BaseParamOptions {
    range?: Number2;
    range_locked?: Boolean2;
    step?: number;
}
interface AssetParamOptions {
    always_reference_asset?: boolean;
}
interface DesktopParamOptions {
    desktop_browse?: Dictionary<string>;
}
interface CallbackParamOptions {
    callback?: (node: BaseNodeType, param: BaseParamType) => any;
    callback_string?: string;
}
export interface BooleanParamOptions extends BaseParamOptions, MenuParamOptions, ExpressionParamOptions, CallbackParamOptions {
}
export interface ButtonParamOptions extends BaseParamOptions, CallbackParamOptions {
}
export interface ColorParamOptions extends BaseParamOptions, ExpressionParamOptions {
}
export interface FloatParamOptions extends NumberParamOptions, MenuParamOptions, ExpressionParamOptions, CallbackParamOptions {
}
export interface FolderParamOptions extends BaseParamOptions {
    level?: number;
}
export interface IntegerParamOptions extends NumberParamOptions, MenuParamOptions, CallbackParamOptions {
}
export interface OperatorPathParamOptions extends BaseParamOptions, DesktopParamOptions, CallbackParamOptions {
    node_selection?: {
        context?: NodeContext;
    };
    dependent_on_found_node?: boolean;
}
export interface RampParamOptions extends BaseParamOptions {
}
export interface SeparatorParamOptions extends BaseParamOptions {
}
export interface StringParamOptions extends BaseParamOptions, AssetParamOptions, DesktopParamOptions, ExpressionParamOptions {
    multiline?: boolean;
    language?: StringParamLanguage;
}
export interface Vector2ParamOptions extends BaseParamOptions, ExpressionParamOptions {
}
export interface Vector3ParamOptions extends BaseParamOptions, ExpressionParamOptions {
}
export interface Vector4ParamOptions extends BaseParamOptions, ExpressionParamOptions {
}
export interface ParamOptions extends NumberParamOptions, FolderParamOptions, ExpressionParamOptions, ButtonParamOptions, DesktopParamOptions, MenuParamOptions, StringParamOptions, OperatorPathParamOptions {
    texture?: {
        env?: boolean;
    };
}
export declare class OptionsController {
    private _param;
    private _programatic_visible_state;
    private _options;
    private _default_options;
    constructor(_param: BaseParamType);
    set(options: ParamOptions): void;
    copy(options_controller: OptionsController): void;
    set_option(name: keyof ParamOptions, value: any): any;
    get param(): BaseParamType;
    get node(): BaseNodeType;
    get default(): ParamOptions;
    get current(): ParamOptions;
    get has_options_overridden(): boolean;
    get overridden_options(): ParamOptions;
    get overridden_option_names(): Array<keyof ParamOptions>;
    get always_reference_asset(): boolean;
    has_callback(): boolean;
    execute_callback(): void;
    private get_callback;
    private create_callback_from_string;
    makes_node_dirty_when_dirty(): boolean;
    get desktop_browse_option(): Dictionary<string> | undefined;
    get desktop_browse_allowed(): boolean;
    desktop_browse_file_type(): string | null;
    get is_expression_for_entities(): boolean;
    get level(): number;
    get has_menu(): boolean;
    private get menu_options();
    get menu_entries(): ParamOptionsMenuEntry[];
    get has_menu_radio(): boolean;
    get is_multiline(): boolean;
    get language(): StringParamLanguage | undefined;
    get is_code(): boolean;
    get node_selection_options(): {
        context?: NodeContext | undefined;
    } | undefined;
    get node_selection_context(): NodeContext | undefined;
    dependent_on_found_node(): boolean | undefined;
    get range(): Number2;
    get step(): number;
    private range_locked;
    ensure_in_range(value: number): number;
    get is_spare(): boolean;
    get texture_options(): {
        env?: boolean | undefined;
    } | undefined;
    texture_as_env(): boolean;
    get is_hidden(): boolean;
    get is_visible(): boolean;
    set_visible_state(state: boolean): void;
    get is_label_hidden(): boolean;
    is_field_hidden(): boolean;
    ui_data_depends_on_other_params(): boolean;
    visibility_predecessors(): BaseParamType[];
    private _update_visibility_and_remove_dirty_bound;
    private _visibility_graph_node;
    private _ui_data_dependency_set;
    set_ui_data_dependency(): void;
    private update_visibility_and_remove_dirty;
    update_visibility(): Promise<void>;
}
export {};

export declare class BooleanParam extends TypedNumericParam<ParamType.BOOLEAN> {
    static type(): ParamType;
    get default_value_serialized(): string | boolean;
    get raw_input_serialized(): string | number | boolean;
    get value_serialized(): boolean;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.BOOLEAN], raw_input2: ParamInitValuesTypeMap[ParamType.BOOLEAN]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.BOOLEAN], val2: ParamValuesTypeMap[ParamType.BOOLEAN]): boolean;
    convert(raw_val: ParamInitValuesTypeMap[ParamType.BOOLEAN]): boolean | null;
}

export declare class ButtonParam extends TypedParam<ParamType.BUTTON> {
    static type(): ParamType;
    get default_value_serialized(): null;
    get raw_input_serialized(): null;
    get value_serialized(): null;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.BUTTON], raw_input2: ParamInitValuesTypeMap[ParamType.BUTTON]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.BUTTON], val2: ParamValuesTypeMap[ParamType.BUTTON]): boolean;
    press_button(): void;
}

export declare class ColorParam extends TypedMultipleParam<ParamType.COLOR> {
    protected _value: Color;
    r: FloatParam;
    g: FloatParam;
    b: FloatParam;
    static type(): ParamType;
    static get component_names(): string[];
    get default_value_serialized(): StringOrNumber3;
    get value_serialized(): Number3;
    protected _clone_raw_input(raw_input: ParamInitValuesTypeMap[ParamType.COLOR]): StringOrNumber3 | Color;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.COLOR], raw_input2: ParamInitValuesTypeMap[ParamType.COLOR]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.COLOR], val2: ParamValuesTypeMap[ParamType.COLOR]): boolean;
    init_components(): void;
    set_value_from_components(): void;
}

export declare class FolderParam extends TypedParam<ParamType.FOLDER> {
    static type(): ParamType;
    get default_value_serialized(): null;
    get raw_input_serialized(): null;
    get value_serialized(): null;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.FOLDER], raw_input2: ParamInitValuesTypeMap[ParamType.FOLDER]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.FOLDER], val2: ParamValuesTypeMap[ParamType.FOLDER]): boolean;
}

export declare class IntegerParam extends TypedNumericParam<ParamType.INTEGER> {
    static type(): ParamType;
    get default_value_serialized(): string | number;
    get raw_input_serialized(): string | number;
    get value_serialized(): number;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.INTEGER], raw_input2: ParamInitValuesTypeMap[ParamType.INTEGER]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.INTEGER], val2: ParamValuesTypeMap[ParamType.INTEGER]): boolean;
    static convert(raw_val: ParamInitValuesTypeMap[ParamType.INTEGER]): number | null;
    convert(raw_val: ParamInitValuesTypeMap[ParamType.INTEGER]): number | null;
}

export declare class OperatorPathParam extends TypedParam<ParamType.OPERATOR_PATH> {
    private _found_node;
    static type(): ParamType;
    get default_value_serialized(): string;
    get raw_input_serialized(): string;
    get value_serialized(): string;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.OPERATOR_PATH], raw_input2: ParamInitValuesTypeMap[ParamType.OPERATOR_PATH]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.OPERATOR_PATH], val2: ParamValuesTypeMap[ParamType.OPERATOR_PATH]): boolean;
    get is_default(): boolean;
    protected process_raw_input(): void;
    protected process_computation(): Promise<void>;
    found_node(): BaseNodeType | null;
}

	Mapping,
	Wrapping,
	TextureFilter,
	PixelFormat,
	TextureDataType,
	TextureEncoding,
} from '../constants';
// log handlers
export function warn( message?: any, ...optionalParams: any[] ): void;
export function error( message?: any, ...optionalParams: any[] ): void;
export function log( message?: any, ...optionalParams: any[] ): void;

// typed array parameters
export type TypedArray =
	Int8Array
	| Uint8Array
	| Uint8ClampedArray
	| Int16Array
	| Uint16Array
	| Int32Array
	| Uint32Array
	| Float32Array
	| Float64Array;


export class DataTexture extends Texture {

	constructor(
		data: TypedArray,
		width: number,
		height: number,
		format?: PixelFormat,
		type?: TextureDataType,
		mapping?: Mapping,
		wrapS?: Wrapping,
		wrapT?: Wrapping,
		magFilter?: TextureFilter,
		minFilter?: TextureFilter,
		anisotropy?: number,
		encoding?: TextureEncoding
	);

	image: ImageData;

}

export declare class RampParam extends TypedParam<ParamType.RAMP> {
    static type(): ParamType;
    private _ramp_interpolant;
    private _ramp_texture;
    static DEFAULT_VALUE: RampValue;
    static DEFAULT_VALUE_JSON: RampValueJson;
    get default_value_serialized(): RampValueJson;
    protected _clone_raw_input(raw_input: ParamInitValuesTypeMap[ParamType.RAMP]): RampValueJson;
    get raw_input_serialized(): RampValueJson;
    get value_serialized(): RampValueJson;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.RAMP], raw_input2: ParamInitValuesTypeMap[ParamType.RAMP]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.RAMP], val2: ParamValuesTypeMap[ParamType.RAMP]): boolean;
    private _reset_ramp_interpolant_and_texture_bound;
    initialize_param(): void;
    get is_default(): boolean;
    protected process_raw_input(): void;
    has_expression(): boolean;
    _reset_ramp_interpolant_and_texture(): void;
    ramp_texture(): DataTexture;
    _create_ramp_texture(): DataTexture;
    static create_interpolant(positions: Float32Array, values: Float32Array): CubicInterpolant;
    interpolant(): CubicInterpolant;
    _create_interpolant(): CubicInterpolant;
    value_at_position(position: number): number;
}

export declare class SeparatorParam extends TypedParam<ParamType.SEPARATOR> {
    static type(): ParamType;
    get default_value_serialized(): null;
    get raw_input_serialized(): null;
    get value_serialized(): null;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.SEPARATOR], raw_input2: ParamInitValuesTypeMap[ParamType.SEPARATOR]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.SEPARATOR], val2: ParamValuesTypeMap[ParamType.SEPARATOR]): boolean;
}

export declare class StringParam extends TypedParam<ParamType.STRING> {
    static type(): ParamType;
    get default_value_serialized(): string;
    protected _clone_raw_input(raw_input: ParamInitValuesTypeMap[ParamType.STRING]): string;
    get raw_input_serialized(): string;
    get value_serialized(): string;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.STRING], raw_input2: ParamInitValuesTypeMap[ParamType.STRING]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.STRING], val2: ParamValuesTypeMap[ParamType.STRING]): boolean;
    get is_default(): boolean;
    convert(raw_val: any): string;
    get raw_input(): string;
    protected process_raw_input(): void;
    protected process_computation(): Promise<void>;
    private _value_elements;
}

export declare class Vector2Param extends TypedMultipleParam<ParamType.VECTOR2> {
    protected _value: Vector2;
    x: FloatParam;
    y: FloatParam;
    static type(): ParamType;
    static get component_names(): string[];
    get default_value_serialized(): StringOrNumber2;
    get value_serialized(): Number2;
    protected _clone_raw_input(raw_input: ParamInitValuesTypeMap[ParamType.VECTOR2]): Vector2 | StringOrNumber2;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.VECTOR2], raw_input2: ParamInitValuesTypeMap[ParamType.VECTOR2]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.VECTOR2], val2: ParamValuesTypeMap[ParamType.VECTOR2]): boolean;
    init_components(): void;
    set_value_from_components(): void;
}

export declare class Vector3Param extends TypedMultipleParam<ParamType.VECTOR3> {
    protected _value: Vector3;
    x: FloatParam;
    y: FloatParam;
    z: FloatParam;
    static type(): ParamType;
    static get component_names(): string[];
    get default_value_serialized(): StringOrNumber3;
    get value_serialized(): Number3;
    protected _clone_raw_input(raw_input: ParamInitValuesTypeMap[ParamType.VECTOR3]): StringOrNumber3 | Vector3;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.VECTOR3], raw_input2: ParamInitValuesTypeMap[ParamType.VECTOR3]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.VECTOR3], val2: ParamValuesTypeMap[ParamType.VECTOR3]): boolean;
    init_components(): void;
    set_value_from_components(): void;
}

export declare class Vector4Param extends TypedMultipleParam<ParamType.VECTOR4> {
    protected _value: Vector4;
    x: FloatParam;
    y: FloatParam;
    z: FloatParam;
    w: FloatParam;
    static type(): ParamType;
    static get component_names(): string[];
    get default_value_serialized(): StringOrNumber4;
    get value_serialized(): Number4;
    protected _clone_raw_input(raw_input: ParamInitValuesTypeMap[ParamType.VECTOR4]): StringOrNumber4 | Vector4;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.VECTOR4], raw_input2: ParamInitValuesTypeMap[ParamType.VECTOR4]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.VECTOR4], val2: ParamValuesTypeMap[ParamType.VECTOR4]): boolean;
    init_components(): void;
    set_value_from_components(): void;
}

declare type ParamConstructorMapType = {
    [key in ParamType]: TypedParam<ParamType>;
};
export interface ParamConstructorMap extends ParamConstructorMapType {
    [ParamType.BOOLEAN]: BooleanParam;
    [ParamType.BUTTON]: ButtonParam;
    [ParamType.COLOR]: ColorParam;
    [ParamType.FLOAT]: FloatParam;
    [ParamType.FOLDER]: FolderParam;
    [ParamType.INTEGER]: IntegerParam;
    [ParamType.OPERATOR_PATH]: OperatorPathParam;
    [ParamType.RAMP]: RampParam;
    [ParamType.SEPARATOR]: SeparatorParam;
    [ParamType.STRING]: StringParam;
    [ParamType.VECTOR2]: Vector2Param;
    [ParamType.VECTOR3]: Vector3Param;
    [ParamType.VECTOR4]: Vector4Param;
}
export {};

declare type ParamOptionsByTypeMapGeneric = {
    [key in ParamType]: object;
};
export interface ParamOptionsByTypeMap extends ParamOptionsByTypeMapGeneric {
    [ParamType.BOOLEAN]: BooleanParamOptions;
    [ParamType.BUTTON]: ButtonParamOptions;
    [ParamType.COLOR]: ColorParamOptions;
    [ParamType.FLOAT]: FloatParamOptions;
    [ParamType.FOLDER]: FolderParamOptions;
    [ParamType.INTEGER]: IntegerParamOptions;
    [ParamType.OPERATOR_PATH]: OperatorPathParamOptions;
    [ParamType.RAMP]: RampParamOptions;
    [ParamType.SEPARATOR]: SeparatorParamOptions;
    [ParamType.STRING]: StringParamOptions;
    [ParamType.VECTOR2]: Vector2ParamOptions;
    [ParamType.VECTOR3]: Vector3ParamOptions;
    [ParamType.VECTOR4]: Vector4ParamOptions;
}
export {};

export declare class ParamTemplate<T extends ParamType> {
    type: T;
    init_value: ParamInitValuesTypeMap[T];
    options?: ParamOptions | undefined;
    readonly value_type: ParamValuesTypeMap[T];
    readonly param_class: ParamConstructorMap[T];
    constructor(type: T, init_value: ParamInitValuesTypeMap[T], options?: ParamOptions | undefined);
}
export declare class ParamConfig {
    static BUTTON(init_value: ParamInitValuesTypeMap[ParamType.BUTTON], options?: ParamOptionsByTypeMap[ParamType.BUTTON]): ParamTemplate<ParamType.BUTTON>;
    static BOOLEAN(init_value: ParamInitValuesTypeMap[ParamType.BOOLEAN], options?: ParamOptionsByTypeMap[ParamType.BOOLEAN]): ParamTemplate<ParamType.BOOLEAN>;
    static COLOR(init_value: ParamInitValuesTypeMap[ParamType.COLOR], options?: ParamOptionsByTypeMap[ParamType.COLOR]): ParamTemplate<ParamType.COLOR>;
    static FLOAT(init_value: ParamInitValuesTypeMap[ParamType.FLOAT], options?: ParamOptionsByTypeMap[ParamType.FLOAT]): ParamTemplate<ParamType.FLOAT>;
    static FOLDER(init_value?: ParamInitValuesTypeMap[ParamType.FOLDER], options?: ParamOptionsByTypeMap[ParamType.FOLDER]): ParamTemplate<ParamType.FOLDER>;
    static INTEGER(init_value: ParamInitValuesTypeMap[ParamType.INTEGER], options?: ParamOptionsByTypeMap[ParamType.INTEGER]): ParamTemplate<ParamType.INTEGER>;
    static OPERATOR_PATH(init_value: ParamInitValuesTypeMap[ParamType.OPERATOR_PATH], options?: ParamOptionsByTypeMap[ParamType.OPERATOR_PATH]): ParamTemplate<ParamType.OPERATOR_PATH>;
    static RAMP(init_value?: ParamInitValuesTypeMap[ParamType.RAMP], options?: ParamOptionsByTypeMap[ParamType.RAMP]): ParamTemplate<ParamType.RAMP>;
    static SEPARATOR(init_value?: ParamInitValuesTypeMap[ParamType.SEPARATOR], options?: ParamOptionsByTypeMap[ParamType.SEPARATOR]): ParamTemplate<ParamType.SEPARATOR>;
    static STRING(init_value?: ParamInitValuesTypeMap[ParamType.STRING], options?: ParamOptionsByTypeMap[ParamType.STRING]): ParamTemplate<ParamType.STRING>;
    static VECTOR2(init_value: ParamInitValuesTypeMap[ParamType.VECTOR2], options?: ParamOptionsByTypeMap[ParamType.VECTOR2]): ParamTemplate<ParamType.VECTOR2>;
    static VECTOR3(init_value: ParamInitValuesTypeMap[ParamType.VECTOR3], options?: ParamOptionsByTypeMap[ParamType.VECTOR3]): ParamTemplate<ParamType.VECTOR3>;
    static VECTOR4(init_value: ParamInitValuesTypeMap[ParamType.VECTOR4], options?: ParamOptionsByTypeMap[ParamType.VECTOR4]): ParamTemplate<ParamType.VECTOR4>;
}
export declare class NodeParamsConfig implements Dictionary<ParamTemplate<ParamType>> {
    [name: string]: ParamTemplate<ParamType>;
}

export interface CameraControls extends OrbitControls {
    name?: string;
}
export declare abstract class TypedCameraControlsEventNode<K extends NodeParamsConfig> extends TypedEventNode<K> {
    apply_controls(camera: Camera, html_element: HTMLElement): Promise<CameraControls>;
    controls_id(): string;
    abstract setup_controls(controls: CameraControls): void;
    abstract create_controls_instance(camera: Camera, element: HTMLElement): Promise<CameraControls>;
    abstract set_from_camera_node(controls: CameraControls, camera_node: BaseCameraObjNodeType): void;
}
export declare type BaseCameraControlsEventNodeType = TypedCameraControlsEventNode<any>;

export declare class CameraControlsConfig {
    private _camera_node_id;
    private _controls_node;
    private _controls;
    constructor(_camera_node_id: string, _controls_node: BaseCameraControlsEventNodeType, _controls: CameraControls);
    get camera_node_id(): string;
    get controls(): CameraControls;
    get controls_node(): BaseCameraControlsEventNodeType;
    is_equal(other_config: CameraControlsConfig): boolean;
}

export declare class ControlsController {
    private node;
    _applied_controls_by_element_id: Dictionary<Dictionary<boolean>>;
    private _controls_node;
    private controls_start_listener;
    private controls_end_listener;
    constructor(node: BaseCameraObjNodeType);
    controls_param(): BaseParamType | null;
    controls_node(): Promise<BaseCameraControlsEventNodeType | null>;
    update_controls(): Promise<void>;
    apply_controls(html_element: HTMLElement): Promise<CameraControlsConfig | undefined>;
    dispose_control_refs(): void;
    dispose_controls(html_element: HTMLElement): Promise<void>;
    set_controls_events(controls: CameraControls): void;
    on_controls_start(controls: CameraControls): void;
    on_controls_end(controls: CameraControls): void;
}

export * from './ShadowMaterial';
export * from './SpriteMaterial';
export * from './RawShaderMaterial';
export * from './ShaderMaterial';
export * from './PointsMaterial';
export * from './MeshPhysicalMaterial';
export * from './MeshStandardMaterial';
export * from './MeshPhongMaterial';
export * from './MeshToonMaterial';
export * from './MeshNormalMaterial';
export * from './MeshLambertMaterial';
export * from './MeshDepthMaterial';
export * from './MeshDistanceMaterial';
export * from './MeshBasicMaterial';
export * from './MeshMatcapMaterial';
export * from './LineDashedMaterial';
export * from './LineBasicMaterial';
export * from './Material';

export interface ContainableMap {
    GEOMETRY: CoreGroup;
    MATERIAL: Material;
    TEXTURE: Texture;
    OBJECT: Object3D;
    EVENT: string;
    MANAGER: boolean;
    POST: number;
    GL: string;
    JS: string;
}

declare type K = keyof ContainableMap;
declare type Containable = ContainableMap[K];
export declare abstract class TypedContainer<T extends Containable> {
    protected _node: BaseNodeType;
    protected _content: T;
    constructor(_node: BaseNodeType);
    set_node(node: BaseNodeType): void;
    node(): BaseNodeType;
    clone(): TypedContainer<T>;
    reset_caches(): void;
    set_content(content: T): void;
    has_content(): boolean;
    content(): T;
    protected _post_set_content(): void;
    core_content(): T | undefined;
    core_content_cloned(): T | undefined;
    infos(): any;
}
export declare class BaseContainer extends TypedContainer<any> {
}
export {};

export declare class ObjectContainer extends TypedContainer<ContainableMap['OBJECT']> {
    set_content(content: ContainableMap['OBJECT']): void;
    set_object(object: Object3D): void;
    has_object(): boolean;
    object(): Object3D;
}

export declare class TypedContainerController<T extends TypedContainer<any>> {
    protected node: BaseNodeType;
    private _callbacks;
    protected _container: T;
    constructor(node: BaseNodeType, container_class: typeof BaseContainer);
    get container(): T;
    request_container(): Promise<T>;
    process_container_request(): void;
    request_input_container(input_index: number): Promise<any>;
    notify_requesters(container?: T): void;
}
export declare class BaseContainerController extends TypedContainerController<any> {
}

export declare enum ObjNodeRenderOrder {
    MANAGER = 0,
    FOG = 1,
    CAMERA = 2,
    LIGHT = 3,
    EVENT = 4,
    MAT = 5
}
export declare class TypedObjNode<O extends Object3D, K extends NodeParamsConfig> extends TypedNode<'OBJECT', BaseObjNodeType, K> {
    container_controller: TypedContainerController<ObjectContainer>;
    readonly render_order: number;
    static node_context(): NodeContext;
    static displayed_input_names(): string[];
    protected _children_group: Group;
    protected _object: O;
    protected _attachable_to_hierarchy: boolean;
    get attachable_to_hierarchy(): boolean;
    protected _used_in_scene: boolean;
    get used_in_scene(): boolean;
    set_used_in_scene(state: boolean): void;
    add_object_to_parent(parent: Object3D): void;
    remove_object_from_parent(): void;
    initialize_base_node(): void;
    get children_group(): Group;
    get object(): O;
    _create_object_with_attributes(): O;
    private set_object_name;
    create_object(): Object3D;
    is_display_node_cooking(): boolean;
    is_displayed(): boolean;
}
export declare type BaseObjNodeType = TypedObjNode<Object3D, any>;
export declare class BaseObjNodeClass extends TypedObjNode<Object3D, any> {
}

export declare function LayerParamConfig<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        layer: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.INTEGER>;
    };
} & TBase;
export declare class LayersController {
    private node;
    constructor(node: BaseObjNodeType);
    update(): void;
}

export declare function CameraPostProcessParamConfig<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        post_process: import("../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../poly/ParamType").ParamType.FOLDER>;
        do_post_process: import("../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../poly/ParamType").ParamType.BOOLEAN>;
        use_post_process_node0: import("../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node0: import("../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../poly/ParamType").ParamType.OPERATOR_PATH>;
        use_post_process_node1: import("../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node1: import("../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../poly/ParamType").ParamType.OPERATOR_PATH>;
        use_post_process_node2: import("../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node2: import("../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../poly/ParamType").ParamType.OPERATOR_PATH>;
        use_post_process_node3: import("../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node3: import("../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & TBase;
export declare class PostProcessController {
    private node;
    private _renderers_by_canvas_id;
    private _composers_by_canvas_id;
    private _resolution_by_canvas_id;
    private _composers_set_in_progress_by_canvas_id;
    private _fetch_post_process_nodes_in_progress;
    private _post_process_nodes;
    private _post_process_use_node_path_params;
    private _post_process_node_path_params;
    constructor(node: BaseCameraObjNodeType);
    render(canvas: HTMLCanvasElement, size: Vector2, aspect: number): void;
    private renderer;
    create_renderer(canvas: HTMLCanvasElement, size: Vector2): WebGLRenderer;
    delete_renderer(canvas: HTMLCanvasElement): void;
    set_renderer_size(canvas: HTMLCanvasElement, size: Vector2): void;
    private composer;
    private _create_composer;
    update_composer_passes(): Promise<void>;
    private set_composers_passes;
    private set_composer_passes;
    private clear_render_passes;
    private composer_passes_nodes_changed;
}

export declare class CamerasController {
    private viewer;
    private _camera_node;
    private _size;
    private _aspect;
    constructor(viewer: BaseViewer);
    set_camera_node(camera_node: BaseCameraObjNodeType): Promise<void>;
    private _graph_node;
    private _update_graph_node;
    private _create_graph_node;
    get camera_node(): BaseCameraObjNodeType | null;
    get size(): Vector2;
    get aspect(): number;
    on_resize(): void;
    compute_size_and_aspect(): void;
    private _update_size;
    private _get_aspect;
    update_camera_aspect(): void;
    prepare_current_camera(): Promise<void>;
    _update_from_camera_container(): Promise<void>;
}

export declare class ControlsController {
    private viewer;
    protected _active: boolean;
    protected _controls: CameraControls | null;
    _bound_on_controls_start: () => void;
    _bound_on_controls_end: () => void;
    constructor(viewer: BaseViewer);
    get active(): boolean;
    get camera_node(): import("../../nodes/obj/_BaseCamera").BaseCameraObjNodeType | null;
    get controls(): CameraControls | null;
    create_controls(): Promise<void>;
    update(): void;
    dispose_controls(): void;
    private _on_controls_start;
    private _on_controls_end;
}

declare type MouseOrTouchEvent = MouseEvent | TouchEvent;
declare type MouseOrTouchEventCallback = (e: MouseOrTouchEvent) => void;
export declare class EventsController {
    protected viewer: BaseViewer;
    protected _bound_on_mousedown: MouseOrTouchEventCallback;
    protected _bound_on_mousemove: MouseOrTouchEventCallback;
    protected _bound_on_mouseup: MouseOrTouchEventCallback;
    constructor(viewer: BaseViewer);
    get camera_node(): import("../../nodes/obj/_BaseCamera").BaseCameraObjNodeType | null;
    get canvas(): HTMLCanvasElement | undefined;
    init(): void;
    protected _on_mousedown(event: MouseOrTouchEvent): void;
    protected _on_mousemove(event: MouseOrTouchEvent): void;
    protected _on_mouseup(event: MouseOrTouchEvent): void;
}
export {};

export declare class WebGLController {
    protected viewer: BaseViewer;
    request_animation_frame_id: number | undefined;
    constructor(viewer: BaseViewer);
    init(): void;
    protected _on_webglcontextlost(): void;
    protected _on_webglcontextrestored(): void;
}

export declare abstract class BaseViewer {
    protected _container: HTMLElement;
    protected _scene: PolyScene;
    protected _display_scene: Scene;
    protected _canvas: HTMLCanvasElement | undefined;
    protected _active: boolean;
    get active(): boolean;
    activate(): void;
    deactivate(): void;
    protected _cameras_controller: CamerasController | undefined;
    get cameras_controller(): CamerasController;
    protected _controls_controller: ControlsController | undefined;
    get controls_controller(): ControlsController;
    protected _events_controller: EventsController | undefined;
    get events_controller(): EventsController;
    protected _webgl_controller: WebGLController | undefined;
    get webgl_controller(): WebGLController;
    constructor(_container: HTMLElement, _scene: PolyScene, camera_node: BaseCameraObjNodeType);
    get container(): HTMLElement;
    get scene(): PolyScene;
    get canvas(): HTMLCanvasElement | undefined;
    private _init_from_scene;
    protected abstract _build(): void;
    reset_container_class(): void;
    set_container_class_hovered(): void;
}

declare global {
    interface HTMLCanvasElement {
        onwebglcontextlost: () => void;
        onwebglcontextrestored: () => void;
    }
}
export declare class ThreejsViewer extends BaseViewer {
    protected _scene: PolyScene;
    private _request_animation_frame_id;
    private do_render;
    private _animate_method;
    constructor(_container: HTMLElement, _scene: PolyScene, camera_node: BaseCameraObjNodeType);
    _build(): void;
    dispose(): void;
    private _set_events;
    private _init_display;
    animate(): void;
    private _cancel_animate;
    render(): void;
}

/**
 * parameters is an object with one or more properties defining the material's appearance.
 */
export interface MeshBasicMaterialParameters extends MaterialParameters {
	color?: Color | string | number;
	opacity?: number;
	map?: Texture | null;
	aoMap?: Texture | null;
	aoMapIntensity?: number;
	specularMap?: Texture | null;
	alphaMap?: Texture | null;
	envMap?: Texture | null;
	combine?: Combine;
	reflectivity?: number;
	refractionRatio?: number;
	wireframe?: boolean;
	wireframeLinewidth?: number;
	wireframeLinecap?: string;
	wireframeLinejoin?: string;
	skinning?: boolean;
	morphTargets?: boolean;
}

export class MeshBasicMaterial extends Material {

	constructor( parameters?: MeshBasicMaterialParameters );

	color: Color;
	map: Texture | null;
	aoMap: Texture | null;
	aoMapIntensity: number;
	specularMap: Texture | null;
	alphaMap: Texture | null;
	envMap: Texture | null;
	combine: Combine;
	reflectivity: number;
	refractionRatio: number;
	wireframe: boolean;
	wireframeLinewidth: number;
	wireframeLinecap: string;
	wireframeLinejoin: string;
	skinning: boolean;
	morphTargets: boolean;

	setValues( parameters: MeshBasicMaterialParameters ): void;

}

export declare function CameraBackgroundParamConfig<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        background: import("../../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../../poly/ParamType").ParamType.FOLDER>;
        use_background: import("../../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../../poly/ParamType").ParamType.BOOLEAN>;
        use_material: import("../../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../../poly/ParamType").ParamType.BOOLEAN>;
        background_color: import("../../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../../poly/ParamType").ParamType.COLOR>;
        background_material: import("../../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../../poly/ParamType").ParamType.OPERATOR_PATH>;
        background_ratio: import("../../../../utils/params/ParamsConfig").ParamTemplate<import("../../../../../poly/ParamType").ParamType.FLOAT>;
    };
} & TBase;
export declare class BaseBackgroundController {
    protected node: BaseCameraObjNodeType;
    private _screen_quad;
    private _screen_quad_flat_material;
    protected _bg_raycaster: Raycaster;
    constructor(node: BaseCameraObjNodeType);
    get screen_quad(): Mesh;
    private _create_screen_quad;
    screen_quad_flat_material(): MeshBasicMaterial;
    add_params(): void;
    get use_background(): boolean;
    get use_background_material(): boolean;
    get use_background_color(): boolean;
    get background_color(): Color | null;
    protected update_screen_quad(): void;
    update(): Promise<void>;
    private update_background_color;
    private update_background_material;
}

export interface OrthoOrPerspCamera extends Camera {
    near: number;
    far: number;
    updateProjectionMatrix: () => void;
    getFocalLength?: () => void;
}
export declare const BASE_CAMERA_DEFAULT: {
    near: number;
    far: number;
};
declare type FlagHookCallback = () => void;
export declare class BaseFlag {
    protected node: BaseNodeType;
    protected _state: boolean;
    protected _hooks: FlagHookCallback[] | null;
    constructor(node: BaseNodeType);
    add_hook(hook: FlagHookCallback): void;
    protected on_update(): void;
    set(new_state: boolean): void;
    get active(): boolean;
    toggle(): void;
    run_hooks(): void;
}
export {};

export declare class BypassFlag extends BaseFlag {
    protected _state: boolean;
    on_update(): void;
}

export declare class DisplayFlag extends BaseFlag {
    on_update(): void;
}

export declare class FlagsController {
    protected node: BaseNodeType;
    readonly bypass: DisplayFlag | undefined;
    readonly display: BypassFlag | undefined;
    constructor(node: BaseNodeType);
    has_display(): boolean;
    has_bypass(): boolean;
}
declare const FlagsControllerD_base: {
    new (...args: any[]): {
        node: BaseNodeType;
        display: DisplayFlag;
        has_display(): boolean;
    };
} & typeof FlagsController;
export declare class FlagsControllerD extends FlagsControllerD_base {
}
declare const FlagsControllerB_base: {
    new (...args: any[]): {
        node: BaseNodeType;
        readonly bypass: BypassFlag;
        has_bypass(): boolean;
    };
} & typeof FlagsController;
export declare class FlagsControllerB extends FlagsControllerB_base {
}
declare const FlagsControllerDB_base: {
    new (...args: any[]): {
        node: BaseNodeType;
        readonly bypass: BypassFlag;
        has_bypass(): boolean;
    };
} & {
    new (...args: any[]): {
        node: BaseNodeType;
        display: DisplayFlag;
        has_display(): boolean;
    };
} & typeof FlagsController;
export declare class FlagsControllerDB extends FlagsControllerDB_base {
}
export {};

/// <reference path="../../../custom_typings/math.d.ts" />
export interface SetParamsFromMatrixOptions {
    scale?: boolean;
}
export declare class CoreTransform {
    static set_params_from_matrix(matrix: Matrix4, node: BaseNodeType, options?: SetParamsFromMatrixOptions): void;
    static set_params_from_object(object: Object3D, node: BaseNodeType): void;
    private _translation_matrix;
    private _translation_matrix_q;
    private _translation_matrix_s;
    translation_matrix(t: Vector3): Matrix4;
    static matrix_quaternion(matrix: Matrix4): Quaternion;
    private _matrix;
    private _matrix_q;
    private _matrix_e;
    private _matrix_s;
    matrix(t: Vector3, r: Vector3, s: Vector3, scale: number): Matrix4;
    private _rotate_geometry_m;
    private _rotate_geometry_q;
    private _rotate_geometry_vec_dest;
    rotate_geometry(geometry: BufferGeometry, vec_origin: Vector3, vec_dest: Vector3): void;
}

export declare function TransformedParamConfig<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        transform: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.FOLDER>;
        t: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.VECTOR3>;
        r: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.VECTOR3>;
        s: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.VECTOR3>;
        scale: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.FLOAT>;
    };
} & TBase;
declare const TransformedParamsConfig_base: {
    new (...args: any[]): {
        transform: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.FOLDER>;
        t: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.VECTOR3>;
        r: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.VECTOR3>;
        s: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.VECTOR3>;
        scale: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.FLOAT>;
    };
} & typeof NodeParamsConfig;
declare class TransformedParamsConfig extends TransformedParamsConfig_base {
}
export declare class TransformedObjNode extends TypedObjNode<Object3D, TransformedParamsConfig> {
    readonly transform_controller: TransformController;
}
export declare class TransformController {
    private node;
    constructor(node: TransformedObjNode);
    initialize_node(): void;
    private _cook_main_without_inputs_when_dirty_bound;
    private _cook_main_without_inputs_when_dirty;
    static on_input_updated(node: BaseObjNodeType): void;
    on_input_updated(): void;
    update(matrix?: Matrix4): void;
    update_transform_with_matrix(matrix?: Matrix4): void;
    private _update_transform_from_params_scale;
    update_transform_from_params(): void;
    set_params_from_matrix(matrix: Matrix4, options?: SetParamsFromMatrixOptions): void;
}
export {};

export declare function CameraTransformParamConfig<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        camera: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        controls: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        target: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        near: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        far: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        set_master_camera: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BUTTON>;
    };
} & TBase;
declare const BaseCameraObjParamsConfig_base: {
    new (...args: any[]): {
        post_process: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        do_post_process: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        use_post_process_node0: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node0: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        use_post_process_node1: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node1: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        use_post_process_node2: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node2: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        use_post_process_node3: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node3: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        background: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        use_background: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        use_material: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        background_color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
        background_material: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        background_ratio: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & {
    new (...args: any[]): {
        transform: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        t: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        r: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        s: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & {
    new (...args: any[]): {
        layer: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    };
} & {
    new (...args: any[]): {
        camera: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        controls: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        target: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        near: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        far: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        set_master_camera: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BUTTON>;
    };
} & typeof NodeParamsConfig;
export declare class BaseCameraObjParamsConfig extends BaseCameraObjParamsConfig_base {
}
export declare class TypedCameraObjNode<O extends OrthoOrPerspCamera, K extends BaseCameraObjParamsConfig> extends TypedObjNode<O, K> {
    readonly render_order: number;
    protected _object: O;
    protected _aspect: number;
    get object(): O;
    readonly transform_controller: TransformController;
    readonly flags: FlagsControllerD;
    protected _background_controller: BaseBackgroundController | undefined;
    get background_controller(): BaseBackgroundController;
    protected get background_controller_constructor(): typeof BaseBackgroundController;
    protected _controls_controller: ControlsController | undefined;
    get controls_controller(): ControlsController;
    protected _layers_controller: LayersController | undefined;
    get layers_controller(): LayersController;
    protected _post_process_controller: PostProcessController | undefined;
    get post_process_controller(): PostProcessController;
    initialize_base_node(): void;
    cook(): Promise<void>;
    on_create(): void;
    on_delete(): void;
    camera(): O;
    update_camera(): void;
    static PARAM_CALLBACK_set_master_camera(node: BaseCameraObjNodeType): void;
    set_as_master_camera(): void;
    setup_for_aspect_ratio(aspect: number): void;
    protected _update_for_aspect_ratio(): void;
    update_transform_params_from_object(): void;
    create_viewer(element: HTMLElement): ThreejsViewer;
}
export declare type BaseCameraObjNodeType = TypedCameraObjNode<OrthoOrPerspCamera, BaseCameraObjParamsConfig>;
export declare class BaseCameraObjNodeClass extends TypedCameraObjNode<OrthoOrPerspCamera, BaseCameraObjParamsConfig> {
}
export {};

export declare class CamerasController {
    private scene;
    constructor(scene: PolyScene);
    _master_camera_node_path: string | null;
    set_master_camera_node_path(camera_node_path: string): void;
    get master_camera_node_path(): string | null;
    get master_camera_node(): BaseCameraObjNodeType | null;
    private _find_any_camera;
}

export declare class Cooker {
    private _scene;
    private _queue;
    private _block_level;
    private _process_item_bound;
    constructor(_scene: PolyScene);
    block(): void;
    unblock(): void;
    get blocked(): boolean;
    enqueue(node: CoreGraphNode, original_trigger_graph_node?: CoreGraphNode): void;
    process_queue(): void;
    private _process_item;
}

export declare class CookController {
    private _cooking_nodes_by_id;
    private _resolves;
    constructor();
    add_node(node: BaseNodeType): void;
    remove_node(node: BaseNodeType): void;
    private flush;
    wait_for_cooks_completed(): Promise<void>;
}

import '../../Poly';
export declare enum SceneEvent {
    FRAME_RANGE_UPDATED = "scene_frame_range_updated",
    FRAME_UPDATED = "scene_frame_updated",
    PLAY_STATE_UPDATED = "scene_play_state_updated"
}

export declare enum NodeEvent {
    CREATED = "node_created",
    DELETED = "node_deleted",
    NAME_UPDATED = "node_name_update",
    OVERRIDE_CLONABLE_STATE_UPDATE = "node_override_clonable_state_update",
    NAMED_OUTPUTS_UPDATED = "node_named_outputs_updated",
    NAMED_INPUTS_UPDATED = "node_named_inputs_updated",
    INPUTS_UPDATED = "node_inputs_updated",
    PARAMS_UPDATED = "node_params_updated",
    UI_DATA_POSITION_UPDATED = "node_ui_data_position_updated",
    UI_DATA_COMMENT_UPDATED = "node_ui_data_comment_updated",
    ERROR_UPDATED = "node_error_updated",
    FLAG_BYPASS_UPDATED = "bypass_flag_updated",
    FLAG_DISPLAY_UPDATED = "display_flag_updated",
    SELECTION_UPDATED = "selection_updated"
}

interface EventsListener {
    process_events: (emitter: CoreGraphNode, event_name: SceneEvent | NodeEvent | ParamEvent, data?: any) => void;
}
export declare class DispatchController {
    private scene;
    constructor(scene: PolyScene);
    private _events_listener;
    set_listener(events_listener: EventsListener): void;
    get events_listener(): EventsListener | undefined;
    dispatch(emitter: CoreGraphNode, event_name: SceneEvent | NodeEvent | ParamEvent, data?: any): void;
    get emit_allowed(): boolean;
}
export {};

export declare class EventsController {
    private _mouse_events_controller;
    private _controllers;
    constructor(scene: PolyScene);
    register_event_node(node: BaseEventNodeType): void;
    unregister_event_node(node: BaseEventNodeType): void;
    process_event(event: Event, canvas: HTMLCanvasElement, camera_node: BaseCameraObjNodeType): void;
    private _get_controller_for_node;
}

export declare class LifeCycleController {
    private scene;
    constructor(scene: PolyScene);
    private _lifecycle_on_create_allowed;
    on_create_hook_allowed(): boolean;
    on_create_prevent(callback: () => void): void;
}

export declare class LoadingController {
    private scene;
    constructor(scene: PolyScene);
    _loading_state: boolean;
    _auto_updating: boolean;
    _first_object_loaded: boolean;
    mark_as_loading(): void;
    mark_as_loaded(): Promise<void>;
    private _set_loading_state;
    get is_loading(): boolean;
    get loaded(): boolean;
    get auto_updating(): boolean;
    set_auto_update(new_state: boolean): Promise<void>;
    on_first_object_loaded(): void;
}

export declare class ExpressionsController {
    private _params_by_id;
    constructor();
    register_param(param: BaseParamType): void;
    deregister_param(param: BaseParamType): void;
    regenerate_referring_expressions(node: BaseNodeType): void;
}

export declare class MissingExpressionReference {
    private param;
    path: string;
    constructor(param: BaseParamType, path: string);
    matches_path(path: string): boolean;
    update_from_method_dependency_name_change(): void;
    resolve_missing_dependencies(): void;
}

import jsep from 'jsep';
export declare class MissingReferencesController {
    private references;
    register(param: BaseParamType, jsep_node: jsep.Expression, path_argument: string): MissingExpressionReference;
    deregister_param(param: BaseParamType): void;
    check_for_missing_references(node: BaseNodeType): void;
    private _check_for_missing_references_for_node;
    private _check_for_missing_references_for_param;
}

export declare class ManagerContainer extends TypedContainer<ContainableMap['MANAGER']> {
    set_content(content: ContainableMap['MANAGER']): void;
}

export declare class TypedBaseManagerNode<K extends NodeParamsConfig> extends TypedNode<'MANAGER', BaseManagerNodeType, K> {
    container_controller: TypedContainerController<ManagerContainer>;
    static node_context(): NodeContext;
}
export declare type BaseManagerNodeType = TypedBaseManagerNode<any>;
export declare class BaseManagerNodeClass extends TypedBaseManagerNode<any> {
}

export declare class GeometryContainer extends TypedContainer<ContainableMap['GEOMETRY']> {
    set_objects(objects: Object3D[]): void;
    core_content_cloned(): CoreGroup | undefined;
    set_content(content: ContainableMap['GEOMETRY']): void;
    private first_object;
    private first_geometry;
    objects_count(): number;
    objects_visible_count(): number;
    objects_count_by_type(): Dictionary<number>;
    objects_names_by_type(): Dictionary<string[]>;
    vertex_attribute_names(): string[];
    vertex_attribute_sizes_by_name(): Dictionary<number>;
    vertex_attribute_types_by_name(): Dictionary<number>;
    object_attribute_names(): string[];
    points_count(): number;
    bounding_box(): Box3;
    center(): Vector3;
    size(): Vector3;
}

declare enum MESSAGE {
    FROM_SET_CORE_GROUP = "from set_core_group",
    FROM_SET_GROUP = "from set_group",
    FROM_SET_OBJECTS = "from set_objects",
    FROM_SET_OBJECT = "from set_object",
    FROM_SET_GEOMETRIES = "from set_geometries",
    FROM_SET_GEOMETRY = "from set_geometry"
}
export declare class TypedSopNode<K extends NodeParamsConfig> extends TypedNode<'GEOMETRY', BaseSopNodeType, K> {
    container_controller: TypedContainerController<GeometryContainer>;
    readonly flags: FlagsControllerDB;
    static node_context(): NodeContext;
    static displayed_input_names(): string[];
    initialize_base_node(): void;
    set_core_group(core_group: CoreGroup): void;
    set_object(object: Object3D): void;
    set_objects(objects: Object3D[]): void;
    set_geometry(geometry: BufferGeometry, type?: ObjectType): void;
    set_geometries(geometries: BufferGeometry[], type?: ObjectType): void;
    set_container_objects(objects: Object3D[], message: MESSAGE): void;
    create_object(geometry: BufferGeometry, type?: ObjectType): Object3DWithGeometry;
    _set_object_attributes(object: Object3D): void;
    _add_index(geometry: BufferGeometry): void;
}
export declare type BaseSopNodeType = TypedSopNode<NodeParamsConfig>;
export declare class BaseSopNodeClass extends TypedSopNode<NodeParamsConfig> {
}
export {};

export declare class DisplayNodeController {
    protected node: GeoObjNode;
    _graph_node: CoreGraphNode;
    _display_node: BaseSopNodeType | undefined;
    _children_uuids_dict: Dictionary<boolean>;
    _children_length: number;
    private _request_display_node_container_bound;
    constructor(node: GeoObjNode);
    get display_node(): BaseSopNodeType | undefined;
    private _parent_object;
    set_parent_object(object: Object3D): void;
    get parent_object(): Object3D;
    initialize_node(): void;
    set_display_node(new_display_node: BaseSopNodeType): Promise<void>;
    remove_children(): void;
    get used_in_scene(): boolean;
    private request_display_node_container;
}

declare class AddSopParamsConfig extends NodeParamsConfig {
    create_point: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    points_count: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    position: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    open: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    connect_to_last_point: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class AddSopNode extends TypedSopNode<AddSopParamsConfig> {
    params_config: AddSopParamsConfig;
    static type(): string;
    _objects: Object3D[] | undefined;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    private _create_point;
}
export {};

declare class AnimationCopySopParamsConfig extends NodeParamsConfig {
}
export declare class AnimationCopySopNode extends TypedSopNode<AnimationCopySopParamsConfig> {
    params_config: AnimationCopySopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
}
export {};

// Animation ////////////////////////////////////////////////////////////////////////////////////////

export class AnimationAction {

	constructor( mixer: AnimationMixer, clip: AnimationClip, localRoot?: Object3D );

	loop: AnimationActionLoopStyles;
	time: number;
	timeScale: number;
	weight: number;
	repetitions: number;
	paused: boolean;
	enabled: boolean;
	clampWhenFinished: boolean;
	zeroSlopeAtStart: boolean;
	zeroSlopeAtEnd: boolean;

	play(): AnimationAction;
	stop(): AnimationAction;
	reset(): AnimationAction;
	isRunning(): boolean;
	isScheduled(): boolean;
	startAt( time: number ): AnimationAction;
	setLoop(
		mode: AnimationActionLoopStyles,
		repetitions: number
	): AnimationAction;
	setEffectiveWeight( weight: number ): AnimationAction;
	getEffectiveWeight(): number;
	fadeIn( duration: number ): AnimationAction;
	fadeOut( duration: number ): AnimationAction;
	crossFadeFrom(
		fadeOutAction: AnimationAction,
		duration: number,
		warp: boolean
	): AnimationAction;
	crossFadeTo(
		fadeInAction: AnimationAction,
		duration: number,
		warp: boolean
	): AnimationAction;
	stopFading(): AnimationAction;
	setEffectiveTimeScale( timeScale: number ): AnimationAction;
	getEffectiveTimeScale(): number;
	setDuration( duration: number ): AnimationAction;
	syncWith( action: AnimationAction ): AnimationAction;
	halt( duration: number ): AnimationAction;
	warp(
		statTimeScale: number,
		endTimeScale: number,
		duration: number
	): AnimationAction;
	stopWarping(): AnimationAction;
	getMixer(): AnimationMixer;
	getClip(): AnimationClip;
	getRoot(): Object3D;

}

export class AnimationObjectGroup {

	constructor( ...args: any[] );

	uuid: string;
	stats: {
		bindingsPerObject: number;
		objects: {
			total: number;
			inUse: number;
		};
	};
	readonly isAnimationObjectGroup: true;

	add( ...args: any[] ): void;
	remove( ...args: any[] ): void;
	uncache( ...args: any[] ): void;

}


export class AnimationMixer extends EventDispatcher {

	constructor( root: Object3D | AnimationObjectGroup );

	time: number;
	timeScale: number;

	clipAction( clip: AnimationClip, root?: Object3D | AnimationObjectGroup ): AnimationAction;
	existingAction( clip: AnimationClip, root?: Object3D | AnimationObjectGroup ): AnimationAction | null;
	stopAllAction(): AnimationMixer;
	update( deltaTime: number ): AnimationMixer;
	setTime( timeInSeconds: number ): AnimationMixer;
	getRoot(): Object3D | AnimationObjectGroup;
	uncacheClip( clip: AnimationClip ): void;
	uncacheRoot( root: Object3D | AnimationObjectGroup ): void;
	uncacheAction( clip: AnimationClip, root?: Object3D | AnimationObjectGroup ): void;

}

export interface Object3DWithAnimation extends Object3DWithGeometry {
    animations: AnimationClip[];
}

declare class AnimationMixerSopParamsConfig extends NodeParamsConfig {
    time: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.FLOAT>;
    prepare: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.BUTTON>;
}
export declare class AnimationMixerSopNode extends TypedSopNode<AnimationMixerSopParamsConfig> {
    params_config: AnimationMixerSopParamsConfig;
    static type(): string;
    _previous_time: number | null;
    _mixer: AnimationMixer | null;
    _actions_by_name: Dictionary<AnimationAction>;
    _values_by_param_name: Dictionary<number>;
    _animation_target: Object3DWithAnimation | undefined;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    private create_mixer;
    private _remove_spare_params;
    private _update_mixer;
    private _update_mixer_time;
    private _update_mixer_weights;
    static PARAM_CALLBACK_prepare(node: AnimationMixerSopNode, param: BaseParamType): void;
    prepare_animation_mixer(): Promise<void>;
}
export {};

declare class AttribAddMultSopParamsConfig extends NodeParamsConfig {
    name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    pre_add: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    mult: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    post_add: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class AttribAddMultSopNode extends TypedSopNode<AttribAddMultSopParamsConfig> {
    params_config: AttribAddMultSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    private _update_attrib;
}
export {};

declare class AttribCopySopParamsConfig extends NodeParamsConfig {
    name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    tnew_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    new_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
}
export declare class AttribCopySopNode extends TypedSopNode<AttribCopySopParamsConfig> {
    params_config: AttribCopySopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    create_params(): void;
    cook(input_contents: CoreGroup[]): void;
    private copy_vertex_attribute_between_core_groups;
    private copy_vertex_attribute_between_geometries;
}
export {};

declare class AttribCreateSopParamsConfig extends NodeParamsConfig {
    group: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    class: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    value1: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    value2: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    value3: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    value4: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR4>;
    string: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
}
export declare class AttribCreateSopNode extends TypedSopNode<AttribCreateSopParamsConfig> {
    params_config: AttribCreateSopParamsConfig;
    static type(): string;
    private _x_arrays_by_geometry_uuid;
    private _y_arrays_by_geometry_uuid;
    private _z_arrays_by_geometry_uuid;
    private _w_arrays_by_geometry_uuid;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    add_point_attribute(core_group: CoreGroup): Promise<void>;
    add_object_attribute(core_group: CoreGroup): Promise<void>;
    add_numeric_attribute_to_points(core_object: CoreObject): Promise<void>;
    add_numeric_attribute_to_object(core_objects: CoreObject[]): Promise<void>;
    add_string_attribute_to_points(core_object: CoreObject): Promise<void>;
    add_string_attribute_to_object(core_objects: CoreObject[]): Promise<void>;
    private _init_array_if_required;
}
export {};

declare class AttribDeleteSopParamsConfig extends NodeParamsConfig {
    class: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
}
export declare class AttribDeleteSopNode extends TypedSopNode<AttribDeleteSopParamsConfig> {
    params_config: AttribDeleteSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    delete_vertex_attribute(core_group: CoreGroup, attrib_name: string): void;
    delete_object_attribute(core_group: CoreGroup, attrib_name: string): void;
}
export {};

declare class AttribNormalizeSopParamsConfig extends NodeParamsConfig {
    name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    change_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    new_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
}
export declare class AttribNormalizeSopNode extends TypedSopNode<AttribNormalizeSopParamsConfig> {
    params_config: AttribNormalizeSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    _normalize_attribute(core_group: CoreGroup): void;
}
export {};

export declare enum AttribPromoteMode {
    MIN = 0,
    MAX = 1,
    FIRST_FOUND = 3
}
declare class AttribPromoteSopParamsConfig extends NodeParamsConfig {
    class_from: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    class_to: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    mode: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
}
export declare class AttribPromoteSopNode extends TypedSopNode<AttribPromoteSopParamsConfig> {
    params_config: AttribPromoteSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    create_params(): void;
    private _core_group;
    private _core_object;
    private _values_per_attrib_name;
    private _filtered_values_per_attrib_name;
    cook(input_contents: CoreGroup[]): void;
    private find_values;
    private find_values_from_points;
    private find_values_from_object;
    private filter_values;
    private set_values;
    private set_values_to_points;
    private set_values_to_object;
}
export {};

declare class AttribRemapSopParamsConfig extends NodeParamsConfig {
    name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    ramp: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.RAMP>;
    change_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    new_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
}
export declare class AttribRemapSopNode extends TypedSopNode<AttribRemapSopParamsConfig> {
    params_config: AttribRemapSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    _remap_attribute(core_group: CoreGroup): void;
}
export {};

declare class AttribRenameSopParamsConfig extends NodeParamsConfig {
    class: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    old_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    new_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
}
export declare class AttribRenameSopNode extends TypedSopNode<AttribRenameSopParamsConfig> {
    params_config: AttribRenameSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
}
export {};

export declare type OctreeNodeTraverseCallback = (node: OctreeNode) => void;
export declare class OctreeNode {
    private _bbox;
    private _level;
    _leaves_by_octant: Dictionary<OctreeNode>;
    _points_by_octant_id: Dictionary<CorePoint[]>;
    _leaves: OctreeNode[];
    _center: Vector3;
    _bounding_boxes_by_octant: Dictionary<Box3>;
    _bounding_boxes_by_octant_prepared: boolean;
    constructor(_bbox: Box3, _level?: number);
    level(): number;
    traverse(callback: OctreeNodeTraverseCallback): void;
    intersects_sphere(sphere: Sphere): boolean;
    points_in_sphere(sphere: Sphere, accumulated_points: CorePoint[]): void;
    bounding_box(): Box3 | undefined;
    set_points(points: CorePoint[]): void;
    create_leaf(octant_id: string): void;
    add_point(point: CorePoint): void;
    private _octant_id;
    _leaf_bbox(octant_id: string): Box3;
    private _bbox_center;
    private _prepare_leaves_bboxes;
}

export declare class CoreOctree {
    private _root;
    constructor(bbox: Box3);
    set_points(points: CorePoint[]): void;
    traverse(callback: OctreeNodeTraverseCallback): void;
    find_points(position: Vector3, distance: number, max_points_count?: number): CorePoint[];
}

declare class AttribTransferSopParamsConfig extends NodeParamsConfig {
    src_group: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    dest_group: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    max_samples_count: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    distance_threshold: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    blend_width: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class AttribTransferSopNode extends TypedSopNode<AttribTransferSopParamsConfig> {
    params_config: AttribTransferSopParamsConfig;
    static type(): string;
    _core_group_dest: CoreGroup;
    _core_group_src: CoreGroup;
    _attrib_names: string[];
    _octree_timestamp: number | undefined;
    _prev_param_src_group: string | undefined;
    _octree: CoreOctree | undefined;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): Promise<void>;
    _error_if_attribute_not_found_on_second_input(): void;
    private _build_octree_if_required;
    private _add_attribute_if_required;
    private _transfer_attributes;
    private _transfer_attributes_for_point;
    private _interpolate_points;
}
export {};

declare class BboxScatterSopParamsConfig extends NodeParamsConfig {
    step_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class BboxScatterSopNode extends TypedSopNode<BboxScatterSopParamsConfig> {
    params_config: BboxScatterSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
}
export {};

declare class BlendSopParamsConfig extends NodeParamsConfig {
    attrib_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    blend: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class BlendSopNode extends TypedSopNode<BlendSopParamsConfig> {
    params_config: BlendSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    private blend;
}
export {};

declare class BoxSopParamsConfig extends NodeParamsConfig {
    size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    divisions: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    center: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
}
export declare class BoxSopNode extends TypedSopNode<BoxSopParamsConfig> {
    params_config: BoxSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    private _core_transform;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    private _cook_without_input;
    private _cook_with_input;
}
export {};

declare class CacheSopParamsConfig extends NodeParamsConfig {
    cache: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    reset: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BUTTON>;
}
export declare class CacheSopNode extends TypedSopNode<CacheSopParamsConfig> {
    params_config: CacheSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    static PARAM_CALLBACK_reset(node: CacheSopNode, param: BaseParamType): void;
    param_callback_PARAM_CALLBACK_reset(): Promise<void>;
}
export {};

declare class CircleSopParamsConfig extends NodeParamsConfig {
    radius: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    segments: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    open: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    arc_angle: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    direction: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
}
export declare class CircleSopNode extends TypedSopNode<CircleSopParamsConfig> {
    params_config: CircleSopParamsConfig;
    static type(): string;
    private _core_transform;
    initialize_node(): void;
    cook(): void;
    _create_circle(): void;
    _create_disk(): void;
}
export {};

declare class CodeSopParamsConfig extends NodeParamsConfig {
    code_typescript: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    code_javascript: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
}
export declare class CodeSopNode extends TypedSopNode<CodeSopParamsConfig> {
    params_config: CodeSopParamsConfig;
    private _last_compiled_code;
    private _function;
    static type(): string;
    initialize_node(): void;
    cook(core_groups: CoreGroup[]): void;
    private _compile_if_required;
    private _compile;
}
export {};

declare class ColorSopParamsConfig extends NodeParamsConfig {
    from_attribute: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    attrib_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
    as_hsv: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class ColorSopNode extends TypedSopNode<ColorSopParamsConfig> {
    params_config: ColorSopParamsConfig;
    static type(): string;
    private _r_arrays_by_geometry_uuid;
    private _g_arrays_by_geometry_uuid;
    private _b_arrays_by_geometry_uuid;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): Promise<void>;
    _set_from_attribute(core_object: CoreObject): void;
    private _create_init_color;
    _eval_simple_values(core_object: CoreObject): void;
    _eval_expressions(core_object: CoreObject): Promise<void>;
    private _update_from_param;
    private _init_array_if_required;
    private _commit_tmp_values;
}
export {};

export declare class CopyStamp extends CoreGraphNode {
    private _global_index;
    private _point;
    constructor(scene: PolyScene);
    set_point(point: CorePoint): void;
    set_global_index(index: number): void;
    value(attrib_name?: string): any;
}

declare class CopySopParamsConfig extends NodeParamsConfig {
    count: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    transform_only: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    copy_attributes: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    attributes_to_copy: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    use_copy_expr: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class CopySopNode extends TypedSopNode<CopySopParamsConfig> {
    params_config: CopySopParamsConfig;
    static type(): string;
    private _attribute_names_to_copy;
    private _objects;
    private _stamp_node;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(): Promise<void>;
    private cook_with_template;
    private _copy_moved_objects_on_template_points;
    private _copy_moved_object_on_template_point;
    private _get_moved_objects_for_template_point;
    private _stamp_instance_group_if_required;
    private _copy_moved_objects_for_each_instance;
    private _copy_moved_objects_for_instance;
    private cook_without_template;
    private _copy_attributes_from_template;
    stamp_value(attrib_name?: string): any;
    get stamp_node(): CopyStamp;
    private create_stamp_node;
}
export {};

declare class DataSopParamsConfig extends NodeParamsConfig {
    data: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
}
export declare class DataSopNode extends TypedSopNode<DataSopParamsConfig> {
    params_config: DataSopParamsConfig;
    static type(): string;
    cook(): void;
}
export {};

declare class DataUrlSopParamsConfig extends NodeParamsConfig {
    url: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    json_data_keys_prefix: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    skip_entries: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    convert: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    convert_to_numeric: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    reload: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BUTTON>;
}
export declare class DataUrlSopNode extends TypedSopNode<DataUrlSopParamsConfig> {
    params_config: DataUrlSopParamsConfig;
    static type(): string;
    cook(): Promise<void>;
    _on_load(objects: Object3D): void;
    _on_error(error: ErrorEvent): void;
    static PARAM_CALLBACK_reload(node: DataUrlSopNode, param: BaseParamType): void;
    param_callback_reload(): void;
}
export {};

declare class DelaySopParamsConfig extends NodeParamsConfig {
    duration: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
}
export declare class DelaySopNode extends TypedSopNode<DelaySopParamsConfig> {
    params_config: DelaySopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(inputs_contents: CoreGroup[]): void;
}
export {};

declare class DeleteSopParamsConfig extends NodeParamsConfig {
    class: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    invert: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    hide_objects: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    by_object_type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    object_type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    by_expression: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    expression: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    by_attrib: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    attrib_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    attrib_string: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    attrib_numeric: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR4>;
    attrib_comparison_operator: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    by_bbox: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    bbox_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    bbox_center: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    by_visible: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    keep_points: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class DeleteSopNode extends TypedSopNode<DeleteSopParamsConfig> {
    params_config: DeleteSopParamsConfig;
    static type(): string;
    private _bbox_cache;
    private _marked_for_deletion_per_object_index;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): Promise<void>;
    private _eval_for_objects;
    private _eval_for_points;
    private _eval_expressions_for_points;
    private _eval_expressions_for_objects;
    private _eval_attrib_for_points;
    private _comparison;
    private _eval_type_for_objects;
    private _eval_attrib_for_objects;
    private _eval_bbox_for_points;
    private get _bbox();
    private _point_object;
}
export {};

declare class FaceSopParamsConfig extends NodeParamsConfig {
    make_faces_unique: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    add_face_center_attribute: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    add_face_id: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    transform: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class FaceSopNode extends TypedSopNode<FaceSopParamsConfig> {
    params_config: FaceSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    private _make_faces_unique;
    private _add_face_center_attribute;
    private _add_face_id;
    private _transform_faces;
}
export {};

declare class FileSopParamsConfig extends NodeParamsConfig {
    url: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    reload: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BUTTON>;
}
export declare class FileSopNode extends TypedSopNode<FileSopParamsConfig> {
    params_config: FileSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(): void;
    private _on_load;
    private _on_error;
    static PARAM_CALLBACK_reload(node: FileSopNode): void;
    private param_callback_reload;
}
export {};

declare class FuseSopParamsConfig extends NodeParamsConfig {
    dist: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class FuseSopNode extends TypedSopNode<FuseSopParamsConfig> {
    params_config: FuseSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    private _fuse_core_object;
}
export {};

declare class HexagonsSopParamsConfig extends NodeParamsConfig {
    size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    hexagon_radius: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    direction: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    points_only: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class HexagonsSopNode extends TypedSopNode<HexagonsSopParamsConfig> {
    params_config: HexagonsSopParamsConfig;
    static type(): string;
    private _core_transform;
    initialize_node(): void;
    cook(): void;
}
export {};

export declare enum HierarchyMode {
    ADD_PARENT = "add_parent",
    REMOVE_PARENT = "remove_parent"
}
export declare const HIERARCHY_MODES: Array<HierarchyMode>;
declare class HierarchySopParamsConfig extends NodeParamsConfig {
    mode: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    levels: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
}
export declare class HierarchySopNode extends TypedSopNode<HierarchySopParamsConfig> {
    params_config: HierarchySopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    private _add_parent_to_core_group;
    private _add_parent_to_object;
    private _add_new_parent;
    private _remove_parent_from_core_group;
    private _remove_parent_from_object;
    private _get_children_from_objects;
}
export {};

declare class InstanceSopParamsConfig extends NodeParamsConfig {
    attributes_to_copy: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    apply_material: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    material: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
}
export declare class InstanceSopNode extends TypedSopNode<InstanceSopParamsConfig> {
    params_config: InstanceSopParamsConfig;
    static type(): string;
    private _globals_handler;
    private _geometry;
    static displayed_input_names(): string[];
    private _on_create_bound;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): Promise<void>;
    _apply_material(object: Mesh): Promise<void>;
    _create_instance(geometry_to_instance: BufferGeometry, template_core_group: CoreGroup): void;
    private _on_create;
}
export {};

declare class JitterSopParamsConfig extends NodeParamsConfig {
    amount: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    seed: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
}
export declare class JitterSopNode extends TypedSopNode<JitterSopParamsConfig> {
    params_config: JitterSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
}
export {};

declare class LayerSopParamsConfig extends NodeParamsConfig {
    layer: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
}
export declare class LayerSopNode extends TypedSopNode<LayerSopParamsConfig> {
    params_config: LayerSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
}
export {};

declare class LineSopParamsConfig extends NodeParamsConfig {
    length: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    points_count: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    origin: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    direction: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
}
export declare class LineSopNode extends TypedSopNode<LineSopParamsConfig> {
    params_config: LineSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(): void;
}
export {};


/**
 * @deprecated Use {@link PointsMaterial THREE.PointsMaterial} instead
 */
/**
 * @deprecated Use {@link PointsMaterial THREE.PointsMaterial} instead
 */
/**
 * @deprecated Use {@link PointsMaterial THREE.PointsMaterial} instead
 */

export interface ShaderMaterialParameters extends MaterialParameters {
	uniforms?: any;
	vertexShader?: string;
	fragmentShader?: string;
	linewidth?: number;
	wireframe?: boolean;
	wireframeLinewidth?: number;
	lights?: boolean;
	clipping?: boolean;
	skinning?: boolean;
	morphTargets?: boolean;
	morphNormals?: boolean;
	extensions?: {
		derivatives?: boolean;
		fragDepth?: boolean;
		drawBuffers?: boolean;
		shaderTextureLOD?: boolean;
	};
}

export class ShaderMaterial extends Material {

	constructor( parameters?: ShaderMaterialParameters );

	uniforms: { [uniform: string]: IUniform };
	vertexShader: string;
	fragmentShader: string;
	linewidth: number;
	wireframe: boolean;
	wireframeLinewidth: number;
	lights: boolean;
	clipping: boolean;
	skinning: boolean;
	morphTargets: boolean;
	morphNormals: boolean;
	/**
	 * @deprecated Use {@link ShaderMaterial#extensions.derivatives extensions.derivatives} instead.
	 */
	derivatives: any;
	extensions: {
		derivatives: boolean;
		fragDepth: boolean;
		drawBuffers: boolean;
		shaderTextureLOD: boolean;
	};
	defaultAttributeValues: any;
	index0AttributeName: string | undefined;
	uniformsNeedUpdate: boolean;

	setValues( parameters: ShaderMaterialParameters ): void;
	toJSON( meta: any ): any;

}

export declare enum LineType {
    FUNCTION_DECLARATION = "function_declaration",
    DEFINE = "define",
    BODY = "body"
}

export declare enum ShaderName {
    VERTEX = "vertex",
    FRAGMENT = "fragment",
    LEAVES_FROM_NODES_SHADER = "leaves_from_nodes_shader",
    PARTICLES_0 = "particles_0",
    PARTICLES_1 = "particles_1",
    PARTICLES_2 = "particles_2",
    PARTICLES_3 = "particles_3",
    PARTICLES_4 = "particles_4",
    PARTICLES_5 = "particles_5",
    PARTICLES_6 = "particles_6",
    PARTICLES_7 = "particles_7",
    PARTICLES_8 = "particles_8",
    PARTICLES_9 = "particles_9"
}
export declare const ParticleShaderNames: Array<ShaderName>;

export declare class ShaderConfig {
    private _name;
    private _input_names;
    private _dependencies;
    constructor(_name: ShaderName, _input_names: string[], _dependencies: ShaderName[]);
    name(): ShaderName;
    input_names(): string[];
    dependencies(): ShaderName[];
}

interface VariableConfigOptions {
    default_from_attribute?: boolean;
    default?: string;
    if?: string;
    prefix?: string;
    suffix?: string;
}
export declare class VariableConfig {
    private _name;
    private _options;
    constructor(_name: string, _options?: VariableConfigOptions);
    name(): string;
    default_from_attribute(): boolean;
    default(): string | undefined;
    if_condition(): string | undefined;
    prefix(): string;
    suffix(): string;
}
export {};

export declare class ParamConfig<T extends ParamType> {
    private _type;
    private _name;
    private _default_value;
    private _uniform_name;
    private _uniform;
    private _cached_param_value;
    constructor(_type: T, _name: string, _default_value: ParamInitValuesTypeMap[T], _uniform_name: string);
    static from_param<K extends ParamType>(param: TypedParam<K>, uniform_name: string): ParamConfig<K>;
    get type(): T;
    get name(): string;
    get default_value(): ParamInitValuesTypeMap[T];
    get uniform_name(): string;
    get uniform(): IUniform;
    private _create_uniform;
    get param_options(): {
        callback: (node: BaseNodeType, param: BaseParamType) => void;
        node_selection: {
            context: NodeContext;
        };
    } | {
        callback: (node: BaseNodeType, param: BaseParamType) => void;
        node_selection?: undefined;
    };
    private _callback;
    static uniform_by_type(type: ParamType): IUniform;
    set_uniform_value(node: BaseNodeType): Promise<void>;
    set_uniform_value_from_texture(param: OperatorPathParam, uniform: IUniform): Promise<void>;
    set_uniform_value_from_ramp(param: RampParam, uniform: IUniform): void;
    has_value_changed(new_value: ParamValuesTypeMap[T]): boolean;
    is_video_texture(): boolean;
}

export declare class ParamConfigsController {
    private _param_configs;
    reset(): void;
    push(param_config: ParamConfig<ParamType>): void;
    create_and_push<T extends ParamType>(type: T, name: string, default_value: ParamInitValuesTypeMap[T], uniform_name: string): void;
    get list(): Readonly<ParamConfig<ParamType>[]>;
}

export declare class CodeBuilder {
    private _assembler;
    private _gl_parent_node;
    _param_configs_controller: ParamConfigsController;
    _param_configs_set_allowed: boolean;
    private _shaders_collection_controller;
    _lines: Map<ShaderName, Map<LineType, string[]>>;
    _function_declared: Map<ShaderName, Map<string, boolean>>;
    constructor(_assembler: BaseGlShaderAssembler, _gl_parent_node: BaseNodeType);
    build_from_nodes(root_nodes: BaseGlNodeType[]): Promise<void>;
    disallow_new_param_configs(): void;
    allow_new_param_configs(): void;
    shader_names(): ShaderName[];
    private reset;
    param_configs(): readonly import("../../../utils/code/configs/ParamConfig").ParamConfig<import("../../../../poly/ParamType").ParamType>[];
    lines(shader_name: ShaderName, line_type: LineType): string[] | undefined;
    all_lines(): Map<ShaderName, Map<LineType, string[]>>;
    set_param_configs(nodes: BaseGlNodeType[]): void;
    set_code_lines(nodes: BaseGlNodeType[]): void;
    add_code_lines(nodes: BaseGlNodeType[], shader_name: ShaderName): void;
    private add_definitions;
    add_code_line_for_nodes_and_line_type(nodes: BaseGlNodeType[], shader_name: ShaderName, line_type: LineType): void;
    add_code_line_for_node_and_line_type(node: BaseGlNodeType, shader_name: ShaderName, line_type: LineType, is_last: boolean): void;
}

export declare abstract class TypedAssembler<T extends TypedNode<any, any, any>> {
    abstract get shader_names(): ShaderName[];
    abstract input_names_for_shader_name(node: T, shader_name: ShaderName): string[];
}

export declare class TypedGLDefinitionCollection<T extends GLDefinitionType> {
    private _definitions;
    _errored: boolean;
    _error_message: string | undefined;
    constructor(_definitions?: TypedGLDefinition<T>[]);
    get errored(): boolean;
    get error_message(): string | undefined;
    uniq(): TypedGLDefinition<T>[];
}

export declare enum ConnectionPointType {
    BOOL = "bool",
    INT = "int",
    FLOAT = "float",
    VEC2 = "vec2",
    VEC3 = "vec3",
    VEC4 = "vec4",
    SAMPLER_2D = "sampler2D"
}
export declare const ConnectionPointTypes: Array<ConnectionPointType>;
declare type ConnectionPointTypeToParamTypeMapGeneric = {
    [key in ConnectionPointType]: ParamType;
};
export interface IConnectionPointTypeToParamTypeMap extends ConnectionPointTypeToParamTypeMapGeneric {
    [ConnectionPointType.BOOL]: ParamType.BOOLEAN;
    [ConnectionPointType.INT]: ParamType.INTEGER;
    [ConnectionPointType.FLOAT]: ParamType.FLOAT;
    [ConnectionPointType.VEC2]: ParamType.VECTOR2;
    [ConnectionPointType.VEC3]: ParamType.VECTOR3;
    [ConnectionPointType.VEC4]: ParamType.VECTOR4;
}
export declare const ConnectionPointTypeToParamTypeMap: IConnectionPointTypeToParamTypeMap;
declare type ParamTypeToConnectionPointTypeMapGeneric = {
    [key in ParamType]: ConnectionPointType | undefined;
};
export interface IParamTypeToConnectionPointTypeMap extends ParamTypeToConnectionPointTypeMapGeneric {
    [ParamType.BOOLEAN]: ConnectionPointType.BOOL;
    [ParamType.COLOR]: ConnectionPointType.VEC3;
    [ParamType.INTEGER]: ConnectionPointType.INT;
    [ParamType.FLOAT]: ConnectionPointType.FLOAT;
    [ParamType.FOLDER]: undefined;
    [ParamType.VECTOR2]: ConnectionPointType.VEC2;
    [ParamType.VECTOR3]: ConnectionPointType.VEC3;
    [ParamType.VECTOR4]: ConnectionPointType.VEC4;
    [ParamType.BUTTON]: undefined;
    [ParamType.OPERATOR_PATH]: undefined;
    [ParamType.RAMP]: undefined;
    [ParamType.SEPARATOR]: undefined;
    [ParamType.STRING]: undefined;
}
export declare const ParamTypeToConnectionPointTypeMap: IParamTypeToConnectionPointTypeMap;
export declare type ConnectionPointInitValueMapGeneric = {
    [key in ConnectionPointType]: ParamInitValuesTypeMap[IConnectionPointTypeToParamTypeMap[key]];
};
export declare const ConnectionPointInitValueMap: ConnectionPointInitValueMapGeneric;
export declare type ConnectionPointComponentsCountMapGeneric = {
    [key in ConnectionPointType]: number;
};
export declare const ConnectionPointComponentsCountMap: ConnectionPointComponentsCountMapGeneric;
export {};

export declare enum GLDefinitionType {
    ATTRIBUTE = "attribute",
    FUNCTION = "function",
    UNIFORM = "uniform",
    VARYING = "varying"
}
export declare abstract class TypedGLDefinition<T extends GLDefinitionType> {
    protected _definition_type: T;
    protected _data_type: ConnectionPointType;
    protected _node: BaseGlNodeType;
    protected _name: string;
    constructor(_definition_type: T, _data_type: ConnectionPointType, _node: BaseGlNodeType, _name: string);
    get definition_type(): T;
    get data_type(): ConnectionPointType;
    get node(): BaseGlNodeType;
    get name(): string;
    abstract get line(): string;
    collection_instance(): TypedGLDefinitionCollection<T>;
}
export declare class AttributeGLDefinition extends TypedGLDefinition<GLDefinitionType.ATTRIBUTE> {
    protected _node: BaseGlNodeType;
    protected _data_type: ConnectionPointType;
    protected _name: string;
    constructor(_node: BaseGlNodeType, _data_type: ConnectionPointType, _name: string);
    get line(): string;
}
export declare class FunctionGLDefinition extends TypedGLDefinition<GLDefinitionType.FUNCTION> {
    protected _node: BaseGlNodeType;
    protected _data_type: ConnectionPointType;
    protected _name: string;
    constructor(_node: BaseGlNodeType, _data_type: ConnectionPointType, _name: string);
    get line(): string;
}
export declare class UniformGLDefinition extends TypedGLDefinition<GLDefinitionType.UNIFORM> {
    protected _node: BaseGlNodeType;
    protected _data_type: ConnectionPointType;
    protected _name: string;
    constructor(_node: BaseGlNodeType, _data_type: ConnectionPointType, _name: string);
    get line(): string;
}
export declare class VaryingGLDefinition extends TypedGLDefinition<GLDefinitionType.VARYING> {
    protected _node: BaseGlNodeType;
    protected _data_type: ConnectionPointType;
    protected _name: string;
    constructor(_node: BaseGlNodeType, _data_type: ConnectionPointType, _name: string);
    get line(): string;
}
export declare type BaseGLDefinition = TypedGLDefinition<GLDefinitionType>;

export declare class ShadersCollectionController {
    private _shader_names;
    private _current_shader_name;
    private _lines_controller_by_shader_name;
    constructor(_shader_names: ShaderName[], _current_shader_name: ShaderName);
    get shader_names(): ShaderName[];
    set_current_shader_name(shader_name: ShaderName): void;
    get current_shader_name(): ShaderName;
    add_definitions(node: BaseGlNodeType, definitions: BaseGLDefinition[], shader_name?: ShaderName): void;
    definitions(shader_name: ShaderName, node: BaseGlNodeType): BaseGLDefinition[] | undefined;
    add_body_lines(node: BaseGlNodeType, lines: string[], shader_name?: ShaderName): void;
    body_lines(shader_name: ShaderName, node: BaseGlNodeType): string[] | undefined;
}

declare class OutputGlParamsConfig extends NodeParamsConfig {
}
export declare class OutputGlNode extends TypedGlNode<OutputGlParamsConfig> {
    params_config: OutputGlParamsConfig;
    static type(): string;
    initialize_node(): void;
    create_params(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

export interface TypedNamedConnectionPointData<T extends ConnectionPointType> {
    name: string;
    type: T;
}
export declare class TypedNamedConnectionPoint<T extends ConnectionPointType> {
    protected _name: string;
    protected _type: T;
    protected _init_value?: ConnectionPointInitValueMapGeneric[T] | undefined;
    private _json;
    constructor(_name: string, _type: T, _init_value?: ConnectionPointInitValueMapGeneric[T] | undefined);
    get name(): string;
    get type(): T;
    get param_type(): IConnectionPointTypeToParamTypeMap[T];
    get init_value(): ConnectionPointInitValueMapGeneric[T] | undefined;
    to_json(): TypedNamedConnectionPointData<T>;
    private _create_json;
}
export declare type BaseNamedConnectionPointType = TypedNamedConnectionPoint<ConnectionPointType>;

interface DisconnectionOptions {
    set_input?: boolean;
}
export declare class NodeConnection {
    private _node_src;
    private _node_dest;
    private _output_index;
    private _input_index;
    private static _next_id;
    private _id;
    constructor(_node_src: BaseNodeType, _node_dest: BaseNodeType, _output_index?: number, _input_index?: number);
    get id(): number;
    get node_src(): BaseNodeType;
    get node_dest(): BaseNodeType;
    get output_index(): number;
    get input_index(): number;
    disconnect(options?: DisconnectionOptions): void;
}
export {};

declare type IONameFunction = (index: number) => string;
declare type ExpectedConnectionTypesFunction = () => ConnectionPointType[];
export declare class GlConnectionsController {
    private node;
    private _input_name_function;
    private _output_name_function;
    private _expected_input_types_function;
    private _expected_output_types_function;
    constructor(node: BaseGlNodeType);
    set_input_name_function(func: IONameFunction): void;
    set_output_name_function(func: IONameFunction): void;
    set_expected_input_types_function(func: ExpectedConnectionTypesFunction): void;
    set_expected_output_types_function(func: ExpectedConnectionTypesFunction): void;
    output_name(index: number): string;
    private _update_signature_if_required_bound;
    private _initialized;
    initialize_node(): void;
    update_signature_if_required(dirty_trigger?: CoreGraphNode): void;
    private make_successors_update_signatures;
    update_connection_types(): void;
    protected _connections_match_inputs(): boolean;
    first_input_connection_type(): ConnectionPointType | undefined;
    connection_type_from_connection(connection: NodeConnection): ConnectionPointType;
}
export {};

export declare const ConnectionPointTypesAvailableForAttribute: ConnectionPointType[];
declare class AttributeGlParamsConfig extends NodeParamsConfig {
    name: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.STRING>;
    type: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.INTEGER>;
}
export declare class AttributeGlNode extends TypedGlNode<AttributeGlParamsConfig> {
    params_config: AttributeGlParamsConfig;
    static type(): string;
    static readonly INPUT_NAME = "export";
    static readonly OUTPUT_NAME = "val";
    private _on_create_set_name_if_none_bound;
    readonly gl_connections_controller: GlConnectionsController;
    initialize_node(): void;
    create_params(): void;
    get input_name(): string;
    get output_name(): string;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
    get attribute_name(): string;
    gl_type(): ConnectionPointType;
    connected_input_node(): BaseGlNodeType | null;
    connected_input_connection_point(): BaseNamedConnectionPointType | undefined;
    output_connection_point(): BaseNamedConnectionPointType | undefined;
    get is_importing(): boolean;
    get is_exporting(): boolean;
    private _set_mat_to_recompile_if_is_exporting;
    private _on_create_set_name_if_none;
}
export {};

declare class FloatToIntGlParamsConfig extends NodeParamsConfig {
    float: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class FloatToIntGlNode extends TypedGlNode<FloatToIntGlParamsConfig> {
    params_config: FloatToIntGlParamsConfig;
    static type(): string;
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
declare class IntToFloatGlParamsConfig extends NodeParamsConfig {
    int: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
}
export declare class IntToFloatGlNode extends TypedGlNode<IntToFloatGlParamsConfig> {
    params_config: IntToFloatGlParamsConfig;
    static type(): string;
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

declare class FloatToVec2GlParamsConfig extends NodeParamsConfig {
    x: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    y: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class FloatToVec2GlNode extends TypedGlNode<FloatToVec2GlParamsConfig> {
    params_config: FloatToVec2GlParamsConfig;
    static type(): string;
    static readonly OUTPUT_NAME = "vec2";
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
declare class FloatToVec3GlParamsConfig extends NodeParamsConfig {
    x: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    y: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    z: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class FloatToVec3GlNode extends TypedGlNode<FloatToVec3GlParamsConfig> {
    params_config: FloatToVec3GlParamsConfig;
    static type(): string;
    static readonly OUTPUT_NAME = "vec3";
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
declare class FloatToVec4GlParamsConfig extends NodeParamsConfig {
    x: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    y: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    z: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    w: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class FloatToVec4GlNode extends TypedGlNode<FloatToVec4GlParamsConfig> {
    params_config: FloatToVec4GlParamsConfig;
    static type(): string;
    static readonly OUTPUT_NAME = "vec4";
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

declare class VecToParamsConfig extends NodeParamsConfig {
}
declare class BaseVecToGlNode extends TypedGlNode<VecToParamsConfig> {
    params_config: VecToParamsConfig;
}
declare const Vec2ToFloatGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        create_params(): void;
        set_lines(shaders_collection_controller: ShadersCollectionController): void;
        params_config: VecToParamsConfig;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController | undefined;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<VecToParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<VecToParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        add_param<T extends ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class Vec2ToFloatGlNode extends Vec2ToFloatGlNode_base {
}
declare const Vec3ToFloatGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        create_params(): void;
        set_lines(shaders_collection_controller: ShadersCollectionController): void;
        params_config: VecToParamsConfig;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController | undefined;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<VecToParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<VecToParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        add_param<T extends ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class Vec3ToFloatGlNode extends Vec3ToFloatGlNode_base {
}
declare const Vec4ToFloatGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        create_params(): void;
        set_lines(shaders_collection_controller: ShadersCollectionController): void;
        params_config: VecToParamsConfig;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController | undefined;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<VecToParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<VecToParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        add_param<T extends ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class Vec4ToFloatGlNode extends Vec4ToFloatGlNode_base {
}
export declare class Vec4ToVectorGlNode extends BaseVecToGlNode {
    static type(): string;
    static readonly INPUT_NAME_VEC4 = "vec4";
    static readonly OUTPUT_NAME_VEC3 = "vec3";
    static readonly OUTPUT_NAME_W = "w";
    initialize_node(): void;
    create_params(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

declare const AbsGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class AbsGlNode extends AbsGlNode_base {
}
declare const AcosGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class AcosGlNode extends AcosGlNode_base {
}
declare const AsinGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class AsinGlNode extends AsinGlNode_base {
}
declare const AtanGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class AtanGlNode extends AtanGlNode_base {
}
declare const CeilGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class CeilGlNode extends CeilGlNode_base {
}
declare const CosGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class CosGlNode extends CosGlNode_base {
}
declare const DegreesGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class DegreesGlNode extends DegreesGlNode_base {
}
declare const ExpGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class ExpGlNode extends ExpGlNode_base {
}
declare const Exp2GlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class Exp2GlNode extends Exp2GlNode_base {
}
declare const FloorGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class FloorGlNode extends FloorGlNode_base {
}
declare const FractGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class FractGlNode extends FractGlNode_base {
}
declare const InverseSqrtGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class InverseSqrtGlNode extends InverseSqrtGlNode_base {
}
declare const LogGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class LogGlNode extends LogGlNode_base {
}
declare const Log2GlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class Log2GlNode extends Log2GlNode_base {
}
declare const NormalizeGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class NormalizeGlNode extends NormalizeGlNode_base {
}
declare const RadiansGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class RadiansGlNode extends RadiansGlNode_base {
}
declare const SignGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class SignGlNode extends SignGlNode_base {
}
declare const SinGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class SinGlNode extends SinGlNode_base {
}
declare const SqrtGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class SqrtGlNode extends SqrtGlNode_base {
}
declare const TanGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class TanGlNode extends TanGlNode_base {
}
export {};

declare const AddGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        set_lines(shaders_collection_controller: ShadersCollectionController): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_operation(): string;
        _expected_input_types(): ConnectionPointType[];
        _expected_output_types(): ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_method_name(): string;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class AddGlNode extends AddGlNode_base {
}
declare const DivideGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        set_lines(shaders_collection_controller: ShadersCollectionController): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_operation(): string;
        _expected_input_types(): ConnectionPointType[];
        _expected_output_types(): ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_method_name(): string;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class DivideGlNode extends DivideGlNode_base {
}
declare const SubstractGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        set_lines(shaders_collection_controller: ShadersCollectionController): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_operation(): string;
        _expected_input_types(): ConnectionPointType[];
        _expected_output_types(): ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_method_name(): string;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class SubstractGlNode extends SubstractGlNode_base {
}
declare const MultGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        set_lines(shaders_collection_controller: ShadersCollectionController): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_operation(): string;
        _expected_input_types(): ConnectionPointType[];
        _expected_output_types(): ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_method_name(): string;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class MultGlNode extends MultGlNode_base {
    static type(): string;
    gl_input_default_value(name: string): number;
    initialize_node(): void;
    protected _expected_output_type(): ConnectionPointType[];
    protected _expected_input_types(): ConnectionPointType[];
}
export {};

declare const AndGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        boolean_operation(): string;
        _gl_output_name(index: number): string;
        _gl_input_name(index?: number): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_method_name(): string;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class AndGlNode extends AndGlNode_base {
}
declare const OrGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        boolean_operation(): string;
        _gl_output_name(index: number): string;
        _gl_input_name(index?: number): string;
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        gl_method_name(): string;
        gl_function_definitions(): import("./utils/GLDefinition").TypedGLDefinition<import("./utils/GLDefinition").GLDefinitionType>[];
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class OrGlNode extends OrGlNode_base {
}
export {};

declare class BaseAdaptiveParamsConfig extends NodeParamsConfig {
}
export declare abstract class BaseAdaptiveGlNode<T extends BaseAdaptiveParamsConfig> extends TypedGlNode<T> {
    readonly gl_connections_controller: GlConnectionsController;
    initialize_node(): void;
}
export {};

export declare class BaseGlMathFunctionParamsConfig extends NodeParamsConfig {
}
export declare abstract class BaseGlMathFunctionGlNode extends BaseAdaptiveGlNode<BaseGlMathFunctionParamsConfig> {
    params_config: BaseGlMathFunctionParamsConfig;
    protected gl_method_name(): string;
    protected gl_function_definitions(): TypedGLDefinition<GLDefinitionType>[];
    initialize_node(): void;
    protected _expected_input_types(): ConnectionPointType[];
    protected _expected_output_types(): ConnectionPointType[];
    protected _gl_input_name(index: number): string;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export declare abstract class BaseNodeGlMathFunctionArg1GlNode extends BaseGlMathFunctionGlNode {
    protected _gl_input_name(index: number): string;
    protected _expected_input_types(): ConnectionPointType[];
}
export declare abstract class BaseNodeGlMathFunctionArg2GlNode extends BaseGlMathFunctionGlNode {
    protected _expected_input_types(): ConnectionPointType[];
}
export declare abstract class BaseNodeGlMathFunctionArg3GlNode extends BaseGlMathFunctionGlNode {
    protected _expected_input_types(): ConnectionPointType[];
}
export declare abstract class BaseNodeGlMathFunctionArg4GlNode extends BaseGlMathFunctionGlNode {
    protected _expected_input_types(): ConnectionPointType[];
}
export declare abstract class BaseNodeGlMathFunctionArg5GlNode extends BaseGlMathFunctionGlNode {
    protected _expected_input_types(): ConnectionPointType[];
}

export declare class AlignGlNode extends BaseNodeGlMathFunctionArg2GlNode {
    static type(): string;
    initialize_node(): void;
    gl_input_default_value(name: string): Number3;
    gl_method_name(): string;
    gl_function_definitions(): FunctionGLDefinition[];
}

declare class ConstantGlParamsConfig extends NodeParamsConfig {
    type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    bool: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    int: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    float: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    vec2: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    vec3: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    vec4: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR4>;
}
export declare class ConstantGlNode extends TypedGlNode<ConstantGlParamsConfig> {
    params_config: ConstantGlParamsConfig;
    static type(): string;
    static readonly OUTPUT_NAME = "val";
    private _params_by_type;
    readonly gl_connections_controller: GlConnectionsController;
    protected _allow_inputs_created_from_params: boolean;
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
    private get _current_connection_type();
    private get _current_param();
    private get _current_var_name();
}
export {};

export declare class ComplementGlNode extends BaseNodeGlMathFunctionArg1GlNode {
    static type(): string;
    gl_method_name(): string;
    gl_function_definitions(): FunctionGLDefinition[];
}

declare class CrossGlParamsConfig extends NodeParamsConfig {
    x: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    y: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
}
export declare class CrossGlNode extends TypedGlNode<CrossGlParamsConfig> {
    params_config: CrossGlParamsConfig;
    static type(): string;
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

declare const CycleGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_output_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        gl_input_default_value(name: string): any;
        gl_function_definitions(): import("./utils/GLDefinition").FunctionGLDefinition[];
        _expected_input_types(): import("../utils/connections/ConnectionPointType").ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class CycleGlNode extends CycleGlNode_base {
}
export {};

declare class DiskGlParamsConfig extends NodeParamsConfig {
    position: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    center: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    radius: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    feather: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class DiskGlNode extends TypedGlNode<DiskGlParamsConfig> {
    params_config: DiskGlParamsConfig;
    static type(): string;
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

declare class EasingGlParamsConfig extends NodeParamsConfig {
    type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    input: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class EasingGlNode extends TypedGlNode<EasingGlParamsConfig> {
    params_config: EasingGlParamsConfig;
    static type(): string;
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

export declare class FitGlNode extends BaseNodeGlMathFunctionArg5GlNode {
    static type(): string;
    protected _gl_input_name(index: number): string;
    gl_input_default_value(name: string): number;
    protected gl_method_name(): string;
    gl_function_definitions(): FunctionGLDefinition[];
}

export declare class Fit01GlNode extends BaseNodeGlMathFunctionArg3GlNode {
    static type(): string;
    gl_input_name(index: number): string;
    gl_input_default_value(name: string): number;
    gl_method_name(): string;
    gl_function_definitions(): FunctionGLDefinition[];
}

declare class HsvToRgbGlParamsConfig extends NodeParamsConfig {
    hsv: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
}
export declare class HsvToRgbGlNode extends TypedGlNode<HsvToRgbGlParamsConfig> {
    params_config: HsvToRgbGlParamsConfig;
    static type(): string;
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

declare class InstanceTransformGlParamsConfig extends NodeParamsConfig {
    position: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    normal: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    instance_position: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    instance_orientation: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR4>;
    instance_scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
}
export declare class InstanceTransformGlNode extends TypedGlNode<InstanceTransformGlParamsConfig> {
    params_config: InstanceTransformGlParamsConfig;
    static type(): string;
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
    gl_output_name_position(): string;
    gl_output_name_normal(): string;
    private _default_position;
    private _default_normal;
    private _default_instance_position;
    private _default_input_instance_orientation;
    private _default_input_instance_scale;
}
export {};

export declare class LengthGlNode extends BaseNodeGlMathFunctionArg1GlNode {
    static type(): string;
    initialize_node(): void;
    protected _gl_input_name(index: number): string;
    gl_method_name(): string;
    protected _expected_output_types(): ConnectionPointType[];
}

declare class LuminanceGlParamsConfig extends NodeParamsConfig {
    hsv: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
}
export declare class LuminanceGlNode extends TypedGlNode<LuminanceGlParamsConfig> {
    params_config: LuminanceGlParamsConfig;
    static type(): string;
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

export declare class MixGlNode extends BaseGlMathFunctionGlNode {
    static type(): string;
    initialize_node(): void;
    protected _gl_output_name(): string;
    protected _expected_input_types(): ConnectionPointType[];
    protected _expected_output_types(): ConnectionPointType[];
}

declare enum InputName {
    VALUE = "value",
    PRE_ADD = "pre_add",
    MULT = "mult",
    POST_ADD = "post_add"
}
export declare class MultAddGlNode extends BaseNodeGlMathFunctionArg4GlNode {
    static type(): string;
    protected _gl_input_name(index: number): InputName;
    gl_input_default_value(name: string): number;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

export declare class NegateGlNode extends BaseNodeGlMathFunctionArg1GlNode {
    static type(): string;
    initialize_node(): void;
    protected _gl_input_name(index: number): string;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}

declare enum InputName {
    AMP = "amp",
    POSITION = "position",
    FREQ = "freq",
    OFFSET = "offset"
}
declare class NoiseGlParamsConfig extends NodeParamsConfig {
    type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    output_type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    octaves: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    amp_attenuation: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    freq_increase: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    separator: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.SEPARATOR>;
}
export declare class NoiseGlNode extends TypedGlNode<NoiseGlParamsConfig> {
    params_config: NoiseGlParamsConfig;
    static type(): string;
    readonly gl_connections_controller: GlConnectionsController;
    initialize_node(): void;
    protected _gl_input_name(index: number): InputName;
    gl_input_default_value(name: string): number;
    private _expected_input_types;
    private _expected_output_types;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
    private fbm_method_name;
    private fbm_function;
    private single_noise_line;
}
export {};

export declare class NullGlNode extends BaseNodeGlMathFunctionArg1GlNode {
    static type(): string;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}

declare class ParamGlParamsConfig extends NodeParamsConfig {
    name: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.STRING>;
    type: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.INTEGER>;
    as_color: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.BOOLEAN>;
}
export declare class ParamGlNode extends TypedGlNode<ParamGlParamsConfig> {
    params_config: ParamGlParamsConfig;
    static type(): string;
    protected _allow_inputs_created_from_params: boolean;
    private _on_create_set_name_if_none_bound;
    readonly gl_connections_controller: GlConnectionsController;
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
    set_param_configs(): void;
    uniform_name(): string;
    private _on_create_set_name_if_none;
}
export {};

export declare class RefractGlNode extends BaseGlMathFunctionGlNode {
    static type(): string;
    initialize_node(): void;
    gl_method_name(): string;
    protected _expected_input_types(): ConnectionPointType[];
    protected _expected_output_types(): ConnectionPointType[];
}

export declare class QuatMultGlNode extends BaseNodeGlMathFunctionArg1GlNode {
    static type(): string;
    initialize_node(): void;
    gl_method_name(): string;
    gl_function_definitions(): FunctionGLDefinition[];
}

export declare class QuatFromAxisAngleGlNode extends BaseNodeGlMathFunctionArg2GlNode {
    static type(): string;
    initialize_node(): void;
    gl_input_default_value(name: string): number | Number3;
    gl_method_name(): string;
    gl_function_definitions(): FunctionGLDefinition[];
}

export declare class QuatToAngleGlNode extends BaseNodeGlMathFunctionArg1GlNode {
    static type(): string;
    initialize_node(): void;
    gl_method_name(): string;
    gl_function_definitions(): FunctionGLDefinition[];
}

export declare class QuatToAxisGlNode extends BaseNodeGlMathFunctionArg1GlNode {
    static type(): string;
    initialize_node(): void;
    gl_method_name(): string;
    gl_function_definitions(): FunctionGLDefinition[];
}

declare class RampGlParamsConfig extends NodeParamsConfig {
    name: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.STRING>;
    input: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.FLOAT>;
}
export declare class RampGlNode extends TypedGlNode<RampGlParamsConfig> {
    params_config: RampGlParamsConfig;
    static type(): string;
    initialize(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
    set_param_configs(): void;
    private _uniform_name;
}
export {};

declare class RandomGlParamsConfig extends NodeParamsConfig {
    seed: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
}
export declare class RandomGlNode extends TypedGlNode<RandomGlParamsConfig> {
    params_config: RandomGlParamsConfig;
    static type(): string;
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

declare class RgbToHsvGlParamsConfig extends NodeParamsConfig {
    rgb: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
}
export declare class RgbToHsvGlNode extends TypedGlNode<RgbToHsvGlParamsConfig> {
    params_config: RgbToHsvGlParamsConfig;
    static type(): string;
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

declare class RotateParamsConfig extends NodeParamsConfig {
    signature: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
}
export declare class RotateGlNode extends BaseAdaptiveGlNode<RotateParamsConfig> {
    params_config: RotateParamsConfig;
    static type(): string;
    initialize_node(): void;
    protected _gl_input_name(index: number): string;
    gl_input_default_value(name: string): Number3;
    gl_method_name(): string;
    protected _expected_input_types(): ConnectionPointType[];
    protected _expected_output_types(): ConnectionPointType[];
    gl_function_definitions(): FunctionGLDefinition[];
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

export declare class RoundGlNode extends BaseNodeGlMathFunctionArg1GlNode {
    static type(): string;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
    private _simple_line;
}

declare class TextureParamsConfig extends NodeParamsConfig {
    param_name: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.STRING>;
    default_value: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.STRING>;
    uv: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.VECTOR2>;
}
export declare class TextureGlNode extends TypedGlNode<TextureParamsConfig> {
    params_config: TextureParamsConfig;
    static type(): string;
    static readonly OUTPUT_NAME = "rgba";
    initialize_node(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
    set_param_configs(): void;
    private _uniform_name;
}
export {};

declare enum InputName {
    CONDITION = "condition",
    IF_TRUE = "if_true",
    IF_FALSE = "if_false"
}
export declare class TwoWaySwitchGlNode extends ParamlessTypedGlNode {
    static type(): string;
    readonly gl_connections_controller: GlConnectionsController;
    initialize_node(): void;
    protected _gl_input_name(index: number): InputName;
    protected _gl_output_name(): string;
    protected _expected_input_types(): ConnectionPointType[];
    protected _expected_output_types(): ConnectionPointType[];
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

declare const VectorAlignGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_output_types(): ConnectionPointType[];
        gl_input_default_value(name: string): any;
        gl_function_definitions(): import("./utils/GLDefinition").FunctionGLDefinition[];
        _expected_input_types(): ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class VectorAlignGlNode extends VectorAlignGlNode_base {
    protected _expected_input_types(): ConnectionPointType[];
    protected _expected_output_types(): ConnectionPointType[];
    gl_input_default_value(name: string): Number3;
}
export {};

declare const VectorAngleGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        gl_function_definitions(): import("./utils/GLDefinition").FunctionGLDefinition[];
        _expected_input_types(): ConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        _expected_output_types(): ConnectionPointType[];
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        readonly gl_connections_controller: import("./utils/ConnectionsController").GlConnectionsController;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        readonly spare_params_controller: import("./utils/SpareParamsController").GlNodeSpareParamsController;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        gl_input_default_value(name: string): string | number | boolean | StringOrNumber2 | StringOrNumber3 | StringOrNumber4 | import("../../params/ramp/RampValue").RampValueJson | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../containers/Gl").GlContainer>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _dependencies_controller: import("../utils/DependenciesController").DependenciesController | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").CookController | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        _display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        _processing_context: import("../utils/ProcessingContext").ProcessingContext | undefined;
        _name_controller: import("../utils/NameController").NameController | undefined;
        _io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType> | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly dependencies_controller: import("../utils/DependenciesController").DependenciesController;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").CookController;
        readonly io: import("../utils/connections/IOController").IOController<import("./_Base").BaseGlNodeType>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        readonly processing_context: import("../utils/ProcessingContext").ProcessingContext;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        required_imports(): string[];
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../..").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../..").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../..").CoreGraphNode): boolean;
        remove_graph_input(src: import("../..").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../..").CoreGraphNode[];
        graph_successors(): import("../..").CoreGraphNode[];
        graph_all_predecessors(): import("../..").CoreGraphNode[];
        graph_all_successors(): import("../..").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    required_three_imports(): string[];
    required_imports(): string[];
    require_webgl2(): boolean;
};
export declare class VectorAngleGlNode extends VectorAngleGlNode_base {
    protected _expected_input_types(): ConnectionPointType[];
    protected _expected_output_types(): ConnectionPointType[];
    gl_input_default_value(name: string): Number3;
}
export {};

export interface GlNodeChildrenMap {
    abs: AbsGlNode;
    acos: AcosGlNode;
    add: AddGlNode;
    align: AlignGlNode;
    and: AndGlNode;
    asin: AsinGlNode;
    atan: AtanGlNode;
    attribute: AttributeGlNode;
    ceil: CeilGlNode;
    constant: ConstantGlNode;
    cos: CosGlNode;
    complement: ComplementGlNode;
    cross: CrossGlNode;
    cycle: CycleGlNode;
    degrees: DegreesGlNode;
    disk: DiskGlNode;
    distance: DistanceGlNode;
    divide: DivideGlNode;
    dot: DotGlNode;
    easing: EasingGlNode;
    exp: ExpGlNode;
    exp2: Exp2GlNode;
    fit: FitGlNode;
    fit01: Fit01GlNode;
    float_to_int: FloatToIntGlNode;
    float_to_vec2: FloatToVec2GlNode;
    float_to_vec3: FloatToVec3GlNode;
    float_to_vec4: FloatToVec4GlNode;
    floor: FloorGlNode;
    fract: FractGlNode;
    hsv_to_rgb: HsvToRgbGlNode;
    int_to_float: FloatToIntGlNode;
    inverse_sqrt: InverseSqrtGlNode;
    instance_transform: InstanceTransformGlNode;
    length: LengthGlNode;
    log: LogGlNode;
    log2: Log2GlNode;
    luminance: LuminanceGlNode;
    globals: GlobalsGlNode;
    max: MaxGlNode;
    min: MinGlNode;
    mix: MixGlNode;
    mod: ModGlNode;
    mult: MultGlNode;
    mult_add: MultAddGlNode;
    negate: NegateGlNode;
    noise: NoiseGlNode;
    normalize: NormalizeGlNode;
    null: NullGlNode;
    or: OrGlNode;
    output: OutputGlNode;
    param: ParamGlNode;
    pow: PowGlNode;
    quat_mult: QuatMultGlNode;
    quat_from_axis_angle: QuatFromAxisAngleGlNode;
    quat_to_angle: QuatToAngleGlNode;
    quat_to_axis: QuatToAxisGlNode;
    radians: RadiansGlNode;
    ramp: RampGlNode;
    random: RandomGlNode;
    reflect: ReflectGlNode;
    refract: RefractGlNode;
    rgb_to_hsv: RgbToHsvGlNode;
    rotate: RotateGlNode;
    round: RoundGlNode;
    sign: SignGlNode;
    sin: SinGlNode;
    sqrt: SqrtGlNode;
    step: StepGlNode;
    substract: SubstractGlNode;
    tan: TanGlNode;
    texture: TextureGlNode;
    two_way_switch: TwoWaySwitchGlNode;
    vec2_to_float: Vec2ToFloatGlNode;
    vec3_to_float: Vec3ToFloatGlNode;
    vec4_to_float: Vec4ToFloatGlNode;
    vec4_to_vector: Vec4ToVectorGlNode;
    vector_align: VectorAlignGlNode;
    vector_angle: VectorAngleGlNode;
}
interface RendererByString {
    [propName: string]: WebGLRenderer;
}
interface TextureByString {
    [propName: string]: Texture;
}
export declare class RenderersController {
    _next_renderer_id: number;
    _next_env_map_id: number;
    _renderers: RendererByString;
    _env_maps: TextureByString;
    private _require_webgl2;
    private _resolves;
    constructor();
    set_require_webgl2(): void;
    rendering_context(canvas: HTMLCanvasElement): WebGLRenderingContext;
    private _rendering_context_webgl;
    register_renderer(renderer: WebGLRenderer): void;
    deregister_renderer(renderer: WebGLRenderer): void;
    private first_renderer;
    renderers(): WebGLRenderer[];
    private flush_callbacks_with_renderer;
    wait_for_renderer(): Promise<WebGLRenderer>;
}
export {};

export interface RegisterOptions {
    only?: string[];
    except?: string[];
}
export declare type BaseNodeConstructor = typeof BaseNodeClass;
export declare class NodesRegister {
    private _node_register;
    private _node_register_categories;
    private _node_register_options;
    register_node(node: BaseNodeConstructor, tab_menu_category?: string, options?: RegisterOptions): void;
    deregister_node(context: string, node_type: string): void;
    registered_nodes_for_context_and_parent_type(context: NodeContext, parent_node_type: string): (typeof BaseNodeClass)[];
    registered_nodes(context: NodeContext, parent_node_type: string): Dictionary<BaseNodeConstructor>;
    registered_category(context: NodeContext, type: string): string;
}

export declare class Poly {
    static _instance: Poly | undefined;
    renderers_controller: RenderersController;
    nodes_register: NodesRegister;
    scenes_by_uuid: Dictionary<PolyScene>;
    _env: string | undefined;
    static instance(): Poly;
    private constructor();
    register_node(node: BaseNodeConstructor, tab_menu_category?: string, options?: RegisterOptions): void;
    registered_nodes(parent_context: NodeContext, type: string): Dictionary<typeof BaseNodeClass>;
    in_worker_thread(): boolean;
    desktop_controller(): any;
    player_mode(): boolean;
    log(...args: any[]): void;
    set_env(env: string): void;
    get env(): string | undefined;
}
export declare const POLY: Poly;

export declare class GlRegister {
    static run(poly: Poly): void;
}

export declare class AssemblerControllerNode extends TypedNode<any, BaseNodeType, any> {
    create_node<K extends keyof GlNodeChildrenMap>(type: K): GlNodeChildrenMap[K];
    children(): BaseGlNodeType[];
    nodes_by_type<K extends keyof GlNodeChildrenMap>(type: K): GlNodeChildrenMap[K][];
    assembler_controller: GlAssemblerController<BaseGlShaderAssembler>;
}
declare type BaseGlShaderAssemblerConstructor<A extends BaseGlShaderAssembler> = new (...args: any[]) => A;
export declare class GlAssemblerController<A extends BaseGlShaderAssembler> {
    private node;
    protected _assembler: A;
    private _globals_handler;
    private _compile_required;
    private _deleted_params_data;
    constructor(node: AssemblerControllerNode, assembler_class: BaseGlShaderAssemblerConstructor<A>);
    set_assembler_globals_handler(globals_handler: GlobalsBaseController): void;
    get assembler(): A;
    get globals_handler(): GlobalsBaseController | undefined;
    add_output_params(output_child: OutputGlNode): void;
    add_globals_params(globals_node: GlobalsGlNode): void;
    allow_attribute_exports(): boolean;
    on_create(): void;
    set_compilation_required(new_state?: boolean): void;
    set_compilation_required_and_dirty(trigger_node?: BaseGlNodeType): void;
    compile_required(): boolean;
    post_compile(): Promise<void>;
    assign_uniform_values(): Promise<void>;
    create_spare_parameters(): void;
}
export {};

export interface IUniforms {
    [uniform: string]: IUniform;
}
export interface MaterialWithUniforms extends Material {
    uniforms: IUniforms;
}
declare enum CustomMaterialName {
    customDistanceMaterial = "customDistanceMaterial",
    customDepthMaterial = "customDepthMaterial",
    customDepthDOFMaterial = "customDepthDOFMaterial"
}
export interface ObjectWithCustomMaterials extends Mesh {
    customDepthDOFMaterial?: Material;
}
export interface ShaderMaterialWithCustomMaterials extends ShaderMaterial {
    custom_materials: {
        [key in CustomMaterialName]?: ShaderMaterial;
    };
}
export interface MaterialWithSkinning extends Material {
    skinning: boolean;
    morphTargets: boolean;
}
export declare class CoreMaterial {
    static node(scene: PolyScene, material: Material): import("../../engine/nodes/manager/ObjectsManager").ObjectsManagerNode | import("../../engine/nodes/_Base").BaseNodeType | null;
    static clone(src_material: Material | Material[]): Material | Material[];
    static clone_single(src_material: Material): Material;
    static apply_custom_materials(object: Object3D, material: Material): void;
    static assign_custom_uniforms(mat: Material, uniform_name: string, uniform_value: any): void;
    static init_custom_material_uniforms(mat: Material, uniform_name: string, uniform_value: any): void;
}
export {};

export declare enum CustomMaterialName {
    DISTANCE = "customDistanceMaterial",
    DEPTH = "customDepthMaterial",
    DEPTH_DOF = "customDepthDOFMaterial"
}
export declare type CustomAssemblerMap = Map<CustomMaterialName, typeof ShaderAssemblerMaterial>;
export declare class ShaderAssemblerMaterial extends BaseGlShaderAssembler {
    private _assemblers_by_custom_name;
    create_material(): ShaderMaterial;
    custom_assembler_class_by_custom_name(): CustomAssemblerMap | undefined;
    protected _add_custom_materials(material: ShaderMaterial): void;
    private _add_custom_material;
    compile_custom_materials(material: ShaderMaterialWithCustomMaterials): Promise<void>;
    compile_material(material: ShaderMaterial): Promise<void>;
    private _update_shaders;
    shadow_assembler_class_by_custom_name(): {};
    add_output_body_line(output_node: OutputGlNode, shaders_collection_controller: ShadersCollectionController, input_name: string): void;
    set_node_lines_output(output_node: OutputGlNode, shaders_collection_controller: ShadersCollectionController): void;
    set_node_lines_attribute(attribute_node: AttributeGlNode, shaders_collection_controller: ShadersCollectionController): void;
    handle_gl_FragCoord(body_lines: string[], shader_name: ShaderName, var_name: string): void;
    handle_resolution(body_lines: string[], shader_name: ShaderName, var_name: string): void;
    set_node_lines_globals(globals_node: GlobalsGlNode, shaders_collection_controller: ShadersCollectionController): void;
}

declare type StringArrayByShaderName = Map<ShaderName, string[]>;
interface ITemplateShader {
    vertexShader?: string;
    fragmentShader?: string;
    uniforms?: IUniforms;
}
export declare class BaseGlShaderAssembler extends TypedAssembler<BaseGlNodeType> {
    protected _gl_parent_node: AssemblerControllerNode;
    protected _shaders_by_name: Map<ShaderName, string>;
    protected _lines: StringArrayByShaderName;
    protected _code_builder: CodeBuilder | undefined;
    private _param_config_owner;
    protected _root_nodes: BaseGlNodeType[];
    protected _leaf_nodes: BaseGlNodeType[];
    protected _material: ShaderMaterial | undefined;
    private _shader_configs;
    private _variable_configs;
    private _uniforms_time_dependent;
    private _resolution_dependent;
    constructor(_gl_parent_node: AssemblerControllerNode);
    compile(): Promise<void>;
    protected _template_shader_for_shader_name(shader_name: ShaderName): string | undefined;
    get globals_handler(): GlobalsBaseController | undefined;
    compile_allowed(): boolean;
    shaders_by_name(): Map<ShaderName, string>;
    protected _build_lines(): void;
    set_root_nodes(root_nodes: BaseGlNodeType[]): void;
    protected get _template_shader(): ITemplateShader | undefined;
    protected add_uniforms(current_uniforms: IUniforms): void;
    root_nodes_by_shader_name(shader_name: ShaderName): BaseGlNodeType[];
    leaf_nodes_by_shader_name(shader_name: ShaderName): BaseGlNodeType[];
    set_node_lines_globals(globals_node: GlobalsGlNode, shaders_collection_controller: ShadersCollectionController): void;
    set_node_lines_output(output_node: OutputGlNode, shaders_collection_controller: ShadersCollectionController): void;
    set_node_lines_attribute(attribute_node: AttributeGlNode, shaders_collection_controller: ShadersCollectionController): void;
    get code_builder(): CodeBuilder;
    build_code_from_nodes(root_nodes: BaseGlNodeType[]): Promise<void>;
    allow_new_param_configs(): void;
    disallow_new_param_configs(): void;
    builder_param_configs(): readonly import("../../../utils/code/configs/ParamConfig").ParamConfig<ParamType>[];
    builder_lines(shader_name: ShaderName, line_type: LineType): string[] | undefined;
    all_builder_lines(): Map<ShaderName, Map<LineType, string[]>>;
    param_configs(): readonly import("../../../utils/code/configs/ParamConfig").ParamConfig<ParamType>[];
    set_param_configs_owner(param_config_owner: CodeBuilder): void;
    static add_output_params(output_child: OutputGlNode): void;
    add_output_params(output_child: OutputGlNode): void;
    static create_globals_node_output_connections(): (TypedNamedConnectionPoint<ConnectionPointType.VEC3> | TypedNamedConnectionPoint<ConnectionPointType.VEC2> | TypedNamedConnectionPoint<ConnectionPointType.VEC4> | TypedNamedConnectionPoint<ConnectionPointType.FLOAT>)[];
    create_globals_node_output_connections(): (TypedNamedConnectionPoint<ConnectionPointType.VEC3> | TypedNamedConnectionPoint<ConnectionPointType.VEC2> | TypedNamedConnectionPoint<ConnectionPointType.VEC4> | TypedNamedConnectionPoint<ConnectionPointType.FLOAT>)[];
    add_globals_params(globals_node: GlobalsGlNode): void;
    allow_attribute_exports(): boolean;
    reset_configs(): void;
    get shader_configs(): ShaderConfig[];
    set_shader_configs(shader_configs: ShaderConfig[]): void;
    get shader_names(): ShaderName[];
    protected _reset_shader_configs(): void;
    create_shader_configs(): ShaderConfig[];
    shader_config(name: string): ShaderConfig | undefined;
    variable_configs(): VariableConfig[];
    set_variable_configs(variable_configs: VariableConfig[]): void;
    variable_config(name: string): VariableConfig;
    static create_variable_configs(): VariableConfig[];
    create_variable_configs(): VariableConfig[];
    protected _reset_variable_configs(): void;
    input_names_for_shader_name(root_node: BaseGlNodeType, shader_name: ShaderName): string[];
    protected _reset_uniforms_time_dependency(): void;
    set_uniforms_time_dependent(): void;
    uniforms_time_dependent(): boolean;
    protected _reset_resolution_dependency(): void;
    set_resolution_dependent(): void;
    resolution_dependent(): boolean;
    protected insert_define_after(shader_name: ShaderName): string | undefined;
    protected insert_body_after(shader_name: ShaderName): string | undefined;
    protected lines_to_remove(shader_name: ShaderName): string[] | undefined;
    private _replace_template;
    private _insert_lines;
    get_custom_materials(): Promise<Map<CustomMaterialName, ShaderMaterial>>;
}
export {};

export declare type ParamInitValueSerialized = ParamInitValueSerializedTypeMap[keyof ParamInitValueSerializedTypeMap];

export declare class GlNodeSpareParamsController {
    private node;
    private _allow_inputs_created_from_params;
    private _inputless_param_names;
    constructor(node: BaseGlNodeType);
    disallow_inputs_created_from_params(): void;
    initialize_node(): void;
    create_inputs_from_params(): void;
    set_inputless_param_names(names: string[]): string[];
    create_spare_parameters(): void;
}

export declare class TypedGlNode<K extends NodeParamsConfig> extends TypedNode<'GL', BaseGlNodeType, K> {
    static node_context(): NodeContext;
    protected _param_configs_controller: ParamConfigsController | undefined;
    protected _assembler: BaseGlShaderAssembler | undefined;
    readonly spare_params_controller: GlNodeSpareParamsController;
    readonly gl_connections_controller: GlConnectionsController | undefined;
    initialize_base_node(): void;
    cook(): void;
    protected _set_mat_to_recompile(): void;
    get material_node(): AssemblerControllerNode | undefined;
    gl_var_name(name: string): string;
    variable_for_input(name: string): string;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
    reset_code(): void;
    set_param_configs(): void;
    param_configs(): readonly import("../utils/code/configs/ParamConfig").ParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
    gl_input_default_value(name: string): ParamInitValueSerialized;
}
export declare type BaseGlNodeType = TypedGlNode<NodeParamsConfig>;
export declare class BaseGlNodeClass extends TypedGlNode<NodeParamsConfig> {
}
declare class ParamlessParamsConfig extends NodeParamsConfig {
}
export declare class ParamlessTypedGlNode extends TypedGlNode<ParamlessParamsConfig> {
    params_config: ParamlessParamsConfig;
}
export {};

declare class GlobalsGlParamsConfig extends NodeParamsConfig {
}
export declare class GlobalsGlNode extends TypedGlNode<GlobalsGlParamsConfig> {
    params_config: GlobalsGlParamsConfig;
    static type(): string;
    create_params(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};

export declare abstract class GlobalsBaseController {
    private static __next_id;
    private _id;
    constructor();
    id(): number;
    handle_globals_node(globals_node: GlobalsGlNode, output_name: string, shaders_collection_controller: ShadersCollectionController): void;
    abstract read_attribute(node: BaseGlNodeType, gl_type: ConnectionPointType, attrib_name: string, shaders_collection_controller: ShadersCollectionController): string | undefined;
}

export declare class GlobalsGeometryHandler extends GlobalsBaseController {
    static PRE_DEFINED_ATTRIBUTES: string[];
    static IF_RULE: {
        uv: string;
    };
    handle_globals_node(globals_node: GlobalsGlNode, output_name: string, shaders_collection_controller: ShadersCollectionController): void;
    static variable_config_default(variable_name: string): string | undefined;
    variable_config_default(variable_name: string): string | undefined;
    read_attribute(node: BaseGlNodeType, gl_type: ConnectionPointType, attrib_name: string, shaders_collection_controller: ShadersCollectionController): string | undefined;
    static read_attribute(node: BaseGlNodeType, gl_type: ConnectionPointType, attrib_name: string, shaders_collection_controller: ShadersCollectionController): string | undefined;
    handle_attribute_node(node: AttributeGlNode, gl_type: ConnectionPointType, attrib_name: string, shaders_collection_controller: ShadersCollectionController): string | undefined;
}

export declare class MaterialContainer extends TypedContainer<ContainableMap['MATERIAL']> {
    set_content(content: ContainableMap['MATERIAL']): void;
    set_material(material: Material): void;
    has_material(): boolean;
    material(): Material;
}

export declare abstract class TypedMatNode<M extends Material, K extends NodeParamsConfig> extends TypedNode<'MATERIAL', BaseMatNodeType, K> {
    container_controller: TypedContainerController<MaterialContainer>;
    static node_context(): NodeContext;
    protected _material: M | undefined;
    initialize_base_node(): void;
    private _cook_main_without_inputs_when_dirty_bound;
    private _cook_main_without_inputs_when_dirty;
    private set_material_name;
    abstract create_material(): M;
    get material(): M;
    set_material(material: Material): void;
    add_render_hook(object: Object3D): void;
}
export declare type BaseMatNodeType = TypedMatNode<Material, any>;
export declare class BaseMatNodeClass extends TypedMatNode<Material, any> {
    create_material(): Material;
}

declare class MaterialSopParamsConfig extends NodeParamsConfig {
    group: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    material: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    apply_to_children: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class MaterialSopNode extends TypedSopNode<MaterialSopParamsConfig> {
    params_config: MaterialSopParamsConfig;
    static type(): string;
    _param_material: BaseMatNodeType | undefined;
    _globals_handler: GlobalsGeometryHandler;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(core_groups: CoreGroup[]): Promise<void>;
    apply_material(object: Object3D, material: Material): void;
}
export {};

declare class MergeSopParamsConfig extends NodeParamsConfig {
    compact: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class MergeSopNode extends TypedSopNode<MergeSopParamsConfig> {
    params_config: MergeSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    _make_compact(all_objects: Object3DWithGeometry[]): Object3DWithGeometry[];
}
export {};

declare class NoiseSopParamsConfig extends NodeParamsConfig {
    amount: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    freq: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    offset: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    octaves: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    amp_attenuation: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    freq_increase: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    seed: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    separator: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.SEPARATOR>;
    use_normals: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    attrib_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    operation: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    compute_normals: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class NoiseSopNode extends TypedSopNode<NoiseSopParamsConfig> {
    params_config: NoiseSopParamsConfig;
    static type(): string;
    private _simplex_by_seed;
    private _rest_core_group_timestamp;
    private _rest_points;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): Promise<void>;
    private _fbm;
    private _get_simplex;
    private _create_simplex;
}
export {};

declare class NormalsSopParamsConfig extends NodeParamsConfig {
    edit: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    update_x: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    x: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    update_y: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    y: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    update_z: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    z: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    recompute: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    invert: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class NormalsSopNode extends TypedSopNode<NormalsSopParamsConfig> {
    params_config: NormalsSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): Promise<void>;
    private _eval_expressions_for_core_group;
    private _eval_expressions_for_core_object;
    private _invert_normals;
}
export {};

declare class NullSopParamsConfig extends NodeParamsConfig {
}
export declare class NullSopNode extends TypedSopNode<NullSopParamsConfig> {
    params_config: NullSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
}
export {};

declare class ObjectMergeSopParamsConfig extends NodeParamsConfig {
    geometry: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
}
export declare class ObjectMergeSopNode extends TypedSopNode<ObjectMergeSopParamsConfig> {
    params_config: ObjectMergeSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_containers: CoreGroup[]): Promise<void>;
    import_input(geometry_node: BaseSopNodeType, container: GeometryContainer): void;
}
export {};

/// <reference path="../../../../../src/engine/nodes/sop/types/occlusion.d.ts" />
declare class OcclusionSopParamsConfig extends NodeParamsConfig {
    attrib_name: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    samples: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    sep: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.SEPARATOR>;
    buffer_resolution: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    bias: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class OcclusionSopNode extends TypedSopNode<OcclusionSopParamsConfig> {
    params_config: OcclusionSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): Promise<void>;
    private _process_occlusion_on_object;
}
export {};

export interface TextureVariableData {
    name: string;
    nodes: string[];
}
export declare class TextureVariable {
    private _name;
    private _size;
    private _allocation;
    private _position;
    private _graph_node_ids;
    constructor(_name: string, _size: number);
    set_allocation(allocation: TextureAllocation): void;
    get allocation(): TextureAllocation | undefined;
    get graph_node_ids(): Map<string, boolean> | undefined;
    add_graph_node_id(id: string): void;
    get name(): string;
    get size(): number;
    set_position(position: number): void;
    get position(): number;
    get component(): string;
    to_json(scene: PolyScene): TextureVariableData;
}

export declare class TextureAllocation {
    private _shader_name;
    private _variables;
    private _size;
    constructor(_shader_name: ShaderName);
    add_variable(variable: TextureVariable): void;
    has_space_for_variable(variable: TextureVariable): boolean;
    get shader_name(): ShaderName;
    get texture_name(): string;
    get variables(): TextureVariable[] | undefined;
    variables_for_input_node(root_node: BaseGlNodeType): TextureVariable[] | undefined;
    input_names_for_node(root_node: BaseGlNodeType): string[] | undefined;
    variable(variable_name: string): TextureVariable | undefined;
    to_json(scene: PolyScene): TextureVariableData[] | undefined;
}

export declare type TextureAllocationsControllerData = Dictionary<TextureVariableData[] | undefined>[];
export declare class TextureAllocationsController {
    private _allocations;
    private _next_allocation_index;
    constructor();
    allocate_connections_from_root_nodes(root_nodes: BaseGlNodeType[], leaf_nodes: BaseGlNodeType[]): void;
    allocate_variables(variables: TextureVariable[]): void;
    allocate_variable(new_variable: TextureVariable): void;
    next_allocation_name(): ShaderName;
    shader_names(): ShaderName[];
    create_shader_configs(): ShaderConfig[];
    allocation_for_shader_name(shader_name: ShaderName): TextureAllocation;
    input_names_for_shader_name(root_node: BaseGlNodeType, shader_name: ShaderName): string[] | undefined;
    variable(variable_name: string): TextureVariable | undefined;
    variables(): TextureVariable[];
    has_variable(name: string): boolean;
    to_json(scene: PolyScene): TextureAllocationsControllerData;
    print(scene: PolyScene): void;
}

export declare class ShaderAssemblerParticles extends BaseGlShaderAssembler {
    private _texture_allocations_controller;
    get _template_shader(): undefined;
    protected _template_shader_for_shader_name(shader_name: ShaderName): string;
    compile(): Promise<void>;
    root_nodes_by_shader_name(shader_name: ShaderName): BaseGlNodeType[];
    leaf_nodes_by_shader_name(shader_name: ShaderName): BaseGlNodeType[];
    setup_shader_names_and_variables(): Promise<void>;
    update_shaders(): Promise<void>;
    add_output_params(output_child: OutputGlNode): void;
    add_globals_params(globals_node: GlobalsGlNode): void;
    allow_attribute_exports(): boolean;
    get texture_allocations_controller(): TextureAllocationsController;
    create_shader_configs(): import("../../configs/ShaderConfig").ShaderConfig[];
    create_variable_configs(): never[];
    get shader_names(): ShaderName[];
    input_names_for_shader_name(root_node: BaseGlNodeType, shader_name: ShaderName): string[];
    protected insert_define_after(shader_name: ShaderName): string;
    protected insert_body_after(shader_name: ShaderName): string;
    protected lines_to_remove(shader_name: ShaderName): string[];
    add_export_body_line(export_node: BaseGlNodeType, input_name: string, input: BaseGlNodeType, variable_name: string, shaders_collection_controller: ShadersCollectionController): void;
    set_node_lines_output(output_node: BaseGlNodeType, shaders_collection_controller: ShadersCollectionController): void;
    set_node_lines_attribute(attribute_node: AttributeGlNode, shaders_collection_controller: ShadersCollectionController): void;
    set_node_lines_globals(globals_node: GlobalsGlNode, shaders_collection_controller: ShadersCollectionController): void;
    private _handle_globals_time;
    private _handle_globals_default;
}

export declare class ParticlesSystemGpuRenderController {
    private node;
    private _render_material;
    protected _particles_group_objects: Object3D[];
    private _shaders_by_name;
    private _texture_allocations_json;
    constructor(node: ParticlesSystemGpuSopNode);
    set_shaders_by_name(shaders_by_name: Map<ShaderName, string>): void;
    assign_render_material(): void;
    update_render_material_uniforms(): void;
    reset_render_material(): void;
    get initialized(): boolean;
    init_core_group(core_group: CoreGroup): void;
    init_render_material(): Promise<void>;
}

interface GPUComputationRendererVariable {
    name: string;
    renderTargets: WebGLRenderTarget[];
    material: ShaderMaterial;
}
interface GPUComputationRenderer {
    new (x: number, y: number, renderer: WebGLRenderer): GPUComputationRenderer;
    compute(): void;
    init(): string | null;
    addVariable(name: string, fragment_shader: string, variable: DataTexture): GPUComputationRendererVariable;
    setVariableDependencies(variable: GPUComputationRendererVariable, vars: GPUComputationRendererVariable[]): void;
    renderTexture(texture: DataTexture, render_target: WebGLRenderTarget): void;
    createTexture(): DataTexture;
    getCurrentRenderTarget(variable: GPUComputationRendererVariable): WebGLRenderTarget;
}
export declare class ParticlesSystemGpuComputeController {
    private node;
    protected _gpu_compute: GPUComputationRenderer | undefined;
    protected _simulation_restart_required: boolean;
    protected _renderer: WebGLRenderer | undefined;
    protected _particles_core_group: CoreGroup | undefined;
    protected _points: CorePoint[];
    private variables_by_name;
    private _created_textures_by_name;
    private _shaders_by_name;
    protected _last_simulated_frame: number | undefined;
    private _used_textures_size;
    constructor(node: ParticlesSystemGpuSopNode);
    set_shaders_by_name(shaders_by_name: Map<ShaderName, string>): void;
    init(core_group: CoreGroup): Promise<void>;
    getCurrentRenderTarget(shader_name: ShaderName): WebGLRenderTarget | undefined;
    init_particle_group_points(core_group: CoreGroup): void;
    compute_similation_if_required(): void;
    private _compute_simulation;
    create_gpu_compute(): Promise<void>;
    private create_simulation_material_uniforms;
    private update_simulation_material_uniforms;
    private _init_particles_uvs;
    created_textures_by_name(): Map<ShaderName, DataTexture>;
    private _fill_textures;
    reset_gpu_compute(): void;
    set_restart_not_required(): void;
    reset_gpu_compute_and_set_dirty(): void;
    reset_particle_groups(): void;
    get initialized(): boolean;
    private _create_texture_render_targets;
    restart_simulation_if_required(): void;
    private _restart_simulation;
    private _get_points;
}
export {};

declare class ParticlesSystemGpuSopParamsConfig extends NodeParamsConfig {
    start_frame: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    auto_textures_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    max_textures_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    textures_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    reset: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BUTTON>;
    material: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
}
export declare class ParticlesSystemGpuSopNode extends TypedSopNode<ParticlesSystemGpuSopParamsConfig> {
    params_config: ParticlesSystemGpuSopParamsConfig;
    static type(): string;
    protected _assembler_controller: GlAssemblerController<ShaderAssemblerParticles>;
    get assembler_controller(): GlAssemblerController<ShaderAssemblerParticles>;
    readonly gpu_controller: ParticlesSystemGpuComputeController;
    readonly render_controller: ParticlesSystemGpuRenderController;
    static require_webgl2(): boolean;
    static PARAM_CALLBACK_reset(node: ParticlesSystemGpuSopNode): void;
    PARAM_CALLBACK_reset(): void;
    static displayed_input_names(): string[];
    private _reset_material_if_dirty_bound;
    protected _children_controller_context: NodeContext;
    private _on_create_prepare_material_bound;
    initialize_node(): void;
    create_node<K extends keyof GlNodeChildrenMap>(type: K): GlNodeChildrenMap[K];
    children(): BaseGlNodeType[];
    nodes_by_type<K extends keyof GlNodeChildrenMap>(type: K): GlNodeChildrenMap[K][];
    _reset_material_if_dirty(): Promise<void>;
    is_on_frame_start(): boolean;
    cook(input_contents: CoreGroup[]): Promise<void>;
    compile_if_required(): Promise<void>;
    run_assembler(): Promise<void>;
    private _find_root_nodes;
    private _on_create_prepare_material;
}
export {};

declare class PeakSopParamsConfig extends NodeParamsConfig {
    amount: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class PeakSopNode extends TypedSopNode<PeakSopParamsConfig> {
    params_config: PeakSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
}
export {};


export class PlaneBufferGeometry extends BufferGeometry {

	constructor(
		width?: number,
		height?: number,
		widthSegments?: number,
		heightSegments?: number
	);

	parameters: {
		width: number;
		height: number;
		widthSegments: number;
		heightSegments: number;
	};

}

export class PlaneGeometry extends Geometry {

	constructor(
		width?: number,
		height?: number,
		widthSegments?: number,
		heightSegments?: number
	);

	parameters: {
		width: number;
		height: number;
		widthSegments: number;
		heightSegments: number;
	};

}

declare class PlaneSopParamsConfig extends NodeParamsConfig {
    size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    use_segments_count: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    step_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    segments: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    direction: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    center: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
}
export declare class PlaneSopNode extends TypedSopNode<PlaneSopParamsConfig> {
    params_config: PlaneSopParamsConfig;
    static type(): string;
    private _core_transform;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    _cook_without_input(): void;
    _cook_with_input(core_group: CoreGroup): void;
    _create_plane(size: Vector2): PlaneBufferGeometry;
}
export {};

declare class PointSopParamsConfig extends NodeParamsConfig {
    update_x: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    x: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    update_y: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    y: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    update_z: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    z: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    update_normals: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class PointSopNode extends TypedSopNode<PointSopParamsConfig> {
    params_config: PointSopParamsConfig;
    static type(): string;
    private _x_arrays_by_geometry_uuid;
    private _y_arrays_by_geometry_uuid;
    private _z_arrays_by_geometry_uuid;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): Promise<void>;
    _eval_expressions_for_core_group(core_group: CoreGroup): Promise<void>;
    _eval_expressions_for_core_object(core_object: CoreObject): Promise<void>;
    private _update_from_param;
    private _init_array_if_required;
    private _array_for_component;
    private _commit_tmp_values;
}
export {};

declare class PolywireSopParamsConfig extends NodeParamsConfig {
    radius: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    segments_radial: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    closed: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class PolywireSopNode extends TypedSopNode<PolywireSopParamsConfig> {
    params_config: PolywireSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    private _core_transform;
    initialize_node(): void;
    private _geometries;
    cook(input_contents: CoreGroup[]): void;
    _create_tube(line_segment: LineSegments): void;
    _create_tube_from_points(points: CorePoint[]): void;
    _skin(geometry1: BufferGeometry, geometry0: BufferGeometry): BufferGeometry;
}
export {};

declare class RaySopParamsConfig extends NodeParamsConfig {
    use_normals: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    direction: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    transfer_face_normals: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class RaySopNode extends TypedSopNode<RaySopParamsConfig> {
    params_config: RaySopParamsConfig;
    static type(): string;
    private _bound_assign_mat;
    private _raycaster;
    static double_sided_material(): MeshBasicMaterial;
    static displayed_input_names(): string[];
    initialize_node(): void;
    create_params(): void;
    cook(input_contents: CoreGroup[]): void;
    ray(core_group: CoreGroup, core_group_collision: CoreGroup): void;
    _assign_double_sided_material_to_core_group(core_group: CoreGroup): void;
    _assign_double_sided_material_to_object(object: Object3D): void;
}
export {};


// Extras / Core /////////////////////////////////////////////////////////////////////

/**
 * An extensible curve object which contains methods for interpolation
 * class Curve&lt;T extends Vector&gt;
 */
export class Curve<T extends Vector> {

	/**
	 * This value determines the amount of divisions when calculating the cumulative segment lengths of a curve via .getLengths.
	 * To ensure precision when using methods like .getSpacedPoints, it is recommended to increase .arcLengthDivisions if the curve is very large.
	 * Default is 200.
	 */
	arcLengthDivisions: number;

	/**
	 * Returns a vector for point t of the curve where t is between 0 and 1
	 * getPoint(t: number): T;
	 */
	getPoint( t: number, optionalTarget?: T ): T;

	/**
	 * Returns a vector for point at relative position in curve according to arc length
	 * getPointAt(u: number): T;
	 */
	getPointAt( u: number, optionalTarget?: T ): T;

	/**
	 * Get sequence of points using getPoint( t )
	 * getPoints(divisions?: number): T[];
	 */
	getPoints( divisions?: number ): T[];

	/**
	 * Get sequence of equi-spaced points using getPointAt( u )
	 * getSpacedPoints(divisions?: number): T[];
	 */
	getSpacedPoints( divisions?: number ): T[];

	/**
	 * Get total curve arc length
	 */
	getLength(): number;

	/**
	 * Get list of cumulative segment lengths
	 */
	getLengths( divisions?: number ): number[];

	/**
	 * Update the cumlative segment distance cache
	 */
	updateArcLengths(): void;

	/**
	 * Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equi distance
	 */
	getUtoTmapping( u: number, distance: number ): number;

	/**
	 * Returns a unit vector tangent at t. If the subclassed curve do not implement its tangent derivation, 2 points a small delta apart will be used to find its gradient which seems to give a reasonable approximation
	 * getTangent(t: number): T;
	 */
	getTangent( t: number ): T;

	/**
	 * Returns tangent at equidistance point u on the curve
	 * getTangentAt(u: number): T;
	 */
	getTangentAt( u: number ): T;

	/**
	 * @deprecated since r84.
	 */
	static create( constructorFunc: Function, getPointFunc: Function ): Function;

}


// Extras / Curves /////////////////////////////////////////////////////////////////////
export namespace CurveUtils {
	export function tangentQuadraticBezier(
		t: number,
		p0: number,
		p1: number,
		p2: number
	): number;
	export function tangentCubicBezier(
		t: number,
		p0: number,
		p1: number,
		p2: number,
		p3: number
	): number;
	export function tangentSpline(
		t: number,
		p0: number,
		p1: number,
		p2: number,
		p3: number
	): number;
	export function interpolate(
		p0: number,
		p1: number,
		p2: number,
		p3: number,
		t: number
	): number;
}

export class CatmullRomCurve3 extends Curve<Vector3> {

	constructor(
		points?: Vector3[],
		closed?: boolean,
		curveType?: string,
		tension?: number
	);

	points: Vector3[];

}

export declare enum METHOD {
    POINTS_COUNT = "points_count",
    SEGMENT_LENGTH = "segment_length"
}
export declare const METHODS: METHOD[];
export declare enum CURVE_TYPE {
    CENTRIPETAL = "centripetal",
    CHORDAL = "chordal",
    CATMULLROM = "catmullrom"
}
export declare const CURVE_TYPES: CURVE_TYPE[];
declare class ResampleSopParamsConfig extends NodeParamsConfig {
    method: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    curve_type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    tension: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    points_count: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    segment_length: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class ResampleSopNode extends TypedSopNode<ResampleSopParamsConfig> {
    params_config: ResampleSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    _resample(line_segment: LineSegments): import("../../../core/geometry/Group").Object3DWithGeometry;
    _create_curve_from_points(points: CorePoint[]): BufferGeometry | undefined;
    _get_points_from_curve(curve: CatmullRomCurve3): import("three").Vector3[];
}
export {};

declare class ScatterSopParamsConfig extends NodeParamsConfig {
    points_count: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    seed: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    transfer_attributes: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    attributes_to_transfer: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    add_id_attribute: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class ScatterSopNode extends TypedSopNode<ScatterSopParamsConfig> {
    params_config: ScatterSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): Promise<void>;
}
export {};

declare class ShadowsSopParamsConfig extends NodeParamsConfig {
    cast_shadow: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    receive_shadow: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    apply_to_children: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class ShadowsSopNode extends TypedSopNode<ShadowsSopParamsConfig> {
    params_config: ShadowsSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): Promise<void>;
}
export {};

declare class SkinSopParamsConfig extends NodeParamsConfig {
}
export declare class SkinSopNode extends TypedSopNode<SkinSopParamsConfig> {
    params_config: SkinSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    process_one_input(input_contents: CoreGroup[]): void;
    process_two_inputs(input_contents: CoreGroup[]): void;
    _get_line_segments(core_group: CoreGroup): import("../../../core/geometry/Group").Object3DWithGeometry[];
    _skin(geometry1: BufferGeometry, geometry0: BufferGeometry): BufferGeometry;
}
export {};


export class PolyhedronBufferGeometry extends BufferGeometry {

	constructor(
		vertices: number[],
		indices: number[],
		radius?: number,
		detail?: number
	);

	parameters: {
		vertices: number[];
		indices: number[];
		radius: number;
		detail: number;
	};

}

export class PolyhedronGeometry extends Geometry {

	constructor(
		vertices: number[],
		indices: number[],
		radius?: number,
		detail?: number
	);

	parameters: {
		vertices: number[];
		indices: number[];
		radius: number;
		detail: number;
	};
	boundingSphere: Sphere;

}

	PolyhedronGeometry,
	PolyhedronBufferGeometry,
} from './PolyhedronGeometry';

export class IcosahedronBufferGeometry extends PolyhedronBufferGeometry {

	constructor( radius?: number, detail?: number );

}

export class IcosahedronGeometry extends PolyhedronGeometry {

	constructor( radius?: number, detail?: number );

}

declare class SphereSopParamsConfig extends NodeParamsConfig {
    type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    radius: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    resolution: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    open: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    angle_range_x: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    angle_range_y: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    detail: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    center: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
}
export declare class SphereSopNode extends TypedSopNode<SphereSopParamsConfig> {
    params_config: SphereSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: CoreGroup[]): void;
    private _cook_without_input;
    private _cook_with_input;
    private _create_required_geometry;
    private _create_default_sphere;
    _create_default_isocahedron(): IcosahedronBufferGeometry;
}
export {};

declare class SwitchSopParamsConfig extends NodeParamsConfig {
    input: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
}
export declare class SwitchSopNode extends TypedSopNode<SwitchSopParamsConfig> {
    params_config: SwitchSopParamsConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    cook(): Promise<void>;
}
export {};

declare global {
    interface Window {
        opentype: any;
    }
}
export declare enum TEXT_TYPE {
    MESH = "mesh",
    FLAT = "flat",
    LINE = "line",
    STROKE = "stroke"
}
export declare const TEXT_TYPES: Array<TEXT_TYPE>;
declare class TextSopParamsConfig extends NodeParamsConfig {
    font: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    text: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    type: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    extrude: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    segments: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    stroke_width: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class TextSopNode extends TypedSopNode<TextSopParamsConfig> {
    params_config: TextSopParamsConfig;
    static type(): string;
    private _font_loader;
    private _ttf_loader;
    private _svg_loader;
    private _loaded_fonts;
    initialize_node(): void;
    cook(): Promise<void>;
    private _create_geometry_from_type_mesh;
    private _create_geometry_from_type_flat;
    private _create_geometry_from_type_line;
    private _create_geometry_from_type_stroke;
    private shapes_from_font;
    private _get_shapes;
    private displayed_text;
    private _load_url;
    private _load_ttf;
    private _load_json;
    private _load_ttf_loader;
    private _load_svg_loader;
}
export {};

declare class TorusSopParamsConfig extends NodeParamsConfig {
    radius: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    radius_tube: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    segments_radial: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    segments_tube: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
}
export declare class TorusSopNode extends TypedSopNode<TorusSopParamsConfig> {
    params_config: TorusSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(): void;
}
export {};

declare class TorusKnotSopParamsConfig extends NodeParamsConfig {
    radius: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    radius_tube: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    segments_radial: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    segments_tube: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    p: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    q: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
}
export declare class TorusKnotSopNode extends TypedSopNode<TorusKnotSopParamsConfig> {
    params_config: TorusKnotSopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(): void;
}
export {};

declare class TransformSopParamConfig extends NodeParamsConfig {
    group: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    t: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    r: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    s: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    look_at: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    up: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    pivot: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
}
export declare class TransformSopNode extends TypedSopNode<TransformSopParamConfig> {
    params_config: TransformSopParamConfig;
    static type(): string;
    static displayed_input_names(): string[];
    initialize_node(): void;
    private _core_transform;
    cook(input_contents: CoreGroup[]): void;
}
export {};

declare class TubeSopParamsConfig extends NodeParamsConfig {
    radius: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    height: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    segments_radial: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    segments_height: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    cap: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    center: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    direction: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
}
export declare class TubeSopNode extends TypedSopNode<TubeSopParamsConfig> {
    params_config: TubeSopParamsConfig;
    static type(): string;
    private _core_transform;
    cook(): void;
}
export {};

declare class UvProjectSopParamsConfig extends NodeParamsConfig {
    camera: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
}
export declare class UvProjectSopNode extends TypedSopNode<UvProjectSopParamsConfig> {
    params_config: UvProjectSopParamsConfig;
    static type(): string;
    private _camera_controller;
    private _processed_core_group;
    private _camera_object;
    initialize_node(): void;
    cook(core_groups: CoreGroup[]): void;
    _update_uvs_from_camera(look_at_target: Object3D): void;
    private _vector_in_camera_space;
}
export {};

export interface GeoNodeChildrenMap {
    add: AddSopNode;
    animation_copy: AnimationCopySopNode;
    animation_mixer: AnimationMixerSopNode;
    attrib_add_mult: AttribAddMultSopNode;
    attrib_copy: AttribCopySopNode;
    attrib_create: AttribCreateSopNode;
    attrib_delete: AttribDeleteSopNode;
    attrib_normalize: AttribNormalizeSopNode;
    attrib_promote: AttribPromoteSopNode;
    attrib_remap: AttribRemapSopNode;
    attrib_rename: AttribRenameSopNode;
    attrib_transfer: AttribTransferSopNode;
    bbox_scatter: BboxScatterSopNode;
    blend: BlendSopNode;
    box: BoxSopNode;
    cache: CacheSopNode;
    circle: CircleSopNode;
    code: CodeSopNode;
    color: ColorSopNode;
    copy: CopySopNode;
    data: DataSopNode;
    data_url: DataUrlSopNode;
    delay: DelaySopNode;
    delete: DeleteSopNode;
    face: FaceSopNode;
    file: FileSopNode;
    fuse: FuseSopNode;
    hexagons: HexagonsSopNode;
    hierarchy: HierarchySopNode;
    instance: InstanceSopNode;
    jitter: JitterSopNode;
    layer: LayerSopNode;
    line: LineSopNode;
    material: MaterialSopNode;
    merge: MergeSopNode;
    noise: NoiseSopNode;
    normals: NormalsSopNode;
    null: NullSopNode;
    object_merge: ObjectMergeSopNode;
    occlusion: OcclusionSopNode;
    particles_system_gpu: ParticlesSystemGpuSopNode;
    peak: PeakSopNode;
    plane: PlaneSopNode;
    point: PointSopNode;
    polywire: PolywireSopNode;
    ray: RaySopNode;
    resample: ResampleSopNode;
    scatter: ScatterSopNode;
    shadows: ShadowsSopNode;
    skin: SkinSopNode;
    sphere: SphereSopNode;
    switch: SwitchSopNode;
    text: TextSopNode;
    torus: TorusSopNode;
    torus_knot: TorusKnotSopNode;
    transform: TransformSopNode;
    tube: TubeSopNode;
    uv_project: UvProjectSopNode;
}
export declare class SopRegister {
    static run(poly: Poly): void;
}

declare const GeoObjParamConfig_base: {
    new (...args: any[]): {
        transform: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        t: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        r: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        s: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & typeof NodeParamsConfig;
declare class GeoObjParamConfig extends GeoObjParamConfig_base {
    display: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class GeoObjNode extends TypedObjNode<Group, GeoObjParamConfig> {
    params_config: GeoObjParamConfig;
    static type(): string;
    readonly transform_controller: TransformController;
    protected _display_node_controller: DisplayNodeController;
    get display_node_controller(): DisplayNodeController;
    readonly flags: FlagsControllerD;
    private _sop_group;
    private _create_sop_group;
    get sop_group(): Group;
    set_sop_group_name(): void;
    protected _children_controller_context: NodeContext;
    private _on_create_bound;
    private _on_child_add_bound;
    initialize_node(): void;
    create_object(): Group;
    request_display_node(): void;
    is_display_node_cooking(): boolean;
    create_node<K extends keyof GeoNodeChildrenMap>(type: K): GeoNodeChildrenMap[K];
    children(): BaseSopNodeType[];
    nodes_by_type<K extends keyof GeoNodeChildrenMap>(type: K): GeoNodeChildrenMap[K][];
    _on_create(): void;
    _on_child_add(node: BaseNodeType): void;
    cook(): void;
}
export {};


export class LightShadow {

	constructor( camera: Camera );

	camera: Camera;
	bias: number;
	radius: number;
	mapSize: Vector2;
	map: RenderTarget;
	mapPass: RenderTarget;
	matrix: Matrix4;

	copy( source: LightShadow ): this;
	clone( recursive?: boolean ): this;
	toJSON(): any;
	getFrustum(): number;
	updateMatrices( light: Light, viewportIndex?: number ): void;
	getViewport( viewportIndex: number ): Vector4;
	getFrameExtents(): Vector2;

}


// Lights //////////////////////////////////////////////////////////////////////////////////

/**
 * Abstract base class for lights.
 */
export class Light extends Object3D {

	constructor( hex?: number | string, intensity?: number );

	color: Color;
	intensity: number;
	readonly isLight: true;
	receiveShadow: boolean;
	shadow: LightShadow;
	/**
	 * @deprecated Use shadow.camera.fov instead.
	 */
	shadowCameraFov: any;
	/**
	 * @deprecated Use shadow.camera.left instead.
	 */
	shadowCameraLeft: any;
	/**
	 * @deprecated Use shadow.camera.right instead.
	 */
	shadowCameraRight: any;
	/**
	 * @deprecated Use shadow.camera.top instead.
	 */
	shadowCameraTop: any;
	/**
	 * @deprecated Use shadow.camera.bottom instead.
	 */
	shadowCameraBottom: any;
	/**
	 * @deprecated Use shadow.camera.near instead.
	 */
	shadowCameraNear: any;
	/**
	 * @deprecated Use shadow.camera.far instead.
	 */
	shadowCameraFar: any;
	/**
	 * @deprecated Use shadow.bias instead.
	 */
	shadowBias: any;
	/**
	 * @deprecated Use shadow.mapSize.width instead.
	 */
	shadowMapWidth: any;
	/**
	 * @deprecated Use shadow.mapSize.height instead.
	 */
	shadowMapHeight: any;

}


/**
 * This light's color gets applied to all the objects in the scene globally.
 *
 * @source https://github.com/mrdoob/three.js/blob/master/src/lights/AmbientLight.js
 */
export class AmbientLight extends Light {

	/**
	 * This creates a Ambientlight with a color.
	 * @param color Numeric value of the RGB component of the color or a Color instance.
	 */
	constructor( color?: Color | string | number, intensity?: number );

	castShadow: boolean;
	readonly isAmbientLight: true;

}

export declare abstract class TypedLightObjNode<L extends Light, K extends NodeParamsConfig> extends TypedObjNode<Group, K> {
    readonly flags: FlagsControllerD;
    readonly render_order: number;
    protected _color_with_intensity: Color;
    protected _light: L;
    get light(): L;
    protected abstract create_light(): L;
    protected _used_in_scene: boolean;
    initialize_base_node(): void;
    private _cook_main_without_inputs_when_dirty_bound;
    private _cook_main_without_inputs_when_dirty;
    private update_light_attachment;
    create_shadow_params_main(): void;
    protected create_light_params(): void;
    protected update_light_params(): void;
    protected create_shadow_params(): void;
    cook(): void;
    update_shadow_params(): void;
    get color_with_intensity(): Color;
    get active(): boolean;
}
export declare type BaseLightObjNodeType = TypedLightObjNode<Light, NodeParamsConfig>;

declare class AmbientLightObjParamsConfig extends NodeParamsConfig {
    color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
    intensity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class AmbientLightObjNode extends TypedLightObjNode<AmbientLight, AmbientLightObjParamsConfig> {
    params_config: AmbientLightObjParamsConfig;
    static type(): string;
    create_light(): AmbientLight;
    initialize_node(): void;
    update_light_params(): void;
}
export {};


export class RectAreaLight extends Light {

	constructor(
		color?: Color | string | number,
		intensity?: number,
		width?: number,
		height?: number
	);

	type: string;
	width: number;
	height: number;
	intensity: number;
	readonly isRectAreaLight: true;

}

declare const TransformedObjParamConfig_base: {
    new (...args: any[]): {
        transform: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        t: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        r: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        s: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & typeof NodeParamsConfig;
declare class TransformedObjParamConfig extends TransformedObjParamConfig_base {
}
export declare abstract class BaseLightTransformedObjNode<L extends Light, K extends TransformedObjParamConfig> extends TypedLightObjNode<L, K> {
    readonly flags: FlagsControllerD;
    readonly transform_controller: TransformController;
    initialize_base_node(): void;
    cook(): void;
}
export {};

export declare function AreaLightParamConfig<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
        intensity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        width: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        height: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & TBase;
declare const AreaLightObjParamsConfig_base: {
    new (...args: any[]): {
        color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
        intensity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        width: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        height: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & {
    new (...args: any[]): {
        transform: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        t: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        r: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        s: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & typeof NodeParamsConfig;
declare class AreaLightObjParamsConfig extends AreaLightObjParamsConfig_base {
}
export declare class AreaLightObjNode extends BaseLightTransformedObjNode<RectAreaLight, AreaLightObjParamsConfig> {
    params_config: AreaLightObjParamsConfig;
    static type(): string;
    create_light(): RectAreaLight;
    update_light_params(): void;
    cook(): Promise<void>;
}
export {};


/**
 * Camera with orthographic projection
 *
 * @example
 * var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
 * scene.add( camera );
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/cameras/OrthographicCamera.js">src/cameras/OrthographicCamera.js</a>
 */
export class OrthographicCamera extends Camera {

	/**
	 * @param left Camera frustum left plane.
	 * @param right Camera frustum right plane.
	 * @param top Camera frustum top plane.
	 * @param bottom Camera frustum bottom plane.
	 * @param near Camera frustum near plane.
	 * @param far Camera frustum far plane.
	 */
	constructor(
		left: number,
		right: number,
		top: number,
		bottom: number,
		near?: number,
		far?: number
	);

	type: 'OrthographicCamera';

	readonly isOrthographicCamera: true;

	zoom: number;
	view: null | {
		enabled: boolean;
		fullWidth: number;
		fullHeight: number;
		offsetX: number;
		offsetY: number;
		width: number;
		height: number;
	};

	/**
	 * Camera frustum left plane.
	 */
	left: number;

	/**
	 * Camera frustum right plane.
	 */
	right: number;

	/**
	 * Camera frustum top plane.
	 */
	top: number;

	/**
	 * Camera frustum bottom plane.
	 */
	bottom: number;

	/**
	 * Camera frustum near plane.
	 */
	near: number;

	/**
	 * Camera frustum far plane.
	 */
	far: number;

	/**
	 * Updates the camera projection matrix. Must be called after change of parameters.
	 */
	updateProjectionMatrix(): void;
	setViewOffset(
		fullWidth: number,
		fullHeight: number,
		offsetX: number,
		offsetY: number,
		width: number,
		height: number
	): void;
	clearViewOffset(): void;
	toJSON( meta?: any ): any;

}


export class DirectionalLightShadow extends LightShadow {

	camera: OrthographicCamera;
	readonly isDirectionalLightShadow: true;

}


/**
 * @example
 * // White directional light at half intensity shining from the top.
 * var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
 * directionalLight.position.set( 0, 1, 0 );
 * scene.add( directionalLight );
 *
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/lights/DirectionalLight.js">src/lights/DirectionalLight.js</a>
 */
export class DirectionalLight extends Light {

	constructor( color?: Color | string | number, intensity?: number );

	/**
	 * Target used for shadow camera orientation.
	 */
	target: Object3D;

	/**
	 * Light's intensity.
	 * Default — 1.0.
	 */
	intensity: number;

	shadow: DirectionalLightShadow;
	readonly isDirectionalLight: true;

}

export declare function DirectionalLightParamConfig<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        light: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
        intensity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        distance: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        cast_shadows: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        shadow_res: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
        shadow_bias: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        show_helper: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        helper_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & TBase;
declare const DirectionalLightObjParamsConfig_base: {
    new (...args: any[]): {
        light: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
        intensity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        distance: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        cast_shadows: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        shadow_res: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
        shadow_bias: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        show_helper: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        helper_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & {
    new (...args: any[]): {
        transform: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        t: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        r: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        s: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & typeof NodeParamsConfig;
declare class DirectionalLightObjParamsConfig extends DirectionalLightObjParamsConfig_base {
}
export declare class DirectionalLightObjNode extends BaseLightTransformedObjNode<DirectionalLight, DirectionalLightObjParamsConfig> {
    params_config: DirectionalLightObjParamsConfig;
    static type(): string;
    private _target_target;
    private _helper_controller;
    initialize_node(): void;
    create_light(): DirectionalLight;
    update_light_params(): void;
    update_shadow_params(): void;
}
export {};


export class HemisphereLight extends Light {

	constructor(
		skyColor?: Color | string | number,
		groundColor?: Color | string | number,
		intensity?: number
	);

	skyColor: Color;
	groundColor: Color;
	intensity: number;
	readonly isHemisphereLight: true;

}

declare class HemisphereLightObjParamsConfig extends NodeParamsConfig {
    sky_color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
    ground_color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
    intensity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    position: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
    show_helper: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    helper_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class HemisphereLightObjNode extends TypedLightObjNode<HemisphereLight, HemisphereLightObjParamsConfig> {
    params_config: HemisphereLightObjParamsConfig;
    static type(): string;
    private _helper_controller;
    create_light(): HemisphereLight;
    initialize_node(): void;
    update_light_params(): void;
}
export {};


/**
 * Camera with perspective projection.
 *
 * @source https://github.com/mrdoob/three.js/blob/master/src/cameras/PerspectiveCamera.js
 */
export class PerspectiveCamera extends Camera {

	/**
	 * @param fov Camera frustum vertical field of view. Default value is 50.
	 * @param aspect Camera frustum aspect ratio. Default value is 1.
	 * @param near Camera frustum near plane. Default value is 0.1.
	 * @param far Camera frustum far plane. Default value is 2000.
	 */
	constructor( fov?: number, aspect?: number, near?: number, far?: number );

	type: 'PerspectiveCamera';

	readonly isPerspectiveCamera: true;

	zoom: number;

	/**
	 * Camera frustum vertical field of view, from bottom to top of view, in degrees.
	 */
	fov: number;

	/**
	 * Camera frustum aspect ratio, window width divided by window height.
	 */
	aspect: number;

	/**
	 * Camera frustum near plane.
	 */
	near: number;

	/**
	 * Camera frustum far plane.
	 */
	far: number;

	focus: number;
	view: null | {
		enabled: boolean;
		fullWidth: number;
		fullHeight: number;
		offsetX: number;
		offsetY: number;
		width: number;
		height: number;
	};
	filmGauge: number;
	filmOffset: number;

	setFocalLength( focalLength: number ): void;
	getFocalLength(): number;
	getEffectiveFOV(): number;
	getFilmWidth(): number;
	getFilmHeight(): number;

	/**
	 * Sets an offset in a larger frustum. This is useful for multi-window or multi-monitor/multi-machine setups.
	 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and the monitors are in grid like this:
	 *
	 *		 +---+---+---+
	 *		 | A | B | C |
	 *		 +---+---+---+
	 *		 | D | E | F |
	 *		 +---+---+---+
	 *
	 * then for each monitor you would call it like this:
	 *
	 *		 var w = 1920;
	 *		 var h = 1080;
	 *		 var fullWidth = w * 3;
	 *		 var fullHeight = h * 2;
	 *
	 *		 // A
	 *		 camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
	 *		 // B
	 *		 camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
	 *		 // C
	 *		 camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
	 *		 // D
	 *		 camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
	 *		 // E
	 *		 camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
	 *		 // F
	 *		 camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h ); Note there is no reason monitors have to be the same size or in a grid.
	 *
	 * @param fullWidth full width of multiview setup
	 * @param fullHeight full height of multiview setup
	 * @param x horizontal offset of subcamera
	 * @param y vertical offset of subcamera
	 * @param width width of subcamera
	 * @param height height of subcamera
	 */
	setViewOffset(
		fullWidth: number,
		fullHeight: number,
		x: number,
		y: number,
		width: number,
		height: number
	): void;
	clearViewOffset(): void;

	/**
	 * Updates the camera projection matrix. Must be called after change of parameters.
	 */
	updateProjectionMatrix(): void;
	toJSON( meta?: any ): any;

	/**
	 * @deprecated Use {@link PerspectiveCamera#setFocalLength .setFocalLength()} and {@link PerspectiveCamera#filmGauge .filmGauge} instead.
	 */
	setLens( focalLength: number, frameHeight?: number ): void;

}


export class PointLightShadow extends LightShadow {

	camera: PerspectiveCamera;

}


/**
 * @example
 * var light = new THREE.PointLight( 0xff0000, 1, 100 );
 * light.position.set( 50, 50, 50 );
 * scene.add( light );
 */
export class PointLight extends Light {

	constructor(
		color?: Color | string | number,
		intensity?: number,
		distance?: number,
		decay?: number
	);

	/*
	 * Light's intensity.
	 * Default - 1.0.
	 */
	intensity: number;

	/**
	 * If non-zero, light will attenuate linearly from maximum intensity at light position down to zero at distance.
	 * Default - 0.0.
	 */
	distance: number;

	decay: number;
	shadow: PointLightShadow;
	power: number;

}

declare const PointLightObjParamsConfig_base: {
    new (...args: any[]): {
        transform: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        t: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        r: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        s: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & typeof NodeParamsConfig;
declare class PointLightObjParamsConfig extends PointLightObjParamsConfig_base {
    light: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
    color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
    intensity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    decay: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    distance: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    cast_shadows: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    shadow_res: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    shadow_bias: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    shadow_near: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    shadow_far: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    show_helper: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    helper_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class PointLightObjNode extends BaseLightTransformedObjNode<PointLight, PointLightObjParamsConfig> {
    params_config: PointLightObjParamsConfig;
    static type(): string;
    private _helper_controller;
    initialize_node(): void;
    create_light(): PointLight;
    update_light_params(): void;
    update_shadow_params(): void;
}
export {};


export class SpotLightShadow extends LightShadow {

	camera: PerspectiveCamera;
	readonly isSpotLightShadow: true;

}


/**
 * A point light that can cast shadow in one direction.
 */
export class SpotLight extends Light {

	constructor(
		color?: Color | string | number,
		intensity?: number,
		distance?: number,
		angle?: number,
		penumbra?: number,
		decay?: number
	);

	/**
	 * Spotlight focus points at target.position.
	 * Default position — (0,0,0).
	 */
	target: Object3D;

	/**
	 * Light's intensity.
	 * Default — 1.0.
	 */
	intensity: number;

	/**
	 * If non-zero, light will attenuate linearly from maximum intensity at light position down to zero at distance.
	 * Default — 0.0.
	 */
	distance: number;

	/*
	 * Maximum extent of the spotlight, in radians, from its direction.
	 * Default — Math.PI/2.
	 */
	angle: number;

	decay: number;
	shadow: SpotLightShadow;
	power: number;
	penumbra: number;
	readonly isSpotLight: true;

}

declare const SpotLightObjParamsConfig_base: {
    new (...args: any[]): {
        transform: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        t: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        r: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        s: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & typeof NodeParamsConfig;
declare class SpotLightObjParamsConfig extends SpotLightObjParamsConfig_base {
    light: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
    color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
    intensity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    angle: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    penumbra: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    decay: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    distance: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    cast_shadows: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    shadow_res: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
    shadow_bias: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    show_helper: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    helper_size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class SpotLightObjNode extends BaseLightTransformedObjNode<SpotLight, SpotLightObjParamsConfig> {
    params_config: SpotLightObjParamsConfig;
    static type(): string;
    private _target_target;
    private _helper_controller;
    initialize_node(): void;
    create_light(): SpotLight;
    update_light_params(): void;
    update_shadow_params(): void;
}
export {};

declare class BaseManagerObjParamsConfig extends NodeParamsConfig {
}
export declare class BaseManagerObjNode extends TypedObjNode<Group, BaseManagerObjParamsConfig> {
    protected _attachable_to_hierarchy: boolean;
    create_object(): Group;
    cook(): void;
}
export {};

declare class CameraOrbitEventParamsConfig extends NodeParamsConfig {
    allow_pan: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    allow_rotate: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    allow_zoom: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    tdamping: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    damping: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    screen_space_panning: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    rotate_speed: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    min_distance: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    max_distance: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    polar_angle_range: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
}
export declare class CameraOrbitControlsEventNode extends TypedCameraControlsEventNode<CameraOrbitEventParamsConfig> {
    params_config: CameraOrbitEventParamsConfig;
    static type(): string;
    create_controls_instance(camera: Camera, element: HTMLElement): Promise<OrbitControls>;
    setup_controls(controls: OrbitControls): void;
    set_from_camera_node(controls: CameraControls, camera_node: BaseCameraObjNodeType): void;
}
export {};

export declare class CameraMapControlsEventNode extends CameraOrbitControlsEventNode {
    static type(): string;
    create_controls_instance(camera: Camera, element: HTMLElement): Promise<MapControls>;
}

declare class MouseEventParamsConfig extends NodeParamsConfig {
    active: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
}
export declare class MouseEventNode extends TypedEventNode<MouseEventParamsConfig> {
    params_config: MouseEventParamsConfig;
    static type(): string;
    initialize_node(): void;
    process_event(event: MouseEvent, canvas: HTMLCanvasElement, camera_node: BaseCameraObjNodeType): void;
    _update_register(): void;
    static PARAM_CALLBACK_toggle_active(node: MouseEventNode): void;
}
export {};

export interface EventNodeChildrenMap {
    camera_orbit_controls: CameraMapControlsEventNode;
    camera_map_controls: CameraOrbitControlsEventNode;
    code: CodeEventNode;
    mouse_event: MouseEventNode;
}
export declare class EventRegister {
    static run(poly: Poly): void;
}

export declare class EventsObjNode extends BaseManagerObjNode {
    readonly render_order: number;
    static type(): string;
    protected _children_controller_context: NodeContext;
    initialize_node(): void;
    create_node<K extends keyof EventNodeChildrenMap>(type: K): EventNodeChildrenMap[K];
    children(): BaseEventNodeType[];
    nodes_by_type<K extends keyof EventNodeChildrenMap>(type: K): EventNodeChildrenMap[K][];
}

export declare class BaseController {
    protected node: BaseMatNodeType;
    constructor(node: BaseMatNodeType);
    add_params(): void;
    update(): void;
    get material(): import("three").Material;
}

export declare function TextureMapParamConfig<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        use_map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.BOOLEAN>;
        map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & TBase;
declare type FilterFlags<Base, Condition> = {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
declare type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
declare type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;
export declare function BooleanParamOptions(controller_class: typeof BaseTextureMapController): {
    cook: boolean;
    callback: (node: BaseNodeType, param: BaseParamType) => void;
};
export declare function OperatorPathOptions(controller: typeof BaseTextureMapController, use_map_name: string): {
    visible_if: {
        [x: string]: number;
    };
    node_selection: {
        context: NodeContext;
    };
    cook: boolean;
    callback: (node: BaseNodeType, param: BaseParamType) => void;
};
declare type CurrentMaterial = Material | ShaderMaterial;
export interface UpdateOptions {
    direct_params?: boolean;
    uniforms?: boolean;
    define?: boolean;
}
export declare class BaseTextureMapController extends BaseController {
    protected node: BaseMatNodeType;
    protected _update_options: UpdateOptions;
    constructor(node: BaseMatNodeType, _update_options: UpdateOptions);
    protected add_hooks(use_map_param: BooleanParam, path_param: OperatorPathParam): void;
    static update(node: BaseNodeType): void;
    _update<M extends CurrentMaterial>(material: M, mat_attrib_name: string, use_map_param: BooleanParam, path_param: OperatorPathParam): Promise<void>;
    _update_texture_on_uniforms<O extends IUniform>(material: ShaderMaterial, mat_attrib_name: keyof SubType<O, Texture | null>, use_map_param: BooleanParam, path_param: OperatorPathParam): Promise<void>;
    private _apply_texture_on_uniforms;
    private _remove_texture_from_uniforms;
    private _define_name;
    _update_texture_on_material<M extends Material>(material: M, mat_attrib_name: keyof SubType<M, Texture | null>, use_map_param: BooleanParam, path_param: OperatorPathParam): Promise<void>;
    private _apply_texture_on_material;
    private _remove_texture_from_material;
    private _update_required_attribute;
    private _do_update_define;
}
export {};

export declare function TextureMapParamConfig<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        use_map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.BOOLEAN>;
        map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & TBase;
declare class TextureMapMaterial extends Material {
    map: Texture | null;
}
declare type CurrentMaterial = TextureMapMaterial | ShaderMaterial;
declare const TextureMapParamsConfig_base: {
    new (...args: any[]): {
        use_map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.BOOLEAN>;
        map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & typeof NodeParamsConfig;
declare class TextureMapParamsConfig extends TextureMapParamsConfig_base {
}
declare abstract class TextureMapMatNode extends TypedMatNode<CurrentMaterial, TextureMapParamsConfig> {
    texture_map_controller: TextureMapController;
    abstract create_material(): CurrentMaterial;
}
export declare class TextureMapController extends BaseTextureMapController {
    constructor(node: TextureMapMatNode, _update_options: UpdateOptions);
    initialize_node(): void;
    update(): Promise<void>;
    static update(node: TextureMapMatNode): Promise<void>;
}
export {};

export declare function TextureAlphaMapParamConfig<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        use_alpha_map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.BOOLEAN>;
        alpha_map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & TBase;
declare class TextureAlphaMaterial extends Material {
    alphaMap: Texture | null;
}
declare type CurrentMaterial = TextureAlphaMaterial | ShaderMaterial;
declare const TextureAlphaMapParamsConfig_base: {
    new (...args: any[]): {
        use_alpha_map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.BOOLEAN>;
        alpha_map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & typeof NodeParamsConfig;
declare class TextureAlphaMapParamsConfig extends TextureAlphaMapParamsConfig_base {
}
declare abstract class TextureAlphaMapMatNode extends TypedMatNode<CurrentMaterial, TextureAlphaMapParamsConfig> {
    texture_alpha_map_controller: TextureAlphaMapController;
    abstract create_material(): CurrentMaterial;
}
export declare class TextureAlphaMapController extends BaseTextureMapController {
    constructor(node: TextureAlphaMapMatNode, _update_options: UpdateOptions);
    initialize_node(): void;
    update(): Promise<void>;
    static update(node: TextureAlphaMapMatNode): Promise<void>;
}
export {};

declare const MeshBasicMatParamsConfig_base: {
    new (...args: any[]): {
        use_alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        use_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        skinning: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        double_sided: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        front: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
        use_vertex_colors: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        transparent: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        opacity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        alpha_test: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        use_fog: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & typeof NodeParamsConfig;
declare class MeshBasicMatParamsConfig extends MeshBasicMatParamsConfig_base {
}
export declare class MeshBasicMatNode extends TypedMatNode<MeshBasicMaterial, MeshBasicMatParamsConfig> {
    params_config: MeshBasicMatParamsConfig;
    static type(): string;
    create_material(): MeshBasicMaterial;
    readonly texture_map_controller: TextureMapController;
    readonly texture_alpha_map_controller: TextureAlphaMapController;
    initialize_node(): void;
    cook(): Promise<void>;
}
export {};

export declare abstract class ShaderAssemblerMesh extends ShaderAssemblerMaterial {
    custom_assembler_class_by_custom_name(): CustomAssemblerMap;
}

export declare class ShaderAssemblerBasic extends ShaderAssemblerMesh {
    get _template_shader(): {
        vertexShader: string;
        fragmentShader: string;
        uniforms: {
            [uniform: string]: import("three").IUniform;
        };
    };
    create_material(): ShaderMaterial;
}

export declare abstract class TypedBuilderMatNode<A extends ShaderAssemblerMaterial, K extends NodeParamsConfig> extends TypedMatNode<ShaderMaterialWithCustomMaterials, K> {
    protected _assembler_controller: GlAssemblerController<A> | undefined;
    protected _children_controller_context: NodeContext;
    initialize_base_node(): void;
    create_material(): ShaderMaterialWithCustomMaterials;
    get assembler_controller(): GlAssemblerController<A>;
    protected abstract _create_assembler_controller(): GlAssemblerController<A>;
    create_node<K extends keyof GlNodeChildrenMap>(type: K): GlNodeChildrenMap[K];
    children(): BaseGlNodeType[];
    nodes_by_type<K extends keyof GlNodeChildrenMap>(type: K): GlNodeChildrenMap[K][];
    compile_if_required(): Promise<void>;
    protected _compile(): Promise<void>;
}
export declare type BaseBuilderMatNodeType = TypedBuilderMatNode<ShaderAssemblerMaterial, NodeParamsConfig>;

declare const MeshBasicMatParamsConfig_base: {
    new (...args: any[]): {
        use_alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        use_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        skinning: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        double_sided: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        front: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        transparent: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        opacity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        alpha_test: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        use_fog: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & typeof NodeParamsConfig;
declare class MeshBasicMatParamsConfig extends MeshBasicMatParamsConfig_base {
}
export declare class MeshBasicBuilderMatNode extends TypedBuilderMatNode<ShaderAssemblerBasic, MeshBasicMatParamsConfig> {
    params_config: MeshBasicMatParamsConfig;
    static type(): string;
    readonly texture_map_controller: TextureMapController;
    readonly texture_alpha_map_controller: TextureAlphaMapController;
    initialize_node(): void;
    protected _create_assembler_controller(): GlAssemblerController<ShaderAssemblerBasic>;
    cook(): Promise<void>;
}
export {};


export interface MeshLambertMaterialParameters extends MaterialParameters {
	color?: Color | string | number;
	emissive?: Color | string | number;
	emissiveIntensity?: number;
	emissiveMap?: Texture | null;
	map?: Texture | null;
	lightMap?: Texture | null;
	lightMapIntensity?: number;
	aoMap?: Texture | null;
	aoMapIntensity?: number;
	specularMap?: Texture | null;
	alphaMap?: Texture | null;
	envMap?: Texture | null;
	combine?: Combine;
	reflectivity?: number;
	refractionRatio?: number;
	wireframe?: boolean;
	wireframeLinewidth?: number;
	wireframeLinecap?: string;
	wireframeLinejoin?: string;
	skinning?: boolean;
	morphTargets?: boolean;
	morphNormals?: boolean;
}

export class MeshLambertMaterial extends Material {

	constructor( parameters?: MeshLambertMaterialParameters );

	color: Color;
	emissive: Color;
	emissiveIntensity: number;
	emissiveMap: Texture | null;
	map: Texture | null;
	lightMap: Texture | null;
	lightMapIntensity: number;
	aoMap: Texture | null;
	aoMapIntensity: number;
	specularMap: Texture | null;
	alphaMap: Texture | null;
	envMap: Texture | null;
	combine: Combine;
	reflectivity: number;
	refractionRatio: number;
	wireframe: boolean;
	wireframeLinewidth: number;
	wireframeLinecap: string;
	wireframeLinejoin: string;
	skinning: boolean;
	morphTargets: boolean;
	morphNormals: boolean;

	setValues( parameters: MeshLambertMaterialParameters ): void;

}

declare const MeshLambertMatParamsConfig_base: {
    new (...args: any[]): {
        use_alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        use_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        skinning: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        double_sided: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        front: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
        use_vertex_colors: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        transparent: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        opacity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        alpha_test: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        use_fog: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & typeof NodeParamsConfig;
declare class MeshLambertMatParamsConfig extends MeshLambertMatParamsConfig_base {
}
export declare class MeshLambertMatNode extends TypedMatNode<MeshLambertMaterial, MeshLambertMatParamsConfig> {
    params_config: MeshLambertMatParamsConfig;
    static type(): string;
    create_material(): MeshLambertMaterial;
    readonly texture_map_controller: TextureMapController;
    readonly texture_alpha_map_controller: TextureAlphaMapController;
    initialize_node(): void;
    cook(): Promise<void>;
}
export {};

export declare class ShaderAssemblerLambert extends ShaderAssemblerMesh {
    get _template_shader(): {
        vertexShader: string;
        fragmentShader: string;
        uniforms: {
            [uniform: string]: import("three").IUniform;
        };
    };
    create_material(): ShaderMaterial;
}

declare const MeshLambertMatParamsConfig_base: {
    new (...args: any[]): {
        use_alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        use_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        skinning: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        double_sided: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        front: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        transparent: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        opacity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        alpha_test: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        use_fog: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & typeof NodeParamsConfig;
declare class MeshLambertMatParamsConfig extends MeshLambertMatParamsConfig_base {
}
export declare class MeshLambertBuilderMatNode extends TypedBuilderMatNode<ShaderAssemblerLambert, MeshLambertMatParamsConfig> {
    params_config: MeshLambertMatParamsConfig;
    static type(): string;
    readonly texture_map_controller: TextureMapController;
    readonly texture_alpha_map_controller: TextureAlphaMapController;
    initialize_node(): void;
    protected _create_assembler_controller(): GlAssemblerController<ShaderAssemblerLambert>;
    cook(): Promise<void>;
}
export {};


export interface MeshStandardMaterialParameters extends MaterialParameters {
	color?: Color | string | number;
	roughness?: number;
	metalness?: number;
	map?: Texture | null;
	lightMap?: Texture | null;
	lightMapIntensity?: number;
	aoMap?: Texture | null;
	aoMapIntensity?: number;
	emissive?: Color | string | number;
	emissiveIntensity?: number;
	emissiveMap?: Texture | null;
	bumpMap?: Texture | null;
	bumpScale?: number;
	normalMap?: Texture | null;
	normalMapType?: NormalMapTypes;
	normalScale?: Vector2;
	displacementMap?: Texture | null;
	displacementScale?: number;
	displacementBias?: number;
	roughnessMap?: Texture | null;
	metalnessMap?: Texture | null;
	alphaMap?: Texture | null;
	envMap?: Texture | null;
	envMapIntensity?: number;
	refractionRatio?: number;
	wireframe?: boolean;
	wireframeLinewidth?: number;
	skinning?: boolean;
	vertexTangents?: boolean;
	morphTargets?: boolean;
	morphNormals?: boolean;
}

export class MeshStandardMaterial extends Material {

	constructor( parameters?: MeshStandardMaterialParameters );

	color: Color;
	roughness: number;
	metalness: number;
	map: Texture | null;
	lightMap: Texture | null;
	lightMapIntensity: number;
	aoMap: Texture | null;
	aoMapIntensity: number;
	emissive: Color;
	emissiveIntensity: number;
	emissiveMap: Texture | null;
	bumpMap: Texture | null;
	bumpScale: number;
	normalMap: Texture | null;
	normalMapType: NormalMapTypes;
	normalScale: Vector2;
	displacementMap: Texture | null;
	displacementScale: number;
	displacementBias: number;
	roughnessMap: Texture | null;
	metalnessMap: Texture | null;
	alphaMap: Texture | null;
	envMap: Texture | null;
	envMapIntensity: number;
	refractionRatio: number;
	wireframe: boolean;
	wireframeLinewidth: number;
	skinning: boolean;
	vertexTangents: boolean;
	morphTargets: boolean;
	morphNormals: boolean;

	setValues( parameters: MeshStandardMaterialParameters ): void;

}

export declare function TextureEnvMapParamConfig<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        use_env_map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.BOOLEAN>;
        env_map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.OPERATOR_PATH>;
        env_map_intensity: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.FLOAT>;
    };
} & TBase;
declare class TextureEnvMaterial extends Material {
    envMap: Texture | null;
}
declare type CurrentMaterial = TextureEnvMaterial | ShaderMaterial;
declare const TextureEnvMapParamsConfig_base: {
    new (...args: any[]): {
        use_env_map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.BOOLEAN>;
        env_map: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.OPERATOR_PATH>;
        env_map_intensity: import("../../utils/params/ParamsConfig").ParamTemplate<import("../../../poly/ParamType").ParamType.FLOAT>;
    };
} & typeof NodeParamsConfig;
declare class TextureEnvMapParamsConfig extends TextureEnvMapParamsConfig_base {
}
declare abstract class TextureEnvMapMatNode extends TypedMatNode<CurrentMaterial, TextureEnvMapParamsConfig> {
    texture_env_map_controller: TextureEnvMapController;
    abstract create_material(): CurrentMaterial;
}
export declare class TextureEnvMapController extends BaseTextureMapController {
    constructor(node: TextureEnvMapMatNode, _update_options: UpdateOptions);
    initialize_node(): void;
    update(): Promise<void>;
    static update(node: TextureEnvMapMatNode): Promise<void>;
}
export {};

export declare const SHADER_DEFAULTS: {
    metalness: number;
    roughness: number;
};
declare const MeshStandardMatParamsConfig_base: {
    new (...args: any[]): {
        use_env_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        env_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        env_map_intensity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & {
    new (...args: any[]): {
        use_alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        use_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        skinning: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        double_sided: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        front: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
        use_vertex_colors: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        transparent: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        opacity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        alpha_test: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        use_fog: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & typeof NodeParamsConfig;
declare class MeshStandardMatParamsConfig extends MeshStandardMatParamsConfig_base {
    metalness: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    roughness: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class MeshStandardMatNode extends TypedMatNode<MeshStandardMaterial, MeshStandardMatParamsConfig> {
    params_config: MeshStandardMatParamsConfig;
    static type(): string;
    create_material(): MeshStandardMaterial;
    readonly texture_map_controller: TextureMapController;
    readonly texture_alpha_map_controller: TextureAlphaMapController;
    readonly texture_env_map_controller: TextureEnvMapController;
    initialize_node(): void;
    cook(): Promise<void>;
}
export {};

export declare class ShaderAssemblerStandard extends ShaderAssemblerMesh {
    is_physical(): boolean;
    get _template_shader(): {
        vertexShader: string;
        fragmentShader: string;
        uniforms: {
            [uniform: string]: import("three").IUniform;
        };
    };
    create_material(): ShaderMaterial;
    add_output_params(output_child: OutputGlNode): void;
    create_shader_configs(): ShaderConfig[];
    create_variable_configs(): VariableConfig[];
}

declare const MeshStandardMatParamsConfig_base: {
    new (...args: any[]): {
        use_env_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        env_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        env_map_intensity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & {
    new (...args: any[]): {
        use_alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        use_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        skinning: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        double_sided: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        front: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        transparent: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        opacity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        alpha_test: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        use_fog: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & typeof NodeParamsConfig;
declare class MeshStandardMatParamsConfig extends MeshStandardMatParamsConfig_base {
    metalness: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    roughness: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class MeshStandardBuilderMatNode extends TypedBuilderMatNode<ShaderAssemblerStandard, MeshStandardMatParamsConfig> {
    params_config: MeshStandardMatParamsConfig;
    static type(): string;
    readonly texture_map_controller: TextureMapController;
    readonly texture_alpha_map_controller: TextureAlphaMapController;
    readonly texture_env_map_controller: TextureEnvMapController;
    initialize_node(): void;
    protected _create_assembler_controller(): GlAssemblerController<ShaderAssemblerStandard>;
    cook(): Promise<void>;
    static _update_metalness(node: MeshStandardBuilderMatNode): void;
    static _update_roughness(node: MeshStandardBuilderMatNode): void;
}
export {};


export interface PointsMaterialParameters extends MaterialParameters {
	color?: Color | string | number;
	map?: Texture | null;
	alphaMap?: Texture | null;
	size?: number;
	sizeAttenuation?: boolean;
	morphTargets?: boolean;
}

export class PointsMaterial extends Material {

	constructor( parameters?: PointsMaterialParameters );

	color: Color;
	map: Texture | null;
	alphaMap: Texture | null;
	size: number;
	sizeAttenuation: boolean;
	morphTargets: boolean;

	setValues( parameters: PointsMaterialParameters ): void;

}

export declare function PointsParamConfig<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        size_attenuation: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & TBase;
declare const PointsMatParamsConfig_base: {
    new (...args: any[]): {
        double_sided: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        front: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
        use_vertex_colors: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        transparent: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        opacity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        alpha_test: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        use_fog: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        size_attenuation: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & typeof NodeParamsConfig;
declare class PointsMatParamsConfig extends PointsMatParamsConfig_base {
}
export declare class PointsMatNode extends TypedMatNode<PointsMaterial, PointsMatParamsConfig> {
    params_config: PointsMatParamsConfig;
    static type(): string;
    create_material(): PointsMaterial;
    cook(): Promise<void>;
}
export {};

export declare class ShaderAssemblerPoints extends ShaderAssemblerMaterial {
    custom_assembler_class_by_custom_name(): CustomAssemblerMap;
    get _template_shader(): {
        vertexShader: string;
        fragmentShader: string;
        uniforms: {
            [uniform: string]: import("three").IUniform;
        };
    };
    create_material(): ShaderMaterial;
    add_output_params(output_child: OutputGlNode): void;
    create_globals_node_output_connections(): (TypedNamedConnectionPoint<ConnectionPointType.VEC3> | TypedNamedConnectionPoint<ConnectionPointType.VEC2> | TypedNamedConnectionPoint<ConnectionPointType.VEC4> | TypedNamedConnectionPoint<ConnectionPointType.FLOAT>)[];
    create_shader_configs(): ShaderConfig[];
    create_variable_configs(): VariableConfig[];
    protected lines_to_remove(shader_name: ShaderName): string[] | undefined;
}

declare const PointsMatParamsConfig_base: {
    new (...args: any[]): {
        use_alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        alpha_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        use_map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        map: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        skinning: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        double_sided: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        front: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & {
    new (...args: any[]): {
        transparent: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        opacity: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        alpha_test: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        use_fog: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    };
} & typeof NodeParamsConfig;
declare class PointsMatParamsConfig extends PointsMatParamsConfig_base {
}
export declare class PointsBuilderMatNode extends TypedBuilderMatNode<ShaderAssemblerPoints, PointsMatParamsConfig> {
    params_config: PointsMatParamsConfig;
    static type(): string;
    initialize_node(): void;
    protected _create_assembler_controller(): GlAssemblerController<ShaderAssemblerPoints>;
    cook(): Promise<void>;
}
export {};

export interface MatNodeChildrenMap {
    mesh_basic: MeshBasicMatNode;
    mesh_basic_builder: MeshBasicBuilderMatNode;
    mesh_lambert: MeshLambertMatNode;
    mesh_lambert_builder: MeshLambertBuilderMatNode;
    mesh_standard: MeshStandardMatNode;
    mesh_standard_builder: MeshStandardBuilderMatNode;
    points: PointsMatNode;
    points_builder: PointsBuilderMatNode;
}
export declare class MatRegister {
    static run(poly: Poly): void;
}

export declare class MaterialsObjNode extends BaseManagerObjNode {
    readonly render_order: number;
    static type(): string;
    protected _children_controller_context: NodeContext;
    initialize_node(): void;
    create_node<K extends keyof MatNodeChildrenMap>(type: K): MatNodeChildrenMap[K];
    children(): BaseMatNodeType[];
    nodes_by_type<K extends keyof MatNodeChildrenMap>(type: K): MatNodeChildrenMap[K][];
}

export declare class TextureContainer extends TypedContainer<ContainableMap['TEXTURE']> {
    set_content(content: ContainableMap['TEXTURE']): void;
    texture(): ContainableMap['TEXTURE'];
    core_content(): ContainableMap['TEXTURE'];
    core_content_cloned(): ContainableMap['TEXTURE'] | undefined;
    object(): import("three").Texture;
    infos(): import("three").Texture[] | undefined;
    resolution(): [number, number];
}

export declare class TypedCopNode<K extends NodeParamsConfig> extends TypedNode<'TEXTURE', BaseCopNodeType, K> {
    container_controller: TypedContainerController<TextureContainer>;
    readonly flags: FlagsControllerB;
    static node_context(): NodeContext;
    static displayed_input_names(): string[];
    constructor(scene: PolyScene);
    initialize_base_node(): void;
    set_texture(texture: Texture): void;
    clear_texture(): void;
}
export declare type BaseCopNodeType = TypedCopNode<any>;
export declare class BaseCopNodeClass extends TypedCopNode<any> {
}

export declare class ShaderAssemblerTexture extends BaseGlShaderAssembler {
    private _uniforms;
    get _template_shader(): {
        fragmentShader: string;
        vertexShader: undefined;
        uniforms: undefined;
    };
    fragment_shader(): string | undefined;
    uniforms(): IUniforms | undefined;
    update_fragment_shader(): Promise<void>;
    add_output_params(output_child: OutputGlNode): void;
    add_globals_params(globals_node: GlobalsGlNode): void;
    create_shader_configs(): ShaderConfig[];
    create_variable_configs(): VariableConfig[];
    protected insert_define_after(shader_name: ShaderName): string;
    protected insert_body_after(shader_name: ShaderName): string;
    protected lines_to_remove(shader_name: ShaderName): string[];
    handle_gl_FragCoord(body_lines: string[], shader_name: ShaderName, var_name: string): void;
    set_node_lines_output(output_node: OutputGlNode, shaders_collection_controller: ShadersCollectionController): void;
    set_node_lines_globals(globals_node: GlobalsGlNode, shaders_collection_controller: ShadersCollectionController): void;
}

export interface IUniforms {
    [uniform: string]: IUniform;
}
declare class BuilderCopParamsConfig extends NodeParamsConfig {
    resolution: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR2>;
}
export declare class BuilderCopNode extends TypedCopNode<BuilderCopParamsConfig> {
    params_config: BuilderCopParamsConfig;
    static type(): string;
    protected _assembler_controller: GlAssemblerController<ShaderAssemblerTexture>;
    private _create_assembler_controller;
    get assembler_controller(): GlAssemblerController<ShaderAssemblerTexture>;
    private _texture_mesh;
    private _fragment_shader;
    private _uniforms;
    private _texture_material;
    private _texture_scene;
    private _texture_camera;
    private _render_target;
    private _renderer;
    private _pixelBuffer;
    protected _children_controller_context: NodeContext;
    initialize_node(): void;
    create_node<K extends keyof GlNodeChildrenMap>(type: K): GlNodeChildrenMap[K];
    children(): BaseGlNodeType[];
    nodes_by_type<K extends keyof GlNodeChildrenMap>(type: K): GlNodeChildrenMap[K][];
    private _reset_if_resolution_changed;
    private _reset;
    private _create_pixel_buffer;
    cook(): Promise<void>;
    shaders_by_name(): {
        fragment: string | undefined;
    };
    compile_if_required(): Promise<void>;
    private run_assembler;
    private _create_renderer;
    render_on_target(): Promise<void>;
    private _create_render_target;
}
export {};

declare class EnvMapCopParamsConfig extends NodeParamsConfig {
}
export declare class EnvMapCopNode extends TypedCopNode<EnvMapCopParamsConfig> {
    params_config: EnvMapCopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: Texture[]): Promise<void>;
    private convert_texture_to_env_map;
}
export {};

declare class FileCopParamsConfig extends NodeParamsConfig {
    url: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.STRING>;
    reload: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.BUTTON>;
    mapping: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.INTEGER>;
    wrap_s: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.INTEGER>;
    wrap_t: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.INTEGER>;
    mag_filter: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.INTEGER>;
    min_filter: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.INTEGER>;
}
export declare class FileCopNode extends TypedCopNode<FileCopParamsConfig> {
    params_config: FileCopParamsConfig;
    private _previous_param_url;
    private _video;
    static type(): string;
    private _texture_loader;
    static readonly VIDEO_TIME_PARAM_NAME = "video_time";
    static readonly DEFAULT_NODE_PATH: {
        UV: string;
        ENV_MAP: string;
    };
    cook(): Promise<void>;
    private _is_static_image_url;
    private cook_for_image;
    private cook_for_video;
    resolved_url(): string;
    private _update_texture_params;
    static PARAM_CALLBACK_reload(node: FileCopNode, param: BaseParamType): void;
    private param_callback_reload;
    private _set_video_current_time;
    private _add_video_spare_params_if_required;
    private _remove_spare_params;
    private _param_url_changed;
    private _load_texture;
}
export {};

export declare class NullCopNode extends TypedCopNode<NodeParamsConfig> {
    params_config: NodeParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(input_contents: Texture[]): Promise<void>;
}

declare class SwitchCopParamsConfig extends NodeParamsConfig {
    input: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
}
export declare class SwitchCopNode extends TypedCopNode<SwitchCopParamsConfig> {
    params_config: SwitchCopParamsConfig;
    static type(): string;
    initialize_node(): void;
    cook(): Promise<void>;
}
export {};

export interface CopNodeChildrenMap {
    builder: BuilderCopNode;
    env_map: EnvMapCopNode;
    file: FileCopNode;
    null: NullCopNode;
    switch: SwitchCopNode;
}
export declare class CopRegister {
    static run(poly: Poly): void;
}

export declare class CopObjNode extends BaseManagerObjNode {
    static type(): string;
    protected _children_controller_context: NodeContext;
    initialize_node(): void;
    create_node<K extends keyof CopNodeChildrenMap>(type: K): CopNodeChildrenMap[K];
    children(): BaseCopNodeType[];
    nodes_by_type<K extends keyof CopNodeChildrenMap>(type: K): CopNodeChildrenMap[K][];
}

export declare class PostProcessObjNode extends BaseManagerObjNode {
    static type(): string;
    protected _children_controller_context: NodeContext;
    initialize_node(): void;
}

declare const NullObjParamConfig_base: {
    new (...args: any[]): {
        transform: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        t: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        r: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        s: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & typeof NodeParamsConfig;
declare class NullObjParamConfig extends NullObjParamConfig_base {
}
export declare class NullObjNode extends TypedObjNode<Group, NullObjParamConfig> {
    params_config: NullObjParamConfig;
    static type(): string;
    readonly transform_controller: TransformController;
    readonly flags: FlagsControllerD;
    private _helper;
    create_object(): Group;
    initialize_node(): void;
    cook(): void;
}
export {};

/**
 * This class contains the parameters that define linear fog, i.e., that grows exponentially denser with the distance.
 */
export class FogExp2 implements IFog {

	constructor( hex: number | string, density?: number );

	name: string;
	color: Color;

	/**
	 * Defines how fast the fog will grow dense.
	 * Default is 0.00025.
	 */
	density: number;

	readonly isFogExp2: true;

	clone(): this;
	toJSON(): any;

}

declare class FogObjParamConfig extends NodeParamsConfig {
    color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
    exponential: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
    density: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    near: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    far: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
}
export declare class FogObjNode extends TypedObjNode<Object3D, FogObjParamConfig> {
    params_config: FogObjParamConfig;
    readonly flags: FlagsControllerD;
    readonly render_order: number;
    protected _attachable_to_hierarchy: boolean;
    protected _linear_fog: Fog;
    protected _linear_fogexp2: FogExp2;
    initialize_node(): void;
    static type(): string;
    cook(): void;
}
export {};

declare class SceneObjParamConfig extends NodeParamsConfig {
    bg_color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
}
export declare class SceneObjNode extends TypedObjNode<Scene, SceneObjParamConfig> {
    params_config: SceneObjParamConfig;
    static type(): string;
    create_object(): Scene;
    initialize_node(): void;
    cook(): void;
}
export {};

export declare class OrthographicCameraBackgroundController extends BaseBackgroundController {
    protected update_screen_quad(): void;
}

export declare function OrthographicCameraObjParamConfigMixin<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & TBase;
declare const OrthographicCameraObjParamConfig_base: {
    new (...args: any[]): {
        post_process: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        do_post_process: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        use_post_process_node0: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node0: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        use_post_process_node1: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node1: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        use_post_process_node2: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node2: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        use_post_process_node3: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node3: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        background: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        use_background: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        use_material: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        background_color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
        background_material: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        background_ratio: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & {
    new (...args: any[]): {
        transform: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        t: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        r: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        s: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & {
    new (...args: any[]): {
        layer: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    };
} & {
    new (...args: any[]): {
        size: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & {
    new (...args: any[]): {
        camera: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        controls: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        target: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        near: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        far: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        set_master_camera: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BUTTON>;
    };
} & typeof NodeParamsConfig;
declare class OrthographicCameraObjParamConfig extends OrthographicCameraObjParamConfig_base {
}
export declare class OrthographicCameraObjNode extends TypedCameraObjNode<OrthographicCamera, OrthographicCameraObjParamConfig> {
    params_config: OrthographicCameraObjParamConfig;
    protected get background_controller_constructor(): typeof OrthographicCameraBackgroundController;
    static type(): string;
    create_object(): OrthographicCamera;
    update_camera(): void;
    protected _update_for_aspect_ratio(): void;
}
export {};

export declare class PerspectiveCameraBackgroundController extends BaseBackgroundController {
    private _bg_corner;
    private _bg_center;
    protected update_screen_quad(): void;
    _update_corner_vector(vector: Vector3, coord: Vector2Like): void;
}

export declare function PerspectiveCameraObjParamConfigMixin<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        fov: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & TBase;
declare const PerspectiveCameraObjParamConfig_base: {
    new (...args: any[]): {
        post_process: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        do_post_process: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        use_post_process_node0: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node0: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        use_post_process_node1: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node1: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        use_post_process_node2: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node2: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        use_post_process_node3: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        post_process_node3: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
    };
} & {
    new (...args: any[]): {
        background: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        use_background: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        use_material: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BOOLEAN>;
        background_color: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.COLOR>;
        background_material: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        background_ratio: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & {
    new (...args: any[]): {
        transform: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        t: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        r: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        s: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        scale: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & {
    new (...args: any[]): {
        layer: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.INTEGER>;
    };
} & {
    new (...args: any[]): {
        fov: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
    };
} & {
    new (...args: any[]): {
        camera: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FOLDER>;
        controls: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.OPERATOR_PATH>;
        target: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.VECTOR3>;
        near: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        far: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.FLOAT>;
        set_master_camera: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.BUTTON>;
    };
} & typeof NodeParamsConfig;
declare class PerspectiveCameraObjParamConfig extends PerspectiveCameraObjParamConfig_base {
}
export declare class PerspectiveCameraObjNode extends TypedCameraObjNode<PerspectiveCamera, PerspectiveCameraObjParamConfig> {
    params_config: PerspectiveCameraObjParamConfig;
    static type(): string;
    protected get background_controller_constructor(): typeof PerspectiveCameraBackgroundController;
    create_object(): PerspectiveCamera;
    update_camera(): void;
    protected _update_for_aspect_ratio(): void;
}
export {};

export interface ObjNodeChildrenMap {
    ambient_light: AmbientLightObjNode;
    area_light: AreaLightObjNode;
    cop: CopObjNode;
    directional_light: DirectionalLightObjNode;
    events: EventsObjNode;
    fog: FogObjNode;
    geo: GeoObjNode;
    hemisphere_light: HemisphereLightObjNode;
    materials: MaterialsObjNode;
    null: NullObjNode;
    orthographic_camera: OrthographicCameraObjNode;
    perspective_camera: PerspectiveCameraObjNode;
    point_light: PointLightObjNode;
    post_process: PostProcessObjNode;
    scene: SceneObjNode;
    spot_light: SpotLightObjNode;
}
export declare class ObjRegister {
    static run(poly: Poly): void;
}

declare class ObjectsManagerParamsConfig extends NodeParamsConfig {
}
export declare class ObjectsManagerNode extends TypedBaseManagerNode<ObjectsManagerParamsConfig> {
    params_config: ObjectsManagerParamsConfig;
    static type(): string;
    private _object;
    private _queued_nodes_by_id;
    private _queued_nodes_by_path;
    private _expected_geo_nodes;
    private _process_queue_start;
    protected _children_controller_context: NodeContext;
    initialize_node(): void;
    init_default_scene(): void;
    object(): Group;
    create_node<K extends keyof ObjNodeChildrenMap>(type: K): ObjNodeChildrenMap[K];
    children(): BaseObjNodeType[];
    nodes_by_type<K extends keyof ObjNodeChildrenMap>(type: K): ObjNodeChildrenMap[K][];
    multiple_display_flags_allowed(): boolean;
    add_to_queue(node: BaseObjNodeType): BaseObjNodeType | undefined;
    process_queue(): Promise<void>;
    update_object(node: BaseObjNodeType): void;
    get_parent_for_node(node: BaseObjNodeType): Group | null;
    add_to_scene(node: BaseObjNodeType): void;
    remove_from_scene(node: BaseObjNodeType): void;
    are_children_cooking(): boolean;
    expected_loading_geo_nodes_by_id(): Promise<Dictionary<GeoObjNode>>;
    add_to_parent_transform(node: BaseObjNodeType): void;
    remove_from_parent_transform(node: BaseObjNodeType): void;
    private _on_child_add;
    private _on_child_remove;
}
export {};

export declare class NodesController {
    private scene;
    constructor(scene: PolyScene);
    _root: ObjectsManagerNode;
    _node_context_signatures: Dictionary<boolean>;
    _instanciated_nodes_by_context_and_type: Dictionary<Dictionary<Dictionary<BaseNodeType>>>;
    init(): void;
    get root(): ObjectsManagerNode;
    objects_from_mask(mask: string): Object3D[];
    clear(): void;
    node(path: string): ObjectsManagerNode | BaseNodeType | null;
    all_nodes(): BaseNodeType[];
    reset_node_context_signatures(): void;
    register_node_context_signature(node: BaseNodeType): void;
    node_context_signatures(): string[];
    add_to_instanciated_node(node: BaseNodeType): void;
    remove_from_instanciated_node(node: BaseNodeType): void;
    instanciated_nodes(context: NodeContext, node_type: string): BaseNodeType[];
}

export interface PerformancePrintObject {
    full_path: string;
    cooks_count: number;
    cook_time_total: number;
    cook_time_per_iteration: number;
    cook_time_total_with_inputs: number;
    cook_time_total_with_inputs_per_iteration: number;
    cook_time_total_params: number;
    cook_time_total_params_per_iteration: number;
}
export declare class PerformanceNode {
    private _node;
    _cooks_count: number;
    _cook_time_total: number;
    _cook_time_total_with_inputs: number;
    _cook_time_total_params: number;
    constructor(_node: BaseNodeType);
    update_cook_data(): void;
    get cook_time_total(): number;
    get cook_time_per_iteration(): number;
    get cook_time_total_with_inputs(): number;
    get cook_time_total_with_inputs_per_iteration(): number;
    get cook_time_total_params(): number;
    get cook_time_total_params_per_iteration(): number;
    get cooks_count(): number;
    print_object(): PerformancePrintObject;
}

export declare class CorePerformance {
    private _started;
    _start_time: number | null;
    _previous_timestamp: number;
    _nodes_cook_data: Dictionary<PerformanceNode>;
    _durations_by_name: Dictionary<number>;
    _durations_count_by_name: Dictionary<number>;
    profile(name: string, method: (args?: any) => any): void;
    start(): void;
    stop(): void;
    reset(): void;
    get started(): boolean;
    record_node_cook_data(node: BaseNodeType): void;
    record(name: string): number;
    print(): void;
    print_node_cook_data(): import("./PerformanceNode").PerformancePrintObject[];
    print_recordings(): {
        duration: number;
        name: string;
        count: number;
        duration_per_iteration: number;
    }[];
}

declare type FrameRange = Number2;
export declare class TimeController {
    private scene;
    protected self: PolyScene;
    private _frame;
    private _time;
    private _prev_performance_now;
    private _graph_node;
    private _frame_range;
    private _frame_range_locked;
    private _playing;
    constructor(scene: PolyScene);
    get graph_node(): CoreGraphNode;
    get frame(): number;
    get time(): number;
    get frame_range(): FrameRange;
    get frame_range_locked(): [boolean, boolean];
    set_frame_range(start_frame: number, end_frame: number): void;
    set_frame_range_locked(start_locked: boolean, end_locked: boolean): void;
    set_time(time: number, update_frame?: boolean): void;
    set_frame(frame: number, update_time?: boolean): void;
    increment_time_if_playing(): void;
    increment_time(): void;
    _ensure_frame_within_bounds(frame: number): number;
    get playing(): boolean;
    pause(): void;
    play(): void;
    toggle_play_pause(): void;
}
export {};

declare type IUniforms = Dictionary<IUniform>;
export interface IUniformsWithTime extends IUniforms {
    time: IUniform;
}
export interface IUniformsWithResolution extends IUniforms {
    resolution: {
        value: Vector2Like;
    };
}
export declare class UniformsController {
    private scene;
    constructor(scene: PolyScene);
    private _time_dependent_uniform_owners;
    private _time_dependent_uniform_owners_ids;
    private _resolution;
    private _resolution_dependent_uniform_owners;
    private _resolution_dependent_uniform_owners_ids;
    add_time_dependent_uniform_owner(id: string, uniforms: IUniformsWithTime): void;
    remove_time_dependent_uniform_owner(id: string): void;
    protected _update_time_dependent_uniform_owners_ids(): void;
    update_time_dependent_uniform_owners(): void;
    add_resolution_dependent_uniform_owner(id: string, uniforms: IUniformsWithResolution): void;
    remove_resolution_dependent_uniform_owner(id: string): void;
    protected _update_resolution_dependent_uniform_owners_ids(): void;
    update_resolution_dependent_uniform_owners(resolution: Vector2): void;
    update_resolution_dependent_uniforms(uniforms: IUniformsWithResolution): void;
}
export {};

export declare class WebGLController {
    constructor();
    _require_webgl2: boolean;
    require_webgl2(): boolean;
    set_require_webgl2(): void;
}

export declare class PolyScene {
    protected _default_scene: Scene;
    get default_scene(): Scene;
    _uuid: string;
    set_uuid(uuid: string): string;
    get uuid(): string;
    _name: string | undefined;
    set_name(name: string): string;
    get name(): string | undefined;
    protected _cameras_controller: CamerasController;
    get cameras_controller(): CamerasController;
    private _cooker;
    get cooker(): Cooker;
    readonly cook_controller: CookController;
    wait_for_cooks_completed(): Promise<void>;
    private _dispatch_controller;
    get dispatch_controller(): DispatchController;
    private _events_controller;
    get events_controller(): EventsController;
    private _graph;
    get graph(): CoreGraph;
    private _lifecycle_controller;
    get lifecycle_controller(): LifeCycleController;
    private _loading_controller;
    get loading_controller(): LoadingController;
    private _missing_expression_references_controller;
    get missing_expression_references_controller(): MissingReferencesController;
    private _expressions_controller;
    get expressions_controller(): ExpressionsController;
    protected _nodes_controller: NodesController;
    get nodes_controller(): NodesController;
    protected _performance: CorePerformance | undefined;
    get performance(): CorePerformance;
    protected _time_controller: TimeController;
    get time_controller(): TimeController;
    set_frame(frame: number): void;
    get frame(): number;
    get time(): number;
    get frame_range(): Number2;
    play(): void;
    pause(): void;
    private _serializer;
    private get serializer();
    to_json(): {
        nodes_by_graph_node_id: Dictionary<object>;
        params_by_graph_node_id: Dictionary<object>;
    };
    private _uniforms_controller;
    get uniforms_controller(): UniformsController;
    private _webgl_controller;
    get webgl_controller(): WebGLController;
    constructor();
    batch_update(callback: () => void): void;
    node(path: string): import("../nodes/manager/ObjectsManager").ObjectsManagerNode | import("../nodes/_Base").BaseNodeType | null;
    get root(): import("../nodes/manager/ObjectsManager").ObjectsManagerNode;
}

export interface NodeUIDataJson {
    x: number;
    y: number;
    comment?: string;
}
export declare class UIData {
    private node;
    private _position;
    private _width;
    private _border_radius;
    private _color;
    private _layout_vertical;
    private _comment;
    private _json;
    constructor(node: BaseNodeType, x?: number, y?: number);
    set_border_radius(radius: number): void;
    border_radius(): number;
    set_width(width: number): void;
    width(): number;
    set_comment(comment: string | undefined): void;
    get comment(): string | undefined;
    set_color(color: Color): void;
    color(): Color;
    set_layout_horizontal(): void;
    is_layout_vertical(): boolean;
    copy(ui_data: UIData): void;
    get position(): Vector2;
    set_position(new_position: Vector2 | number, y?: number): void;
    translate(offset: Vector2, snap?: boolean): void;
    to_json(): NodeUIDataJson;
}

export declare class BaseState {
    protected node: BaseNodeType;
    constructor(node: BaseNodeType);
}

export declare class TimeDependentState extends BaseState {
    get active(): boolean;
    are_params_time_dependent(): boolean;
    are_inputs_time_dependent(): boolean;
    force_time_dependent(): void;
    unforce_time_dependent(): void;
}

export declare class ErrorState extends BaseState {
    private _message;
    set(message: string | undefined): void;
    get message(): string | undefined;
    clear(): void;
    get active(): boolean;
    protected on_update(): void;
}

export declare class StatesController {
    protected node: BaseNodeType;
    time_dependent: TimeDependentState;
    error: ErrorState;
    constructor(node: BaseNodeType);
}

export declare class HierarchyParentController {
    protected node: BaseNodeType;
    private _parent;
    private _on_set_parent_hooks;
    constructor(node: BaseNodeType);
    get parent(): BaseNodeType | null;
    set_parent(parent: BaseNodeType | null): void;
    is_selected(): boolean;
    full_path(): string;
    on_set_parent(): void;
    find_node(path: string): BaseNodeType | null;
}

export declare class CoreNodeSelection {
    private _node;
    _node_ids: string[];
    constructor(_node: BaseNodeType);
    node(): BaseNodeType;
    nodes(): BaseNodeType[];
    contains(node: BaseNodeType): boolean;
    equals(nodes: BaseNodeType[]): boolean;
    clear(): void;
    set(nodes: BaseNodeType[]): void;
    add(nodes_to_add: BaseNodeType[]): void;
    remove(nodes_to_remove: BaseNodeType[]): void;
    private send_update_event;
    private _json;
    to_json(): string[];
}

export declare class HierarchyChildrenController {
    protected node: BaseNodeType;
    private _context;
    private _children;
    private _children_by_type;
    private _children_and_grandchildren_by_context;
    private _is_dependent_on_children;
    private _children_node;
    private _selection;
    get selection(): CoreNodeSelection;
    constructor(node: BaseNodeType, _context: NodeContext);
    get context(): NodeContext;
    init(dependent?: boolean): void;
    set_child_name(node: BaseNodeType, new_name: string): void;
    node_context_signature(): string;
    available_children_classes(): Dictionary<typeof import("../../_Base").BaseNodeClass>;
    is_valid_child_type(node_type: string): boolean;
    create_node(node_type: string): BaseNodeType;
    add_node(child_node: BaseNodeType): BaseNodeType;
    remove_node(child_node: BaseNodeType): void;
    _add_to_nodes_by_type(node: BaseNodeType): void;
    _remove_from_nodes_by_type(node: BaseNodeType): void;
    add_to_children_and_grandchildren_by_context(node: BaseNodeType): void;
    remove_from_children_and_grandchildren_by_context(node: BaseNodeType): void;
    nodes_by_type(type: string): BaseNodeType[];
    child_by_name(name: string): BaseNodeType;
    has_children_and_grandchildren_with_context(context: NodeContext): boolean;
    children(): BaseNodeType[];
    children_names(): string[];
    traverse_children(callback: (arg0: BaseNodeType) => void): void;
}

declare type Callback = () => void;
declare type CallbackWithChildNode = (child_node: BaseNodeType) => void;
export declare class LifeCycleController {
    protected node: BaseNodeType;
    protected _creation_completed: boolean;
    protected _on_child_add_hooks: CallbackWithChildNode[] | undefined;
    private _on_child_remove_hooks;
    private _on_create_hooks;
    private _on_add_hooks;
    private _on_delete_hooks;
    constructor(node: BaseNodeType);
    set_creation_completed(): void;
    get creation_completed(): boolean;
    add_on_child_add_hook(callback: CallbackWithChildNode): void;
    run_on_child_add_hooks(node: BaseNodeType): void;
    add_on_child_remove_hook(callback: CallbackWithChildNode): void;
    run_on_child_remove_hooks(node: BaseNodeType): void;
    add_on_create_hook(callback: Callback): void;
    run_on_create_hooks(): void;
    add_on_add_hook(callback: Callback): void;
    run_on_add_hooks(): void;
    add_delete_hook(callback: Callback): void;
    run_on_delete_hooks(): void;
    protected execute_hooks(hooks: Callback[] | undefined): void;
    protected execute_hooks_with_child_node(hooks: CallbackWithChildNode[] | undefined, child_node: BaseNodeType): void;
}
export {};

export declare class CookController {
    private node;
    _cooking: boolean;
    _cooks_count: number;
    _max_cook_time: number;
    _cooking_dirty_timestamp: number | undefined;
    _cook_time_with_inputs: number;
    _cook_time_with_inputs_start: number | undefined;
    _cook_time_start: number | undefined;
    _cook_time: number;
    _cook_time_params_start: number | undefined;
    _cook_time_params: number;
    _last_eval_key: string | undefined;
    _inputs_evaluation_required: boolean;
    constructor(node: BaseNodeType);
    disallow_inputs_evaluation(): void;
    get is_cooking(): boolean;
    get cooks_count(): number;
    get cook_time(): number;
    private _init_cooking_state;
    private _init_cooking_start_time;
    private _start_cook_if_no_errors;
    cook_main(): Promise<void>;
    cook_main_without_inputs(): Promise<void>;
    end_cook(message?: string | null): void;
    _terminate_cook_process(): void;
    private _increment_cooks_count;
    _record_cook_time(): void;
    evaluate_inputs_and_params(): Promise<(BaseContainer | null)[]>;
    get cook_time_with_inputs(): number;
    get cook_time_params(): number;
    _time_with_precision(time: number): number;
}

/// <reference path="../../../../../custom_typings/guards.d.ts" />
export declare class DependenciesController {
    protected node: BaseNodeType;
    private _params_referrees_by_graph_node_id;
    constructor(node: BaseNodeType);
    scene_successors(): BaseNodeType[];
    scene_predecessors(): BaseNodeType[];
    private _find_scene_node_scene_nodes;
    private _find_base_nodes_from_node;
    add_param_referree(param: BaseParamType): void;
    remove_param_referree(param: BaseParamType): void;
    params_referree(): BaseParamType[];
    param_nodes_referree(): BaseNodeType[];
}

declare type Callback = () => void;
export declare class NameController {
    protected node: BaseNodeType;
    private _graph_node;
    private _on_set_name_hooks;
    private _on_set_full_path_hooks;
    constructor(node: BaseNodeType);
    get graph_node(): CoreGraphNode;
    static base_name(node: BaseNodeType): string;
    request_name_to_parent(new_name: string): void;
    set_name(new_name: string): void;
    update_name_from_parent(new_name: string): void;
    add_post_set_name_hook(hook: Callback): void;
    add_post_set_full_path_hook(hook: Callback): void;
    post_set_name(): void;
    post_set_full_path(): void;
}
export {};

export interface NodeSerializerData {
    name: string;
    type: string;
    graph_node_id: string;
    is_dirty: boolean;
    ui_data_json: NodeUIDataJson;
    error_message: string | undefined;
    children: string[];
    inputs: Array<string | undefined>;
    input_connection_output_indices: Array<number | undefined> | undefined;
    named_input_connections: TypedNamedConnectionPointData<ConnectionPointType>[];
    named_output_connections: TypedNamedConnectionPointData<ConnectionPointType>[];
    param_ids: string[];
    override_clonable_state: boolean;
    inputs_clonable_state_with_override: boolean[];
    flags?: {
        display?: boolean;
        bypass?: boolean;
    };
    selection?: string[];
}
export declare class NodeSerializer {
    private node;
    constructor(node: BaseNodeType);
    to_json(include_param_components?: boolean): NodeSerializerData;
    children_ids(): string[];
    input_ids(): (string | undefined)[];
    connection_input_indices(): (number | undefined)[] | undefined;
    named_input_connections(): TypedNamedConnectionPointData<ConnectionPointType>[];
    named_output_connections(): TypedNamedConnectionPointData<ConnectionPointType>[];
    to_json_params_from_names(param_names: string[], include_components?: boolean): string[];
    to_json_params(include_components?: boolean): string[];
}

export declare type OnSceneLoadHook = () => void;
declare type PostCreateParamsHook = () => void;
export interface ParamOptionToAdd<T extends ParamType> {
    name: string;
    type: T;
    init_value: ParamInitValueSerializedTypeMap[T];
    options?: ParamOptions;
}
export interface ParamsUpdateOptions {
    names_to_delete?: string[];
    to_add?: ParamOptionToAdd<ParamType>[];
}
export declare class ParamsController {
    protected node: BaseNodeType;
    private _param_create_mode;
    private _params_by_name;
    private _params_list;
    private _param_names;
    private _non_spare_params;
    private _spare_params;
    private _non_spare_param_names;
    private _spare_param_names;
    private _params_node;
    private _params_added_since_last_params_eval;
    private _post_create_params_hook;
    private _on_scene_load_hooks;
    private _on_scene_load_hook_names;
    constructor(node: BaseNodeType);
    private init_dependency_node;
    init(): void;
    private _post_create_params;
    update_params(options: ParamsUpdateOptions): void;
    post_create_spare_params(): void;
    private init_from_params_config;
    private init_param_accessors;
    private _remove_unneeded_accessors;
    get params_node(): CoreGraphNode | undefined;
    get all(): BaseParamType[];
    get non_spare(): BaseParamType[];
    get spare(): BaseParamType[];
    get names(): string[];
    get non_spare_names(): string[];
    get spare_names(): string[];
    private set_with_type;
    set_float(name: string, value: ParamInitValuesTypeMap[ParamType.FLOAT]): void;
    set_vector3(name: string, value: ParamInitValuesTypeMap[ParamType.VECTOR3]): void;
    has_param(name: string): boolean;
    has(name: string): boolean;
    get(name: string): BaseParamType | null;
    param_with_type<T extends ParamType>(name: string, type: T): ParamConstructorMap[T] | undefined;
    get_float(name: string): FloatParam;
    get_operator_path(name: string): OperatorPathParam;
    value(name: string): string | number | boolean | import("three").Vector2 | import("three").Vector3 | import("three").Vector4 | import("three").Color | import("../../../params/ramp/RampValue").RampValue | null | undefined;
    value_with_type<T extends ParamType>(name: string, type: T): ParamValuesTypeMap[T];
    boolean(name: string): boolean;
    float(name: string): number;
    integer(name: string): number;
    string(name: string): string;
    vector2(name: string): import("three").Vector2;
    vector3(name: string): import("three").Vector3;
    color(name: string): import("three").Color;
    param(name: string): BaseParamType | null;
    private delete_param;
    add_param<T extends ParamType>(type: T, name: string, init_value: ParamInitValuesTypeMap[T], options?: ParamOptions): ParamConstructorMap[T] | undefined;
    private _update_caches;
    _eval_param(param: BaseParamType): Promise<void>;
    eval_params(params: BaseParamType[]): Promise<void>;
    eval_all(): Promise<void>;
    set_post_create_params_hook(hook: PostCreateParamsHook): void;
    add_on_scene_load_hook(name: string, method: OnSceneLoadHook): void;
    run_post_create_params_hook(): void;
    run_on_scene_load_hooks(): void;
}
export {};

export declare type ParamsValueAccessorType<T extends NodeParamsConfig> = {
    readonly [P in keyof T]: T[P]['value_type'];
};
export declare class ParamsValueAccessor<T extends NodeParamsConfig> {
    constructor();
}

export declare class ProcessingContext {
    private _frame;
    constructor(node: BaseNodeType);
    copy(src_context: ProcessingContext): void;
    get frame(): number;
}

export declare class ConnectionsController {
    protected _node: BaseNodeType;
    private _input_connections;
    private _output_connections;
    constructor(_node: BaseNodeType);
    init_inputs(): void;
    add_input_connection(connection: NodeConnection): void;
    remove_input_connection(connection: NodeConnection): void;
    input_connection(index: number): NodeConnection | undefined;
    first_input_connection(): NodeConnection;
    input_connections(): (NodeConnection | undefined)[] | undefined;
    add_output_connection(connection: NodeConnection): void;
    remove_output_connection(connection: NodeConnection): void;
    output_connections(): NodeConnection[];
}

export declare enum InputCloneMode {
    ALWAYS = "always",
    NEVER = "never",
    FROM_NODE = "from_node"
}

declare type OnUpdateHook = () => void;
export declare class InputsController<T extends BaseNodeType> {
    protected node: T;
    private _graph_node_inputs;
    private _inputs;
    private _has_named_inputs;
    private _named_input_connection_points;
    private _min_inputs_count;
    private _max_inputs_count;
    private _depends_on_inputs;
    private _on_update_hooks;
    private _on_update_hook_names;
    private _user_inputs_clonable_states;
    private _inputs_clonable_states;
    private _override_clonable_state;
    constructor(node: T);
    set_depends_on_inputs(depends_on_inputs: boolean): void;
    private set_min_inputs_count;
    private set_max_inputs_count;
    named_input_connection_points_by_name(name: string): BaseNamedConnectionPointType | undefined;
    set_named_input_connection_points(connection_points: BaseNamedConnectionPointType[]): void;
    get has_named_inputs(): boolean;
    get named_input_connection_points(): BaseNamedConnectionPointType[];
    private init_graph_node_inputs;
    private _create_graph_node_input;
    get max_inputs_count(): number;
    input_graph_node(input_index: number): CoreGraphNode;
    set_count(min: number, max?: number): void;
    private init_connections_controller_inputs;
    eval_required_inputs_p(): Promise<(BaseContainer | null)[]>;
    eval_required_input(input_index: number): Promise<any>;
    get_named_input_index(name: string): number;
    get_input_index(input_index_or_name: number | string): number;
    set_input(input_index_or_name: number | string, node: T | null, output_index_or_name?: number | string): void;
    remove_input(node: T): void;
    input(input_index: number): T | null;
    named_input(input_name: string): T | null;
    named_input_connection_point(input_name: string): BaseNamedConnectionPointType | undefined;
    has_named_input(name: string): boolean;
    has_input(input_index: number): boolean;
    inputs(): (T | null)[];
    override_clonable_state_allowed(): boolean;
    inputs_clonable_state(): InputCloneMode[];
    input_cloned(index: number): boolean;
    inputs_clonable_state_with_override(): boolean[];
    input_clonable_state_with_override(index: number): boolean;
    init_inputs_clonable_state(values?: InputCloneMode[] | null): InputCloneMode[];
    private _default_inputs_clonale_state_values;
    set_override_clonable_state(state: boolean): void;
    override_clonable_state(): boolean;
    add_on_set_input_hook(name: string, hook: OnUpdateHook): void;
    private _run_on_set_input_hooks;
}
export {};

export declare class OutputsController<T extends BaseNodeType> {
    private node;
    private _has_outputs;
    private _named_output_connection_points;
    private _has_named_outputs;
    constructor(node: T);
    set_has_one_output(): void;
    set_has_no_output(): void;
    get has_outputs(): boolean;
    get has_named_outputs(): boolean;
    has_named_output(name: string): boolean;
    get named_output_connection_points(): BaseNamedConnectionPointType[];
    named_output_connection(index: number): BaseNamedConnectionPointType | undefined;
    get_named_output_index(name: string): number;
    get_output_index(output_index_or_name: number | string): number;
    named_output_connection_points_by_name(name: string): BaseNamedConnectionPointType | undefined;
    set_named_output_connection_points(connection_points: BaseNamedConnectionPointType[], set_dirty?: boolean): void;
    used_output_names(): string[];
}

export declare class IOController<T extends BaseNodeType> {
    protected node: T;
    protected _connections: ConnectionsController;
    protected _inputs: InputsController<T> | undefined;
    protected _outputs: OutputsController<T> | undefined;
    constructor(node: T);
    get connections(): ConnectionsController;
    get inputs(): InputsController<T>;
    has_inputs(): boolean;
    get outputs(): OutputsController<T>;
    has_outputs(): boolean;
}

export declare type ParamsAccessorType<T extends NodeParamsConfig> = {
    readonly [P in keyof T]: T[P]['param_class'];
};
export declare class ParamsAccessor<T extends NodeParamsConfig> {
    constructor();
}

export interface NodeVisitor {
    visit_node: (node: BaseNodeType) => any;
    visit_node_obj: (node: BaseNodeType) => any;
}
export interface NodeDeletedEmitData {
    parent_id: string;
}
export interface NodeCreatedEmitData {
    child_node_json: NodeSerializerData;
}
declare type EmitDataByNodeEventMapGeneric = {
    [key in NodeEvent]: any;
};
export interface EmitDataByNodeEventMap extends EmitDataByNodeEventMapGeneric {
    [NodeEvent.CREATED]: NodeCreatedEmitData;
    [NodeEvent.DELETED]: NodeDeletedEmitData;
    [NodeEvent.ERROR_UPDATED]: undefined;
}
export declare class EventContainer extends TypedContainer<ContainableMap['EVENT']> {
    set_content(content: ContainableMap['EVENT']): void;
}

export declare class PostProcessContainer extends TypedContainer<ContainableMap['POST']> {
    set_content(content: ContainableMap['POST']): void;
    render_pass(): number;
    object(options?: {}): number;
}

export declare class GlContainer extends TypedContainer<ContainableMap['GL']> {
    object(): string;
}

export declare class JsContainer extends TypedContainer<ContainableMap['JS']> {
    object(): string;
}

export interface ContainerMap {
    GEOMETRY: GeometryContainer;
    MATERIAL: MaterialContainer;
    TEXTURE: TextureContainer;
    OBJECT: ObjectContainer;
    EVENT: EventContainer;
    MANAGER: ManagerContainer;
    POST: PostProcessContainer;
    GL: GlContainer;
    JS: JsContainer;
}

declare type KT = keyof ContainerMap;
export declare class TypedNode<T extends KT, NT extends BaseNodeType, K extends NodeParamsConfig> extends CoreGraphNode {
    container_controller: TypedContainerController<ContainerMap[T]>;
    private _parent_controller;
    private _ui_data;
    private _dependencies_controller;
    private _states;
    private _lifecycle;
    private _serializer;
    private _cook_controller;
    readonly flags: FlagsController | undefined;
    protected _display_node_controller: DisplayNodeController | undefined;
    get display_node_controller(): DisplayNodeController | undefined;
    private _params_controller;
    readonly params_config: K | undefined;
    readonly pv: ParamsValueAccessorType<K>;
    readonly p: ParamsAccessorType<K>;
    private _processing_context;
    private _name_controller;
    private _io;
    get parent_controller(): HierarchyParentController;
    static displayed_input_names(): string[];
    private _children_controller;
    protected _children_controller_context: NodeContext | undefined;
    get children_controller_context(): NodeContext | undefined;
    private _create_children_controller;
    get children_controller(): HierarchyChildrenController | undefined;
    children_allowed(): boolean;
    get ui_data(): UIData;
    get dependencies_controller(): DependenciesController;
    get states(): StatesController;
    get lifecycle(): LifeCycleController;
    get serializer(): NodeSerializer;
    get cook_controller(): CookController;
    get io(): IOController<NT>;
    get name_controller(): NameController;
    set_name(name: string): void;
    _set_core_name(name: string): void;
    get params(): ParamsController;
    get processing_context(): ProcessingContext;
    constructor(scene: PolyScene, name?: string);
    private _initialized;
    initialize_base_and_node(): void;
    protected initialize_base_node(): void;
    protected initialize_node(): void;
    static type(): string;
    get type(): string;
    static node_context(): NodeContext;
    node_context(): NodeContext;
    static required_three_imports(): string[];
    static required_imports(): string[];
    required_imports(): string[];
    static require_webgl2(): boolean;
    require_webgl2(): boolean;
    set_parent(parent: BaseNodeType | null): void;
    get parent(): BaseNodeType | null;
    get root(): import("./manager/ObjectsManager").ObjectsManagerNode;
    full_path(): string;
    create_params(): void;
    add_param<T extends ParamType>(type: T, name: string, default_value: ParamInitValuesTypeMap[T], options?: ParamOptions): ParamConstructorMap[T] | undefined;
    cook(input_contents: any[]): any;
    request_container(): Promise<ContainerMap[T]>;
    set_container(content: ContainableMap[T], message?: string | null): void;
    create_node(type: string): BaseNodeType | undefined;
    remove_node(node: BaseNodeType): void;
    children(): BaseNodeType[];
    node(path: string): BaseNodeType | null;
    nodes_by_type(type: string): BaseNodeType[];
    set_input(input_index_or_name: number | string, node: NT | null, output_index_or_name?: number | string): void;
    emit(event_name: NodeEvent.CREATED, data: EmitDataByNodeEventMap[NodeEvent.CREATED]): void;
    emit(event_name: NodeEvent.DELETED, data: EmitDataByNodeEventMap[NodeEvent.DELETED]): void;
    emit(event_name: NodeEvent.NAME_UPDATED): void;
    emit(event_name: NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
    emit(event_name: NodeEvent.NAMED_INPUTS_UPDATED): void;
    emit(event_name: NodeEvent.NAMED_OUTPUTS_UPDATED): void;
    emit(event_name: NodeEvent.INPUTS_UPDATED): void;
    emit(event_name: NodeEvent.PARAMS_UPDATED): void;
    emit(event_name: NodeEvent.UI_DATA_POSITION_UPDATED): void;
    emit(event_name: NodeEvent.UI_DATA_COMMENT_UPDATED): void;
    emit(event_name: NodeEvent.ERROR_UPDATED): void;
    emit(event_name: NodeEvent.FLAG_BYPASS_UPDATED): void;
    emit(event_name: NodeEvent.FLAG_DISPLAY_UPDATED): void;
    emit(event_name: NodeEvent.SELECTION_UPDATED): void;
    to_json(include_param_components?: boolean): NodeSerializerData;
}
export declare type BaseNodeType = TypedNode<any, BaseNodeType, any>;
export declare class BaseNodeClass extends TypedNode<any, BaseNodeType, any> {
}
export {};

export declare class TypedEventNode<K extends NodeParamsConfig> extends TypedNode<'EVENT', BaseEventNodeType, K> {
    container_controller: TypedContainerController<EventContainer>;
    static node_context(): NodeContext;
    private _eval_all_params_on_dirty_bound;
    initialize_base_node(): void;
    _eval_all_params_on_dirty(): void;
    process_event(event: Event, canvas: HTMLCanvasElement, camera_node: BaseCameraObjNodeType): void;
}
export declare type BaseEventNodeType = TypedEventNode<any>;
export declare class BaseEventNodeClass extends TypedEventNode<any> {
}

export declare class BaseMouseEventProcessor {
    protected node: CodeEventNode;
    protected raycaster: Raycaster;
    protected mouse: Vector2;
    constructor();
    process_event(event: MouseEvent, canvas: HTMLCanvasElement, camera_node: BaseCameraObjNodeType): void;
    set_node(node: CodeEventNode): void;
    protected _set_mouse_from_event_and_canvas(event: MouseEvent, canvas: HTMLCanvasElement): void;
}
declare class CodeEventParamsConfig extends NodeParamsConfig {
    code_typescript: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
    code_javascript: import("../utils/params/ParamsConfig").ParamTemplate<import("../../poly/ParamType").ParamType.STRING>;
}
export declare class CodeEventNode extends TypedEventNode<CodeEventParamsConfig> {
    params_config: CodeEventParamsConfig;
    private _last_compiled_code;
    private _event_processor;
    static type(): string;
    initialize_node(): void;
    process_event(event: MouseEvent, canvas: HTMLCanvasElement, camera_node: BaseCameraObjNodeType): void;
    private _compile_if_required;
    private _compile;
}
export {};
