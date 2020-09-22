export const CalendarSchemaKey = 'Calendar';

export default class CalendarSchema {}

CalendarSchema.schema = {
  name: CalendarSchemaKey,
  properties: {
    startDate: 'date',
    endDate: 'date',
    title: 'string',
    label: 'int',
    picturePath: 'string',
  },
};
