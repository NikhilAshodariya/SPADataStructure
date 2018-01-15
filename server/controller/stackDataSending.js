var Stack = require("../model/stack.js");

var stackArray = [];

var popListener = function(stackNumber) {
  if (stackArray[stackNumber] == undefined) {
    stackArray[stackNumber] = new Stack();
  }
  var val = stackArray[stackNumber].pop();
  return val;
}

var pushListener = function(stackNumber, val) {
  if (stackArray[stackNumber] == undefined) {
    stackArray[stackNumber] = new Stack();
  }
  stackArray[stackNumber].push(val);
  return true;
}

var printListener = function(stackNumber){
  if (stackArray[stackNumber] == undefined) {
    stackArray[stackNumber] = new Stack();
  }
  var vat = stackArray[stackNumber].getStack();
  return vat;
}

var stackDataStructure = {};
stackDataStructure.pushListener = pushListener;
stackDataStructure.popListener = popListener;
stackDataStructure.printListener = printListener;

module.exports = stackDataStructure;
