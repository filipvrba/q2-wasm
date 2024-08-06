export default class CDatabase
  def initialize
    
  end

  def log_in(e_token, &callback)
    query = "SELECT id FROM newsletter " +
            "WHERE token = '#{e_token}';"

    __bef_db.get(query) do |rows|
      logged_in = rows.length > 0 ? rows[0].id : nil
      callback(logged_in) if callback
    end
  end

  def get_quake2_version(&callback)
    query = "SELECT version FROM game_versions WHERE id = 1;"  # ID 1 = Quake 2

    __bef_db.get(query) do |rows|
      if rows.length > 0
        callback(rows[0].version) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def remove_index_db(database_name, &callback)
    request = indexedDB.delete_database(database_name)
    
    request.onsuccess = lambda { callback(true) if callback }
    request.onerror   = lambda { callback(false) if callback }
  end
end