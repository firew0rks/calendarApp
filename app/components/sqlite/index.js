import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

class DatabaseHelper {
  database_name = 'Test.db';
  database_version = '1.0';
  database_displayname = 'SQLite Test Database';
  database_size = 200000;

  constructor() {
    this.openDatabase().then(db => {
      // db.close();
    });
  }

  _transformToArray(results) {
    let resultsArray = [];

    for (var i = 0; i < results.rows.length; i++) {
      resultsArray.push(results.rows.item(i));
    }

    return resultsArray;
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
        .then(async DB => {
          await this.initDatabase(DB);
          resolve(DB);
        })
        .catch(err => reject(err));
    });
  }

  // openDatabase() {
  //   return SQLite.openDatabase({name: this.database_name});
  // }

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

  async initDatabase(DB) {
    try {
      await DB.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS ActivityList ( ' +
            'id VARCHAR PRIMARY KEY NOT NULL, ' +
            'label INTEGER NOT NULL, ' +
            'duration INTEGER NOT NULL, ' +
            'title VARCHAR NOT NULL, ' +
            'picturePath VARCHAR, ' +
            'majorEvent BOOLEAN NOT NULL, ' +
            'reminders VARCHAR, ' +
            'subactivities VARCHAR );',
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
    //       'subactivities VARCHAR );',
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

  // getActivityList() {
  //   return new Promise(async (resolve, reject) => {
  //     if (!db) {
  //       console.log('getActivityList, db not opened so opening');
  //       await this.openDatabase();
  //     }

  //     console.log('Executing get', db);
  //     db.executeSql('SELECT * FROM ActivityList;')
  //       .then(([results]) => {
  //         console.log('##tx', results);
  //         resolve(this._transformToArray(results));
  //       })
  //       .catch(err => reject(err));
  //   });
  // }

  getActivityList() {
    return new Promise((resolve, reject) => {
      SQLite.openDatabase({name: this.database_name}).then(instance => {
        instance
          .executeSql('SELECT * FROM ActivityList;')
          .then(([results]) => {
            console.log(results);
            const resultArray = this._transformToArray(results);
            resolve(resultArray);
          })
          .catch(err => {
            reject(err);
          })
          .catch(err => reject(err));
      });
    });
  }

  createActivity(activity) {
    return new Promise((resolve, reject) => {
      SQLite.openDatabase({name: this.database_name})
        .then(instance => {
          console.log('Opened database');
          console.log(activity);
          instance
            .transaction(tx => {
              tx.executeSql(
                'INSERT INTO ActivityList (id, label, duration, title, picturePath, majorEvent, reminders, subactivities ) VALUES ( ?,?,?,?,?,?,?,? ) ;',
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
            })
            .then(([results]) => {
              resolve(results);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  // async createActivity(activity) {
  //   try {
  //     if (db) {
  //       console.log('inserting into db', db, activity);
  //       await db
  //         .executeSql(
  //           'INSERT INTO ActivityList ( ' +
  //             'id, label, duration, title, picturePath, majorEvent, reminders, subactivities )' +
  //             'VALUES ( ?,?,?,?,?,?,?,? ) ;',
  //           [
  //             activity.id,
  //             activity.label,
  //             activity.duration,
  //             activity.title,
  //             activity.picturePath,
  //             activity.majorEvent,
  //             activity.reminders,
  //             activity.subactivities,
  //           ],
  //         )
  //         .then(result => {
  //           console.log('finished');
  //           return DatabaseHelper._transformToArray(result);
  //         })
  //         .catch(err => console.log('createActivityError', err));
  //     } else {
  //       throw new Error('No active database connection');
  //     }
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }
}

export default new DatabaseHelper();
