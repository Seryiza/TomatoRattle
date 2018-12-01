import SimpleTimer from './simple';

export default class PomodoroTimer {
  constructor({ storage, startState = 'work', events = {} }) {
    this.storage = storage;
    this.events = events;

    // States: 'work', 'shortBreak', 'longBreak'
    this.state = startState;
    this.completedWorkPomodoros = 0;

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
              this.completedWorkPomodoros -= 1;
              this.state = (this.completedWorkPomodoros <= 0) ? 'longBreak' : 'shortBreak';
              break;
            }
            case 'shortBreak':
            case 'longBreak': {
              this.state = 'work';
              break;
            }
            default: {
              throw new Error(`Unknown state name: ${this.state}`);
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

    if (this.completedWorkPomodoros <= 0) {
      this.completedWorkPomodoros = this.storage.get('cyclesCount');
    }
    this.timer.time = timesByPomodoroType[this.state];
    this.timer.start();

    if (this.events.onStart) {
      this.events.onStart();
    }
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
