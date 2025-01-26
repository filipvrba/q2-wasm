export default class CDatabase {
  constructor(element) {
    this._element = element
  };

  unlockAchievement(achievementId, value, callback) {
    let query;
    let newsletterId = this._element.newsletterId;

    if (this._element.isOnline) {
      query = `INSERT INTO achievements (newsletter_id, achievement_id, value) VALUES (${newsletterId}, ${achievementId}, '${value}');`;
      _BefDb.isVerbose = false;

      return _BefDb.set(query, (isUnlocked) => {
        if (isUnlocked) {
          _BefDb.isVerbose = true;
          if (callback) return callback.call()
        }
      })
    } else if (callback) {
      return callback.call()
    }
  }
}