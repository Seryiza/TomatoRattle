import PomodoroApp from './app';

const millisecondsInOneMinute = 60 * 1000;

export default new PomodoroApp({
  elem: document.querySelector('#app'),
  defaultsPreferences: {
    pomodoroLength: 25 * millisecondsInOneMinute,
    shortBreakLength: 5 * millisecondsInOneMinute,
    longBreakLength: 30 * millisecondsInOneMinute,

    cyclesCount: 4,

    isSoundEnabled: true,
    isBrowserNotificationEnabled: true,
  },
});
