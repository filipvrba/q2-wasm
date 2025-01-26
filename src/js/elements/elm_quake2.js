import CAchievements from "../components/elm-quake2/achievements";
import CDatabase from "../components/elm-quake2/database";

export default class ElmQuake2 extends HTMLElement {
  get cDatabase() {
    return this._cDatabase
  };

  get newsletterId() {
    return this._newsletterId
  };

  get isOnline() {
    return this._isOnline
  };

  constructor() {
    super();
    this._newsletterId = parseInt(this.getAttribute("newsletter-id")) || null;
    this._isOnline = this._newsletterId !== null;
    this._cAchievements = new CAchievements(this);
    this._cDatabase = new CDatabase(this);
    this.initElm()
  };

  connectedCallback() {
    this._cAchievements.connectedCallback();

    return Net.loadScript(
      "/module.js",
      () => Net.loadScript("/quake2.js", () => Quake2Init())
    )
  };

  disconnectedCallback() {
    return this._cAchievements.disconnectedCallback()
  };

  initElm() {
    let template = `${`
<figure id=spinner style=overflow:visible>
  <div class=spinner></div>
  <center style=margin-top:.5em>
    <strong>Quake 2</strong>
  </center>
</figure>
<div class=emscripten id=status>Downloading...</div>
<div class=emscripten>
  <progress hidden id=progress max=100 value=0></progress>
</div>

<textarea class=emscripten id=output readonly></textarea>
<canvas class=emscripten id=canvas oncontextmenu=event.preventDefault() tabindex=-1></canvas>
<a hidden id=exportFile></a>

<elm-achievement></elm-achievement>
    `}`;
    return this.innerHTML = template
  }
}