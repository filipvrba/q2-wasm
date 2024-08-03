export default class ElmLogin < HTMLElement
  def initialize
    super
  end

  def connected_callback()
    log_in do |logged_in|
      unless logged_in == nil
        self.innerHTML = "<elm-quake2 newsletter-id='#{logged_in}'></elm-quake2>"
      else
        self.innerHTML = """
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
        """ 
      end
    end
  end

  def disconnected_callback()
  end

  def log_in(&callback)
    e_token = URLParams.get('et')
    query = "SELECT id FROM newsletter " +
            "WHERE token = '#{e_token}';"

    __bef_db.get(query) do |rows|
      logged_in = rows.length > 0 ? rows[0].id : nil
      callback(logged_in) if callback
    end
  end
end