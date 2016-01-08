/*globals chrome*/
import AbstractConnection from "./AbstractConnection";


export default class BluetoothConnection extends AbstractConnection {

	static isSupported() {
		return !!window.chrome && !!chrome.bluetoothSocket;
	}

	static connect(address, uuid, options = {}) {
		return new Promise(resolve => {
			chrome.bluetoothSocket.create(options, (createInfo) => {
				chrome.bluetoothSocket.connect(createInfo.socketId, address, uuid, () => {
					resolve(new BluetoothConnection(chrome.bluetoothSocket, createInfo.socketId));
					// how are errors handled?
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
					const error = `bytesSent (${bytesSent}) !== arrayBuffer.byteLength (${arrayBuffer.byteLength})`;
					if (this.errorLogFunc) {
						this.errorLogFunc("send error: " + error);
					}
					reject({arrayBuffer, bytesSent, error});
				}
			});
		});
	}

}
