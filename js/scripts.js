// Define the question route. The answer of a question will determine what next question is.
const questionRoute = {
  "q0": "q1",
  "q1a": "q2"
}

// Define a varaible to keep the answers that the user give
let answerSheet = {
  "q0":"",
  "q1":"",
};

// Define a varaible to keep the route that the user actually goes through. It will be used as a stack.
let answerRoute = ["q0"];

// Function that determin what is the next question by current question and button clicked
function nextquestion(q, btn) {
  //the last char of the buttion id tells it's "Next" or "Prev"
  let btnType = btn.slice(-1);
  let answer = q+answerSheet[q];
  let indexofq = 0;
  if(btnType === "n") {
    //push the next question into the answer route
    answerRoute.push(questionRoute[answer]);
  }else{
    // if it is "Prev", pop th
    answerRoute.pop();
  }
  return answerRoute.slice(-1);
}

$(document).ready(function() {
  let currentQ = "";
  let currentA;
  let nextA = "";
  let currentInputClass = "";
  let currentInput;
  let currentI;
  let nextInput;
  $(".btn").click(function(event) {
    event.preventDefault();
    let clickedBtn = this.id;
    currentQ = clickedBtn.slice(2,4);
    currentInputClass = "in-" + currentQ;

    //in case of radio button, multiple INPUT exist. FOR loop will go through all of them.
    // currentInput = document.getElementsByClassName(currentInputClass);
    // for(i in currentInput) {
    //   if(i.type === "text") {
    //     currentA = i.val();
    //   } else {
    //     if (i.checked) {
    //       currentA = i.id;
    //     }
    //   }
    // }

    currentInput = $(":input[class=" + currentQ + "]");
    if (currentInput.length) {
      if(currentInput[0].type === "text") {
        currentA = currentInput[0].val();
      }else{
        currentA = $("input:radio[class=" + currentQ + "]:checked").id;
      }
    }



    //update the answer sheet
    answerSheet[currentQ] = currentA;
  
    nextQ = nextquestion(currentQ, clickedBtn);
    nextA = answerSheet[nextQ];

    //get all inputs of the next question
    nextInput = document.getElementsByClassName("in"+nextQ);


    if(nextInput) {
      nextInput.value = answerSheet[nextQ];
    }

    $(".card").hide();
    $("#header").show();
    $("#"+nextQ).show();
    
  
  });
});