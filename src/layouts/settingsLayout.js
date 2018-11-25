/* eslint-disable no-param-reassign */
import { watch } from 'melanke-watchjs';
import createLayout from './layout';
import FormWrapper from '../formWrapper/formWrapper';
import { numberInput, minutesFromMillisecondsInput, booleanFromStringInput } from '../formWrapper/inputs';
import allSounds from '../sounds';

const template = (`
<div class="menu-row layout-row flex-end">
  <div class="settings-col menu-element">
    <button class="icon button settings-button"></button>
  </div>
</div>
<div class="settings-row layout-row layout-row-max">
  <h2 class="settings-header">Settings</h2>
  <form class="settings-form">
    <label class="settings-label">
      <div class="settings-label-text">Work Time (min.):</div>
      <input name="work-time" class="settings-text-input work-time-input" type="number" min="1">
    </label>
    <label class="settings-label">
      <div class="settings-label-text">Short Break Time (min.):</div>
      <input name="short-break-time" class="settings-text-input short-break-time-input" type="number" min="1">
    </label>
    <label class="settings-label">
      <div class="settings-label-text">Long Break Time (min.):</div>
      <input name="long-break-time" class="settings-text-input long-break-time-input" type="number" min="1">
    </label>
    <label class="settings-label">
      <div class="settings-label-text">Work Pomodoros Before Long Break:</div>
      <input name="cycles-count" class="settings-text-input cycles-before-long-break-input" type="number" min="1">
    </label>
    <label class="settings-label">
      <div class="settings-label-text">Are Sounds Enabled?</div>
      <input name="are-sounds-enabled" class="settings-checkbox-input" type="checkbox">
    </label>
    <label class="settings-label">
      <div class="settings-label-text">Sound:</div>
      <select name="sound-url" class="settings-select"></select>
    </label>
    <label class="settings-label">
      <div class="settings-label-text">Sound Volume:</div>
      <input name="sound-volume" class="settings-range" type="range" min="0" max="1" step="0.05">
    </label>
    <label class="settings-label">
      <div class="settings-label-text">Are Browser Notifications Enabled?</div>
      <input name="are-browser-notifications-enabled" class="settings-checkbox-input" type="checkbox">
    </label>

    <button name="save-button" class="button save-button">Save</button>
  </form>
</div>
<div class="copyright-row layout-row">by Seryiza</div>
`);

export default (app) => {
  const layout = createLayout(template);
  layout.classList.add('settings-layout');

  // = Model =
  const state = {
    lastSaveTime: null,
  };

  // = Controller =
  layout.querySelector('.settings-button').addEventListener('click', () => {
    app.layouts.goto('timer');
  });

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
  // TODO: export storageKey into data-*
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

  const formElem = layout.querySelector('.settings-form');

  // eslint-disable-next-line no-unused-vars
  const formWrapper = new FormWrapper(formElem, settingsInputs, {
    onStart: (formData) => {
      // Save to formData values from app.storage
      inputNamesAndStorageKeys.forEach((inputData) => {
        formData[inputData.inputName] = app.storage.get(inputData.storageKey);
      });
    },
    onSubmit: (formData) => {
      // Save to app.storage values from formData
      inputNamesAndStorageKeys.forEach((inputData) => {
        app.storage.set(inputData.storageKey, formData[inputData.inputName]);
      });

      app.notifications.update();
      state.lastSaveTime = Date.now();
    },
  });

  // = View =
  watch(state, 'lastSaveTime', () => {
    window.scrollTo(0, 0);
    alert('Preferences saved!');
  });

  // TODO: Play sound after it selected (to hear)
  // Append to 'sound-url' select all sounds
  const appendAllSounds = (select, sounds, activeSoundURL) => {
    const options = sounds.map((sound) => {
      const option = document.createElement('option');
      option.className = 'settings-select-option';
      option.textContent = sound.name;
      option.value = sound.url;
      return option;
    });
    select.append(...options);

    const selectedIndex = sounds.findIndex(sound => sound.url === activeSoundURL);
    select.selectedIndex = selectedIndex;
  };

  const soundUrlSelectName = 'sound-url';
  appendAllSounds(
    layout.querySelector(`select[name="${soundUrlSelectName}"]`),
    allSounds,
    app.storage.get('soundURL'),
  );

  return layout;
};
