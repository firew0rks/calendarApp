import moment from 'moment';

export function findCurrentTaskIndex(scheduleForToday) {
  let currentTime = moment();

  // Between 8PM and 8AM the next day, now = last activity, next = tomorrow's activity
  if (currentTime.isAfter('20', 'hour')) {
    console.log('after 8PM');
    return scheduleForToday.length - 1;
  } else if (currentTime.isBefore('8', 'hour')) {
    console.log('before 8AM');
    return scheduleForToday.length - 1;
  }

  const index = scheduleForToday.findIndex(x => {
    const start = Number(x.startTime);
    let end = Number(x.endTime);

    if (end == 0) {
      end = Infinity;
    }

    return (
      start <= currentTime.format('HHmm') && end > currentTime.format('HHmm')
    );
  });

  return index;
}
