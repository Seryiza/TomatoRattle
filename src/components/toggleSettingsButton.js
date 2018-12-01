import { Component } from './component';

const layoutTransitions = {
  timer: 'settings',
  settings: 'timer',
};

export default class ToggleSettingsButton extends Component {
  static template() {
    return `
    <button class="button button_type_toggle-settings"></button>
    `;
  }

  model(init) {
    this.state.nextLayout = layoutTransitions[init.currentLayoutName];
  }

  controller() {
    this.elem.addEventListener('click', () => {
      this.emit('onGotoSettings', this.state.nextLayout);
    });
  }
}
