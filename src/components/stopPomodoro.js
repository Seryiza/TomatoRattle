import { watch } from 'melanke-watchjs';
import { Component } from './component';

export default class StopPomodoroButton extends Component {
  static defaults() {
    return {
      isVisible: false,
    };
  }

  static template() {
    return `
    <button class="icon button stop-pomodoro-button stop-pomodoro-button-hided"></button>
    `;
  }

  model(init) {
    this.state.isVisible = init.isVisible;
  }

  show() {
    this.state.isVisible = true;
  }

  hide() {
    this.state.isVisible = false;
  }

  controller() {
    this.elem.addEventListener('click', () => {
      this.emit('onStop', this.state.isVisible);
    });
  }

  view() {
    const stopButton = this.elem;
    const hidedClass = 'stop-pomodoro-button-hided';

    watch(this.state, 'isVisible', () => {
      const classes = stopButton.classList;

      if (this.state.isVisible) {
        classes.remove(hidedClass);
      } else {
        classes.add(hidedClass);
      }
    });
  }
}
