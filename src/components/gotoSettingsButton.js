import { Component } from './component';

const layoutTransitions = {
  timer: 'settings',
  settings: 'timer',
};

export default class GotoSettingsButton extends Component {
  static template() {
    return `
    <button class="icon button settings-button"></button>
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
