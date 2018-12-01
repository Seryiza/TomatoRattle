/* eslint-disable no-param-reassign */
import { watch } from 'melanke-watchjs';
import FormWrapper from '../formWrapper/formWrapper';
import { numberInput, minutesFromMillisecondsInput, booleanFromStringInput } from '../formWrapper/inputs';
import { Component } from './component';

// Form processing (using FormWrapper module)
const settingsInputs = {
  'work-time': minutesFromMillisecondsInput,
  'short-break-time': minutesFromMillisecondsInput,
  'long-break-time': minutesFromMillisecondsInput,
  'cycles-count': numberInput,

  'are-sounds-enabled': booleanFromStringInput,
  'sound-volume': numberInput,
  'are-browser-notifications-enabled': booleanFromStringInput,
};

// List to read from/write to app.storage and inputs
const inputNamesAndStorageKeys = [
  { inputName: 'work-time', storageKey: 'pomodoroLength' },
  { inputName: 'short-break-time', storageKey: 'shortBreakLength' },
  { inputName: 'long-break-time', storageKey: 'longBreakLength' },
  { inputName: 'cycles-count', storageKey: 'cyclesCount' },
  { inputName: 'are-sounds-enabled', storageKey: 'isSoundEnabled' },
  { inputName: 'sound-url', storageKey: 'soundURL' },
  { inputName: 'sound-volume', storageKey: 'soundVolume' },
  { inputName: 'are-browser-notifications-enabled', storageKey: 'isBrowserNotificationEnabled' },
];

export default class SettingsForm extends Component {
  static defaults() {
    return {
      sounds: [],
    };
  }

  model(init) {
    this.state.storage = init.storage;
    this.state.sounds = init.sounds;
    this.state.activeSoundURL = this.state.storage.get('soundURL');
  }

  view() {
    // Updating sounds list (select element)
    const soundsListElem = this.elem.querySelector('select[name="sound-url"]');
    watch(this.state, 'sounds', () => {
      const options = this.state.sounds.map((sound) => {
        const option = document.createElement('option');
        option.className = 'settings-select-option';
        option.textContent = sound.name;
        option.value = sound.url;
        return option;
      });

      soundsListElem.innerHTML = '';
      soundsListElem.append(...options);
    });

    // Setting active element in the sounds list
    watch(this.state, 'activeSoundURL', () => {
      const predicate = sound => sound.url === this.state.activeSoundURL;
      const selectedIndex = this.state.sounds.findIndex(predicate);
      soundsListElem.selectedIndex = selectedIndex;
    });
  }

  controller() {
    const formElem = this.elem.querySelector('.settings-form__elements');

    this.formWrapper = new FormWrapper(formElem, settingsInputs, {
      onStart: (formData) => {
        // Save to formData values from the storage
        inputNamesAndStorageKeys.forEach((inputData) => {
          formData[inputData.inputName] = this.state.storage.get(inputData.storageKey);
        });
      },
      onSubmit: (formData) => {
        // Save to the storage values from formData
        inputNamesAndStorageKeys.forEach((inputData) => {
          this.state.storage.set(inputData.storageKey, formData[inputData.inputName]);
        });

        this.emit('onSaved');
      },
    });
  }

  updateValues() {
    this.formWrapper.updateValues();
  }

  static template() {
    return `
    <div class="pomodoro-form">
      <h2 class="pomodoro-form__header">Settings</h2>
      <form class="settings-form__elements">
        <label class="pomodoro-form__label">
          <div class="pomodoro-form__label-text">Work Time (min.):</div>
          <input name="work-time" class="pomodoro-form__text-input" type="number" min="1">
        </label>
        <label class="pomodoro-form__label">
          <div class="pomodoro-form__label-text">Short Break Time (min.):</div>
          <input name="short-break-time" class="pomodoro-form__text-input" type="number" min="1">
        </label>
        <label class="pomodoro-form__label">
          <div class="pomodoro-form__label-text">Long Break Time (min.):</div>
          <input name="long-break-time" class="pomodoro-form__text-input" type="number" min="1">
        </label>
        <label class="pomodoro-form__label">
          <div class="pomodoro-form__label-text">Work Pomodoros Before Long Break:</div>
          <input name="cycles-count" class="pomodoro-form__text-input" type="number" min="1">
        </label>
        <label class="pomodoro-form__label">
          <div class="pomodoro-form__label-text">Are Sounds Enabled?</div>
          <input name="are-sounds-enabled" class="pomodoro-form__checkbox-input" type="checkbox">
        </label>
        <label class="pomodoro-form__label">
          <div class="pomodoro-form__label-text">Sounds:</div>
          <select name="sound-url" class="pomodoro-form__select-input"></select>
        </label>
        <label class="pomodoro-form__label">
          <div class="pomodoro-form__label-text">Sound Volume:</div>
          <input name="sound-volume" class="pomodoro-form__range-input" type="range" min="0" max="1" step="0.05">
        </label>
        <label class="pomodoro-form__label">
          <div class="pomodoro-form__label-text">Are Browser Notifications Enabled?</div>
          <input name="are-browser-notifications-enabled" class="pomodoro-form__checkbox" type="checkbox">
        </label>

        <button name="save-button" class="pomodoro-form__save-button">Save</button>
      </form>
    </div>
    `;
  }
}
