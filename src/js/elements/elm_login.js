import CDatabase from "../components/elm-login/database";
import CVersions from "../components/elm-login/versions";

export default class ElmLogin extends HTMLElement {
  constructor() {
    super();
    this._eToken = URLParams.get("et");
    this._cDatabase = new CDatabase;
    this._cVersions = new CVersions(this._cDatabase)
  };

  connectedCallback() {
    return this._cDatabase.logIn(this._eToken, loggedIn => (
      loggedIn === null ? this.missingEmailInitElm() : this._cVersions.controller(() => (
        this.quake2InitElm(loggedIn)
      ))
    ))
  };

  disconnectedCallback() {
    return null
  };

  missingEmailInitElm() {
    return this.innerHTML = `${`
    <div class='container col-lg-6 centered-container'>
        <div class='card text-center'>
            <div class='card-body'>
                <i class='bi bi-exclamation-triangle-fill text-warning' style='font-size: 2rem;'></i>
                <h3 class='card-title mt-3'>Chybějící Email</h3>
                <p class='card-text'>
                  Nemáte přístup k této hře Quake 2.
                  Pro získání přístupu je nutné přihlásit se k
                  odběru newsletteru. Prosím vraťte se zpět do
                  sekce newsletter a zadejte svůj email pro přihlášení k odběru.
                </p>
                <a class='btn btn-secondary' href='https://filipvrba.vercel.app/#newsletter'>
                    <i class='bi bi-arrow-left-circle'></i> Zpět
                </a>
            </div>
        </div>
    </div>
    `}`
  };

  quake2InitElm(loggedIn) {
    return this.innerHTML = `<elm-quake2 newsletter-id='${loggedIn}'></elm-quake2>`
  }
}