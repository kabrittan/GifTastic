$(document).ready(function() {
  // Initial array
  var animals = [
    "dog", "cat", "rabbit", "hamster", "fish",
    "bird", "chicken", "horse"
  ];

  // Capture topic name
  function displayAnimals() {        
    
    $("#animal-buttons").on("click", function() {  
       
       var animalName = $(this).attr("animal-input");
       var queryURL =  "http://api.giphy.com/v1/gifs/search?q=" + topicName + "&api_key=dc6zaTOxFJmzC&limit=10";     

          $.ajax({
            url: queryURL,
            method: "GET"  
          })
          .done(function(response) {
          console.log(response);
            var results = response.data;
            $("#animals").empty();
            $(".item").empty();

            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");

              var rating = results[i].rating;

              var p = $("<p>").text("Rating: " + rating);

              var topicImage = $("<img>");
              topicImage.attr("src", results[i].images.fixed_height_still.url);
              topicImage.attr("data-still", results[i].images.fixed_height_still.url);
              topicImage.attr("data-animate", results[i].images.fixed_height.url);
              topicImage.attr("data-state", "still");
              topicImage.attr("class", "gif");

              gifDiv.append(p);
              gifDiv.append(topicImage);
              $("#animals").append(gifDiv);
              
            } 
          pauseGifs();
          });        
    });

  };