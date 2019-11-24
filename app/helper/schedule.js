import moment from 'moment';

export function findCurrentTaskIndex(scheduleForToday) {
  const currentTime = moment().format('hhmm');

  const index = scheduleForToday.findIndex(x => {
    const start = Number(x.startTime);
    const end = Number(x.endTime);

    return start <= currentTime && end > currentTime;
  });

  return index;
}
