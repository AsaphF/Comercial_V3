// When the web worker receives a worker. look at the data and uppercase it, and send it back
self.onmessage = function (e) {
    self.postMessage(e.data.toUpperCase());
  }