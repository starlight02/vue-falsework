export default class SocketEvent {
    event = {};

    //监听方法
    listen(eventName, foo) {
        if (!Object.keys(this.event).includes(eventName)) {
            this.event[eventName] = [];
        }
        const find = this.event[eventName].find(fn => (foo === fn || foo.name === fn.name));
        if (!find) {
            this.event[eventName].push(foo);
        }
    }

    //移除监听
    remove(eventName, foo) {
        if (!Object.keys(this.event).includes(eventName)) {
            return;
        }
        if (!foo) {
            this.event[eventName] = [];
        } else {
            this.event[eventName].forEach((fn, i) => {
                if (fn === foo) this.event[eventName].splice(i, 1);
            });
        }
    }

    //触发方法
    trigger(data) {
        const eventName = data.type;
        const fooList = this.event[eventName];
        if (!fooList || !fooList.length) {
            return;
        }
        this.event[eventName].forEach(foo => {
            setTimeout(() => foo(data), 0)
        });
    }
}
