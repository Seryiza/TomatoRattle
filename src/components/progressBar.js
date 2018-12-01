import { watch } from 'melanke-watchjs';
import { Component } from './component';

const getFlexFromProgress = progress => Math.round(progress * 100);

export default class ProgressBar extends Component {
  static defaults() {
    return {
      progress: 0,
    };
  }

  static template() {
    return `
    <div class="progress-bar">
      <div class="progress-bar__bound"></div>
      <div class="progress-bar__inner">
        <div class="progress-bar__completed-line"></div>
        <div class="progress-bar__arrow"></div>
        <div class="progress-bar__remaining-line"></div>
      </div>
      <div class="progress-bar__bound"></div>
    </div>
    `;
  }

  setProgress(progress) {
    this.state.progress = progress;
  }

  view() {
    const completedLineElem = this.elem.querySelector('.progress-bar__completed-line');
    const remainingLineElem = this.elem.querySelector('.progress-bar__remaining-line');
    watch(this.state, 'progress', () => {
      completedLineElem.style.flexGrow = getFlexFromProgress(this.state.progress);
      remainingLineElem.style.flexGrow = 100 - getFlexFromProgress(this.state.progress);
    });
  }
}
