(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var InlineWebWorker = /** @class */ (function () {
        function InlineWebWorker(task) {
            if (task) {
                var taskStrs = task.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/);
                if (taskStrs && taskStrs.length >= 2) {
                    this.worker = new Worker(URL.createObjectURL(new Blob([taskStrs[1]], { type: "text/javascript" })));
                    return;
                }
            }
            throw new Error("must has a function agument");
        }
        Object.defineProperty(InlineWebWorker.prototype, "onerror", {
            get: function () {
                return this.worker.onerror;
            },
            set: function (errorhandler) {
                this.worker.onerror = errorhandler;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(InlineWebWorker.prototype, "onmessage", {
            get: function () {
                return this.worker.onmessage;
            },
            set: function (messagehandler) {
                this.worker.onmessage = messagehandler;
            },
            enumerable: true,
            configurable: true
        });
        ;
        InlineWebWorker.prototype.postMessage = function (message, transfer) {
            this.worker.postMessage(message, transfer);
        };
        InlineWebWorker.prototype.terminate = function () {
            this.worker.terminate();
        };
        InlineWebWorker.prototype.addEventListener = function (type, listener, options) {
            this.worker.addEventListener(type, listener, options);
        };
        InlineWebWorker.prototype.removeEventListener = function (type, listener, options) {
            this.worker.removeEventListener(type, listener, options);
        };
        InlineWebWorker.prototype.dispatchEvent = function (evt) {
            return this.worker.dispatchEvent(evt);
        };
        return InlineWebWorker;
    }());
    exports.default = InlineWebWorker;
    //@ts-ignore
    window[InlineWebWorker] = InlineWebWorker;
});
