// Define the question route. The answer of a question will determine what next question is.
const questionRoute = {
  "q0":"q1",
  "q1":"q2",
  "q2a":"q3",
  "q2b":"q4",
  "q2c":"q5",
  "q2d":"q6",
  "q2e":"qv",
  "q2f":"qv",
  "q3a":"q8",
  "q3b":"q8",
  "q3c":"q8",
  "q4a":"qv",
  "q4b":"qv",
  "q4c":"qv",
  "q5a":"q9",
  "q5b":"qv",
  "q5c":"qv",
  "q6a":"qv",
  "q6b":"qv",
  "q7a":"qv",
  "q7b":"qv",
  "q7c":"qv",
  "q8a":"q7",
  "q8b":"q6",
  "q8c":"qv",
  "q9a":"qv",
  "q9a":"qv",
  "q9b":"qv",
  "q9c":"qv",
  "qv":"qf"
}

// Define the default message of every page
const pageMessage = {
  "q0":"Welcome",
  "q1":"Please answer",
  "q2":"Please answer",
  "qv":"Please review your answers:",
  "qf":"We know what language fits you -"
}

// Define the selection route to the final result
const resultRoute = {
  //options for game development
  "q0q1q2aq3aq8aq7aqvqf":"Hey &nameUser, you ought to study C++, so you can learn how to make cool single player PC games!",
  "q0q1q2aq3aq8aq7bqvqf":"Hey &nameUser, you ought to study Objective-C, so you can learn how to make cool single player games on Mac!",
  "q0q1q2aq3aq8aq7cqvqf":"Hey &nameUser, you ought to study C/C++, so you can learn how to make cool single player games on Linux!",
  "q0q1q2aq3aq8bq6aqvqf":"Hey &nameUser, you ought to study Swift, so you can learn how to make cool mobile single player games on iOS!",
  "q0q1q2aq3aq8bq6bqvqf":"Hey &nameUser, you ought to study Java, so you can learn how to make cool mobile single player games on Andriod!",
  "q0q1q2aq3aq8cqvqf":"Hey &nameUser, you ought to study C++, so you can learn how to make cool single player games on consoles!",
  "q0q1q2aq3bq8aq7aqvqf":"Hey &nameUser, you ought to study C++, so you can learn how to make cool online games on PC!",
  "q0q1q2aq3bq8aq7bqvqf":"Hey &nameUser, you ought to study Objective-C, so you can learn how to make cool online games on Mac!",
  "q0q1q2aq3bq8aq7cbqvqf":"Hey &nameUser, you ought to study Objective-C, so you can learn how to make cool online games on Linux!",
  "q0q1q2aq3bq8bq6aqvqf":"Hey &nameUser, you ought to study Swift, so you can learn how to make cool mobile online games on iOS!",
  "q0q1q2aq3bq8bq6bqvqf":"Hey &nameUser, you ought to study Java, so you can learn how to make cool mobile online games on Andriod!",
  "q0q1q2aq3bq8cqvqf":"Hey &nameUser, you ought to study C++, so you can learn how to make cool online games on consoles!",
  //options for web development
  "q0q1q2bq4aqvqf":"Hey &nameUser, you ought to study HTML/CSS, so you can learn how to become a frontend web developer!",
  "q0q1q2bq4bqvqf":"Hey &nameUser, you ought to study Javascript, so you can learn how to become a backend web developer!",
  "q0q1q2bq4cqvqf":"Hey &nameUser, you ought to study HTML/CSS and Javascript, so you can learn how to become a full stack web developer!",
  //options for business app development
  "q0q1q2cq5aq9aqvqf":"Hey &nameUser, you ought to study Python, so you can learn how to do cloud computing for small businesses!",
  "q0q1q2cq5aq9bqvqf":"Hey &nameUser, you ought to study C#, so you can learn how to do cloud computing for medium-sized businesses!",
  "q0q1q2cq5aq9cqvqf":"Hey &nameUser, you ought to study Java, so you can learn how to do cloud computing for large businesses!",
  "q0q1q2cq5bqvqf":"Hey &nameUser, you ought to study SQL, so you can learn how to manage and analyze business data!",
  "q0q1q2cq5cqvqf":"Hey &nameUser, you ought to study XML/JSON, so you can learn how to exchange business data!",
  //options for mobile development
  "q0q1q2dq6aqvqf":"Hey &nameUser, you ought to study Swift, so you can learn how to build apps on iOS!",
  "q0q1q2dq6bqvqf":"Hey &nameUser, you ought to study Java, so you can learn how to build apps on Andriod!",
  //options for AI development
  "q0q1q2eqvqf":"Hey &nameUser, you ought to study Python, so you can learn how to do AI programing as a beginner!",
  //options for hardware development
  "q0q1q2fqvqf":"Hey &nameUser, you ought to study C, so you can learn how to make hardware work!",
}

// Define a varaible to keep the answers that the user give
let answerSheet = {
  "q0":"",
  "q1":"",
  "q2":"",
  "q3":"",
  "q4":"",
  "q5":"",
  "q6":"",
  "q7":"",
  "q8":"",
  "q9":"",
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
  let v;
  if(i.length > 0) {
    if(i[0].type === "text") {
      a = $("input:text[class=in-" + q + "]").val();
     }else{
      v = $("input:radio[class=in-" + q + "]:checked")
      if(v.length > 0) {
        a = v[0].id;
      } else {
        a = "";
      }
    }
    if(a) {
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
  let a_cleaned = ""
  let i;
  let routeString = "";
  let r = "";
  for (i in answerRoute) {
    q = answerRoute[i];
    a = answerSheet[q];

    if(a) {
      //the name that user inputs may contain special characters and causes this selector to fails
      //use try to avoid crush due to such failure
      try{
        i = $(":input[id=" + a + "]");
      }
      catch(e){
        i = "";
      }
      
      if(i.length >0) {
        routeString += a;
      } else {
        routeString += q;
      }
    } else {
      routeString += q;
    }
  }
  r = resultRoute[routeString];
  return r.replace("&nameUser", nameUser);
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

    //get user name which will be used for the final result
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
   
    //if the question is answered, the answer will be displayed
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
    //Final Result
    if(currentQ != "qf" && nextQ === "qf") {
      finalResult = setfinal();
      $(".content-f").text(finalResult);
    }

    $(".card#" + currentQ).hide();
    $(".card#"+nextQ).show();
    displaymessage(nextQ);
  });
});