class Net {
  static loadScript(url, callback) {
    return new Promise((resolve, reject) => {
      let script = document.createElement("script");
      script.async = true;
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      return document.body.appendChild(script)
    }).then(() => {
      if (callback) return callback()
    })
  };

  static objCurl(url, callback) {
    return fetch(url).then(response => response.json()).then((text) => {
      if (callback) return callback(text)
    })
  }
};

window.Net = Net