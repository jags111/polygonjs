import {BaseDefinition} from './_Base'
import {BaseDefinitionTyped} from './_BaseTyped'
import {BaseCollection} from './_BaseCollection'


export class DefinitionAttributeCollection extends BaseCollection {}
export class DefinitionAttribute extends BaseDefinitionTyped {
	collection_constructor(){return DefinitionAttributeCollection}
	line(){
		return `attribute ${this.type()} ${this.name()}`
	}
}

export class DefinitionFunctionCollection extends BaseCollection {}
export class DefinitionFunction extends BaseDefinition {
	collection_constructor(){return DefinitionFunctionCollection}
	line(){
		return this.name()
	}
}

export class DefinitionUniformCollection extends BaseCollection {}
export class DefinitionUniform extends BaseDefinitionTyped {
	collection_constructor(){return DefinitionUniformCollection}
	line(){
		return `uniform ${this.type()} ${this.name()}`
	}
}

export class DefinitionVaryingCollection extends BaseCollection {}
export class DefinitionVarying extends BaseDefinitionTyped {
	collection_constructor(){return DefinitionVaryingCollection}
	line(){
		return `varying ${this.type()} ${this.name()}`
	}
}

// export class DefinitionOutCollection extends BaseCollection {}
// export class DefinitionOut extends BaseDefinitionTyped {
// 	collection_constructor(){return DefinitionOutCollection}
// 	line(){
// 		return `out ${this.type()} ${this.name()}`
// 	}
// }

// export class DefinitionInCollection extends BaseCollection {}
// export class DefinitionIn extends BaseDefinitionTyped {
// 	collection_constructor(){return DefinitionInCollection}
// 	line(){
// 		return `in ${this.type()} ${this.name()}`
// 	}
// }

export const Definition = {
	Base: BaseDefinition,
	Function: DefinitionFunction,
	Attribute: DefinitionAttribute,
	Uniform: DefinitionUniform,
	Varying: DefinitionVarying,
	// Out: DefinitionOut,
	// In: DefinitionIn,
}