// import { watch } from 'melanke-watchjs';
import { Component } from './component';
import StopPomodoroComponent from './stopPomodoro';
import GotoSettingsComponent from './gotoSettingsButton';

export default class Menu extends Component {
  static template() {
    return `
    <div class="menu-flex">
      <div class="stop-pomodoro-col menu-element"></div>
      <div class="settings-col menu-element"></div>
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
    this.addSubcomponent('stopPomodoroButton', '.stop-pomodoro-col', stopPomodoroButton);

    const settingsButton = new GotoSettingsComponent({
      init: {
        currentLayoutName: this.state.currentLayoutName,
      },
      events: {
        onGotoSettings: nextLayout => this.emit('onGotoSettings', nextLayout),
      },
    });
    this.addSubcomponent('settingsButton', '.settings-col', settingsButton);
  }

  showStopPomodoro() {
    this.subcomponents.stopPomodoroButton.show();
  }

  hideStopPomodoro() {
    this.subcomponents.stopPomodoroButton.hide();
  }
}
