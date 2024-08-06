export default class CDatabase {
  constructor() {

  };

  logIn(eToken, callback) {
    let query = `SELECT id FROM newsletter WHERE token = '${eToken}';`;

    return _BefDb.get(query, (rows) => {
      let loggedIn = rows.length > 0 ? rows[0].id : null;
      if (callback) return callback(loggedIn)
    })
  };

  getQuake2Version(callback) {
    let query = "SELECT version FROM game_versions WHERE id = 1;";

    return _BefDb.get(query, (rows) => {
      if (rows.length > 0) {
        if (callback) return callback(rows[0].version)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  removeIndexDb(databaseName, callback) {
    let request = indexedDB.deleteDatabase(databaseName);

    request.onsuccess = () => {
      if (callback) return callback(true)
    };

    return request.onerror = () => {
      if (callback) return callback(false)
    }
  }
}