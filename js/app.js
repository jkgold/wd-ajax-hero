(function() {
  'use strict';

  var movies = [];

  var renderMovies = function() {
    $('#listings').empty();

    for (var movie of movies) {
      var $col = $('<div class="col s6">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50, });
      $title.text(movie.title);

      var $poster = $('<img class="poster">');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      var $modal = $(`<div id="${movie.id}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
      var $modalHeader = $('<h4>').text(movie.title);
      var $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      var $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
$('button').on('click', function(event){
  event.preventDefault();
  var $userInput = $('input');
  if($userInput.val() === ""){
    console.log("yo mama");
    return;
  }
var $userApi = 'http://www.omdbapi.com/?s=';
$userApi += $userInput.val();
var $xhr = $.getJSON($userApi);
$xhr.done(function(data){
  if ($xhr.status !==200) {
    return;
  }
  // movies.push(data)
  // console.log(movies);
  console.log(data);
  for (var i = 0; i < data.Search.length; i++){
  var movie = {
    id: data.Search[i]["Title"],
    poster: data.Search[i] ["Poster"],
    imdbID: data.Search[i] ["imdbID"],
    year: data.Search[i] ["Year"],
  };

  movies.push(movie);

}
  movies.push(data.Search[0] ["Poster"]);
  movies.push(data.Search[0] ["imdbID"]);
console.log(data);
console.log(data.Search[0] ["Poster"]);

  renderMovies();
});

  // console.log(data.Title);
  // console.log(data.Year);
});
// $xhr.fail(fuction(err){
//   console.log(err);
// });

  //below is vanella ja
//   var xhr = new XMLHttpRequest();
//   console.log(xhr);
// xhr.addEventListener('Load', function(){
//   if (xhr.status !== 200){
//     // console.log("not right address");
//     return;
//   }
// var data =JSON.parse(xhr.responseText);
// console.log(data);
//
// });
// xhr.open('Get', 'http://www.omdbapi.com/?t=The fifth element');
// xhr.send();
// })
  // ADD YOUR CODE HERE
})();
