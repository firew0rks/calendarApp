import Realm from 'realm';

export const ActivitySchemaKey = 'Activity';

export default class ActivitySchema extends Realm.Object {}

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
    subactivities: 'string?[]',
  },
};
