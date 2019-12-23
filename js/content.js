'use strict';

function CONTENT() {}
//Функция для заполнения первого блока, певрого страницы
CONTENT.content = function({ dt, timezone, name, main, sys, weather: [{ icon, description }] } = json, elem, secElem) {
    $(".js_date").html(`${DATE_API.dateNowF(dt,timezone)}`);
    curCityDataAll.forEach(elem => elem.innerHTML = '');
    inputCity.placeholder = `${name} , ${sys.country}`;
    secElem[0].innerHTML = `<img src='${OWM_API.getWeatherIcon(icon)}' alt='icon' />
    <span>${description} </span> `;
    secElem[1].innerHTML = ` <li>${name}</li> <li> ${Math.round(main.temp)} &#8451 </li>`;
    elem[0].innerHTML = `Sunrise: ${ DATE_API.getTime(sys.sunrise,timezone)}  AM`;
    elem[1].innerHTML = `Sunset: ${ DATE_API.getTime(sys.sunset,timezone)} PM`;
    elem[2].innerHTML = `Duration: ${DATE_API.durationTime(sys.sunrise,sys.sunset)} hr`;
};

//Функция для заполнения первого блока, второй страницы(Погода переключатель на 5 дней)
CONTENT.contentFiveDays = function({ list, city } = json) {
    let stepDt = 8,
        stepCont = 0;
    secFirstColAll.forEach(elem => elem.innerHTML = '');
    for (let j = 0; j < secFirstColAll.length; j++) {
        (j === 0) ? secFirstColAll[j].innerHTML += `<li>Today</li>`: secFirstColAll[j].innerHTML += ` <li>${DATE_API.getDateForNextDay(list[stepCont].dt, city.timezone)}</li>`;
        secFirstColAll[j].innerHTML += `             
                <li>${DATE_API.getMounthForNextDay(list[stepCont].dt,city.timezone)}</li>
                <img src='${OWM_API.getWeatherIcon(list[stepCont].weather[0].icon)}' alt='icon' />
                <li class='tempr'>${Math.round(list[stepCont].main.temp_max)}&#8451</li>
                <li>${list[stepCont].weather[0].main}</li>`
        stepCont += 8;
    }
};

// Функция для переключения погоды
CONTENT.clickFunc = function(json) {
    CONTENT.contentForEveruThreeHours(json, 0);
    secFirstColAll.forEach((elemen, index) => {
        elemen.onclick = function() {
            if (elemen.classList.contains('highlight')) return;
            if (index === 0) {
                CONTENT.contentForEveruThreeHours(json, 0);
            } else if (index === 1) {
                CONTENT.contentForEveruThreeHours(json, 1);
            } else if (index === 2) {
                CONTENT.contentForEveruThreeHours(json, 2);
            } else if (index === 3) {
                CONTENT.contentForEveruThreeHours(json, 3);
            } else if (index === 4) {
                CONTENT.contentForEveruThreeHours(json, 4);
            }
        }
    });
};
// Функция для получения массива из 4 подмассивов по датам 
CONTENT.contentForEveruThreeHours = function(json, step) {
    let today = new Date(json.list[0].dt * 1000),
        timezone = json.city.timezone,
        count = [1, 2, 3, 4];
    let arr = [],
        obj;
    count.forEach(function(item) {
        obj = [];
        obj.push(timezone);
        today.setDate(today.getDate() + 1);
        json.list.forEach(function(item) {
            let data = new Date(item.dt * 1000);
            if (data.getDate() === today.getDate()) {
                obj.push(item);
            }
        });
        arr.push(obj);
    });
    CONTENT.day(json, arr, secSectionAllul, 0);
    CONTENT.day(json, arr, sectionForUl, step || 0);
};

// Функция для заполнения блоков с погодой 
CONTENT.day = function({ list, city } = json, arr, elem, step) {
    step = step || 0;
    elem[0].innerHTML = '';
    elem[1].innerHTML = '';
    elem[2].innerHTML = '  <h4>Forecast</h4>';
    elem[3].innerHTML = '<h4>Temp (&#8451 )</h4>';
    elem[4].innerHTML = '<h4>Wind (km/h)</h4>';
    elem[5].innerHTML = '<h4>Humidity</h4>';
    if (step === 0) {
        for (let i = 0; i < 7; i++) {
            elem[0].innerHTML += `<li>${DATE_API.getTimeAmPm(list[i].dt, city.timezone)}</li>`;
            elem[1].innerHTML += `<img src='${OWM_API.getWeatherIcon(list[i].weather[0].icon)}' alt='icon' class='small'  />`;
            elem[2].innerHTML += `<li>${list[i].weather[0].main}</li>`;
            elem[3].innerHTML += `<li>${Math.round(list[i].main.temp)}&#8451 </li>`;
            elem[4].innerHTML += `<li>${Math.trunc(list[i].wind.speed)} ${windDegree(list[i].wind.deg)}</li>`;
            elem[5].innerHTML += `<li>${list[i].main.humidity} %</li>`;
        }
    } else {
        step--;
        for (let i = 1; i < 8; i++) {
            elem[0].innerHTML += `<li>${DATE_API.getTimeAmPm(arr[step][i].dt, arr[0][0])}</li>`;
            elem[1].innerHTML += `<img src='${OWM_API.getWeatherIcon(arr[step][i].weather[0].icon)}' alt='icon' class='small'  />`;
            elem[2].innerHTML += `<li>${arr[step][i].weather[0].main}</li>`;
            elem[3].innerHTML += `<li>${Math.round(arr[step][i].main.temp)}&#8451 </li>`;
            elem[4].innerHTML += `<li>${Math.trunc(arr[step][i].wind.speed)} ${windDegree(arr[step][i].wind.deg)}</li>`;
            elem[5].innerHTML += `<li>${arr[step][i].main.humidity} % </li>`;

        }
    }
};

// Функция для заполнения блока с соседними городами
CONTENT.getNearesCity = function({ list } = jsonNeares) {
    let step = 0;
    nearest.forEach(elem => elem.innerHTML = '');
    for (let i = 0; i < 4; i++) {
        let icon = list[step].weather[0].icon,
            name = list[step].name,
            temp = list[step].main.temp;
        nearest[i].innerHTML += `<li>${name} </li>
            <img src='${OWM_API.getWeatherIcon(icon)}' alt='icon' class='smallest' />
                <li>${Math.round(temp)}&#8451</li> `;
        step += 1;
    }
};
// Направление ветра
function windDegree(deg) {
    if (deg < 22.5) {
        return `N`;
    } else if (deg < 45) {
        return `NNE`;
    } else if (deg < 67.5) {
        return `NE`;
    } else if (deg < 90) {
        return `ENE`;
    } else if (deg < 112.5) {
        return `E`;
    } else if (deg < 135) {
        return `ESE`;
    } else if (deg < 157.5) {
        return `SE`;
    } else if (deg < 180) {
        return `SSE`;
    } else if (deg < 202.5) {
        return `S`;
    } else if (deg < 225) {
        return `SSW`;
    } else if (deg < 247.5) {
        return `SW`;
    } else if (deg < 270) {
        return `WSW`;
    } else if (deg < 292.5) {
        return `W`;
    } else if (deg < 315) {
        return `WNW`;
    } else if (deg < 337.5) {
        return `NW`;
    } else if (deg < 360) {
        return `NNB`;
    }
}