class a {
  constructor() {
    this.eventStack = {}, this.eventStack = {};
  }
  on(e, s) {
    const { eventStack: n } = this, t = n[e];
    t ? t.push(s) : n[e] = [s];
  }
  once(e, s) {
    const { eventStack: n } = this, t = n[e], c = () => {
      let o = !1;
      return () => {
        o || (s(), o = !0);
      };
    };
    t ? t.push(c()) : n[e] = [c()];
  }
  off(e, s) {
    const { eventStack: n } = this, t = n[e];
    t && (t || []).forEach((c, o) => {
      c === s && t.splice(o, 1);
    });
  }
  emit(e, s) {
    const { eventStack: n } = this, t = n[e];
    t && (t || []).forEach((c) => {
      c(s);
    });
  }
}
export {
  a as default
};
