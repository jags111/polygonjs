import { GlConnectionPointType } from '../utils/io/connections/Gl';
declare const VectorAlignGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string, params_init_value_overrides?: import("../utils/io/IOController").ParamsInitData | undefined): {
        initialize_node(): void;
        _gl_input_name(index: number): string;
        _gl_output_name(index: number): string;
        gl_method_name(): string;
        _expected_output_types(): GlConnectionPointType[];
        param_default_value(name: string): any;
        gl_function_definitions(): import("./utils/GLDefinition").FunctionGLDefinition[];
        _expected_input_types(): GlConnectionPointType[];
        params_config: import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig;
        set_lines(shaders_collection_controller: import("./code/utils/ShadersCollectionController").ShadersCollectionController): void;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController<import("./code/utils/ParamConfig").GlParamConfig<import("../../poly/ParamType").ParamType>> | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("./code/utils/ParamConfig").GlParamConfig<import("../../poly/ParamType").ParamType>[] | undefined;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../poly/NodeContext").NodeContext.GL>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").NodeCookController<import("../../poly/NodeContext").NodeContext.GL> | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly persisted_config: import("../utils/PersistedConfig").BasePersistedConfig | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>;
        copy_param_values(node: import("../_Base").TypedNode<import("../../poly/NodeContext").NodeContext.GL, import("./_BaseMathFunction").BaseGlMathFunctionParamsConfig>): void;
        _name_controller: import("../utils/NameController").NameController | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").NodeCookController<import("../../poly/NodeContext").NodeContext.GL>;
        _io: import("../utils/io/IOController").IOController<import("../../poly/NodeContext").NodeContext.GL> | undefined;
        readonly io: import("../utils/io/IOController").IOController<import("../../poly/NodeContext").NodeContext.GL>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        params_init_value_overrides?: import("../utils/io/IOController").ParamsInitData | undefined;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(relative_to_parent?: import("../_Base").BaseNodeType | undefined): string;
        create_params(): void;
        add_param<T extends import("../../poly/ParamType").ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string, params_init_value_overrides?: import("../utils/io/IOController").ParamsInitData | undefined): import("../_Base").BaseNodeType | undefined;
        createNode(node_class: any, params_init_value_overrides?: import("../utils/io/IOController").ParamsInitData | undefined): import("../_Base").BaseNodeType | undefined;
        create_operation_container(type: string, operation_container_name: string, params_init_value_overrides?: import("../utils/io/IOController").ParamsInitData | undefined): import("../../../core/operations/container/_Base").BaseOperationContainer | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        node_sibbling(name: string): import("./_Base").BaseGlNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: StringOrNumber, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: StringOrNumber): void;
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
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_OPTIMIZE_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        required_modules(): Promise<void | import("../../poly/registers/modules/_BaseRegister").ModuleName[]>;
        used_assembler(): void | import("../../poly/registers/assemblers/_BaseRegister").AssemblerName;
        integration_data(): void | import("../_Base").IntegrationData;
        readonly poly_node_controller: import("../utils/poly/PolyNodeController").PolyNodeController | undefined;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: number;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: number;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../../../core/graph/CoreGraphNode").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../../../core/graph/CoreGraphNode").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../../../core/graph/CoreGraphNode").CoreGraphNode, check_if_graph_has_cycle?: boolean): boolean;
        remove_graph_input(src: import("../../../core/graph/CoreGraphNode").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): number[];
        graph_predecessors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
        graph_successors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
        graph_all_predecessors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
        graph_all_successors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    require_webgl2(): boolean;
};
export declare class VectorAlignGlNode extends VectorAlignGlNode_base {
    protected _expected_input_types(): GlConnectionPointType[];
    protected _expected_output_types(): GlConnectionPointType[];
    param_default_value(name: string): Number3;
}
export {};
