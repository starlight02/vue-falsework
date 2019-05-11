export class SocketMessage {
    constructor(type = '', data = {}) {
        this.type = type;
        this.data = data;
    }
}
