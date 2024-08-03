export default class ElmAchievement < HTMLElement
  ENVS = {
    show: '0elmAch'
  }

  def initialize
    super

    @h_show = lambda { |e| show(e.detail.value) }
    
    init_elm()

    @notification = self.query_selector('#achievementNotification')
    @img          = self.query_selector('#achievementImg')
    @title        = self.query_selector('#achievementTitle')
    @description  = self.query_selector('#achievementDescription')
  end

  def connected_callback()
    Events.connect('#app', ElmAchievement::ENVS.show, @h_show)
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmAchievement::ENVS.show, @h_show)
  end

  def show(options)
    unless options
      return
    end

    @img.src               = options['img']
    @title.innerHTML       = options['title']
    @description.innerHTML = options['description']

    puts "Achievement #{options['title']}: #{options['description']}"

    display(true)
    l_unshow = lambda { display(false) }
    set_timeout(l_unshow, 8_000)
  end

  def init_elm()
    template = """
<div class='achievement-notification' id='achievementNotification'>
  <div class='d-flex align-items-center'>
    <img id='achievementImg' src='/png/achievement_0.png' alt='Achievement Image' class='me-3'>
    <div>
      <h5 class='mb-1' id='achievementTitle'>Achievement Title</h5>
      <p class='mb-0' id='achievementDescription'>Achievement description goes here.</p>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end

  def display(is_show)
    if is_show
      @notification.class_list.add('show')
    else
      @notification.class_list.remove('show')
    end
  end
end