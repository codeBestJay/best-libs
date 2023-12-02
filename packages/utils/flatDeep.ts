/**
 * @description 递归平铺树
 * @param arr {Array} 需要平铺的树
 * @param d {number} 需要递归的层级
 * @return {Array} 平铺的数组
 */
export default function flatDeep(arr: any[] = [], d = 1, children = "children"): any[] {
  return d > 0
    ? arr.reduce(
      (acc, val) =>
        acc.concat(Array.isArray(val?.[children]) ? [val, ...flatDeep(val?.[children], d - 1, children)] : val),
      [],
    )
    : arr.slice();
};
