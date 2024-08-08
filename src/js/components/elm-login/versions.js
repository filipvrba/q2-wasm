import { ENV } from "../../env";

export default class CVersions {
  constructor(cDatabase) {
    this._cDatabase = cDatabase
  };

  versionControl() {
    let version = ENV.VITE_GAME_VERSION;
    let localVersion = localStorage.getItem("version");
    let isCurrentVersion = localVersion === version;
    if (!isCurrentVersion) localStorage.setItem("version", version);
    return isCurrentVersion
  };

  removeDatabases(callback) {
    return this._cDatabase.removeIndexDb(
      "/quake2-wasm",

      (isRemovedFirst) => {
        if (isRemovedFirst) {
          return this._cDatabase.removeIndexDb(
            "fileStorage",

            (isRemovedSecond) => {
              if (isRemovedSecond) return callback.call()
            }
          )
        }
      }
    )
  };

  controller(callback) {
    let isCurrentVersion = this.versionControl();

    if (isCurrentVersion) {
      console.log("The version is up to date.");
      if (callback) return callback.call()
    } else {
      return this.removeDatabases(() => {
        console.log("Deleted databases from IndexedDB.");
        if (callback) return callback.call()
      })
    }
  }
}