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
  methods: {},
  computed: {
    calcDisplay: function () {
      const computed = calculator.getInputs().join('');
      return (computed === '') ? 0 : computed;
    }

  }
});
