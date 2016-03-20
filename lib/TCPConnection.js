/*globals chrome*/
import AbstractConnection from "./AbstractConnection";


export default class TCPConnection extends AbstractConnection {

	static isSupported() {
		return !!window.chrome && !!chrome.sockets && !!chrome.sockets.tcp;
	}

	static connect(ip, port, options) {
		return new Promise((resolve, reject) => {
			chrome.sockets.tcp.create(options, (createInfo) => {
				chrome.sockets.tcp.connect(createInfo.socketId, ip, port, (result) => {
					if (result >= 0) {
						resolve(new TCPConnection(chrome.sockets.tcp, createInfo.socketId));
					} else {
						reject(`TCPConnection.connect: error ${result} while connecting to ${ip}:${port}`);
					}
				});
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
			this.api.send(this.id, arrayBuffer, ({ resultCode, bytesSent }) => {
				if (resultCode === 15) {
					this.isClosed = true;
					this.api.disconnect(this.id);
				}
				const error = resultCode !== 0 ? "result code " + resultCode : null;
				if (resultCode === 0 && bytesSent === arrayBuffer.byteLength) {
					resolve({arrayBuffer, bytesSent, error});
				} else {
					if (this.errorLogFunc) {
						if (bytesSent !== arrayBuffer.byteLength) {
							this.errorLogFunc(`send error: bytesSent (${bytesSent}) !== arrayBuffer.byteLength (${arrayBuffer.byteLength}), error: ${error}`);
						} else {
							this.errorLogFunc("send error: " + error);
						}
					}
					reject({arrayBuffer, bytesSent, error});
				}
			});
		});
	}
}
