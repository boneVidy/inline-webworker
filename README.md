# inline-webworker
```bash
npm install ts-inline-webworker --save
```

```js
    import {InlineWebWorker} from 'ts-inline-webworker'
    const worker = new InlineWebWorker(function run () {
        const sleep = function  (delay) {
            const startTime = Date.now();
            const endTime = Date.now() + delay;

            while (true) {
                if (endTime - Date.now() <= 0) {
                    return;
                }
            }
        }
        sleep(1000000);
        self.postMessage('message', 'halo from other thread');
    });
    worker.addEventListener('message', (data) => {
        console.log(data);
    })
```
