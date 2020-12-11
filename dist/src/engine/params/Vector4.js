import {TypedMultipleParam} from "./_Multiple";
import lodash_isArray from "lodash/isArray";
import {Vector4 as Vector42} from "three/src/math/Vector4";
import {ParamType as ParamType2} from "../poly/ParamType";
const COMPONENT_NAMES_VECTOR4 = ["x", "y", "z", "w"];
export class Vector4Param extends TypedMultipleParam {
  constructor() {
    super(...arguments);
    this._value = new Vector42();
    this._copied_value = [0, 0, 0, 0];
  }
  static type() {
    return ParamType2.VECTOR4;
  }
  get component_names() {
    return COMPONENT_NAMES_VECTOR4;
  }
  get default_value_serialized() {
    if (lodash_isArray(this.default_value)) {
      return this.default_value;
    } else {
      return this.default_value.toArray();
    }
  }
  get value_serialized() {
    return this.value.toArray();
  }
  _copy_value(param) {
    param.value.toArray(this._copied_value);
    this.set(this._copied_value);
  }
  _clone_raw_input(raw_input) {
    if (raw_input instanceof Vector42) {
      return raw_input.clone();
    } else {
      const new_array = [raw_input[0], raw_input[1], raw_input[2], raw_input[3]];
      return new_array;
    }
  }
  static are_raw_input_equal(raw_input1, raw_input2) {
    if (raw_input1 instanceof Vector42) {
      if (raw_input2 instanceof Vector42) {
        return raw_input1.equals(raw_input2);
      } else {
        return raw_input1.x == raw_input2[0] && raw_input1.y == raw_input2[1] && raw_input1.z == raw_input2[2] && raw_input1.w == raw_input2[3];
      }
    } else {
      if (raw_input2 instanceof Vector42) {
        return raw_input1[0] == raw_input2.x && raw_input1[1] == raw_input2.y && raw_input1[2] == raw_input2.z && raw_input1[3] == raw_input2.w;
      } else {
        return raw_input1[0] == raw_input2[0] && raw_input1[1] == raw_input2[1] && raw_input1[2] == raw_input2[2] && raw_input1[3] == raw_input2[3];
      }
    }
  }
  static are_values_equal(val1, val2) {
    return val1.equals(val2);
  }
  init_components() {
    super.init_components();
    this.x = this.components[0];
    this.y = this.components[1];
    this.z = this.components[2];
    this.w = this.components[3];
  }
  set_value_from_components() {
    this._value.x = this.x.value;
    this._value.y = this.y.value;
    this._value.z = this.z.value;
    this._value.w = this.w.value;
  }
}
