const identity = x => x;

export default class FormWrapper {
  static getStartValues(inputs = {}) {
    return Object.keys(inputs)
      .filter(name => inputs[name].start)
      .reduce((acc, name) => ({ ...acc, [name]: inputs[name].start }), {});
  }

  constructor(formElement, inputs = {}, events = {}) {
    this.form = formElement;
    this.inputs = inputs;
    this.events = events;

    // Fill this.values by start values from inputs[key].start
    // and this.events.onStart (if exists)
    this.values = FormWrapper.getStartValues(inputs);

    if (this.events.onStart) {
      const newValues = {};
      this.events.onStart(newValues);
      this.values = Object.assign(this.values, newValues);
    }
    this.fillStartValues(this.values);

    this.form.addEventListener('submit', (event) => {
      // Cancel sending a request
      event.preventDefault();

      Array.from(this.form.elements).forEach((elem) => {
        // TODO: Read about radio / select. Maybe, there's an error.
        // TODO: Maybe rewrite this code? (without side effects)
        this.setValue(elem.name, elem.value);
      });

      if (this.events.onSubmit) {
        const copy = Object.assign({}, this.values);
        this.events.onSubmit(copy);
      }
    });
  }

  // TODO: Think about DRY
  getCastFn(name) {
    if (name in this.inputs && this.inputs[name].cast) {
      return this.inputs[name].cast;
    }
    return identity;
  }

  getInputFn(name) {
    if (name in this.inputs && this.inputs[name].input) {
      return this.inputs[name].input;
    }
    return identity;
  }

  getOutputFn(name) {
    if (name in this.inputs && this.inputs[name].output) {
      return this.inputs[name].output;
    }
    return identity;
  }

  setValue(name, value) {
    const cast = this.getCastFn(name);
    const fn = this.getInputFn(name);
    this.values[name] = fn(cast(value));
  }

  getValue(name) {
    const cast = this.getCastFn(name);
    const fn = this.getOutputFn(name);
    return fn(cast(this.values[name]));
  }

  setStartValue(name, value) {
    const cast = this.getCastFn(name);
    this.values[name] = cast(value);
  }

  fillStartValues(startValues) {
    Object.keys(startValues).forEach((key) => {
      this.setStartValue(key, startValues[key]);
      this.form.elements[key].value = this.getValue(key);
    });
  }
}
