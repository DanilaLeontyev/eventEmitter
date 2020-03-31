var EventEmitter = {
    events: {},
    on: function (event, listener) {
        var _this = this;
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return function () { return _this.removeListener(event, listener); };
    },
    removeListener: function (event, listener) {
        if (typeof this.events[event] === 'object') {
            var idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }
    },
    emit: function (event) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof this.events[event] === 'object') {
            this.events[event].forEach(function (listener) { return listener.apply(_this, args); });
        }
    },
    once: function (event, listener) {
        var _this = this;
        var remove = this.on(event, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            remove();
            listener.apply(_this, args);
        });
    }
};
var makeEventEmitter = function () {
    return ({
        __proto__: EventEmitter,
        events: {}
    });
};
var example = makeEventEmitter();
example.__proto__.on('hello', () => { console.log('hello'); });
console.log(example);
