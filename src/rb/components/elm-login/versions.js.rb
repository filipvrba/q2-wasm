export default class CVersions
  def initialize(c_database)
    @c_database = c_database
  end

  def version_control(&callback)
    @c_database.get_quake2_version() do |version|
      local_version      = local_storage.get_item('version')
      is_current_version = local_version == version

      local_storage.set_item('version', version) if !is_current_version
      callback(is_current_version) if callback
    end
  end # version_control

  def remove_databases(&callback)
    @c_database.remove_index_db('/quake2-wasm') do |is_removed_first|
      if is_removed_first
        @c_database.remove_index_db('fileStorage') do |is_removed_second|
          callback.call() if is_removed_second
        end
      end
    end
  end

  def controller(&callback)
    version_control() do |is_current_version|
      if is_current_version
        puts "The version is up to date."
        callback.call() if callback
      else
        remove_databases() do
          puts "Deleted databases from IndexedDB."
          callback.call() if callback
        end
      end
    end
  end
end