// topics list
var topics = ["My Hero Academia", "League of Legends", "Drifting", "Samurai Champloo"]

//adding buttons
for (i = 0; i < topics.length; i++) {
    var button = $("<button type='button' class='btn btn-dark'>");
    button.attr("id", "#button-" + topics[i]);
    button.text(topics[i]);
    button.addClass("gif-button");
    $("#button-div").append(button);
}

//on click for the buttons
$("#button-div").on("click", ".gif-button", function (event) {
    event.preventDefault();

    $("#gifs-div").empty();

    // Grabbing and storing the data-animal property value from the button
    var queryTag = $(this).text();

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        queryTag + "&api_key=uOyXpaaSOpvkHekMBXEsqQvUmfb2Xwbj&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var placeHolderDiv = $("<div>");
            placeHolderDiv.addClass("col-4");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var placeHolderImage = $("<img>");
            placeHolderImage.addClass("gif");
            placeHolderImage.addClass("card-img-top");
            // Setting the src attribute of the image to a property pulled off the result item
            placeHolderImage.attr("src", results[i].images.fixed_height_still.url);
            placeHolderImage.attr("data-still", results[i].images.fixed_height_still.url);
            placeHolderImage.attr("data-animate", results[i].images.fixed_height.url);
            placeHolderImage.attr("data-state", "still");

            var placeHolderRatingDiv = $("<div>");
            placeHolderRatingDiv.addClass("card-body");

            // Appending the paragraph and image tag to the animalDiv
            placeHolderRatingDiv.append(p);
            placeHolderDiv.append(placeHolderRatingDiv, placeHolderImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appea r-here" div
            $("#gifs-div").prepend(placeHolderDiv);

        }
    });
});

$("#gifs-div").on("click", ".gif", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#submit").on("click", function () {
    event.preventDefault();
    var newTag = $(exampleInput).val();
    topics.push(newTag);
    refreshButtons();
});

function refreshButtons() {
    $("#button-div").empty();

    for (i = 0; i < topics.length; i++) {
        var button = $("<button type='button' class='btn btn-dark'>");
        button.attr("id", "#button-" + topics[i]);
        button.text(topics[i]);
        button.addClass("gif-button");
        $("#button-div").append(button);
    }
}