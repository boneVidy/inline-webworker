# inline-webworker
```js
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
    worker.addEventListener('message', (data) => {
        console.log(data);
    })
```
