const identity = x => x;

export default class FormWrapper {
  static getStartValues(inputs = {}) {
    return Object.keys(inputs)
      .filter(name => inputs[name].start)
      .reduce((acc, name) => ({ ...acc, [name]: inputs[name].start }), {});
  }

  static getValuableField(elem) {
    switch (elem.type) {
      case 'number': {
        return 'value';
      }
      case 'checkbox': {
        return 'checked';
      }
      default: {
        return 'value';
      }
    }
  }

  constructor(formElement, inputs = {}, events = {}) {
    this.form = formElement;
    this.inputs = inputs;
    this.events = events;
    this.updateValues();

    this.form.addEventListener('submit', (event) => {
      // Cancel sending a request
      event.preventDefault();

      Array.from(this.form.elements).forEach((elem) => {
        // TODO: Maybe rewrite this code? (without side effects)
        const field = FormWrapper.getValuableField(elem);
        this.setValue(elem.name, elem[field]);
      });

      if (this.events.onSubmit) {
        const copy = Object.assign({}, this.values);
        this.events.onSubmit(copy);
      }
    });
  }

  updateValues() {
    // Fill this.values by start values from this.inputs[key].start
    // and this.events.onStart (if exists)
    this.values = FormWrapper.getStartValues(this.inputs);
    if (this.events.onStart) {
      const newValues = {};
      this.events.onStart(newValues);
      this.values = Object.assign(this.values, newValues);
    }
    this.fillValuesAsIs(this.values);
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

  setValueAsIs(name, value) {
    const cast = this.getCastFn(name);
    this.values[name] = cast(value);
  }

  fillValuesAsIs(values) {
    Object.entries(values).forEach(([valueName, value]) => {
      this.setValueAsIs(valueName, value);

      const elem = this.form.elements[valueName];
      const field = FormWrapper.getValuableField(elem);
      elem[field] = this.getValue(valueName);
    });
  }
}
