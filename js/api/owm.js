'use strict';

function Owm() {
    this.appId = '&appid=a0726608f56733112a65ea11fe1221a6';
    this.options = '&units=metric';
    this.baseURL = 'http://api.openweathermap.org/data/2.5/';
    this.baseURLicon = 'http://openweathermap.org/img/wn/{icon}@2x.png';
    this.baseURLWeatherCity = this.baseURL + 'weather?q={city}' + this.options + this.appId;
    this.baseURLWeatherCityHourly = this.baseURL + 'forecast?q={city}' + this.options + this.appId;
    this.cityGeo = 'https://ipinfo.io';
    this.urlForNearByCity = this.baseURL + 'find?lat={lat}&lon={lon}&cnt=4' + this.options + this.appId;
};

//Один день
Owm.prototype.fetchForOneDayWeather = async function(city) {
    let url = this.baseURLWeatherCity.replace('{city}', city);
    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        paragForError.replaceWith(pageOne);
        paragForErrorNew.replaceWith(pageTwo);
        OWM_API.fetchForNearestCity(json);
        CONTENT.content(json, timeToday, currentTime);
    } else {
        paragForError.className = "error";
        paragForError.innerHTML = `<img src ="images/404.png" alt ="error"> 
                <span>${city} not found.</span><span> Please enter a different location</span> `;
        pageOne.replaceWith(paragForError);
    }
};

//Пять дней
Owm.prototype.fetchForHourlyWeather = async function(city) {
    let url = this.baseURLWeatherCityHourly.replace('{city}', city);
    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        paragForError.replaceWith(pageTwo);
        CONTENT.contentFiveDays(json);
        CONTENT.clickFunc(json);
    } else {
        pageTwo.replaceWith(paragForErrorNew);
    }
};

//Города рядом
Owm.prototype.fetchForNearestCity = async function({ coord } = json) {
        let lat = coord.lat,
            lon = coord.lon;
        let urlNearest = this.urlForNearByCity.replace('{lat}', lat).replace('{lon}', lon);
        let response = await fetch(urlNearest);
        if (response.ok) {
            let jsonNeares = await response.json();
            CONTENT.getNearesCity(jsonNeares);
        } else {}
    }
    //Иконка
Owm.prototype.getWeatherIcon = function(icon) {
    let iconUrl = this.baseURLicon.replace('{icon}', icon);
    return iconUrl;
};