$(function(){

  $.get('/airports', appendToList);

  $('form').on('submit', function(event) {
    event.preventDefault();

    var form = $(this);
    var airportData = form.serialize();

    $('.alert').hide();

    $.ajax({
      type: 'POST', url: '/airports', data: airportData
    })
    .error(function() {
      $('.alert').show();
    })
    .success(function(airportName){
      appendToList([airportName]);
      form.trigger('reset');
    });
  });

  function appendToList(airports) {
    var list = [];
    var content, airport;
    for(var i in airports){
      airport = airports[i];
      content = '<a href="/airports/'+airport+'">'+airport+'</a>'+ // + // example on how to serve static images
        ' <a href="#" data-airport="'+airport+'">'+
        '<img src="delete.png" width="15px"></a>';
      list.push($('<li>', { html: content }));
    }

    $('.airport-list').append(list);
  }


  $('.airport-list').on('click', 'a[data-airport]', function (event) {
    if(!confirm('Are you sure ?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE',
      url: '/airports/' + target.data('airport')
    }).done(function () {
      target.parents('li').remove();
    });
  });

});
