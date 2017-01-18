'use strict';

const calculatorData = {
  inputs: [''],
  operations: ['-', '+', '*', '/'],
  chunky: []
};

Vue.component('calc-button', {
  props: ['btnValue', 'btnType'],
  template: `<button @click="inputOperation">{{btnValue}}</button>`,
  data: () => {
    return {
      calculatorData
    }
  },
  methods: {
    inputOperation: function () {

      const calcInputs = this.calculatorData.inputs;
      const calcOperations = this.calculatorData.operations;
      let latestValue = calcInputs[calcInputs.length - 1];

      if (
        calcOperations.indexOf(latestValue) !== -1 &&
        calcOperations.indexOf(this.btnValue) !== -1
      ) {
        return;
      }

      switch (this.btnType) {
        case 'number':
          if (calcOperations.indexOf(latestValue) !== -1) {
            calcInputs.push('')
          }
          calcInputs.splice(calcInputs.length - 1, 1, calcInputs[calcInputs.length - 1] + this.btnValue);

          break;
        case 'operation':
          if(calcInputs[0] === ''){
            return;
          }
          calcInputs.push(this.btnValue);
          break;
      }
    }
  }
});

//number
//operation
//action

new Vue({
  el: '#app',
  data: {
    numbers: calculatorData.inputs
  },
  watch: {},
  computed: {
    calcDisplay: function () {
      return this.numbers.join('');
    }
  }
});
