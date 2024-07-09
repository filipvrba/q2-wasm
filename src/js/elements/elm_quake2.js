export default class ElmQuake2 extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  connectedCallback() {
    return Net.loadScript(
      "/module.js",
      () => Net.loadScript("/quake2.js", () => Quake2Init())
    )
  };

  disconnectedCallback() {
    return null
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
    `}`;
    return this.innerHTML = template
  }
}