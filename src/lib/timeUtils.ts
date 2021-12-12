import type { DateTime } from "luxon";

export function humanReadableTime(hoursAsDecimal) {
    let sign = (hoursAsDecimal >= 0) ? 1 : -1;
    hoursAsDecimal = hoursAsDecimal * sign;
    const hour = Math.floor(hoursAsDecimal);
    let decimalPart = hoursAsDecimal - hour;
    const min = 1 / 60;
    decimalPart = min * Math.round(decimalPart / min);
    let minute = Math.floor(decimalPart * 60) + '';

    if (minute.length < 2) {
        minute = '0' + minute;
    }
    let finalSign = sign === 1 ? '' : '-';

    return finalSign + hour + ':' + minute;
}

export function getBusinessDaysCount(startDate: DateTime, endDate: DateTime): number {
    let count = 0;
    let curDate = startDate
    while (curDate <= endDate) {
        const dayOfWeek = curDate.weekday
        if(dayOfWeek !== 6 && dayOfWeek !== 7) count++;
        curDate = curDate.plus({days: 1})
    }
    console.log(count)
    return count;
}