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