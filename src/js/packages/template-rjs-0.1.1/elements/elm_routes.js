export default class ElmRoutes extends HTMLElement {
  constructor() {
    super();

    this._lHashchange = () => {
      return this.changePage()
    };

    this._titleApp = document.title;
    this.changePage()
  };

  connectedCallback() {
    return window.addEventListener("hashchange", this._lHashchange)
  };

  disconnectedCallback() {
    return window.removeEventListener("hashchange", this._lHashchange)
  };

  changePage() {
    let currentPage = this.findCurrentPage();
    if (currentPage) return this.initPage(currentPage)
  };

  findCurrentPage() {
    for (let page of ROUTES_JSON.pages) {
      if (page.endpoint !== location.hash.replace("#", "")) continue;
      return page
    };

    return null
  };

  initPage(page) {
    let pageName = page.endpoint;
    let content = PAGES[pageName];
    return this.initElm(content, page)
  };

  initElm(content, page=null) {
    let template = `${`\n    ${page ? content.replace(
      "TITLE",
      page.title
    ) : null}\n    `}`;

    return this.innerHTML = template
  }
}