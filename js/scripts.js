function triangle(a, b, c) {
  if (!a || !b || !c) {
    return -1;
  }
  if ( (a + b) <= c || (a + c) <= b || (b + c) <= a ) {
    return 0;
  }  else {
    if (a === b && b === c) {
      return 1;
    }else if ( a === b || a === c || b === c){
      return 2;
    }else{
      return 3;
    }
 }
}

function cordc (a, b, c) {
  let x = (Math.pow(a,2) + Math.pow(b,2) - Math.pow(c,2)) / (2 * a);
  let y = Math.sqrt(Math.pow(b,2) - Math.pow(x,2));
  return [x, y];
}

function draw(a,x,y,n) 
{
  var canvas = document.getElementById('canvas');
  if (canvas.getContext)
  {
    var context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(a * n, 0);
    context.lineTo(x * n, y * n);
    context.fill();
  }
}

$(document).ready(function() {
  $("form#tri").submit(function(event) {
    event.preventDefault();

    const side1 = parseInt($("input#sidea").val());
    const side2 = parseInt($("input#sideb").val());
    const side3 = parseInt($("input#sidec").val());
    const typeofTriangle = triangle(side1, side2, side3);

    if (typeofTriangle < 0){
      $("#output1").hide();
      $("#output2").hide();
      alert("Please input valid number!");
    } else if (typeofTriangle > 0) {
        if (typeofTriangle === 1) {
          $(".tp-tri").text("An Equilateral");
        }
        if (typeofTriangle === 2) {
          $(".tp-tri").text("An Isosceles");
        }
        if (typeofTriangle === 3) {
          $(".tp-tri").text("A Scalene");
        }
        $("#output2").hide();
        $("#output1").show();
        let pointc = cordc(side1, side2, side3);
        const x3 = pointc[0];
        const y3 = pointc[1];
        draw(side1, x3, y3, 10);

    }else{
      $("#output1").hide();
      $("#output2").show();
    }
  });
});