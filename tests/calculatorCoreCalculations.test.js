import test from 'ava';
import Calculator from '../frontend/js/calculatorCore';

const calc = new Calculator();

test('1 + 1 should be 2', (t) => {
  calc.setInputs(['1', '+', '1']);
  t.is(calc.calculate(), 2);
});

test('1 + 2 should be 3', (t) => {
  calc.setInputs(['1', '+', '2']);
  t.is(calc.calculate(), 3);
});

test('1 + 2 + 3 should be 6', (t) => {
  calc.setInputs(['1', '+', '2', '+', '3']);
  t.is(calc.calculate(), 6);
});

test('3 - 1 should be 2', (t) => {
  calc.setInputs(['3', '-', '1']);
  t.is(calc.calculate(), 2);
});

test('5 - 1 - 1 should be 3', (t) => {
  calc.setInputs(['5', '-', '1', '-', '1']);
  t.is(calc.calculate(), 3);
});

test('5 - 1 - 1 + 5 should be 8', (t) => {
  calc.setInputs(['5', '-', '1', '-', '1', '+', '5']);
  t.is(calc.calculate(), 8);
});

test('5 - 7 should be -2', (t) => {
  calc.setInputs(['5', '-', '7']);
  t.is(calc.calculate(), -2);
});

test('0 - 7 should be -7', (t) => {
  calc.setInputs(['0', '-', '7']);
  t.is(calc.calculate(), -7);
});

test('0 - 2 should be -2', (t) => {
  calc.setInputs(['-', '2']);
  t.is(calc.calculate(), -2);
});

test('0 + 12 should be 12', (t) => {
  calc.setInputs(['+', '12']);
  t.is(calc.calculate(), 12);
});

test('2 * 3 should be 6', (t) => {
  calc.setInputs(['2', '*', '3']);
  t.is(calc.calculate(), 6);
});

test('12 / 3 should be 4', (t) => {
  calc.setInputs(['12', '/', '3']);
  t.is(calc.calculate(), 4);
});

test('1 + 7 - 2 + 12 / 3 * 6 should be 36', (t) => {
  calc.setInputs(['1', '+', '7', '-', '2', '+', '12', '/', '3', '*', '6']);
  t.is(calc.calculate(), 36);
});

test('1 / 2 should be 0.5', (t) => {
  calc.setInputs(['1', '/', '2']);
  t.is(calc.calculate(), 0.5);
});

test('0.1 + 0.2 should be 0.3', (t) => {
  calc.setInputs(['0.1', '+', '0.2']);
  t.is(calc.calculate(), 0.3);
});

test('0.1 * 0.2 should be 0.02', (t) => {
  calc.setInputs(['0.1', '*', '0.2']);
  t.is(calc.calculate(), 0.02);
});

test('0.01 * 0.03 should be 0.0003', (t) => {
  calc.setInputs(['0.01', '*', '0.03']);
  t.is(calc.calculate(), 0.0003);
});
