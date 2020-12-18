import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);

class DatabaseHelper {
  dbName = 'Test.db';

  _transformToArray(results) {
    let resultsArray = [];

    for (var i = 0; i < results.rows.length; i++) {
      resultsArray.push(results.rows.item(i));
    }

    console.log('resultsArray', resultsArray);
    return resultsArray;
  }

  openDatabase(successCallback, errorCallback) {
    SQLite.openDatabase({name: this.dbName}, successCallback, errorCallback);
  }

  genericErrorCallback(error) {
    console.log('Db error occured', error);
  }

  getActivityList(resultsCallback) {
    const db = this.openDatabase(() => {}, this.genericErrorCallback);

    db.executeSql(
      'SELECT * FROM ActivityList;',
      [],
      function([results]) {
        console.log(results);
        const resultArray = this._transformToArray(results);
        resultsCallback(resultArray);
      },
      this.genericErrorCallback,
    );
  }
}

export default new DatabaseHelper();
