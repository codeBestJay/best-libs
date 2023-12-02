function a(r = {}) {
  return JSON.stringify(r) === "{}" ? "" : new URLSearchParams(r).toString();
}
export {
  a as default
};
