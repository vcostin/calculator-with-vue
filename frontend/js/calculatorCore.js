'use strict';

class CalculatorCore {

  constructor(inputs = [], operations = ['+', '-', '*', '/'], round = 9, nextOperation = null) {
    this.inputs = inputs;
    this.operations = operations;
    this.nextOperation = nextOperation;
    this.roundNumberBy = round;
  }

  getOperations(){
    return this.operations;
  }

  getInputs(){
    return this.inputs;
  }

  setInputs(inputs = []) {
    this.setNextOperation(null);
    this.inputs = inputs;
  }

  addInputs(element) {
    this.inputs.push(element);
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
