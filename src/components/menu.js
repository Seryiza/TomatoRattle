// import { watch } from 'melanke-watchjs';
import { Component } from './component';
import StopPomodoroComponent from './stopPomodoroButton';
import ToggleSettingsButton from './toggleSettingsButton';

export default class Menu extends Component {
  static template() {
    return `
    <div class="menu">
      <div class="menu__stop-pomodoro"></div>
      <div class="menu__toggle-settings"></div>
    </div>
    `;
  }

  model(init) {
    this.state.currentLayoutName = init.currentLayoutName;
  }

  controller() {
    const stopPomodoroButton = new StopPomodoroComponent({
      events: {
        onStop: () => this.emit('onStop'),
      },
    });
    this.addSubcomponent('stopPomodoroButton', '.menu__stop-pomodoro', stopPomodoroButton);

    const settingsButton = new ToggleSettingsButton({
      init: {
        currentLayoutName: this.state.currentLayoutName,
      },
      events: {
        onGotoSettings: nextLayout => this.emit('onGotoSettings', nextLayout),
      },
    });
    this.addSubcomponent('settingsButton', '.menu__toggle-settings', settingsButton);
  }

  showStopPomodoro() {
    this.subcomponents.stopPomodoroButton.show();
  }

  hideStopPomodoro() {
    this.subcomponents.stopPomodoroButton.hide();
  }
}
