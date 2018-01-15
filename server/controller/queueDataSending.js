var Queue = require("../model/queue.js");

var queueArray = [];

var dequeueListener = function(queueNumber) {
  if (queueArray[queueNumber] == undefined) {
    queueArray[queueNumber] = new Queue();
  }
  var val = queueArray[queueNumber].dequeue();
  return val;
}

var enqueueListener = function(queueNumber, val) {
  if (queueArray[queueNumber] == undefined) {
    queueArray[queueNumber] = new Queue();
  }
  queueArray[queueNumber].enqueue(val);
  return true;
}

var printListener = function(queueNumber) {
  if (queueArray[queueNumber] == undefined) {
    queueArray[queueNumber] = new Queue();
  }
  var vat = queueArray[queueNumber].getQueue();
  return vat;
}

var queueDataStructure = {};
queueDataStructure.enqueueListener = enqueueListener;
queueDataStructure.dequeueListener = dequeueListener;
queueDataStructure.printListener = printListener;

module.exports = queueDataStructure;
