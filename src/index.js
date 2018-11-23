import PomodoroApp from './app';

export default new PomodoroApp({
  elem: document.querySelector('#app'),
  defaultsPreferences: {
    // TODO: Think about naming
    pomodoroSize: 25 * 60 * 1000,
    shortBreakSize: 5 * 60 * 1000,
    longBreakSize: 30 * 60 * 1000,
    cyclesCount: 4,
  },
});
