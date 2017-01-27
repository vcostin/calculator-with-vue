'use strict';

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
          Events.$emit('showResult');
          break;
        case 'reset':
          this.calculator.setInputs(['']);
          Events.$emit('showResult');
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
    calculator,
    result: 0
  },
  watch: {},
  mounted() {
    Events.$on('showResult', () => {
      this.result = calculator.calculate();
    });
  },
  methods: {

  },
  computed: {
    calcDisplay: function () {
      const computed = calculator.getInputs().join('');
      return (computed === '')?0:computed;
    }

  }
});
