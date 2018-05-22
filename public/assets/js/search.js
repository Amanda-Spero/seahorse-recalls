// import { ADDRCONFIG } from "dns";

// //from login.js//

// const user = {
//     email: loginForm.email.value,
//     password: loginForm.password.value,
//   };
// /////////


// ////from config/config.js////

// const sql = {
//     database: process.env.database || 'project2db',
//     host: process.env.host || 'localhost',
//     username: process.env.username || 'root',
//     password: process.env.password || process.env.MYSQL_PWD,
//   };



///////////////*************START************************ */
///need to access keys.js and .env to get api key///



  // queryURL is the url we'll use to query the API

  //may need to take out all $(this).attr and .val().trim()
  var makeInput = $(this).attr("make-input").val().trim();
  var modelInput = $(this).attr("model-input").val().trim();
  var yearInput = $(this).attr("year-input").val().trim();

  var queryURL = "https://one.nhtsa.gov/webapi/api/Recalls/vehicle/modelyear/" + yearInput + "/make/" + makeInput + "?format=json?";


    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL);
    return queryURL;

 /**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} NHTSAData - object containing NYT API data
 */

function updatePage(NHTSAData) {

  console.log(NHTSAData);
  console.log("------------------------------------");

  for (var i = 0; i < numCars; i++) {
    // Get specific article info for current index
    var car = NHTSAData.response.docs[i]; //response.docs??  api shows "results"//
    console.log(car);

    var carCount = i + 1;

    var $carList = $("<ul>");
    $carList.addClass("list-group");

    $("#table-row").append($carList);

    var resultYear = car.ModelYear;
    console.log(resultYear);
    var $carListItem = $("<li class='list-group-item carresultYear'>");


    if (resultYear && resultYear.main) {  ///???.MAIN????///////
      console.log(resultYear.main);
      $carListItem.append(
        "<span class='label label-primary'>" +
          carCount +
          "</span>" +
          "<strong> " +
          resultYear.main +
          "</strong>"
      );
    }


    var resultMake = car.Make;

    if (resultMake && resultMake.original) { ///????.original.?????/////
      console.log(resultMake.original);
      $carListItem.append("<h5>" + resultMake.original + "</h5>");
    }


        // Log Model, and append to document if exists
        var resultModel = car.Model;
        console.log(car.Model);
        if (resultModel) {
          $carListItem.append("<h5>Section: " + resultModel + "</h5>");
        }
  }
}

// Function to empty out the articles
function clear() {
  $("#table-row").empty();
}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#search-button").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  clear();

  // Build the query URL for the ajax request to the NYT API
  //var queryURL = buildQueryURL();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);