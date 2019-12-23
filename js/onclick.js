'use strict';
// Подсвечинаение вкладок
todayWeatherHourly.classList.add('highlight');

secFirstCol.onclick = function(event) {
    let target = event.target;
    let ul = event.target.closest('ul');
    if (!ul) return;
    todayWeatherHourly.classList.remove('highlight');
    highlight(ul);
};

function highlight(ul) {
    if (selectedTd) {
        selectedTd.classList.remove('highlight');
    }
    selectedTd = ul;
    selectedTd.classList.add('highlight'); // подсветить новый td
};

// Переключатель вкладок
tabToday.onclick = function() {
    tabToday.style = 'border-bottom: 2px solid rgb(12, 162, 234); border-left: 1px solid #7f7f7f21;border-right: 1px solid #7f7f7f21; font-size: 18px;'
    $(".js_page_one").removeAttr('hidden');
    tabForecast.style = 'border:0'
    $(".js_page_second").attr('hidden', 'hidden');
};

tabForecast.onclick = function() {
    tabToday.style = 'border: 0px; font-size: 15px;'
    tabForecast.style = 'border-bottom: 2px solid rgb(12, 162, 234); border-left: 1px solid #7f7f7f21;border-right: 1px solid #7f7f7f21; font-size: 18px;'
    $(".js_page_second").removeAttr('hidden');
    $(".js_page_one").attr('hidden', 'hidden');
};