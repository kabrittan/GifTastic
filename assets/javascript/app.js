$(document).ready(function() {

  // Initial array
  var animals = [
    "dog", "cat", "rabbit", "hamster", "fish",
    "bird", "chicken", "horse"
  ];

  //Function to add buttons
function addButtons(addArray, addClass, addArea) {
  $(addArea).empty();

  for (var i = 0; i < addArray.length; i++) {
    var a = $("<button>");
    a.addClass(addClass);
    a.attr("data-type", addArray[i]);
    a.text(addArray[i]);
    $(addArea).append(a);
  }
}

$(document).on("click", ".animal-button", function() {
  $("#animals").empty();
  $(".animal-button").removeClass("active");
  $(this).addClass("active");

  var type = $(this).attr("data-type");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=itTkLNd9VySjmRs9AtyZND1gkhoNKanq";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var animalDiv = $("<div class=\"animal-item\">");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var animated = results[i].images.fixed_height.url;
      var still = results[i].images.fixed_height_still.url;

      var animalImage = $("<img>");
      animalImage.attr("src", still);
      animalImage.attr("data-still", still);
      animalImage.attr("data-animate", animated);
      animalImage.attr("data-state", "still");
      animalImage.addClass("animal-image");

      animalDiv.append(p);
      animalDiv.append(animalImage);

      $("#animals").append(animalDiv);
    }
  });
});

$(document).on("click", ".animal-image", function() {

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

$("#add-animal").on("click", function(event) {
  event.preventDefault();
  var newAnimal = $("input").eq(0).val();

  if (newAnimal.length > 2) {
    animals.push(newAnimal);
  }

  populateButtons(animals, "animal-button", "#animal-buttons");

});

populateButtons(animals, "animal-button", "#animal-buttons");
});
