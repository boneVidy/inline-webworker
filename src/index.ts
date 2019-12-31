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
export default class InlineWebWorker  {
    public get onerror() {
      return  this.worker.onerror;
    };
    public set onerror(errorhandler: AbstractWorker["onerror"]) {
        this.worker.onerror = errorhandler;
    }
    public get onmessage() {
        return  this.worker.onmessage;
      };
    public set onmessage(messagehandler: Worker["onmessage"]) {
        this.worker.onmessage = messagehandler;
    }


    public static create (task: Function) {
        return new InlineWebWorker(task);
    }

    private worker: Worker;
    constructor (task: Function) {
        if (task) {
            const taskStrs = task.toString().trim().match(
                /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
                );
            if (taskStrs && taskStrs.length >= 2) {

                const blob = new Blob([taskStrs[1]], { type: "text/javascript" });
                this.worker = new Worker(URL.createObjectURL(
                    blob
                    ));
                // @ts-ignore
                URL.revokeObjectURL(blob);
                return;
            }

        }
        throw new Error("must has a function agument")
     }
     postMessage(message: any, transfer?: any[] | undefined): void {
        this.worker.postMessage(message, transfer);
    }
    terminate(): void {
        this.worker.terminate();
    }
    addEventListener<K extends "message" | "error">(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => void, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: any, listener: any, options?: any) {
        this.worker.addEventListener(type, listener, options);
    }
    removeEventListener<K extends "message" | "error">(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => void, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener(type: any, listener: any, options?: any) {
        this.worker.removeEventListener(type, listener, options);
    }
    dispatchEvent(evt: Event): boolean {
        return this.worker.dispatchEvent(evt);
    }
}
