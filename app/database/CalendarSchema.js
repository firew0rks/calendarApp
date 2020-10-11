import Realm from 'realm';

export const CalendarSchemaKey = 'Calendar';

export default class CalendarSchema extends Realm.Object {}

CalendarSchema.schema = {
  name: CalendarSchemaKey,
  properties: {
    startDatetime: 'date',
    endDatetime: 'date',
    title: 'string',
    label: 'int',
    picturePath: 'string',
  },
};
