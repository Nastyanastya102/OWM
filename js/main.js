'use strict';

//Геолокация
$(document).ready(function() {
    $.getJSON("https://ipinfo.io", function(p) {
        OWM_API.fetchForOneDayWeather(p.city || 'london');
        OWM_API.fetchForHourlyWeather(p.city || 'london');
    });
});
//На нажатие
inputCity.onkeypress = function(enter) {
    if (enter.keyCode == 13 && inputCity.value !== '') {
        let cityName = inputCity.value;
        OWM_API.fetchForOneDayWeather(cityName);
        OWM_API.fetchForHourlyWeather(cityName);
    }
};