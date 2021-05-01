// Define the question route. The answer of a question will determine what next question is.
const questionRoute = {
  "q0":"q1",
  "q1":"q2",
  "q2":"qv",
  "qv":"qf"
}

// Define the default message of every page
const pageMessage = {
  "q0":"Welcome",
  "q1":"Please answer",
  "q2":"Please answer",
  "qv":"Please review your answers:"
}

// Define the selection route to the final result
const resultRoute = {
  "q0q1q2a": "Python",
  "q0q1q2b": "C++",
}

// Define a varaible to keep the answers that the user give
let answerSheet = {
  "q0":"",
  "q1":"",
  "q2":"",
  "qv":"",
  "qf":""
};

// Define a variable to keep the user name
let nameUser = "";

// Define a variable to keep the route that the user actually goes through. It will be used as a stack.
let answerRoute = ["q0"];

// Define a variable to keep the content of the review page
let reviewPage = "";

// Define a variable to keep the content of the final result
let finalResult = "";

// Function that refresh the message section
function displaymessage(q) {
  $("p#msg").text(pageMessage[q]);
  $("p#msg").removeClass();
  $("p#msg").addClass("msg-i");
}

// Function that determin what is the next question by current question and button clicked
function nextquestion(q, btn) {
  //the last char of the buttion id tells it's "Next" or "Prev"
  let btnType = btn.slice(-1);
  let a = "";
  if(btnType === "n") {
    //push the next question into the answer route
    if(q in questionRoute) {
      answerRoute.push(questionRoute[q]);
    }else{
      a = answerSheet[q];
      if(a in questionRoute) {
        answerRoute.push(questionRoute[a]);
      }else {
        throw "startover";
      }
    }
  }else{
    // if it is "Prev", pop th
    answerRoute.pop();
  }
  return answerRoute.slice(-1)[0];
}

// Helper function to return the answer of the question
function answerofquestion (q, b) {
  let a="";
  let i = $(":input[class=in-" + q + "]");
  if(i.length > 0) {
    if(i[0].type === "text") {
      a = $("input:text[class=in-" + q + "]").val();
     }else{
      a = $("input:radio[class=in-" + q + "]:checked")[0].id;
    }
    if (a) {
      return a;
    } else {
      if(b.slice(-1) === "n") {
        throw "Please give your answer!";
      } else {
        return "";
      }
    }
  }else {
    return "";
  }
}

// Helper function to set answers from the answer sheet
function setanswer(q, a){
  let i = $(":input[class=in-" + q + "]");
  if(i.length > 0) {
    if(i[0].type === "text") {
      i[0].value = a;
    }else{
      document.getElementById(a).checked = true;
    }
    return;
  }else{
    return;
  }
}

// Helper function to set review page
function setreview() {
  let q = "";
  let a="";
  let l;
  let t = "";
  let tr = "";
  //iterate all question and answers
  for(i in answerRoute) {
    q = answerRoute[i];
    //only q1~qn
    if( parseInt(q.slice(-1)) > 0 ) {
      //text of the question
      t = $("p#t-" + q).text();
      //append to final text of review
      tr += (t + "\n");
      //answer of the question
      a = answerSheet[q];
      //text of the answer
      l = $("label[for='l-" + a +"']").text();
      if(l.length > 0) {
        tr += (l + "\n");
      }else{
        tr += (a + "\n");
      }
    }
  }
  return tr;
}

// Helper function to set final result
function setfinal() {
  let q = "";
  let a = "";
  let i;
  let routeString = "";
  let r = "";
  for (i in answerRoute) {
    q = answerRoute[i];
    a = answerSheet[q];

    if(a) {
      i = $(":input[id=" + a + "]");
      if(i.length >0) {
        routeString += a;
      } else {
        routeString += q;
      }
    } else {
      routeString += q;
    }
  }
  r = finalResult[routeString];
  r = "Hey " + nameUser + ", you ought to study " + r + "!";
  return r;
}

$(document).ready(function() {
  let currentQ = "";
  let currentA;
  let nextA = "";
  let nextQ = "";

  displaymessage("q0");
 
  $(".btn").click(function(event) {
    event.preventDefault();
    let clickedBtn = this.id;
    currentQ = clickedBtn.slice(2,4);

    try {
      currentA = answerofquestion(currentQ, clickedBtn);
    }
    catch(e1) {
      $("p#msg").text(e1);
      $("p#msg").addClass("msg-e");
      //stop script running
      throw "";
    }

    if(currentQ === "q1") {
      nameUser = currentA;
    }
    
    //update the answer sheet
    answerSheet[currentQ] = currentA;
    
    try {
      nextQ = nextquestion(currentQ, clickedBtn);
    }
    catch(e2) {
      location.reload();
    }
   
    nextA = answerSheet[nextQ];

    //set existing answer
    if(nextA.length>0) {
      setanswer(nextQ, nextA);
    }  

    //Review page
    if(currentQ === "qv" && nextQ != "qv") {
      //refresh if q is the review page
      reviewPage = "";
    }
    if(currentQ != "qv" && nextQ === "qv") {
      reviewPage = setreview();
      $(".content-v").text(reviewPage);
    }

    if(currentQ != "qf" && nextQ === "qf") {
      finalResult = setfinal();
      $(".content-f").text(finalResult);
      
    }

    $(".card#" + currentQ).hide();
    // $("#header").show();
    $(".card#"+nextQ).show();
    displaymessage(nextQ);
  });
});