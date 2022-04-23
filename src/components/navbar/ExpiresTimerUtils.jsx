import dayjs from 'dayjs';

export function getRemainingTimeUntilMs(timestampMs) {
    const timestampDayJs = dayjs(timestampMs);
    const nowDayJs = dayjs();

    if(timestampDayJs.isBefore(nowDayJs)) {
        return {
            minutes: '00',
            seconds: '00'
        }
    }

    return {
        minutes: getRemainingMinutes(nowDayJs, timestampDayJs),
        seconds: getRemainingSeconds(nowDayJs, timestampDayJs)
    }
}

function getRemainingMinutes(nowDayJs, timestampDayJs) {
    const minutes = timestampDayJs.diff(nowDayJs, 'minutes') % 60;
    return padWithZeros(minutes, 2);
}

function getRemainingSeconds(nowDayJs, timestampDayJs) {
    const seconds = timestampDayJs.diff(nowDayJs, 'seconds') % 60;
    return padWithZeros(seconds, 2);
}

function padWithZeros(number, minLength) {
    const numberString = number.toString();
    if(numberString.length >= minLength) return numberString;
    return "0".repeat(minLength - numberString.length) +  numberString;
}