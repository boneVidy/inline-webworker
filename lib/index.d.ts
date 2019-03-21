/**
 *
 *
 * @export
 * @class InlineWebWorker
 * @example
 * var worker = new InlineWebWorker(function run () {
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
 */
export default class InlineWebWorker {
    onerror: AbstractWorker["onerror"];
    onmessage: Worker["onmessage"];
    private worker;
    constructor(task: Function);
    postMessage(message: any, transfer?: any[] | undefined): void;
    terminate(): void;
    addEventListener<K extends "message" | "error">(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => void, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
    removeEventListener<K extends "message" | "error">(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => void, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void;
    dispatchEvent(evt: Event): boolean;
}
