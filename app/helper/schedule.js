import moment from 'moment';

export function findCurrentTaskIndex(scheduleForToday) {
  const currentTime = moment().format('HHmm');

  const index = scheduleForToday.findIndex(x => {
    const start = Number(x.startTime);
    let end = Number(x.endTime);

    if (end == 0) {
      end = Infinity;
    }

    return start <= currentTime && end > currentTime;
  });

  return index;
}
