import test from 'ava';
import Calculator from '../frontend/js/calculatorCore';

const calc = new Calculator(['']);

test.beforeEach(t => {
  calc.setInputs(['']);
});

test('on 1 input should get an array of ["1"]', t => {
  calc.addToInputsLogic('1');
  t.is(calc.getInputs()[0], '1');
});

test('on 1 and 1 input should get an array of ["11"]', t => {
  calc.addToInputsLogic('1');
  calc.addToInputsLogic('1');
  t.is(calc.getInputs()[0], '11');
});

test('on 2 and 3 and 1 input should get an array of ["231"]', t => {
  calc.addToInputsLogic('2');
  calc.addToInputsLogic('3');
  calc.addToInputsLogic('1');
  t.is(calc.getInputs()[0], '231');
});


test('on 2 and + and 1 input should get an array of ["2", "+", "1"]', t => {
  calc.addToInputsLogic('2');
  calc.addToInputsLogic('+');
  calc.addToInputsLogic('1');
  t.is(calc.getInputs()[0], '2');
  t.is(calc.getInputs()[1], '+');
  t.is(calc.getInputs()[2], '1');
});

test('on 2 and + and 1 and - and 5 input should get an array of ["2", "+", "1", "-", "5"]', t => {
  calc.addToInputsLogic('2');
  calc.addToInputsLogic('+');
  calc.addToInputsLogic('1');
  calc.addToInputsLogic('-');
  calc.addToInputsLogic('5');
  t.is(calc.getInputs()[0], '2');
  t.is(calc.getInputs()[1], '+');
  t.is(calc.getInputs()[2], '1');
  t.is(calc.getInputs()[3], '-');
  t.is(calc.getInputs()[4], '5');
});

test('on 2 and + and + and 1 input should get an array of ["2", "+", "1"]', t => {
  calc.addToInputsLogic('2');
  calc.addToInputsLogic('+');
  calc.addToInputsLogic('+');
  calc.addToInputsLogic('1');
  t.is(calc.getInputs()[0], '2');
  t.is(calc.getInputs()[1], '+');
  t.is(calc.getInputs()[2], '1');
});


test('on + and + and 1 input should get an array of ["1"]', t => {
  calc.addToInputsLogic('+');
  calc.addToInputsLogic('+');
  calc.addToInputsLogic('1');
  t.is(calc.getInputs()[0], '1');
});
