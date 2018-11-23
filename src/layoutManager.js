export default class LayoutManager {
  constructor({ start, layouts, events }) {
    this.layouts = layouts;
    this.events = events;
    this.goto(start);
  }

  layout(name) {
    if (name) {
      return this.layouts[name];
    }
    return this.layouts[this.current];
  }

  goto(layoutName) {
    if (!(layoutName in this.layouts)) {
      // TODO: Maybe throw an exception?
      return;
    }

    if (this.events.onChange) {
      this.events.onChange(this, layoutName, this.current);
    }
    this.current = layoutName;
  }
}
