const InlineWebWorker = require('../../lib/index').default;
var worker = new InlineWebWorker(function run () {
  const sleep = function  (delay) {
      const startTime = Date.now();
      const endTime = Date.now() + delay;

      while (true) {
          if (endTime - Date.now() <= 0) {
              return;
          }
      }
  }
  while(true) {
      sleep(1000);
      console.log('worker is woking');
      self.postMessage("halo")
  }
});
let count = 0;
worker.addEventListener('message', (data) => {
    const root = document.getElementById('app');
    root.innerHTML = count++;
})