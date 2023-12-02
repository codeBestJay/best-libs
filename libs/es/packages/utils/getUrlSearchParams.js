function c(r) {
  const a = {};
  return new URLSearchParams(r).forEach((e, t) => {
    a[t] = e;
  }), a;
}
export {
  c as default
};
