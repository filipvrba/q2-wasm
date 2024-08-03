import 'CAchievements', '../components/elm-quake2/achievements'
import 'CDatabase', '../components/elm-quake2/database'

export default class ElmQuake2 < HTMLElement
  attr_reader :c_database, :newsletter_id

  def initialize
    super
  
    @newsletter_id  = self.get_attribute('newsletter-id').to_i

    @c_achievements = CAchievements.new(self)
    @c_database     = CDatabase.new(self)

    init_elm()
  end

  def connected_callback()
    @c_achievements.connected_callback()

    Net.load_script('/module.js') do
      Net.load_script('/quake2.js') do
        Quake2Init()
      end
    end
  end

  def disconnected_callback()
    @c_achievements.disconnected_callback()
  end

  def init_elm()
    template = """
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

<elm-achievement></elm-achievement>
    """

    self.innerHTML = template
  end
end