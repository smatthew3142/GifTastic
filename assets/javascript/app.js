$(document).ready(function(){
var movies = ["Aladdin","Chicken Run","The Emperor's New Groove","Horton Hears a Who","Moana","Lion King","Lilo and Stitch","Pocahontas","The Prince of Egypt","The Road to El Dorado","Tangled"];


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

            var movieGif = $("<img>");

            movieGif.attr("src", results[i].images.fixed_height.url);

            

            gifDiv.append(p);
            gifDiv.append(movieGif);

            $("#viewGifs").prepend(gifDiv);
          }
        });

      }
  
      $(document).on("click", ".movie", displayMovieInfo);

renderButtons();

});
