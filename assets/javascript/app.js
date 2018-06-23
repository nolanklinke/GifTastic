//array of topics

var topics = ["pizza", "nachos", "burgers", "fries", "waffles", "donuts", "pancakes", "ice cream", "vegetables", "fruit"]

//function with For loop to create buttons within array
function createButtons () {

    $("#buttons-go-here").empty();


    for (var i = 0; i < topics.length; i++)  {

        var newBTN = $("<button>").text(topics[i]);
        newBTN.addClass("btn btn-outline-primary m-2 searchInput")
        newBTN.attr("data-name", topics[i]);
        $("#buttons-go-here").append(newBTN);
    };
};

//create button option

$("#createBTN").on("click", function(event) {

    event.preventDefault();
    
    var userInput = $("#user-Input").val().trim();

    topics.push(userInput); 

    createButtons();

});

// event listener for button elements to search giphy
function displayInfo () {
    
    var search = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=DI0K555bX6nANyYgvgEp7bz5h495nkiL&limit=25";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response) {
    
    console.log(queryURL);
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {

        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            
            var gifSpan = $("<span>");

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url).addClass("m-2")

            var p = $("<p>").text("Rating: " + results[i].rating);

            gifSpan.append(p);
            gifSpan.append(gifImage);

            $("#gifs-go-here").prepend(gifSpan);
        }

    }
    
    });


};

createButtons();
$(document).on("click", ".searchInput", displayInfo);




        