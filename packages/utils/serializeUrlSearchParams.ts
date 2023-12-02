/**
 * @description 将object序列化为URL params
 * @param source {object}
 * @return {string}
 */
export default function serializeUrlSearchParams(source = {}) {
    return JSON.stringify(source) === '{}' ? '' : new URLSearchParams(source).toString()
  }