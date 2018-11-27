export const create = (templateStr) => {
  const templateElem = document.createElement('template');
  templateElem.innerHTML = templateStr;
  return templateElem.content.firstElementChild;
};

export const render = (component, parent) => {
  parent.append(component.render());
};

export class Component {
  static defaults() {
    return {};
  }

  static template() {
    return '<template></template>';
  }

  constructor({ init = {}, events = {} } = {}) {
    const template = this.constructor.template().trim();
    this.elem = create(template);
    this.events = events;
    this.state = {};
    this.subcomponents = {};

    const defaults = this.constructor.defaults();
    const initWithDefaults = Object.assign(defaults, init);

    // View is the first to trigger watchjs from them
    this.view(initWithDefaults, events);
    this.model(initWithDefaults, events);
    this.controller(initWithDefaults, events);
  }

  emit(eventName, ...args) {
    if (eventName in this.events) {
      this.events[eventName](...args);
    }
  }

  render() {
    return this.elem;
  }

  addSubcomponent(subcomponentName, selector, subcomponent) {
    const elem = this.elem.querySelector(selector);
    if (!elem) {
      throw new Error(`Element not found: selector '${selector}', subcomponent name '${subcomponentName}'`);
    }

    this.subcomponents[subcomponentName] = subcomponent;
    render(subcomponent, elem);
  }

  // eslint-disable-next-line class-methods-use-this
  controller() { }

  // eslint-disable-next-line class-methods-use-this
  view() { }

  // eslint-disable-next-line class-methods-use-this
  model() { }
}
