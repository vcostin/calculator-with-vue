import test from 'ava';
import InputFloat from '../frontend/js/InputFloat';

const inputFloat = new InputFloat();


test.beforeEach(() => {
  inputFloat.resetInput();
});

test('on input 0 and 0 and . and 0 and 1 should return 0.01', (t) => {
  inputFloat.inputAction('0');
  inputFloat.inputAction('0');
  inputFloat.inputAction('.');
  inputFloat.inputAction('0');
  inputFloat.inputAction('1');

  t.is(inputFloat.getFloat(), '0.01');
});

test('on input 0 and 0 and . and 0 and 1 and . and 2 should return 0.012', (t) => {
  inputFloat.inputAction('0');
  inputFloat.inputAction('0');
  inputFloat.inputAction('.');
  inputFloat.inputAction('0');
  inputFloat.inputAction('1');
  inputFloat.inputAction('.');
  inputFloat.inputAction('2');

  t.is(inputFloat.getFloat(), '0.012');
});

test('on input . and 0 and 1 should return 0.01', (t) => {
  inputFloat.inputAction('.');
  inputFloat.inputAction('0');
  inputFloat.inputAction('1');

  t.is(inputFloat.getFloat(), '0.01');
});

test('on input . and . and . and 0 and 1 should return 0.01', (t) => {
  inputFloat.inputAction('.');
  inputFloat.inputAction('.');
  inputFloat.inputAction('.');
  inputFloat.inputAction('0');
  inputFloat.inputAction('1');

  t.is(inputFloat.getFloat(), '0.01');
});


test('on input 5 and 5 and . and . and 5 and 5 should return 55.55', (t) => {
  inputFloat.inputAction('5');
  inputFloat.inputAction('5');
  inputFloat.inputAction('.');
  inputFloat.inputAction('.');
  inputFloat.inputAction('5');
  inputFloat.inputAction('5');

  t.is(inputFloat.getFloat(), '55.55');
});


// TODO deal with hanging dot
// test('on input . should return 0', (t) => {
//   inputFloat.inputAction('.');
//
//   t.is(inputFloat.getFloat(), '0');
// });

// test('on input 5 and . should return 5', (t) => {
//   inputFloat.inputAction('5');
//   inputFloat.inputAction('.');
//
//   t.is(inputFloat.getFloat(), '5');
// });
