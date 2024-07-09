export default class ElmLogin extends HTMLElement {
  constructor() {
    super()
  };

  connectedCallback() {
    return this.logIn(isLoggedIn => (
      isLoggedIn ? this.innerHTML = "<elm-quake2></elm-quake2>" : this.innerHTML = `${`
        <div class='container centered-container'>
            <div class='card text-center'>
                <div class='card-body'>
                    <i class='bi bi-exclamation-triangle-fill text-warning' style='font-size: 2rem;'></i>
                    <h3 class='card-title mt-3'>Chybějící Email</h3>
                    <p class='card-text'>Nemáte registrovaný email. Prosím vraťte se zpět a zadejte svůj email.</p>
                    <button class='btn btn-primary' onclick='window.history.back();'>
                        <i class='bi bi-arrow-left-circle'></i> Zpět
                    </button>
                </div>
            </div>
        </div>
        `}`
    ))
  };

  disconnectedCallback() {
    return null
  };

  logIn(callback) {
    let email = URLParams.get("email");
    let query = `SELECT id FROM users WHERE email = '${email}';`;

    return _BefDb.get(query, (rows) => {
      let isLoggedIn = rows.length > 0 ? true : false;
      if (callback) return callback(isLoggedIn)
    })
  }
}