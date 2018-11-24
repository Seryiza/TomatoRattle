/* eslint-disable no-console */

import SimpleTimer from './simple';

export default class PomodoroTimer {
  constructor({ storage, startState = 'work', events = {} }) {
    this.storage = storage;
    this.events = events;
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
    // TODO: Replace it to key-value object
    switch (this.state) {
      case 'work': {
        this.timer.time = this.storage.get('pomodoroLength');
        break;
      }
      case 'shortBreak': {
        this.timer.time = this.storage.get('shortBreakLength');
        break;
      }
      case 'longBreak': {
        this.timer.time = this.storage.get('longBreakLength');
        break;
      }
      default: {
        console.error('Unknown PomodoroTimer state');
        return;
      }
    }

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
