import BigNumber from "bignumber.js";
type TypeNumeric = string | number | BigNumber.Instance;
declare class Numeric {
    bigNumber(a: TypeNumeric): BigNumber;
    validate(...params: TypeNumeric[]): boolean;
    add(a: TypeNumeric, b: TypeNumeric): number;
    subtract(a: TypeNumeric, b: TypeNumeric): number;
    multiply(a: TypeNumeric, b: TypeNumeric): number;
    divide(a: TypeNumeric, b: TypeNumeric): number;
}
declare const _default: Numeric;
export default _default;
