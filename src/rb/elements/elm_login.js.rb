import 'CDatabase', '../components/elm-login/database'
import 'CVersions', '../components/elm-login/versions'

export default class ElmLogin < HTMLElement
  def initialize
    super

    @e_token = URLParams.get('et')
    @c_database = CDatabase.new
    @c_versions = CVersions.new(@c_database)
  end

  def connected_callback()
    @c_database.log_in(@e_token) do |logged_in|
      unless logged_in == nil
        @c_versions.controller() do
          quake2_init_elm(logged_in)
        end
      else
        missing_email_init_elm()
      end
    end
  end

  def disconnected_callback()
  end

  def missing_email_init_elm()
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

  def quake2_init_elm(logged_in)
    self.innerHTML = "<elm-quake2 newsletter-id='#{logged_in}'></elm-quake2>"
  end
end