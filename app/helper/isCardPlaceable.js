import moment from 'moment';
import {timeBlocks} from '../constants';

/** Works out whether the card is allowed to be placed on the calendar.
 * @param placedActivities list of activities on the calendar
 * @param duration duration of the activity to be added
 * @param guiderSegmentIdx segment of the activity to be added
 * @param guiderTimeBlockIdx timeblock of the activity to be added
 * @returns boolean of whether the card can be placed.
 */
export function isCardPlaceable(
  placedActivities,
  duration,
  guiderSegmentIdx,
  guiderTimeBlockIdx,
) {
  // Calculate start/end times on where the dragged activity is going to be placed.
  const now = moment();
  const daStartHour = timeBlocks[guiderTimeBlockIdx].time;
  const daStartMinutes = guiderSegmentIdx ? 30 : 0;
  const daStartTime = now
    .clone()
    .hour(daStartHour)
    .minute(daStartMinutes);
  const daEndTime = daStartTime.clone().add(duration, 'minutes');

  // Compare start/end time to work out whether there's overlap
  const overlap = placedActivities.reduce((acc, cur) => {
    // If any of the cards are overlapped, the dragged card is not placeable.
    if (acc) return acc;

    const curStartHour = timeBlocks[cur.timeBlockIdx].time;
    const curStartMinutes = cur.segmentIdx ? 30 : 0;
    const curStartTime = now
      .clone()
      .hour(curStartHour)
      .minute(curStartMinutes);
    const curEndTime = curStartTime.clone().add(cur.duration, 'minutes');

    if (
      daStartTime.format('HH:mm') < curEndTime.format('HH:mm') &&
      curStartTime.format('HH:mm') < daEndTime.format('HH:mm')
    ) {
      return true;
    } else {
      return false;
    }
  }, false);

  return !overlap;
}
