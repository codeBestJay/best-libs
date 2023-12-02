function a(o) {
  return new Promise((t, r) => {
    const e = new FileReader();
    e.readAsText(o), e.onload = (n) => {
      try {
        t(JSON.parse(n.target.result));
      } catch {
        r();
      }
    }, e.onerror = () => {
      r();
    };
  });
}
export {
  a as default
};
