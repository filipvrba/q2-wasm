class Net
  def self.load_script(url, &callback)
    Promise.new(lambda do |resolve, reject|
      script = document.create_element('script')
      script.async = true
      script.src = url
      script.onload = resolve
      script.onerror = reject
      document.body.append_child(script)
    end)
    .then(lambda do
      callback() if callback
    end)
  end

  def self.obj_curl(url, &callback)
    fetch(url)
    .then(lambda do |response|
      response.json()
    end)
    .then(lambda do |text|
      callback(text) if callback
    end)
  end
end
window.Net = Net
