import { Component } from '../components/component';
import MenuComponent from '../components/menu';
import SettingsFormComponent from '../components/settingsForm';
import FooterComponent from '../components/footer';

export default class SettingsLayout extends Component {
  static template() {
    return `
    <div class="layout settings-layout">
      <div class="menu-row layout-row"></div>
      <div class="settings-row layout-row layout-row-max"></div>
      <div class="copyright-row layout-row"></div>
    </div>
    `;
  }

  model(init) {
    this.state.layouts = init.layouts;
    this.state.storage = init.storage;
    this.state.notifications = init.notifications;
    this.state.sounds = init.sounds;
  }

  controller() {
    // Settings form subcomponent
    const form = new SettingsFormComponent({
      init: {
        storage: this.state.storage,
        sounds: this.state.sounds,
      },
      events: {
        onSaved: () => {
          // TODO: Can I refactor it?
          this.state.notifications.update();

          window.scrollTo(0, 0);
          alert('Preferences saved');
        },
      },
    });
    this.addSubcomponent('form', '.settings-row', form);

    // Menu subcomponent
    const menu = new MenuComponent({
      init: {
        currentLayoutName: 'settings',
      },
      events: {
        onGotoSettings: nextLayout => this.state.layouts.changeTo(nextLayout),
        onStop: () => this.subcomponents.controls.stop(),
      },
    });
    this.addSubcomponent('menu', '.menu-row', menu);

    // Footer subcomponent
    const footer = new FooterComponent();
    this.addSubcomponent('footer', '.copyright-row', footer);
  }

  // Event triggered from ComponentSwitcher
  onComponentShow() {
    this.subcomponents.form.updateValues();
  }
}
