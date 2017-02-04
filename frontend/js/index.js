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


class CalculatorCore {

  constructor(inputs = [],
    operations = ['+', '-', '*', '/'],
    round = 9,
    nextOperation = null,
    floatNumber = new InputFloat()) {
    this.inputs = inputs;
    this.operations = operations;
    this.nextOperation = nextOperation;
    this.roundNumberBy = round;
    this.floatNumber = floatNumber;
  }

  getOperations() {
    return this.operations;
  }

  getInputs() {
    return this.inputs;
  }

  setInputs(inputs = ['']) {
    this.floatNumber.resetInput();
    this.setNextOperation(null);
    this.inputs = inputs;
  }

  addInput(element) {
    this.inputs.push(element);
  }

  // TODO refactor to more readable code
  addToInputsLogic(input) {
    const lastIndex = (this.inputs.length - 1);


    // you can't add operation before digit
    if (
      this.operations.indexOf(this.inputs[lastIndex]) !== -1 &&
      this.operations.indexOf(input) !== -1
    ) {
      return;
    }

    if (this.operations.indexOf(input) !== -1) {
      // operation
      if (this.inputs[0] === '') {
        return;
      }
      this.addInput(input);
    } else if (this.operations.indexOf(this.inputs[lastIndex]) !== -1) {
      // first digit after operation
      this.floatNumber.resetInput();
      this.floatNumber.inputAction(input);
      this.addInput(this.floatNumber.getFloat());
    } else {
      // digits
      this.floatNumber.inputAction(input);
      this.inputs.splice(lastIndex, 1, this.floatNumber.getFloat());
    }
  }

  roundUpNumber(number) {
    return Number(`${Math.round(`${number}e${this.roundNumberBy}`)}e-${this.roundNumberBy}`);
  }

  getNextOperation() {
    return this.nextOperation;
  }

  setNextOperation(operation) {
    this.nextOperation = operation;
  }

  makeOperation(operand1, operand2) {
    let answer;

    switch (this.getNextOperation()) {
      case '+':
        answer = Number(operand1) + Number(operand2);
        break;
      case '-':
        answer = Number(operand1) - Number(operand2);
        break;
      case '*':
        answer = Number(operand1) * Number(operand2);
        break;
      case '/':
        answer = Number(operand1) / Number(operand2);
        break;
      default:
        answer = Number(operand2);
        break;
    }
    return this.roundUpNumber(answer);
  }

  calculate() {
    this.setNextOperation(null);
    return this.getInputs().reduce((prev, curr) => {
      if (isNaN(curr)) {
        this.setNextOperation(curr);
        return prev;
      }

      return this.makeOperation(prev, curr);
    }, 0);
  }
}

const calculator = new CalculatorCore(['']);
const Events = new Vue({});

Vue.component('calc-button', {
  props: ['btnValue', 'btnType'],
  template: `<a @click="inputOperation" 
                    v-bind:class="{
                    'button': true,
                    'is-primary':btnType === 'number',
                    'is-danger':btnType === 'operation'
                    }"
                    >{{btnValue}}</a>`,
  data: () => ({
    calculator,
  }),
  methods: {
    inputOperation() {
      switch (this.btnType) {
        case 'number':
        case 'operation':
          this.calculator.addToInputsLogic(this.btnValue);
          break;
        case 'result':
          Events.$emit('showResult');
          break;
        case 'reset':
          this.calculator.setInputs();
          Events.$emit('showResult');
          break;
        default:
          break;
      }
    },
  },
});

// number
// operation
// action

new Vue({
  el: '#app',
  data: {
    calculator,
    result: 0,
  },
  watch: {},
  mounted() {
    Events.$on('showResult', () => {
      this.result = calculator.calculate();
    });
  },
  methods: {},
  computed: {
    calcDisplay() {
      const computed = calculator.getInputs().join('');
      return (computed === '') ? 0 : computed;
    },

  },
});
