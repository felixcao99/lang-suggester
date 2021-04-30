const questionRoute = {
  "q0": "q1",
  "q1a": "q2"
}

let answerSheet = {
  "q0":"",
  "q1":"",
};
let answerRoute = ["q0"];

function nextquestion(q, btn) {
  let btnType = btn.slice(-1);
  let answer = q+answerSheet[q];
  let indexofq = 0;
  if(btnType === "n") {
    return questionRoute[answer];
  }else{
    indexofq = answerRoute.indexOf(q);
    if(indexofq > 0){
      return answerRoute[indexofq - 1];
    } else {
      return "q0";
    }
  }
}

$(document).ready(function() {
  let currentQ = "";
  let currentA = "";
  let nextA = "";
  let currentInput;
  let nextInput;
  $(".btn").click(function(event) {
    event.preventDefault();
    let clickedBtn = this.id;
    currentQ = clickedBtn.slice(2,4);
    
    currentInput = document.getElementById("i"+currentQ);
    if(currentInput) {
      currentA = currentInput.val();
    } else {
      currentA = "";
    }
    answerSheet[currentQ] = currentA;
    nextQ = nextquestion(currentQ, clickedBtn);
    answerRoute.push(nextQ); 
    nextA = answerSheet[nextQ];

    nextInput = document.getElementById("i"+nextQ);
    if(nextInput) {
      nextInput.value = answerSheet[nextQ];
    }

    $(".card").hide();
    $("#header").show();
    $("#"+nextQ).show();
    
  
  });
});