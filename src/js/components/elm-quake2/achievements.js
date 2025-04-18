import ElmAchievement from "../../elements/elm_achievement";

export default class CAchievements {
  constructor(element) {
    this._element = element;
    this._hUnlockAchievement = e => this.unlockAchievement(e.detail.value)
  };

  connectedCallback() {
    return Events.connect(
      "#app",
      CAchievements.ENVS.unlockAchievement,
      this._hUnlockAchievement
    )
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      CAchievements.ENVS.unlockAchievement,
      this._hUnlockAchievement
    )
  };

  unlockAchievement(options) {
    let achievementId = options.id;
    let values = options.s_values;

    return this.getDataFromObj(achievementId, values, (data) => {
      let description = data.description;

      return this._element.cDatabase.unlockAchievement(
        achievementId,
        data.description,

        () => {
          let showOptions = {img: data.img, title: data.title, description};
          return Events.emit("#app", ElmAchievement.ENVS.show, showOptions)
        }
      )
    })
  };

  getDataFromObj(achievementId, values, callback) {
    switch (true) {
    case achievementId >= 0 && achievementId <= 1:

      return Net.objCurl("/json/achievements.json", (objAchivements) => {
        let achievement = objAchivements.ids[achievementId];
        let img = achievement.img;
        let title = achievement.name;
        let description = values;
        if (callback) callback({img, title, description});
        return
      })
    }
  }
};

CAchievements.ENVS = {unlockAchievement: "unlock-achievement"}