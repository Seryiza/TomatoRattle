import PomodoroApp from './app';
import pianoSound from './sounds/352655__foolboymedia__piano-notification-5a.mp3';

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
    soundURL: pianoSound,
    soundVolume: 0.5,
  },
});
