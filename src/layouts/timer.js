import { watch } from 'melanke-watchjs';
import { Component } from '../components/component';
import MenuComponent from '../components/menu';
import FooterComponent from '../components/footer';
import PomodoroControlsComponent from '../components/pomodoroControls';

// CSS-classes of Pomodoro Types for '.layout'
const pomodoroTypeClasses = {
  work: 'timer-layout_pomodoro-type_work',
  shortBreak: 'timer-layout_pomodoro-type_short-break',
  longBreak: 'timer-layout_pomodoro-type_long-break',
};

// Texts for browser notifications
const notificationsTexts = {
  work: {
    title: 'Pomodoro Ended!', body: 'Take a break',
  },
  shortBreak: {
    title: 'Short Break Ended!', body: 'Go to work',
  },
  longBreak: {
    title: 'Long Break Ended!', body: 'Go to work',
  },
};

export default class TimerLayout extends Component {
  static template() {
    return `
    <div class="timer-layout">
      <div class="timer-layout__menu"></div>
      <div class="timer-layout__controls"></div>
      <div class="timer-layout__footer"></div>
    </div>
    `;
  }

  static defaults() {
    return {
      pomodoroType: 'work',
    };
  }

  model(init) {
    this.state.layouts = init.layouts;
    this.state.storage = init.storage;
    this.state.notifications = init.notifications;
    this.state.pomodoroType = init.pomodoroType;
  }

  controller() {
    // Timer-Controls subcomponent
    const timerControls = new PomodoroControlsComponent({
      init: {
        storage: this.state.storage,
        startPomodoroType: this.state.pomodoroType,
      },
      events: {
        onStart: () => this.subcomponents.menu.showStopPomodoro(),
        onEnd: (nextPomodoroType) => {
          const endedPomodoroType = this.state.pomodoroType;

          this.state.pomodoroType = nextPomodoroType;
          this.subcomponents.menu.hideStopPomodoro();

          const { title, body } = notificationsTexts[endedPomodoroType];
          this.state.notifications.notify({ title, body });
        },
      },
    });
    this.addSubcomponent('controls', '.timer-layout__controls', timerControls);

    // Menu subcomponent
    const menu = new MenuComponent({
      init: {
        currentLayoutName: 'timer',
      },
      events: {
        onGotoSettings: nextLayout => this.state.layouts.changeTo(nextLayout),
        onStop: () => this.subcomponents.controls.stop(),
      },
    });
    this.addSubcomponent('menu', '.timer-layout__menu', menu);

    // Footer subcomponent
    const footer = new FooterComponent();
    this.addSubcomponent('footer', '.timer-layout__footer', footer);
  }

  view() {
    const layout = this.elem;
    watch(this.state, 'pomodoroType', () => {
      layout.classList.remove(...Object.values(pomodoroTypeClasses));
      layout.classList.add(pomodoroTypeClasses[this.state.pomodoroType]);
    });
  }
}
