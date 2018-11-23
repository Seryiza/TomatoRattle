// TODO: Read about JSDoc and add comments to it.
export default class SimpleTimer {
  constructor({
    time, events = {}, stepDivider = 100,
  }) {
    this.time = time;
    this.remainigTime = time;
    this.stepDivider = stepDivider;
    this.events = events;
  }

  continue() {
    if (this.interval) {
      return;
    }

    // TODO: Think about step. Ex., 15 min => step +/- ~15 sec. (it's too much)
    const step = this.time / this.stepDivider;
    this.last = Date.now();

    this.interval = setInterval(() => {
      this.remainigTime -= (Date.now() - this.last);

      if (this.remainigTime <= 0) {
        this.stop();
        return;
      }
      if (this.events.onProgress) {
        this.events.onProgress(1 - this.remainigTime / this.time);
      }
      this.last = Date.now();
    }, step);
  }

  start() {
    this.remainigTime = this.time;
    this.continue();
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;

    if (this.events.onEnd) {
      this.events.onEnd();
    }
  }

  isActive() {
    return Boolean(this.interval);
  }
}
