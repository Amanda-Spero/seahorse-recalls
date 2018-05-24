//import { ENETRESET } from "constants";


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


$(document).ready(function () {


  function clear() {
    $("#component-name").empty();
    $("#recall-panel").empty();
  }

  $("#search-button").on("click", function (event) {

    event.preventDefault();

    var makeInput = $("#make-input");
    var modelInput = $("#model-input");
    var yearInput = $("#year-input");

    var queryURL = "/api/search/year/" + yearInput.val().trim() + "/make/" + makeInput.val().trim() + "/model/" + modelInput.val().trim();

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(resp => {

       // if {}
       var results = resp.Results;

        var recallComponent = (results[0].Component);
        var recallSummary = (results[0].Summary);
        var recallConequence = (results[0].Conequence);
        var recallRemedy = (results[0].Remedy);
        //var recallCount = j + 1;
        //console.log(results.length);
    
        $("#recalls-box > #recall-component").append(recallComponent);
        $("#recall-summary").append("SUMMARY:   " + recallSummary + "<hr><hr>");
        $("#recall-conequence").append("CONSEQUENCE:   " + recallConequence + "<hr><hr>");
        $("#recall-remedy").append("REMEDY:   " + recallRemedy);

///

        var recallComponent2 = (results[1].Component);
        var recallSummary2 = (results[1].Summary + "<hr>");
        var recallConequence2 = (results[1].Conequence + "<hr>");
        var recallRemedy2 = (results[1].Remedy);
 
    
        $("#recalls-box > #recall-component2").append(recallComponent2);
        $("#recall-summary2").append("SUMMARY:   " + recallSummary2 + "<hr>");
        $("#recall-conequence2").append("CONSEQUENCE:   " + recallConequence2 + "<hr>");
        $("#recall-remedy2").append("REMEDY:   " + recallRemedy2);

///

        var recallComponent3 = (results[2].Component);
        var recallSummary3 = (results[2].Summary + "<hr>");
        var recallConequence3 = (results[2].Conequence + "<hr>");
        var recallRemedy3 = (results[2].Remedy);
        //var recallCount = j + 1;
        //console.log(results.length);

        $("#recalls-box > #recall-component3").append(recallComponent3);
        $("#recall-summary3").append("SUMMARY:   " + recallSummary3 + "<hr>");
        $("#recall-conequence3").append("CONSEQUENCE:   " + recallConequence3 + "<hr>");
        $("#recall-remedy3").append("REMEDY:   " + recallRemedy3);

///

        var recallComponent4 = (results[3].Component);
        var recallSummary4 = (results[3].Summary + "<hr>");
        var recallConequence4 = (results[3].Conequence + "<hr>");
        var recallRemedy4 = (results[3].Remedy);
        //var recallCount = j + 1;
        //console.log(results.length);

        $("#recalls-box > #recall-component4").append(recallComponent4);
        $("#recall-summary4").append("SUMMARY:   " + recallSummary4 + "<hr>");
        $("#recall-conequence4").append("CONSEQUENCE:   " + recallConequence4 + "<hr>");
        $("#recall-remedy4").append("REMEDY:   " + recallRemedy4);

///

        var recallComponent5 = (results[4].Component);
        var recallSummary5 = (results[4].Summary);
        var recallConequence5 = (results[4].Conequence);
        var recallRemedy5 = (results[4].Remedy);
        //var recallCount = j + 1;
        //console.log(results.length);

        $("#recalls-box > #recall-component5").append(recallComponent5);
        $("#recall-summary5").append("SUMMARY:   " + recallSummary5 + "<hr>");
        $("#recall-conequence5").append("CONSEQUENCE:   " + recallConequence5 + "<hr>");
        $("#recall-remedy5").append("REMEDY:   " + recallRemedy5);


  })
})
})










  
