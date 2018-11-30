import ObjectBasedStorage from './storages/objectBased';
import LocalBasedStorage from './storages/localBased';
import Notifications from './utils/notifications';
import allSounds from './sounds';
import TimerLayout from './layouts/timer';
import SettingsLayout from './layouts/settings';
import ComponentSwitcher from './components/componentSwitcher';
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
    const componentSwitcher = new ComponentSwitcher();
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

    const startLayout = 'timer';
    componentSwitcher.addComponent({ timer: timerLayout });
    componentSwitcher.addComponent({ settings: settingsLayout });
    componentSwitcher.changeTo(startLayout);

    render(componentSwitcher, this.elem);
  }
}
