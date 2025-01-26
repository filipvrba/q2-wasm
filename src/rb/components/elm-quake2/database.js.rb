export default class CDatabase
  def initialize(element)
    @element = element
  end

  def unlock_achievement(achievement_id, value, &callback)
    newsletter_id = @element.newsletter_id

    if @element.is_online
      query       = "INSERT INTO achievements (newsletter_id, achievement_id, value) " +
                    "VALUES (#{newsletter_id}, #{achievement_id}, '#{value}');"
      
      __bef_db.is_verbose = false
      __bef_db.set(query) do |is_unlocked|
        if is_unlocked
          __bef_db.is_verbose = true
          callback.call() if callback
        end
      end
    else
      callback.call() if callback
    end
  end # unlock_achievement
end