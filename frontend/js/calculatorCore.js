'use strict';

class CalculatorCore {

  constructor(inputs = [], operations = ['+', '-', '*', '/'], round = 9, nextOperation = null) {
    this.inputs = inputs;
    this.operations = operations;
    this.nextOperation = nextOperation;
    this.roundNumberBy = round;
  }

  getOperations() {
    return this.operations;
  }

  getInputs() {
    return this.inputs;
  }

  setInputs(inputs = ['']) {
    this.setNextOperation(null);
    this.inputs = inputs;
  }

  addInput(element) {
    this.inputs.push(element);
  }

  // TODO refactor to more readable code
  addToInputsLogic(input) {
    const lastIndex = (this.inputs.length - 1);

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
      this.addInput(input);
    } else {
      // digits
      this.inputs.splice(lastIndex, 1, this.inputs[lastIndex] + input);
    }
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
    return Number(Math.round(`${answer}e${this.roundNumberBy}`) + `e-${this.roundNumberBy}`);
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

// export default CalculatorCore;
