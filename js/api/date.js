'use strict';

function DATE_API() {}

//Получить часы , минуты
DATE_API.getTime = function(timeForW, timezone) {
    const dat = new Date((timeForW + timezone) * 1000);
    return ` ${(dat.getUTCHours() > 12) ? dat.getUTCHours() - 12: dat.getUTCHours()}:${(dat.getUTCMinutes()<10) ? '0' + dat.getUTCMinutes() : dat.getUTCMinutes()} `;
};
//Получить время
DATE_API.getTimeAmPm = function(dt, timezone) {
    let dtUTC = new Date((dt + timezone) * 1000);
    return `${(dtUTC.getUTCHours() > 12) ?  dtUTC.getUTCHours() - 12 + ' PM' : dtUTC.getUTCHours() + ' AM' }  `;
};

//Получить день , месяц
DATE_API.dateNowF = function(dt, timezone) {
    const date = new Date((dt + timezone) * 1000);
    let now = `${(date.getUTCDate()  < 10 ? '0' + date.getUTCDate() 
    : date.getUTCDate())}.${(date.getUTCMonth() < 10) ? '0' + date.getUTCMonth() : date.getUTCMonth()}.${date.getUTCFullYear()}

    ${(date.getUTCHours() > 12) ? date.getUTCHours() - 12  : date.getUTCHours()}:${(date.getMinutes()<10) ? '0' + date.getMinutes() 
    : date.getMinutes()} `;
    return now;
};

//Получить разницу между восходом и закатом
DATE_API.durationTime = function(rise, set) {
    let datForRise = new Date(rise * 1000);
    let datForSet = new Date(set * 1000);
    let res = (datForSet.getTime() - datForRise.getTime()) / 36e5;
    let x = parseInt(res);
    let y = +(((res - x) / 100) * 60).toFixed(3).slice(2, -1);
    return `${x}:${y}`;
};
//Получить короткое описание дня недели
DATE_API.getDateForNextDay = function(dt, timezone) {
    let dtNow = new Date((dt + timezone) * 1000);
    return `${dtNow.toLocaleString('en-US', { weekday: 'short' })}`;
};
//Получить короткое описание месяца и дня
DATE_API.getMounthForNextDay = function(mnth, timezone) {
    let dtNow = new Date((mnth + timezone) * 1000);
    return `${dtNow.toLocaleString('en-US', { month: 'short' })}  ${((dtNow.getUTCDate() < 10) ? '0' + dtNow.getUTCDate() : dtNow.getUTCDate())}`;
};
//Получить полное описание дня недели
DATE_API.getMounthForNextDayFull = function(dt, timezone) {
    let dtNow = new Date((dt + timezone) * 1000);
    return `${dtNow.toLocaleString('en-US', { weekday: 'long' })}`;

};