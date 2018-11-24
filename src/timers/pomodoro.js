/* eslint-disable no-console */

import SimpleTimer from './simple';

export default class PomodoroTimer {
  constructor({ storage, startState = 'work', events = {} }) {
    this.storage = storage;
    this.events = events;

    // States: 'work', 'shortBreak', 'longBreak'
    this.state = startState;

    this.timer = new SimpleTimer({
      time: 0,
      events: {
        onProgress: (progress) => {
          if (this.events.onProgress) {
            this.events.onProgress(progress);
          }
        },
        onEnd: () => {
          switch (this.state) {
            case 'work': {
              this.state = 'shortBreak';
              break;
            }
            case 'shortBreak': {
              this.state = 'work';
              break;
            }
            // TODO: long break
            default: {
              console.error(`Unknown state name: ${this.state}`);
            }
          }
          if (this.events.onEnd) {
            this.events.onEnd(this.state);
          }
        },
      },
    });
  }

  start() {
    const timesByPomodoroType = {
      work: this.storage.get('pomodoroLength'),
      shortBreak: this.storage.get('shortBreakLength'),
      longBreak: this.storage.get('longBreakLength'),
    };

    if (!(this.state in timesByPomodoroType)) {
      throw new Error(`${this.state} is incorrect pomodoro type`);
    }

    this.timer.time = timesByPomodoroType[this.state];
    this.timer.start();
  }

  pause() {
    this.timer.pause();
  }

  continue() {
    this.timer.continue();
  }

  stop() {
    this.timer.stop();
  }
}
