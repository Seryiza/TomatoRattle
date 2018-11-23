import ObjectBasedStorage from './storages/objectBased';
import LocalBasedStorage from './storages/localBased';
import LayoutManager from './layoutManager';
import TimerLayout from './layouts/timerLayout';
import SettingsLayout from './layouts/settingsLayout';

export default class PomodoroApp {
  constructor({ elem, defaultsPreferences = {} }) {
    this.elem = elem;

    // Create app storage
    const defaults = new ObjectBasedStorage(defaultsPreferences);
    const locals = new LocalBasedStorage(defaults);
    this.storage = locals;

    // Create layout manager
    this.layouts = new LayoutManager({
      start: 'settings',
      layouts: {
        timer: TimerLayout(this),
        settings: SettingsLayout(this),
      },
      events: {
        onChange: (layoutManager, nextLayout) => {
          // Clean current layout and render (append to this.elem) new layout
          const component = layoutManager.layout(nextLayout);
          this.elem.innerHTML = '';
          this.elem.append(component);
        },
      },
    });
  }
}
