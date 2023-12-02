function u(s, e, i = "label", n = "value") {
  let r = "";
  if (Array.isArray(s) && e) {
    const l = e.toString();
    let t;
    Array.isArray(e) ? t = e : typeof e == "string" ? t = l.split(",") : typeof e == "number" && (t = [e]), t == null || t.forEach((o) => {
      const f = s.find((y) => y[n] === o);
      f && (r += `${f[i]},`);
    });
  }
  return (r.includes(",") ? r.slice(0, -1) : r) || "";
}
export {
  u as default
};
