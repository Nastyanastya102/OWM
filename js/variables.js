'use strict';

let inputCity = document.getElementById('js_city_name'),
    selectedTd,
    //Две страницы
    pageOne = document.querySelector('.js_page_one'),
    pageTwo = document.querySelector('.js_page_second'),
    //Страница ошибки
    paragForError = document.createElement('p'),
    paragForErrorNew = document.createElement('p'),
    //Навигация
    tabToday = document.querySelector('.js_tab_today'),
    tabForecast = document.querySelector('.js_tab_forecast'),
    //Коллекции
    curCityDataAll = document.querySelectorAll('.js_cur_city p'),
    secSectionAllul = document.querySelectorAll('.second_section ul'),
    secFirstColAll = document.querySelectorAll('.sec_first ul'),
    sectionForUl = document.querySelectorAll('.sec_sec ul'),
    nearest = document.querySelectorAll('.nearest ul'),
    secFirstCol = document.querySelector('.sec_first'),
    timeToday = document.querySelectorAll('#time_today p'),
    currentTime = document.querySelectorAll('.js_cur_city p'),
    todayWeatherHourly = document.querySelector('.today_weater');


const OWM_API = new Owm();