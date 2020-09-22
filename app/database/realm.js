import Realm from 'realm';
import ActivitySchema from './ActivitySchema';
import CalendarSchema from './CalendarSchema';

export default new Realm({
  schema: [ActivitySchema, CalendarSchema],
  deleteRealmIfMigrationNeeded: true,
});
