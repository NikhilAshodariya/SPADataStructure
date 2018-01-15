$(document).ready(function() {
  $("#stackRadio").change(function() {
    $("#pushButton").text("Push");
    $("#popButton").text("Pop");
    $("#stack1").html("Stack 1");
    $("#stack2").html("Stack 2");
    loadInitialData();
  });

  $("#queueRadio").change(function() {
    $("#pushButton").text("Enqueue");
    $("#popButton").text("Dequeue");
    $("#stack1").html("Queue 1");
    $("#stack2").html("Queue 2");
    loadInitialData();
  });

  $("#stackRadio").change(loadStackArea);
  $("#pushButton").click(pushListener);
  $("#userInput").keydown(pushListener);
  $("#queueRadio").change(loadStackArea);
  $("#stack1Radio,#stack2Radio").change(loadInitialData);
  $("#popButton").click(popListener);

  loadInitialData();

});

function loadInitialData() {
  var val = $("input[name=stackOptions]:checked").val();
  if ($("#stack1").html().includes("Stack")) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
        arr = JSON.parse(xhttp.responseText);
        loadStackArea(arr["stackData"]);
      }
    };
    xhttp.open("GET", "/dataStructure/stack/" + val, true);
    xhttp.send();
  } else if ($("#stack1").html().includes("Queue")) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
        arr = JSON.parse(xhttp.responseText);
        loadStackArea(arr["queueData"]);
      }
    };
    xhttp.open("GET", "/dataStructure/queue/" + val, true);
    xhttp.send();
  }
}

function pushListener() {
  var keypressed = event.keyCode || event.which;
  if (keypressed == 13 || this.id == "pushButton") {
    var textBox = $("#userInput");
    if ($("#stack1").html().includes("Stack")) {
      var val = $("input[name=stackOptions]:checked").val();
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
          arr = JSON.parse(xhttp.responseText);
          loadStackArea(arr["stackData"]);
          textBox.val("");
        }
      };
      xhttp.open("GET", "/dataStructure/stack/" + val + "/push/" + textBox.val(), true);
      xhttp.send();
    } else if ($("#stack1").html().includes("Queue")) {
      var val = $("input[name=stackOptions]:checked").val();
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
          arr = JSON.parse(xhttp.responseText);
          loadStackArea(arr["queueData"]);
          textBox.val("");
        }
      };
      xhttp.open("GET", "/dataStructure/queue/" + val + "/enqueue/" + textBox.val(), true);
      xhttp.send();
    }
  }
}

function popListener() {
  var textBox = $("#userInput");
  var textArea = $("#stackTextArea");
  var displayStatus = $("#poppedValue");

  if ($("#stack1").html().includes("Stack")) {
    var val = $("input[name=stackOptions]:checked").val();
    var poppedVal;
    var arr;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
        arr = JSON.parse(xhttp.responseText);
        poppedVal = arr["value"];

        if (poppedVal == "emptyStack") {
          displayStatus.text("Stack is empty please insert a value");
        } else {
          loadStackArea(arr["stackData"]);
          displayStatus.text("popped value is " + poppedVal);
        }
      }
    };
    xhttp.open("GET", "/dataStructure/stack/" + val + "/pop", true);
    xhttp.send();
  } else if ($("#stack1").html().includes("Queue")) {
    var val = $("input[name=stackOptions]:checked").val();
    var poppedVal;
    var arr;
    // var st = queue[val];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
        arr = JSON.parse(xhttp.responseText);
        poppedVal = arr["value"];

        if (poppedVal == "queueEmpty") {
          displayStatus.text("Queue is empty please enqueue first");
        } else {
          loadStackArea(arr["queueData"]);
          displayStatus.text("Dequeue value is " + poppedVal);
        }
      }
    };
    xhttp.open("GET", "/dataStructure/queue/" + val + "/dequeue", true);
    xhttp.send();
  }
}



function loadStackArea(data) {
  var stackTextArea = $("#stackTextArea");
  stackTextArea.val("");
  for (i in data) {
    stackTextArea.val(stackTextArea.val() + data[i] + "\n");
  }
  $("#poppedValue").text("");
}
