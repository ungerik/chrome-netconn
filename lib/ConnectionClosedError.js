// The socket is not connected.
const ERR_SOCKET_NOT_CONNECTED = -15;

// A connection was closed (corresponding to a TCP FIN).
const ERR_CONNECTION_CLOSED = -100;

// A connection was reset (corresponding to a TCP RST).
const ERR_CONNECTION_RESET = -101;

// A connection timed out as a result of not receiving an ACK for data sent.
// This can include a FIN packet that did not get ACK'd.
const ERR_CONNECTION_ABORTED = -103;


export default class ConnectionClosedError extends Error {

	static isClosedCode(code) {
		if (code === 0) {
			return false;
		}
		switch (code) {
		case ERR_SOCKET_NOT_CONNECTED:
		case ERR_CONNECTION_CLOSED:
		case ERR_CONNECTION_RESET:
		case ERR_CONNECTION_ABORTED:
			return true;
		}
		return false;
	}

	constructor(code) {
		const message = code === undefined ? "Connection closed" : "Connection closed, code: " + code;		
		super(message);
		this.message = message;
	}
}
