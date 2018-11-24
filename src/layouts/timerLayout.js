/* eslint-disable no-param-reassign */

import { watch } from 'melanke-watchjs';
import PomodoroTimer from '../timers/pomodoro';
import createLayout from './layout';

const template = (`
<div class="menu-row layout-row">
  <div class="stop-pomodoro-col menu-element">
    <button class="hided icon button stop-pomodoro-button"></button>
  </div>

  <div class="settings-col menu-element">
    <button class="icon button settings-button"></button>
  </div>
</div>
<div class="pomodoro-status-row layout-row layout-row-max">Start</div>
<div class="pomodoro-progress-row layout-row layout-row-max">0%</div>
<div class="copyright-row layout-row">by Seryiza</div>
`);

// Labels for pomodoro-status-row
const statusTexts = {
  start: 'Start',
  ticking: 'Pause',
  paused: 'Paused',
};

// CSS classes for .layout
const pomodoroCssClasses = {
  work: 'work-pomodoro',
  shortBreak: 'short-break-pomodoro',
  longBreak: 'long-break-pomodoro',
};

export default (app) => {
  const layout = createLayout(template);

  // = Model =
  const state = {
    stateName: 'start',
    pomodoroType: 'work',
    progress: 0,
    timer: null,
  };

  // = Controller =
  state.timer = new PomodoroTimer({
    storage: app.storage,
    events: {
      onProgress: (progress) => {
        state.progress = progress;
      },
      onEnd: (pomodoroType) => {
        state.stateName = 'start';
        state.pomodoroType = pomodoroType;
        state.progress = 0;
      },
    },
  });

  const pomodoroClick = () => {
    switch (state.stateName) {
      case 'start': {
        state.stateName = 'ticking';
        state.timer.start();
        break;
      }
      case 'ticking': {
        state.stateName = 'paused';
        state.timer.pause();
        break;
      }
      case 'paused': {
        state.stateName = 'ticking';
        state.timer.continue();
        break;
      }
      default: {
        console.error(`Unknown state name: '${state.stateName}'`);
      }
    }
  };

  const statusElem = layout.querySelector('.pomodoro-status-row');
  const progressElem = layout.querySelector('.pomodoro-progress-row');
  statusElem.addEventListener('click', pomodoroClick);
  progressElem.addEventListener('click', pomodoroClick);

  layout.querySelector('.settings-button').addEventListener('click', () => {
    app.layouts.goto('settings');
  });

  layout.querySelector('.stop-pomodoro-button').addEventListener('click', () => {
    state.timer.stop();
  });

  // = View =
  const stopPomodoroElem = layout.querySelector('.stop-pomodoro-button');

  // Change status text (click to start / pause / continue) when stateName changes
  watch(state, 'stateName', () => {
    statusElem.textContent = statusTexts[state.stateName];

    switch (state.stateName) {
      case 'paused':
      case 'ticking': {
        stopPomodoroElem.classList.remove('hided');
        break;
      }
      default: {
        stopPomodoroElem.classList.add('hided');
        break;
      }
    }
  });

  // Update progress bar
  const textProgress = layout.querySelector('.pomodoro-progress-row');
  watch(state, 'progress', () => {
    textProgress.textContent = `${Math.round(state.progress * 100)}%`;
  });

  // Change css-class when pomodoroType changes
  watch(state, 'pomodoroType', () => {
    layout.classList.remove(...Object.values(pomodoroCssClasses));
    layout.classList.add(pomodoroCssClasses[state.pomodoroType]);
  });
  // First adding class on start
  layout.classList.add(pomodoroCssClasses[state.pomodoroType]);

  return layout;
};
