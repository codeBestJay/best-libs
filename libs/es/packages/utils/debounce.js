function c(t, n) {
  let e;
  return function() {
    const o = this, u = arguments;
    clearTimeout(e), e = setTimeout(() => t.apply(o, u), n);
  };
}
export {
  c as default
};
