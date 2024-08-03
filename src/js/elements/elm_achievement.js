export default class ElmAchievement extends HTMLElement {
  constructor() {
    super();
    this._hShow = e => this.show(e.detail.value);
    this.initElm();
    this._notification = this.querySelector("#achievementNotification");
    this._img = this.querySelector("#achievementImg");
    this._title = this.querySelector("#achievementTitle");
    this._description = this.querySelector("#achievementDescription")
  };

  connectedCallback() {
    return Events.connect("#app", ElmAchievement.ENVS.show, this._hShow)
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      ElmAchievement.ENVS.show,
      this._hShow
    )
  };

  show(options) {
    if (!options) return;
    this._img.src = options.img;
    this._title.innerHTML = options.title;
    this._description.innerHTML = options.description;
    console.log(`Achievement ${options.title}: ${options.description}`);
    this.display(true);
    let lUnshow = () => this.display(false);
    return setTimeout(lUnshow, 8_000)
  };

  initElm() {
    let template = `${`
<div class='achievement-notification' id='achievementNotification'>
  <div class='d-flex align-items-center'>
    <img id='achievementImg' src='/png/achievement_0.png' alt='Achievement Image' class='me-3'>
    <div>
      <h5 class='mb-1' id='achievementTitle'>Achievement Title</h5>
      <p class='mb-0' id='achievementDescription'>Achievement description goes here.</p>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  };

  display(isShow) {
    return isShow ? this._notification.classList.add("show") : this._notification.classList.remove("show")
  }
};

ElmAchievement.ENVS = {show: "0elmAch"}