/*globals chrome*/
import AbstractConnection from "./AbstractConnection";
import ConnectionClosedError from "./ConnectionClosedError";


export default class SerialConnection extends AbstractConnection {

	static isSupported() {
		return !!window.chrome && !!chrome.serial;
	}

	static connect(name, options = {}) {
		return new Promise(resolve => {
			chrome.serial.connect(name, options, (connectionInfo) => {
				resolve(new SerialConnection(chrome.serial, connectionInfo.connectionId));
				// how are errors handled?
			});
		});
	}

	close(callback) {
		this.api.disconnect(this.id, () => {
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
			this.api.send(this.id, arrayBuffer, ({ bytesSent, error }) => {
				if (error === "disconnected" || error === "system_error") {
					this.isClosed = true;
					this.api.disconnect(this.id);
					if (this.errorLogFunc) {
						this.errorLogFunc("send error: " + error);
					}
					reject({arrayBuffer, bytesSent, error: new ConnectionClosedError(error)});
					return;
				}

				if (bytesSent === arrayBuffer.byteLength && !error) {
					resolve({arrayBuffer, bytesSent, error: null});
				} else {
					if (this.errorLogFunc) {
						if (bytesSent !== arrayBuffer.byteLength) {
							this.errorLogFunc(`send error: bytesSent (${bytesSent}) !== arrayBuffer.byteLength (${arrayBuffer.byteLength}), error: ${error}`);
						} else {
							this.errorLogFunc("send error: " + error);
						}
					}
					reject({arrayBuffer, bytesSent, error: new Error(error)});
				}
			});
		});
	}

}
