'use strict';

const calculator = new CalculatorCore(['']);

Vue.component('calc-button', {
  props: ['btnValue', 'btnType'],
  template: `<a @click="inputOperation" 
                    v-bind:class="{
                    'button': true,
                    'is-primary':btnType === 'number',
                    'is-danger':btnType === 'operation'
                    }"
                    >{{btnValue}}</a>`,
  data: () => {
    return {
      calculator
    }
  },
  methods: {
    inputOperation: function () {

      const calcInputs = this.calculator.getInputs();
      const calcOperations = this.calculator.getOperations();
      const latestValue = calcInputs[calcInputs.length - 1];

      if (
        calcOperations.indexOf(latestValue) !== -1 &&
        calcOperations.indexOf(this.btnValue) !== -1
      ) {
        return;
      }

      switch (this.btnType) {
        case 'number':
          if (calcOperations.indexOf(latestValue) !== -1) {
            this.calculator.addInputs('');
          }
          calcInputs.splice(calcInputs.length - 1, 1, calcInputs[calcInputs.length - 1] + this.btnValue);
          this.calculator.setInputs(calcInputs);
          break;
        case 'operation':
          if (calcInputs[0] === '') {
            return;
          }
          this.calculator.addInputs(this.btnValue);
          break;
        case 'result':
          return;
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
    calculator
  },
  watch: {},
  computed: {
    calcDisplay: function () {
      return calculator.getInputs().join('');
    },
    calcResult: function () {
      return calculator.calculate();
    }
  }
});
