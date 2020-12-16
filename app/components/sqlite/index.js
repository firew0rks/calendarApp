import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

class DatabaseHelper {
  database_name = 'Test.db';
  database_version = '1.0';
  database_displayname = 'SQLite Test Database';
  database_size = 200000;

  constructor() {
    if (!this.db) {
      this.openDatabase();
    }
  }

  openDatabase() {
    return new Promise((resolve, reject) => {
      SQLite.openDatabase(
        this.database_name,
        this.database_version,
        this.database_displayname,
        this.database_size,
        this._openDatabaseSuccess,
        this._openDatabaseError,
      )
        .then(async db => {
          await this.initDatabase(db);
          this.db = db;
          resolve(db);
        })
        .catch(err => reject(err));
    });
  }

  closeDatabase() {
    if (this.db) {
      console.log('Closing database ...');
      this.db.close();
    }
  }

  getDatabase() {
    return this.db;
  }

  async test() {
    try {
      const [, results] = await this.db.executeSql(
        'SELECT 1 FROM Version LIMIT 1',
      );

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async initDatabase(db) {
    try {
      await db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS ActivityList ( ' +
            'id INTEGER PRIMARY KEY NOT NULL, ' +
            'label INTEGER NOT NULL, ' +
            'duration INTEGER NOT NULL, ' +
            'title VARCHAR NOT NULL, ' +
            'picturePath VARCHAR, ' +
            'majorEvent BOOLEAN NOT NULL, ' +
            'reminders VARCHAR, ' +
            'subactivites VARCHAR );',
        );
      });

      console.log('Initialised DB');
    } catch (err) {
      console.log('Initialised failed');
      console.log(err);
    }

    // db.transaction(tx => {
    //   tx.executeSql(
    //     'CREATE TABLE IF NOT EXISTS ActivityList ( ' +
    //       'id INTEGER PRIMARY KEY NOT NULL, ' +
    //       'label INTEGER NOT NULL, ' +
    //       'duration INTEGER NOT NULL, ' +
    //       'title VARCHAR NOT NULL, ' +
    //       'picturePath VARCHAR, ' +
    //       'majorEvent BOOLEAN NOT NULL, ' +
    //       'reminders VARCHAR, ' +
    //       'subactivites VARCHAR );',
    //   );

    //   // TODO Create CalendarActivityList
    //   // https://github.com/andpor/react-native-sqlite-storage/blob/master/test/index.ios.promise.js
    // })
    //   .then(tx => {
    //     console.log(tx);
    //     console.log('Initialised DB');
    //   })
    //   .catch(err => {
    //     console.log('Initialised failed');
    //     console.log(err);
    //   });
  }

  getActivityList() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db
          .executeSql('SELECT * FROM ActivityList;')
          .then((_, results) => resolve(results))
          .catch(err => reject(err));
      } else {
        return reject('!!!Database not opened');
      }
    });
  }

  async createActivity(activity) {
    try {
      if (this.db) {
        this.db.executeSql(
          'INSERT INTO ActivityList ( ' +
            'id, label, duration, title, picturePath, majorEvent, reminders, subactivities )' +
            'VALUES ( ?,?,?,?,?,?,?,? ) ;',
          [
            activity.id,
            activity.label,
            activity.duration,
            activity.title,
            activity.picturePath,
            activity.majorEvent,
            activity.reminders,
            activity.subactivities,
          ],
        );
      } else {
        throw new Error('No active database connection');
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new DatabaseHelper();
