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
      		console.log(response);
          
        	for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='gif'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var movieGif = $("<img class= 'animateGif'>");

            movieGif.attr("src", results[i].images.fixed_height_still.url);
            movieGif.attr("data-still",results[i].images.fixed_height_still.url);
            movieGif.attr("data-animate",results[i].images.fixed_height.url);
            movieGif.attr("data-state", "still");

            gifDiv.prepend(p);
            gifDiv.prepend(movieGif);
            $("#viewGifs").prepend(gifDiv);

            $(".animateGif").on("click", function() {
              
              var state = $(this).attr("data-state");

              console.log(state);
              // If still, update to animate
              // otherwise make still
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } 

              else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }

            }); 
          }
        });
      }
  
      $(document).on("click", ".movie", displayMovieInfo);

renderButtons();

});
