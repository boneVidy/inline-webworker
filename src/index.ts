class InlineWebWorker implements Worker {
    // @ts-ignore
    public get onerror() {
      return  this.worker.onerror;
    };
    public set onerror(errorhandler:  ((this: Worker, ev: MessageEvent) => any) | null) {
        this.worker.onerror = errorhandler;
    }
    public onmessage: ((this: Worker, ev: MessageEvent) => any) | null;
    postMessage(message: any, transfer?: any[] | undefined): void {
        this.worker.postMessage(message, transfer);
    }
    terminate(): void {
        this.worker.terminate();
    }
    addEventListener<K extends "message" | "error">(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => , options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: any, listener: any, options?: any) {
        this.worker.addEventListener(type, listener, options);
    }
    removeEventListener<K extends "message" | "error">(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => , options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener(type: any, listener: any, options?: any) {

        throw new Error("Method not implemented.");
    }
    dispatchEvent(evt: Event): boolean {
        throw new Error("Method not implemented.");
    }
    
    private worker: Worker;
    constructor (task: Function) {
        const taskStr = task.toString();
        this.worker = new Worker(URL.createObjectURL(
            new Blob([ taskStr ], { type: "text/javascript" })
          ));
     }


    // public addEventListener (handler) {
    //     this.worker.addEventListener('message', handler);
    //     this.onMessageHandlers.push(handler);
    // }
}
