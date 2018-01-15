var verification = {};

function checkAutentication(request, response, next) {
  function innerVerify(userNameParameter, userPasswordParameter) {
    if (userNameParameter == "nikhil" && userPasswordParameter == "123") {
      return true;
    }
    return false;
  }
  var result = innerVerify(request.body.userName, request.body.userPassword);
  if (result == true) {
    next();
  } else {
    response.status(400);
    response.send("<h1>Incorrect input </h1>");
  }
}

function sendDataStructurePage(request, response) {
  response.redirect("/dataStructure");
}


verification.checkAutentication = checkAutentication;
verification.sendDataStructurePage = sendDataStructurePage;

module.exports = verification;
