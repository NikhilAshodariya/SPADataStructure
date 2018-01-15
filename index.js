var express = require("express");
var bodyParser = require('body-parser');
var verification = require("./server/controller/verificationLogic.js");
var stackDataStructure = require("./server/controller/stackDataSending.js");
var queueDataStructure = require("./server/controller/queueDataSending.js");

var app = express();
var dataStructureRoute = express.Router();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.use("/dataStructure", dataStructureRoute);

dataStructureRoute.get("/", function(request, response) {
  // res.redirect("/dataStructure/stack");
  response.sendFile(__dirname + "/public/html/StackAndQueue.html");
});

dataStructureRoute.get("/stack", (request, response) => {
  response.redirect("/dataStructure");
});
dataStructureRoute.get("/stack/:stackNumber", (request, response) => {
  var stackNumber = request.params.stackNumber;
  var stackToString = stackDataStructure.printListener(stackNumber);
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({
    stackData: stackToString
  }));
});
dataStructureRoute.get("/stack/:stackNumber/push/:value", (request, response) => {
  var res = stackDataStructure.pushListener(request.params.stackNumber, request.params.value);
  var stackToString = stackDataStructure.printListener(request.params.stackNumber);
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({
    result: res,
    stackData: stackToString
  }));
});
dataStructureRoute.get("/stack/:stackNumber/pop", (request, response) => {
  var val = stackDataStructure.popListener(request.params.stackNumber);
  var stackToString = stackDataStructure.printListener(request.params.stackNumber);
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({
    value: val,
    stackData: stackToString
  }));
});

dataStructureRoute.get("/queue", (request, response) => {
  response.redirect("/dataStructure");
});
dataStructureRoute.get("/queue/:queueNumber", (request, response) => {
  var queueNumber = request.params.queueNumber;
  var queueToString = queueDataStructure.printListener(queueNumber);
  response.setHeader('Content-Type', 'application/JSON');
  response.send(JSON.stringify({
    queueData: queueToString
  }));
});
dataStructureRoute.get("/queue/:queueNumber/enqueue/:value", (request, response) => {
  var res = queueDataStructure.enqueueListener(request.params.queueNumber, request.params.value);
  var queueToString = queueDataStructure.printListener(request.params.queueNumber);
  response.setHeader('Content-Type', 'application/JSON');
  response.send(JSON.stringify({
    result: res,
    queueData: queueToString
  }));
});
dataStructureRoute.get("/queue/:queueNumber/dequeue", (request, response) => {
  var val = queueDataStructure.dequeueListener(request.params.queueNumber);
  var queueToString = queueDataStructure.printListener(request.params.queueNumber);
  response.setHeader('Content-Type','application/JSON');
  response.send(JSON.stringify({
    value:val,
    queueData:queueToString
  }));
});

app.get("/", function(request, response) {
  response.send("<h1>This is great</h1>");
});

app.get("/Login", function(request, response) {
  response.sendFile(__dirname + "/public/html/Login.html");
});

app.post("/verify", [
  verification.checkAutentication,
  verification.sendDataStructurePage
]);

app.listen(8081, () => {
  console.log("this is listen to port 8081");
});
