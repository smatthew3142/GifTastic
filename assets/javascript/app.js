$(document).ready(function(){
var movies = ["Aladdin","Chicken Run","The Emperor's New Groove","Horton Hears a Who","Moana","Kung Fu Panda","Lion King","Lilo and Stitch","Pocahontas","The Prince of Egypt","The Road to El Dorado","Sinbad: Legend of the Seven Seas","Tangled"];


//create set buttons
function renderButtons() {

	$("#buttons").empty();

	for (var i = 0; i < movies.length; i++) {

	  var movieButton = $("<button>");
	  
	  movieButton.addClass("movie");
	  
	  movieButton.attr("data-name", movies[i]);
	  
	  movieButton.text(movies[i]);
	  
	  $("#buttons").append(movieButton);
	}

}

	//when the movie button is clicked, create a new button
$("#addInput").on("click", function(event) {
	event.preventDefault();
	var newMovie = $("#newInput").val().trim();

	movies.push(newMovie);

	renderButtons();
});

console.log(movies);



//get GIFs
function displayMovieInfo() {

	$("#viewGifs").empty();

        var movie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="  + movie + "&api_key=lCGJ1dPwqYzSX3wsicXsZGf2OGLVYa8K&limit=9";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

      		var results = response.data;
      		console.log(response.data);
          
          	for (var i = 0; i < results.length; i++) {

          	console.log(movies[i]);

            var gifDiv = $("<div class='gif'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var movieGif = $("<img class='animateGif'>");

            movieGif.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(movieGif);

            $("#viewGifs").prepend(gifDiv);

            // $(".animateGif").on("click", function() {
            //   // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            //   var state = $(this).attr("data-state");

            //   console.log(state);
            //   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            //   // Then, set the image's data-state to animate
            //   // Else set src to the data-still value
            //   if (state === "still") {
            //     $(this).attr("src", $(this).attr("data-animate"));
            //     $(this).attr("data-state", "animate");
            //   } else {
            //     $(this).attr("src", $(this).attr("data-still"));
            //     $(this).attr("data-state", "still");
            //   }
            // });

            
          }
        });

      }
  
      $(document).on("click", ".movie", displayMovieInfo);

renderButtons();

});
