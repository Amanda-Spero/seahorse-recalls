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



  //may need to take out all $(this).attr and .val().trim()


  // function test() {
  //   console.log("test")
  
  //takes API data (JSON/object) and turns it into elements on the page
   //@param {object} NHTSAData - object containing NYT API data
   

  // function updatePage(NHTSAData) {
  //   console.log("called function");

  //   console.log(NHTSAData);
  //   console.log("------------------------------------");

  //   for (var i = 0; i < numRecall; i++) {
  //     // Get specific article info for current index
  //     var recall = NHTSAData.res.[i]; //response.docs??  api shows "results"//
  //     console.log(recall);

  //     var recallCount = i + 1;

  //     var $recallList = $("<ul>");
  //     $recallList.addClass("list-group");

  //     $("#table-row").append($recallList);

  //     var resultYear = res.ModelYear;
  //     console.log(resultYear);
  //     var $recallListItem = $("<li class='list-group-item recallresultYear'>");


  //     if (resultYear && resultYear.main) { ///???.MAIN????///////
  //       console.log(resultYear.main);
  //       $carListItem.append(
  //         "<span class='label label-primary'>" +
  //         carCount +
  //         "</span>" +
  //         "<strong> " +
  //         resultYear.main +
  //         "</strong>"
  //       );
  //     }


  //     var resultMake = car.Make;

  //     if (resultMake && resultMake.original) { ///????.original.?????/////
  //       console.log(resultMake.original);
  //       $carListItem.append("<h5>" + resultMake.original + "</h5>");
  //     }


  //     // Log Model, and append to document if exists
  //     var resultModel = car.Model;
  //     console.log(car.Model);
  //     if (resultModel) {
  //       $carListItem.append("<h5>Section: " + resultModel + "</h5>");
  //     }
  //   }
  // }

  // // Function to empty out the articles
  // function clear() {
  //   $("#table-row").empty();
  // }











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
        //console.log(resp);

        var results = resp.Results;
        // console.log(results);
        // console.log(results[1].Component);
        // console.log(results[1].Summary)
        // console.log(results[1].Conequence);
        // console.log(results[1].Remedy);

      // for (var i = 0; i < results.length; i++) {
      // })

      var recallComponent = (results[1].Component);
      var recallSummary = (results[1].Summary);
      var recallConequence = (results[1].Conequence);
      var recallRemedy = (results[1].Remedy);

      console.log(recallComponent);
      console.log(recallSummary);
      console.log(recallConequence);
      console.log(recallRemedy);



      $("#recall-component").append("COMPONENT:   " + recallComponent);
      $("#recall-summary").append("SUMMARY:   " + recallSummary);
      $("#recall-conequence").append("CONSEQUENCE:   " + recallConequence);
      $("#recall-remedy").append("REMEDY:   " + recallRemedy);






      })




      });

   



});


