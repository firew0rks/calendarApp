import moment from 'moment';

export function findCurrentTaskIndex(scheduleForToday) {
  const currentTime = moment().format('HHmm');

  const index = scheduleForToday.findIndex(x => {
    const start = Number(x.startTime);
    const end = Number(x.endTime);

    console.log(start, end, currentTime);

    return start <= currentTime && end > currentTime;
  });

  return index;
}
