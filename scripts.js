var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('#countries');

function searchCountries() {
	var countryName = $('#country-name').val();
	if(!countryName) countryName = 'Poland';
	$.ajax({
  		url: url + countryName,
  		method: 'GET',
  		success: showCountriesList
  	});
};

function showCountriesList(resp) {
  countriesList.empty();
	resp.forEach(function(item){
		var info = [item.name + ', ' + item.capital];
   		$('<li>').text('Country and capital city: ' + info).appendTo(countriesList);
   		$('<li>').text('\n Common languages used: ' + item.languages).appendTo(countriesList);
   		$('<li>').text('\n Population: ' + item.population).appendTo(countriesList);

	}); 
};

$('#search').click(searchCountries);
$( "#country-name" ).keypress(function( event ) {
  if ( event.which == 13 ) {
    searchCountries();
  };
});