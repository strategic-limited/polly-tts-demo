import events from 'events'

export const SOCKET_MESSAGE_EVENT = 'SOCKET_MESSAGE';

class SocketMessage extends events {
}
const socketMessage = new SocketMessage();

export {socketMessage}

