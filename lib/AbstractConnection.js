import varint from "varint";


export function copyArrayBuffer(src, srcOffset, length, dst, dstOffset) {
	// const srcView = new DataView(src);
	// const dstView = new DataView(dst);
	// for (let i = 0; i < length; i++) {
	// 	const uint8 = srcView.getUint8(srcOffset + i);
	// 	dstView.setUint8(dstOffset + i, uint8);
	// }
	const srcView = new Uint8Array(src, srcOffset, length);
	const dstView = new Uint8Array(dst, dstOffset, length);
	dstView.set(srcView);
}


function assert(condition, description) {
	if (!condition) {
		console.error(description);
	}
}


export function bufferToHexString(buffer, str = "") {
	for (const uint8 of new Uint8Array(buffer)) {
		if (uint8 < 16) {
			str += "0";
		}
		str += uint8.toString(16).toUpperCase();
	}
	return str;
}


export function bufferAsChar8String(buffer, str = "") {
	for (const uint8 of new Uint8Array(buffer)) {
		str += String.fromCharCode(uint8);
	}
	return str;
}



// ChromeNetConn is a wrapper class that unifies usage of
// the Chrome communication APIs chrome.sockets, chrome.serial, chrome.bluetoothSocket.
// It also buffers received data until enough is available to fill
// the arrayBuffer of the receive method.
export default class AbstractConnection {

	constructor(api, connectionId) {
		this.api = api;
		this.id = connectionId;
		this.isClosed = false;
		this.errorLogFunc = null;
		this.receiveLogFunc = null;
		this._receivedBuffers = [];
		this._receivedBuffersNumBytes = 0;
		this._receiveListeners = [];
		this._lastReceiveError = null;

		this.api.onReceive.addListener(info => {
			const connectionId = info.socketId !== undefined ? info.socketId : info.connectionId;
			if (connectionId !== this.id) {
				return;
			}

			if (this.receiveLogFunc) {
				this.receiveLogFunc(bufferAsChar8String(info.data, `onReceive ${info.data.byteLength} bytes: `));
			}

			this._receivedBuffers.push(info.data);
			this._receivedBuffersNumBytes += info.data.byteLength;

			if (this._receiveListeners.length > 0) {
				const { destArrayBuffer, resolve } = this._receiveListeners[0];
				if (destArrayBuffer.byteLength <= this._receivedBuffersNumBytes) {
					this._receiveListeners.shift();
					this._resolveReceived(destArrayBuffer, resolve);
				}
			}
		});

		this.api.onReceiveError.addListener(info => {
			const connectionId = info.socketId !== undefined ? info.socketId : info.connectionId;
			if (connectionId !== this.id) {
				return;
			}

			let error = "";
			if (info.resultCode !== undefined) {
				error = "result code " + info.resultCode;
			}
			if (info.error !== undefined) {
				if (error !== "") {
					error += ", ";
				}
				error += info.error;
			}
			if (info.errorMessage !== undefined) {
				if (error !== "") {
					error += ", ";
				}
				error += info.errorMessage;
			}

			if (this.errorLogFunc) {
				this.errorLogFunc("onReceiveError: " + error);
			}
			this._lastReceiveError = error;

			// Reject
			for (const listener of this._receiveListeners) {
				listener.reject(error);
			}
			this._receivedBuffers = [];
			this._receivedBuffersNumBytes = 0;
			this._receiveListeners = [];
		});
	}


	close(callback) {
		throw new Error("abstract method" + callback);
	}

	// Sends arrayBuffer and returns a Promise for it.
	// The promise gets resolved if all bytes of arrayBuffer were sent
	// and rejected if less bytes were sent, or if there was another error.
	send(arrayBuffer) {
		throw new Error("abstract method" + arrayBuffer);
	}

	// Receives destArrayBuffer.byteLength bytes and returns a Promise for it.
	// The promise gets resolved when enough bytes have been received to fill
	// the destArrayBuffer and rejected when there was a network error.
	receive(destArrayBuffer) {
		return new Promise((resolve, reject) => {
			if (this._lastReceiveError !== null) {
				reject(this._lastReceiveError);
				return;
			}

			if (destArrayBuffer.byteLength <= this._receivedBuffersNumBytes) {
				// If enough data available, resolve immediately
				this._resolveReceived(destArrayBuffer, resolve);
			} else {
				// Queue request until enough data is buffered
				this._receiveListeners.push({destArrayBuffer, resolve, reject});
			}
		});
	}

	_resolveReceived(receiverArrayBuffer, resolve) {
		let bytesCopied = 0;
		while (bytesCopied < receiverArrayBuffer.byteLength) {
			const buf0 = this._receivedBuffers[0];
			const numBytes = Math.min(buf0.byteLength, receiverArrayBuffer.byteLength - bytesCopied);
			copyArrayBuffer(buf0, 0, numBytes, receiverArrayBuffer, bytesCopied);
			bytesCopied += numBytes;
			if (numBytes === buf0.byteLength) {
				// Copied whole first buffer, now remove it
				this._receivedBuffers.shift();
			} else {
				// Copied less than first buffer, remove copied bytes
				this._receivedBuffers[0] = buf0.slice(numBytes);
				assert(bytesCopied === receiverArrayBuffer.byteLength, "We should have copied everything");
				break;
			}
		}
		this._receivedBuffersNumBytes -= bytesCopied;
		resolve(receiverArrayBuffer);
	}

	receiveUint8() {
		return new Promise((resolve, reject) => {
			this.receive(new ArrayBuffer(1)).then(
				(arrayBuffer) => {
					resolve(new Uint8Array(arrayBuffer)[0]);
				},
				reject
			);
		});
	}

	sendUint8(value) {
		return this.send(new Uint8Array([value]).buffer);
	}

	receiveVarint() {
		const bytes = [];
		return new Promise((resolve, reject) => {
			this.receiveUint8().then(
				(byte) => {
					bytes.push(byte);
					if (byte < 128) {
						resolve(varint.decode(bytes));
					} else {
						throw "todo";
					}
				},
				reject
			);
		});
	}

	sendVarint(value) {
		return this.send(new Uint8Array(varint.encode(value)).buffer);
	}
}
