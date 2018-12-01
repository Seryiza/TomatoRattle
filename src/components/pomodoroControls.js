import { watch } from 'melanke-watchjs';
import { Component } from './component';
import PomodoroTimer from '../timers/pomodoro';
import ProgressBar from './progressBar';

// Labels for pomodoro-controls__status
const statusTexts = {
  beforeTheStart: 'Start',
  ticking: 'Pause',
  paused: 'Continue',
};

// Pomodoro timer statuses
const beforeTheStart = 'beforeTheStart';
const ticking = 'ticking';
const paused = 'paused';

export default class PomodoroControls extends Component {
  static template() {
    return `
    <div class="pomodoro-controls">
      <div class="pomodoro-controls__hint">click to</div>
      <div class="pomodoro-controls__status">Start</div>
      <div class="pomodoro-controls__progress"></div>
    </div>
    `;
  }

  model(init) {
    this.state.storage = init.storage;
    this.state.statusName = beforeTheStart;
    this.state.pomodoroType = init.startPomodoroType;
    this.state.progress = 1;

    this.state.pomodoro = new PomodoroTimer({
      storage: this.state.storage,
      startState: this.state.pomodoroType,

      events: {
        onStart: () => {
          this.state.progress = 0;
        },
        onProgress: (progress) => {
          this.state.progress = progress;
        },
        onEnd: (nextPomodoroType) => {
          this.state.progress = 1;
          this.state.statusName = beforeTheStart;
          this.state.pomodoroType = nextPomodoroType;
          this.emit('onEnd', nextPomodoroType);
        },
      },
    });
  }

  controller() {
    const pomodoroClicker = this.elem;
    pomodoroClicker.addEventListener('click', () => {
      switch (this.state.statusName) {
        case beforeTheStart: {
          this.state.statusName = ticking;
          this.state.pomodoro.start();
          this.emit('onStart');
          break;
        }
        case ticking: {
          this.state.statusName = paused;
          this.state.pomodoro.pause();
          this.emit('onPause');
          break;
        }
        case paused: {
          this.state.statusName = ticking;
          this.state.pomodoro.continue();
          this.emit('onContinue');
          break;
        }
        default: {
          throw new Error(`Unknown status '${this.statusName}'`);
        }
      }
    });

    const progressBar = new ProgressBar();
    this.addSubcomponent('progressBar', '.pomodoro-controls__progress', progressBar);
  }

  stop() {
    this.state.pomodoro.stop();
  }

  view() {
    const statusElem = this.elem.querySelector('.pomodoro-controls__status');
    watch(this.state, 'statusName', () => {
      statusElem.textContent = statusTexts[this.state.statusName];
    });

    watch(this.state, 'progress', () => {
      this.subcomponents.progressBar.setProgress(this.state.progress);
    });
  }
}
