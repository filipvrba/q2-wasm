import 'ElmAchievement', '../../elements/elm_achievement'

export default class CAchievements
  ENVS = {
    unlock_achievement: 'unlock-achievement'
  }

  def initialize(element)
    @element = element

    @h_unlock_achievement = lambda { |e| unlock_achievement(e.detail.value) }
  end

  def connected_callback()
    Events.connect('#app', CAchievements::ENVS.unlock_achievement, @h_unlock_achievement)
  end

  def disconnected_callback()
    Events.disconnect('#app', CAchievements::ENVS.unlock_achievement, @h_unlock_achievement)
  end

  def unlock_achievement(options)
    achievement_id = options.id
    values         = options['s_values']

    get_data_from_obj(achievement_id, values) do |data|
      description = data.description

      @element.c_database.unlock_achievement(achievement_id, data.description) do
        show_options = {
          img: data.img,
          title: data.title,
          description: description
        }
        Events.emit('#app', ElmAchievement::ENVS.show, show_options)
      end
    end
  end

  def get_data_from_obj(achievement_id, values, &callback)
    case achievement_id
    when 0
      Net.obj_curl('/json/achievements.json') do |obj_achivements|
        achievement       = obj_achivements.ids[0]
        img               = achievement.img
        title             = achievement.name
        description       = values

        callback({
          img: img,
          title: title,
          description: description,
        }) if callback
      end
    end
  end  # get_data_from_obj
end