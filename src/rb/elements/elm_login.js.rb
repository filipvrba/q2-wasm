import 'CDatabase', '../components/elm-login/database'
import 'CVersions', '../components/elm-login/versions'

export default class ElmLogin < HTMLElement
  def initialize
    super

    @e_token_history = local_storage.get_item('q2et')
    @e_token         = URLParams.get('et') || @e_token_history
    @c_database = CDatabase.new
    @c_versions = CVersions.new(@c_database)
  end

  def connected_callback()
    Net.check_internet() do |is_online|
      if is_online
        @c_database.log_in(@e_token) do |logged_in|
          unless logged_in == nil
            local_storage.set_item('q2et', @e_token)

            @c_versions.controller() do
              quake2_init_elm(logged_in)
            end
          else
            missing_email_init_elm()
          end
        end
      else
        if local_storage.get_item('q2et')
          quake2_init_elm(nil)
        else
          missing_et()
        end
      end
    end
  end

  def disconnected_callback()
  end

  def missing_et()
    self.innerHTML = """
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
    """
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