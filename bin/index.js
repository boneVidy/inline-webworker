"use strict";
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
