var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('#countries');

function searchCountries() {
	var countryName = $('#country-name').val();
	if(!countryName) {
    countryName = 'Poland'
  };
	$.ajax({
  		url: url + countryName,
  		method: 'GET',
  		success: showCountriesList
  });
};

function showCountriesList(resp) {
  $('#body img:last-child').remove();
  countriesList.empty();
  if (resp.length !== 1) {
    resp.forEach(function(item) {
      var myLi = document.createElement('li');
      myLi.innerHTML = 'Country:' + ' ' + item.name +'<img src="http://icons.iconarchive.com/icons/osiris/world-flags/16/00-cctld-'+ item.alpha2Code.toLowerCase() + '-icon.png" id="miniflag">';
      countriesList.append(myLi);
      myLi.addEventListener('click', function(event) {
        countriesList.empty();
        $('<li>').text('Country and capital city: ' + item.name + ', ' + item.capital).appendTo(countriesList).append($('<i class="fa fa-building" aria-hidden="true"></i>'));
        $('<li>').text('Common languages used: ' + item.languages).appendTo(countriesList).append($('<i class="fa fa-commenting-o" aria-hidden="true"></i>'));
        $('<li>').text('Population: ' + item.population).appendTo(countriesList).append($('<i class="fa fa-users" aria-hidden="true"></i>'));
        $('#body').append('<img id="flag" src="http://flags.fmcdn.net/data/flags/normal/' + item.alpha2Code.toLowerCase() + '.png" alt="no flag available">');
      })
    })
  }  
  else {
    resp.forEach(function(item) {  
        countriesList.empty();
        $('<li>').text('Country and capital city: ' + item.name + ', ' + item.capital).appendTo(countriesList).append($('<i class="fa fa-building" aria-hidden="true"></i>'));
        $('<li>').text('Common languages used: ' + item.languages).appendTo(countriesList).append($('<i class="fa fa-commenting-o" aria-hidden="true"></i>'));
        $('<li>').text('Population: ' + item.population).appendTo(countriesList).append($('<i class="fa fa-users" aria-hidden="true"></i>'));
        $('#body').append('<img id="flag" src="http://flags.fmcdn.net/data/flags/normal/' + item.alpha2Code.toLowerCase() + '.png" alt="no flag available">');  
    })
  }
}

$('#search').click(searchCountries);
$("#country-name").keypress(function(event) {
  if (event.which === 13) {
    searchCountries();
  };
});

