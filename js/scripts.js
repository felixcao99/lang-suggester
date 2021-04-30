// Define the question route. The answer of a question will determine what next question is.
const questionRoute = {
  "q0":"q1",
  "q1":"q2",
  "q2":"qv",
  "qv":"qf"
}

// Define a varaible to keep the answers that the user give
let answerSheet = {
  "q0":"",
  "q1":"",
  "q2":"",
  "qv":"review",
  "qf":"end"
};

// Define a varaible to keep the route that the user actually goes through. It will be used as a stack.
let answerRoute = ["q0"];

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
      answerRoute.push(questionRoute[a]);
      //refresh if q is the review page
      if(q.slice(-1) === "v") {
        $("p#content-v").load(" p#content-v");
      }
    }
  }else{
    // if it is "Prev", pop th
    answerRoute.pop();
  }
  return answerRoute.slice(-1)[0];
}

// Helper function to return the answer of the question
function answerofquestion (q) {
  let i = $(":input[class=in-" + q + "]");
  if(i.length > 0) {
    if(i[0].type === "text") {
      return $("input:text[class=in-" + q + "]").val();
    }else{
      return $("input:radio[class=in-" + q + "]:checked")[0].id;
    }
  }else{
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
function setreview(q, a) {
  let t="";
  if(parseInt(q.slice(-1)) > 0 ) {
    t = $("p#t-" + q).text();
    $("p#content-v").before(t + "<br>");
    $("p#content-v").before("Answer: " + a + "<br>");
  }
  return;
}

$(document).ready(function() {
  let currentQ = "";
  let currentA;
  let nextA = "";
  let nextQ = "";
 
  $(".btn").click(function(event) {
    event.preventDefault();
    let clickedBtn = this.id;
    currentQ = clickedBtn.slice(2,4);
    currentA = answerofquestion(currentQ);

    //update the answer sheet
    answerSheet[currentQ] = currentA;
    setreview(currentQ, currentA);
  
    nextQ = nextquestion(currentQ, clickedBtn);
    nextA = answerSheet[nextQ];

    //set existing answer
    if(nextA.length>0) {
      setanswer(nextQ, nextA);
    }  

    $(".card#" + currentQ).hide();
    // $("#header").show();
    $(".card#"+nextQ).show();


  
  });
});