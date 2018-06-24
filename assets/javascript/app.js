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

    $("#user-Input").val("");

});

// event listener for button elements to search giphy
function displayInfo () {

    $("#gifs-go-here").empty();
    
    var search = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=DI0K555bX6nANyYgvgEp7bz5h495nkiL&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response) {
    
    console.log(queryURL);
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {

        if (results[i].rating !== "r" /*&& results[i].rating !== "pg-13"*/) {
            
            var gifSpan = $("<span>");
            gifSpan.addClass("d-inline-block border m-2");

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url).addClass("m-2 gif");
            gifImage.attr("data-still", results[i].images.fixed_height_still.url)
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");

            var p = $("<p>").text("Rating: " + results[i].rating);

            gifSpan.append(p);
            gifSpan.append(gifImage);

            $("#gifs-go-here").prepend(gifSpan);
        }

    }
    
    });


};

function gifAnimate () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    } else {

        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    }

};

createButtons();
$(document).on("click", ".searchInput", displayInfo);
$(document).on("click", ".gif", gifAnimate);
