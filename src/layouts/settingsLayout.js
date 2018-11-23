/* eslint-disable no-param-reassign */
import { watch } from 'melanke-watchjs';
import createLayout from './layout';
import FormWrapper from '../formWrapper';

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
      <input name="work-time" class="settings-input work-time-input" type="number" min="1">
    </label>
    <label class="settings-label">
      <div class="settings-label-text">Short Break Time (min.):</div>
      <input name="short-break-time" class="settings-input short-break-time-input" type="number" min="1">
    </label>
    <label class="settings-label">
      <div class="settings-label-text">Long Break Time (min.):</div>
      <input name="long-break-time" class="settings-input long-break-time-input" type="number" min="1">
    </label>
    <label class="settings-label">
      <div class="settings-label-text">Short Breaks Count Before Long Ones:</div>
      <input name="cycles-count" class="settings-input cycles-before-long-break-input" type="number" min="1">
    </label>
    <label class="settings-label">
      <div class="settings-label-text">End of Pomodoro Sound:</div>
      todo
    </label>
    <label class="settings-label">
      <div class="settings-label-text">End of Pomodoro Notification:</div>
      todo
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
    // TODO: maybe is there better idea for this?
    // TODO: export consts like 'pomodoroSize' in other (shared) file
    pomodoroSize: null,
    shortBreakSize: null,
    longBreakSize: null,
    cyclesCount: null,
    lastSaveTime: null,
  };

  // = Controller =
  layout.querySelector('.settings-button').addEventListener('click', () => {
    app.layouts.goto('timer');
  });

  // Form processing (using FormWrapper module)
  const millisecondsInMinute = 60 * 1000;
  const minutesFromMillisecondsInput = {
    cast: x => Number(x),
    input: x => x * millisecondsInMinute,
    output: x => x / millisecondsInMinute,
  };
  const settingsInputs = {
    'work-time': minutesFromMillisecondsInput,
    'short-break-time': minutesFromMillisecondsInput,
    'long-break-time': minutesFromMillisecondsInput,
    'cycles-count': { cast: x => Number(x) },
  };

  // List to read from/write to app.storage and inputs
  const inputNamesAndStorageKeys = [
    { inputName: 'work-time', storageKey: 'pomodoroSize' },
    { inputName: 'short-break-time', storageKey: 'shortBreakSize' },
    { inputName: 'long-break-time', storageKey: 'longBreakSize' },
    { inputName: 'cycles-count', storageKey: 'cyclesCount' },
  ];

  const formElem = layout.querySelector('.settings-form');
  // eslint-disable-next-line no-unused-vars
  const formWrapper = new FormWrapper(formElem, settingsInputs, {
    onStart: (formData) => {
      inputNamesAndStorageKeys.forEach((inputData) => {
        formData[inputData.inputName] = app.storage.get(inputData.storageKey);
      });
    },
    onSubmit: (formData) => {
      inputNamesAndStorageKeys.forEach((inputData) => {
        app.storage.set(inputData.storageKey, formData[inputData.inputName]);
      });

      state.lastSaveTime = Date.now();
    },
  });

  // = View =
  watch(state, 'lastSaveTime', () => {
    // TODO: scroll up and show message on layout
    alert('Preferences saved!');
  });

  return layout;
};
