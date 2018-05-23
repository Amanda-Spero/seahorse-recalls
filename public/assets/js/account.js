var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
};
//searches

$(".saveBtn").on("click", function() {

    //grabs user input
    var Make = $(".make").val().trim();
    var Model = $(".model").val().trim();
    var Year = $(".year").val().trim();
});
//local object for search data

//var newSearch = {
//    make = make,
//    model = model,
//    year = year, 
//};

//adds search data to database
searchData.ref().push(newSearch)

//logs into console
console.log(newSearch.make);
console.log(newSearch.model);
console.log(newSearch.year);

//alert
alert("Search Successfully Added");

//deletes inputs
$("deleteBtn").on("click", function(){
    $("input").remove();
});