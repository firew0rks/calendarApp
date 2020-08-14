import Realm from 'realm';
import ActivitySchema from './ActivitySchema';

export default new Realm({
  schema: [ActivitySchema],
  deleteRealmIfMigrationNeeded: true,
});
