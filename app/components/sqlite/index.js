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

        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS CalendarActivity ( ' +
            'id VARCHAR PRIMARY KEY NOT NULL, ' +
            'title VARCHAR NOT NULL, ' +
            'duration INTEGER NOT NULL, ' +
            'label INTEGER NOT NULL, ' +
            'picturePath VARCHAR, ' +
            'timeBlockIdx INTEGER NOT NULL, ' +
            'segmentIdx INTEGER NOT NULL, ' +
            'date DATE NOT NULL );',
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

  /** Creates new activity on the activity list
   * @param {*} activity new activity
   */
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

  /** Updates an activity on the activity list
   *
   * @param {*} activity placed activity
   */
  updateActivity(activity) {
    return new Promise((resolve, reject) => {
      SQLite.openDatabase({name: this.database_name})
        .then(instance => {
          instance
            .transaction(tx => {
              tx.executeSql(
                'UPDATE ActivityList SET label=?,duration=?,title=?,majorEvent=?,picturePath=?,subactivities=?,reminders=? WHERE id=?',
                [
                  activity.label,
                  activity.duration,
                  activity.title,
                  activity.majorEvent,
                  activity.picturePath,
                  activity.subactivities,
                  activity.reminders,
                  activity.id,
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

  /** Creates an event on the calendar
   * @param {*} activity placed activity
   */
  createCalendarActivity(activity) {
    return new Promise((resolve, reject) => {
      SQLite.openDatabase({name: this.database_name}).then(instance => {
        instance
          .transaction(tx => {
            tx.executeSql(
              'INSERT INTO CalendarActivity (id, title, duration, label, picturePath, timeBlockIdx, segmentIdx, date) VALUES (?,?,?,?,?,?,?,?);',
              [
                activity.id,
                activity.title,
                activity.duration,
                activity.label,
                activity.picturePath,
                activity.timeBlockIdx,
                activity.segmentIdx,
                activity.date,
              ],
            )
              .then(([results]) => {
                resolve(results);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      });
    });
  }

  getCalendarActivities(date) {
    return new Promise((resolve, reject) => {
      SQLite.openDatabase({name: this.database_name})
        .then(instance => {
          instance
            .executeSql('SELECT * FROM CalendarActivity WHERE date = ?', [date])
            .then(([results]) => {
              resolve(this._transformToArray(results));
            });
        })
        .catch(err => reject(err));
    });
  }

  deleteCalendarActivity(activityId) {
    return new Promise((resolve, reject) => {
      SQLite.openDatabase({name: this.database_name})
        .then(instance => {
          instance
            .executeSql('DELETE FROM CalendarActivity WHERE id = ?', [
              activityId,
            ])
            .then(() => resolve())
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  deleteActivityListItem(activityListId) {
    return new Promise((resolve, reject) => {
      SQLite.openDatabase({name: this.database_name})
        .then(instance => {
          instance
            .executeSql('DELETE FROM ActivityList WHERE id = ?', [
              activityListId,
            ])
            .then(() => resolve())
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
}

export default new DatabaseHelper();
