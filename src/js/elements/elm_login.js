export default class ElmLogin extends HTMLElement {
  constructor() {
    super()
  };

  connectedCallback() {
    return this.logIn(loggedIn => (
      loggedIn === null ? this.innerHTML = `${`
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
        `}` : this.innerHTML = `<elm-quake2 newsletter-id='${loggedIn}'></elm-quake2>`
    ))
  };

  disconnectedCallback() {
    return null
  };

  logIn(callback) {
    let eToken = URLParams.get("et");
    let query = `SELECT id FROM newsletter WHERE token = '${eToken}';`;

    return _BefDb.get(query, (rows) => {
      let loggedIn = rows.length > 0 ? rows[0].id : null;
      if (callback) return callback(loggedIn)
    })
  }
}