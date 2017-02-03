class InputFloat {

  constructor(floatString = '0') {
    this.floatStringCompose = floatString;
  }

  inputAction(input) {
    if (this.floatStringCompose === '0' && input === '0') {
      return;
    }
    if (this.floatStringCompose === '0' && input !== '0' && input !== '.') {
      this.floatStringCompose = input;
      return;
    }
    if (this.isFloatWithThePoint() && input === '.') {
      return;
    }

    this.floatStringCompose += input;
  }

  // isItFloat() {
  //   return /^-?\d*(\.\d+)?$/.test(this.floatStringCompose);
  // }

  isFloatWithThePoint() {
    return this.floatStringCompose.indexOf('.') !== -1;
  }

  getFloat() {
    const pattern = /\.\s*$/;

    if (this.floatStringCompose === '.') {
      this.floatStringCompose = '0.';
    }

    if (pattern.test(this.floatStringCompose)) {
      return this.floatStringCompose.replace(pattern, '');
    }

    return this.floatStringCompose;
  }

  resetInput() {
    this.floatStringCompose = '0';
  }
}

export default InputFloat;
