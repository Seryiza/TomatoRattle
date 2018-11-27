import ObjectBasedStorage from './storages/objectBased';
import LocalBasedStorage from './storages/localBased';
import Notifications from './notifications';
import allSounds from './sounds';
import TimerLayout from './layouts/timer';
import SettingsLayout from './layouts/settings';
import ComponentSwitcher from './componentSwitcher';
import { render } from './components/component';

export default class PomodoroApp {
  constructor({ elem, defaultsPreferences = {} }) {
    this.elem = elem;

    // Create app storage
    const defaults = new ObjectBasedStorage(defaultsPreferences);
    const locals = new LocalBasedStorage(defaults);
    this.storage = locals;

    // Create notifications
    this.notifications = new Notifications(this.storage);
    this.notifications.requestPermission();

    // Create layouts
    const componentSwitcher = new ComponentSwitcher({
      init: {
        start: 'timer',
      },
    });
    const layoutsConfig = {
      init: {
        storage: this.storage,
        notifications: this.notifications,
        layouts: componentSwitcher,
        sounds: allSounds,
      },
    };

    const timerLayout = new TimerLayout(layoutsConfig);
    const settingsLayout = new SettingsLayout(layoutsConfig);

    // TODO: Think about deleting this hack
    componentSwitcher.setComponents({
      timer: timerLayout,
      settings: settingsLayout,
    });

    render(componentSwitcher, this.elem);
  }
}
