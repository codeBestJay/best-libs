async function n(d, o) {
  const e = document.createElement("a");
  e.href = d, e.download = o, document.body.appendChild(e), e.click(), document.body.removeChild(e);
}
export {
  n as default
};
