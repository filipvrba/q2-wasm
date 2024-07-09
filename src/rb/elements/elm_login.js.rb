export default class ElmLogin < HTMLElement
  def initialize
    super
  end

  def connected_callback()
    log_in do |is_logged_in|
      if is_logged_in
        self.innerHTML = "<elm-quake2></elm-quake2>"
      else
        self.innerHTML = """
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
        """ 
      end
    end
  end

  def disconnected_callback()
  end

  def log_in(&callback)
    email = URLParams.get('email')
    query = "SELECT id FROM users " +
            "WHERE email = '#{email}';"

    __bef_db.get(query) do |rows|
      is_logged_in = rows.length > 0 ? true : false
      callback(is_logged_in) if callback
    end
  end
end