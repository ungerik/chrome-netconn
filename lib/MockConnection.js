import AbstractConnection from "./AbstractConnection";


let connCounter = 0;


const mockAPI = {
	create: (callback) => {
		connCounter++;
		callback({connectionId: connCounter});
	},

	connect: (connectionId, callback) => {
		callback(connectionId);
	},

	send: (connectionId, arrayBuffer, callback) => {}, // TODO

	onReceive: {
		addListener: (info) => {}, // TODO
	},

	onReceiveError: {
		addListener: (info) = {}, // TODO
	},

	close: (connectionId, callback) => callback(),
};



export default class MockConnection extends AbstractConnection {

	static isSupported() {
		return true;
	}

	static connect() {
		return new Promise(resolve => {
			mockAPI.create(createInfo => {
				mockAPI.connect(createInfo.connectionId, () => {
					resolve(new MockConnection(mockAPI, createInfo.connectionId));
				});
			});
		});
	}

	close(callback) {
		this.api.close(this.id, () => {
			this.isClosed = true;
			if (callback) {
				callback();
			}
		});
	}

	// Sends arrayBuffer and returns a Promise for it.
	// The promise gets resolved if all bytes of arrayBuffer were sent
	// and rejected if less bytes were sent, or if there was another error.
	send(arrayBuffer) {
		return new Promise((resolve, reject) => {
			this.api.send(this.id, arrayBuffer, (bytesSent) => {
				if (bytesSent === arrayBuffer.byteLength) {
					resolve({arrayBuffer, bytesSent, error: null});
				} else {
					reject({arrayBuffer, bytesSent, error: new Error("not all bytes sent")});
				}
			});
		});
	}

}
