export const ActivitySchemaKey = 'Activity';

export default class ActivitySchema {}

ActivitySchema.schema = {
  name: ActivitySchemaKey,
  properties: {
    id: 'string',
    label: 'int',
    duration: 'int',
    title: 'string',
    picturePath: 'string?',
    majorEvent: 'bool',
    reminders: 'string?',
  },
};
