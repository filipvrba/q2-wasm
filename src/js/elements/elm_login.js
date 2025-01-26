import CDatabase from "../components/elm-login/database";
import CVersions from "../components/elm-login/versions";

export default class ElmLogin extends HTMLElement {
  constructor() {
    super();
    this._eTokenHistory = localStorage.getItem("q2et");
    this._eToken = URLParams.get("et") || this._eTokenHistory;
    this._cDatabase = new CDatabase;
    this._cVersions = new CVersions(this._cDatabase)
  };

  connectedCallback() {
    return Net.checkInternet((isOnline) => {
      if (isOnline) {
        return this._cDatabase.logIn(this._eToken, (loggedIn) => {
          if (loggedIn === null) {
            return this.missingEmailInitElm()
          } else {
            localStorage.setItem("q2et", this._eToken);
            return this._cVersions.controller(() => this.quake2InitElm(loggedIn))
          }
        })
      } else if (localStorage.getItem("q2et")) {
        return this.quake2InitElm(null)
      } else {
        return this.missingEt()
      }
    })
  };

  disconnectedCallback() {
    return null
  };

  missingEt() {
    return this.innerHTML = `${`
<div class='container col-lg-6 centered-container'>
  <div class='card text-center'>
    <div class='card-body'>
      <i class='bi bi-exclamation-triangle-fill text-warning' style='font-size: 2rem;'></i>
      <h3 class='card-title mt-3'>Chybějící Email</h3>
      <p class='card-text'>
        Momentálně jste v offline režimu a nemáte přístup ke hře Quake 2. 
        Abyste mohli tuto hru hrát, je nutné být online a přihlásit se k odběru newsletteru. 
        Po splnění těchto podmínek se vám odemkne možnost hrát hru i v offline režimu.
      </p>
      <a class='btn btn-secondary' href='https://filipvrba.vercel.app/#newsletter'>
        <i class='bi bi-arrow-left-circle'></i> Zpět
      </a>
    </div>
  </div>
</div>
    `}`
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