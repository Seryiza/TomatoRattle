import { watch } from 'melanke-watchjs';
import { Component, render } from './component';

export default class ComponentSwitcher extends Component {
  static template() {
    return '<div class="layout-switcher"></div>';
  }

  static defaults() {
    return {
      start: '',
      components: {},
    };
  }

  model(init) {
    this.state.start = init.start;
    this.state.current = init.start;
    this.state.components = init.components;
  }

  view() {
    const layoutsElem = this.elem;
    watch(this.state, 'current', () => {
      const nextComponent = this.state.components[this.state.current];
      layoutsElem.innerHTML = '';
      render(nextComponent, layoutsElem);
    });
  }

  addComponent(component) {
    this.state.components = {
      ...this.state.components,
      ...component,
    };
  }

  get currentName() {
    return this.state.current;
  }

  getComponent(name) {
    if (name) {
      return this.state.components[name];
    }
    return this.state.components[this.state.current];
  }

  changeTo(componentName) {
    if (!(componentName in this.state.components)) {
      throw new Error(`${componentName} not found in components list`);
    }

    this.emit('onBeforeChange', componentName, this.state.current);
    this.state.current = componentName;

    const currentComponent = this.getComponent();
    if (currentComponent.onComponentShow) {
      currentComponent.onComponentShow();
    }
  }
}
