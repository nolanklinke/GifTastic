//array of topics

var topics = ["pizza", "nachos", "burgers", "fries", "waffles", "donuts", "pancakes", "ice cream", "vegetables", "fruit"]

//For loop to create buttons within array

for (var i = 0; i < topics.length; i++)  {

    var newBTN = $("<button>").text(topics[i]);
    newBTN.addClass("btn btn-outline-primary m-2")
    newBTN.attr("data-name", topics[i]);
    $("#buttons-go-here").append(newBTN);
    };

//create button option

$("#createBTN").on("click", function(event) {

    event.preventDefault();
    
    var userInput = $("#user-Input").val().trim();
    var addBTN = $("<button>").text(userInput);
    addBTN.addClass("btn btn-outline-primary m-2")
    addBTN.attr("data-name", userInput);
    $("#buttons-go-here").append(addBTN);

    $("#user-Input").val("");

});
        