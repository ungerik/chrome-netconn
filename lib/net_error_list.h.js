/*eslint semi:0*/

// Copied from Chromium source file: net_error_list.h


// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This file intentionally does not have header guards, it's included
// inside a macro to generate enum values.

// This file contains the list of network errors.

//
// Ranges:
//     0- 99 System related errors
//   100-199 Connection related errors
//   200-299 Certificate errors
//   300-399 HTTP errors
//   400-499 Cache errors
//   500-599 ?
//   600-699 FTP errors
//   700-799 Certificate manager errors
//   800-899 DNS resolver errors

// An asynchronous IO operation is not yet complete.  This usually does not
// indicate a fatal error.  Typically this error will be generated as a
// notification to wait for some external notification that the IO operation
// finally completed.
export const ERR_IO_PENDING = -1

// A generic failure occurred.
export const ERR_FAILED = -2

// An operation was aborted (due to user action).
export const ERR_ABORTED = -3

// An argument to the function is incorrect.
export const ERR_INVALID_ARGUMENT = -4

// The handle or file descriptor is invalid.
export const ERR_INVALID_HANDLE = -5

// The file or directory cannot be found.
export const ERR_FILE_NOT_FOUND = -6

// An operation timed out.
export const ERR_TIMED_OUT = -7

// The file is too large.
export const ERR_FILE_TOO_BIG = -8

// An unexpected error.  This may be caused by a programming mistake or an
// invalid assumption.
export const ERR_UNEXPECTED = -9

// Permission to access a resource, other than the network, was denied.
export const ERR_ACCESS_DENIED = -10

// The operation failed because of unimplemented functionality.
export const ERR_NOT_IMPLEMENTED = -11

// There were not enough resources to complete the operation.
export const ERR_INSUFFICIENT_RESOURCES = -12

// Memory allocation failed.
export const ERR_OUT_OF_MEMORY = -13

// The file upload failed because the file's modification time was different
// from the expectation.
export const ERR_UPLOAD_FILE_CHANGED = -14

// The socket is not connected.
export const ERR_SOCKET_NOT_CONNECTED = -15

// The file already exists.
export const ERR_FILE_EXISTS = -16

// The path or file name is too long.
export const ERR_FILE_PATH_TOO_LONG = -17

// Not enough room left on the disk.
export const ERR_FILE_NO_SPACE = -18

// The file has a virus.
export const ERR_FILE_VIRUS_INFECTED = -19

// The client chose to block the request.
export const ERR_BLOCKED_BY_CLIENT = -20

// The network changed.
export const ERR_NETWORK_CHANGED = -21

// The request was blocked by the URL blacklist configured by the domain
// administrator.
export const ERR_BLOCKED_BY_ADMINISTRATOR = -22

// The socket is already connected.
export const ERR_SOCKET_IS_CONNECTED = -23

// The request was blocked because the forced reenrollment check is still
// pending. This error can only occur on ChromeOS.
// The error can be emitted by code in chrome/browser/policy/policy_helpers.cc.
export const ERR_BLOCKED_ENROLLMENT_CHECK_PENDING = -24

// The upload failed because the upload stream needed to be re-read, due to a
// retry or a redirect, but the upload stream doesn't support that operation.
export const ERR_UPLOAD_STREAM_REWIND_NOT_SUPPORTED = -25

// The request failed because the URLRequestContext is shutting down, or has
// been shut down.
export const ERR_CONTEXT_SHUT_DOWN = -26

// A connection was closed (corresponding to a TCP FIN).
export const ERR_CONNECTION_CLOSED = -100

// A connection was reset (corresponding to a TCP RST).
export const ERR_CONNECTION_RESET = -101

// A connection attempt was refused.
export const ERR_CONNECTION_REFUSED = -102

// A connection timed out as a result of not receiving an ACK for data sent.
// This can include a FIN packet that did not get ACK'd.
export const ERR_CONNECTION_ABORTED = -103

// A connection attempt failed.
export const ERR_CONNECTION_FAILED = -104

// The host name could not be resolved.
export const ERR_NAME_NOT_RESOLVED = -105

// The Internet connection has been lost.
export const ERR_INTERNET_DISCONNECTED = -106

// An SSL protocol error occurred.
export const ERR_SSL_PROTOCOL_ERROR = -107

// The IP address or port number is invalid (e.g., cannot connect to the IP
// address 0 or the port 0).
export const ERR_ADDRESS_INVALID = -108

// The IP address is unreachable.  This usually means that there is no route to
// the specified host or network.
export const ERR_ADDRESS_UNREACHABLE = -109

// The server requested a client certificate for SSL client authentication.
export const ERR_SSL_CLIENT_AUTH_CERT_NEEDED = -110

// A tunnel connection through the proxy could not be established.
export const ERR_TUNNEL_CONNECTION_FAILED = -111

// No SSL protocol versions are enabled.
export const ERR_NO_SSL_VERSIONS_ENABLED = -112

// The client and server don't support a common SSL protocol version or
// cipher suite.
export const ERR_SSL_VERSION_OR_CIPHER_MISMATCH = -113

// The server requested a renegotiation (rehandshake).
export const ERR_SSL_RENEGOTIATION_REQUESTED = -114

// The proxy requested authentication (for tunnel establishment) with an
// unsupported method.
export const ERR_PROXY_AUTH_UNSUPPORTED = -115

// During SSL renegotiation (rehandshake), the server sent a certificate with
// an error.
//
// Note: this error is not in the -2xx range so that it won't be handled as a
// certificate error.
export const ERR_CERT_ERROR_IN_SSL_RENEGOTIATION = -116

// The SSL handshake failed because of a bad or missing client certificate.
export const ERR_BAD_SSL_CLIENT_AUTH_CERT = -117

// A connection attempt timed out.
export const ERR_CONNECTION_TIMED_OUT = -118

// There are too many pending DNS resolves, so a request in the queue was
// aborted.
export const ERR_HOST_RESOLVER_QUEUE_TOO_LARGE = -119

// Failed establishing a connection to the SOCKS proxy server for a target host.
export const ERR_SOCKS_CONNECTION_FAILED = -120

// The SOCKS proxy server failed establishing connection to the target host
// because that host is unreachable.
export const ERR_SOCKS_CONNECTION_HOST_UNREACHABLE = -121

// The request to negotiate an alternate protocol failed.
export const ERR_NPN_NEGOTIATION_FAILED = -122

// The peer sent an SSL no_renegotiation alert message.
export const ERR_SSL_NO_RENEGOTIATION = -123

// Winsock sometimes reports more data written than passed.  This is probably
// due to a broken LSP.
export const ERR_WINSOCK_UNEXPECTED_WRITTEN_BYTES = -124

// An SSL peer sent us a fatal decompression_failure alert. This typically
// occurs when a peer selects DEFLATE compression in the mistaken belief that
// it supports it.
export const ERR_SSL_DECOMPRESSION_FAILURE_ALERT = -125

// An SSL peer sent us a fatal bad_record_mac alert. This has been observed
// from servers with buggy DEFLATE support.
export const ERR_SSL_BAD_RECORD_MAC_ALERT = -126

// The proxy requested authentication (for tunnel establishment).
export const ERR_PROXY_AUTH_REQUESTED = -127

// The SSL server attempted to use a weak ephemeral Diffie-Hellman key.
export const ERR_SSL_WEAK_SERVER_EPHEMERAL_DH_KEY = -129

// Could not create a connection to the proxy server. An error occurred
// either in resolving its name, or in connecting a socket to it.
// Note that this does NOT include failures during the actual "CONNECT" method
// of an HTTP proxy.
export const ERR_PROXY_CONNECTION_FAILED = -130

// A mandatory proxy configuration could not be used. Currently this means
// that a mandatory PAC script could not be fetched, parsed or executed.
export const ERR_MANDATORY_PROXY_CONFIGURATION_FAILED = -131

// -132 was formerly ERR_ESET_ANTI_VIRUS_SSL_INTERCEPTION

// We've hit the max socket limit for the socket pool while preconnecting.  We
// don't bother trying to preconnect more sockets.
export const ERR_PRECONNECT_MAX_SOCKET_LIMIT = -133

// The permission to use the SSL client certificate's private key was denied.
export const ERR_SSL_CLIENT_AUTH_PRIVATE_KEY_ACCESS_DENIED = -134

// The SSL client certificate has no private key.
export const ERR_SSL_CLIENT_AUTH_CERT_NO_PRIVATE_KEY = -135

// The certificate presented by the HTTPS Proxy was invalid.
export const ERR_PROXY_CERTIFICATE_INVALID = -136

// An error occurred when trying to do a name resolution (DNS).
export const ERR_NAME_RESOLUTION_FAILED = -137

// Permission to access the network was denied. This is used to distinguish
// errors that were most likely caused by a firewall from other access denied
// errors. See also ERR_ACCESS_DENIED.
export const ERR_NETWORK_ACCESS_DENIED = -138

// The request throttler module cancelled this request to avoid DDOS.
export const ERR_TEMPORARILY_THROTTLED = -139

// A request to create an SSL tunnel connection through the HTTPS proxy
// received a non-200 (OK) and non-407 (Proxy Auth) response.  The response
// body might include a description of why the request failed.
export const ERR_HTTPS_PROXY_TUNNEL_RESPONSE = -140

// We were unable to sign the CertificateVerify data of an SSL client auth
// handshake with the client certificate's private key.
//
// Possible causes for this include the user implicitly or explicitly
// denying access to the private key, the private key may not be valid for
// signing, the key may be relying on a cached handle which is no longer
// valid, or the CSP won't allow arbitrary data to be signed.
export const ERR_SSL_CLIENT_AUTH_SIGNATURE_FAILED = -141

// The message was too large for the transport.  (for example a UDP message
// which exceeds size threshold).
export const ERR_MSG_TOO_BIG = -142

// A SPDY session already exists, and should be used instead of this connection.
export const ERR_SPDY_SESSION_ALREADY_EXISTS = -143

// Error -144 was removed (LIMIT_VIOLATION).

// Websocket protocol error. Indicates that we are terminating the connection
// due to a malformed frame or other protocol violation.
export const ERR_WS_PROTOCOL_ERROR = -145

// Error -146 was removed (PROTOCOL_SWITCHED)

// Returned when attempting to bind an address that is already in use.
export const ERR_ADDRESS_IN_USE = -147

// An operation failed because the SSL handshake has not completed.
export const ERR_SSL_HANDSHAKE_NOT_COMPLETED = -148

// SSL peer's public key is invalid.
export const ERR_SSL_BAD_PEER_PUBLIC_KEY = -149

// The certificate didn't match the built-in public key pins for the host name.
// The pins are set in net/http/transport_security_state.cc and require that
// one of a set of public keys exist on the path from the leaf to the root.
export const ERR_SSL_PINNED_KEY_NOT_IN_CERT_CHAIN = -150

// Server request for client certificate did not contain any types we support.
export const ERR_CLIENT_AUTH_CERT_TYPE_UNSUPPORTED = -151

// Server requested one type of cert, then requested a different type while the
// first was still being generated.
export const ERR_ORIGIN_BOUND_CERT_GENERATION_TYPE_MISMATCH = -152

// An SSL peer sent us a fatal decrypt_error alert. This typically occurs when
// a peer could not correctly verify a signature (in CertificateVerify or
// ServerKeyExchange) or validate a Finished message.
export const ERR_SSL_DECRYPT_ERROR_ALERT = -153

// There are too many pending WebSocketJob instances, so the new job was not
// pushed to the queue.
export const ERR_WS_THROTTLE_QUEUE_TOO_LARGE = -154

// Error -155 was removed (TOO_MANY_SOCKET_STREAMS)

// The SSL server certificate changed in a renegotiation.
export const ERR_SSL_SERVER_CERT_CHANGED = -156

// The SSL server indicated that an unnecessary TLS version fallback was
// performed.
export const ERR_SSL_INAPPROPRIATE_FALLBACK = -157

// Certificate Transparency: All Signed Certificate Timestamps failed to verify.
export const ERR_CT_NO_SCTS_VERIFIED_OK = -158

// The SSL server sent us a fatal unrecognized_name alert.
export const ERR_SSL_UNRECOGNIZED_NAME_ALERT = -159

// Failed to set the socket's receive buffer size as requested.
export const ERR_SOCKET_SET_RECEIVE_BUFFER_SIZE_ERROR = -160

// Failed to set the socket's send buffer size as requested.
export const ERR_SOCKET_SET_SEND_BUFFER_SIZE_ERROR = -161

// Failed to set the socket's receive buffer size as requested, despite success
// return code from setsockopt.
export const ERR_SOCKET_RECEIVE_BUFFER_SIZE_UNCHANGEABLE = -162

// Failed to set the socket's send buffer size as requested, despite success
// return code from setsockopt.
export const ERR_SOCKET_SEND_BUFFER_SIZE_UNCHANGEABLE = -163

// Failed to import a client certificate from the platform store into the SSL
// library.
export const ERR_SSL_CLIENT_AUTH_CERT_BAD_FORMAT = -164

// The SSL server requires falling back to a version older than the configured
// minimum fallback version, and thus fallback failed.
export const ERR_SSL_FALLBACK_BEYOND_MINIMUM_VERSION = -165

// Resolving a hostname to an IP address list included the IPv4 address
// "127.0.53.53". This is a special IP address which ICANN has recommended to
// indicate there was a name collision, and alert admins to a potential
// problem.
export const ERR_ICANN_NAME_COLLISION = -166

// The SSL server presented a certificate which could not be decoded. This is
// not a certificate error code as no X509Certificate object is available. This
// error is fatal.
export const ERR_SSL_SERVER_CERT_BAD_FORMAT = -167
// Certificate Transparency: Received a signed tree head that failed to parse.
export const ERR_CT_STH_PARSING_FAILED = -168
// Certificate Transparency: Received a signed tree head whose JSON parsing was
// OK but was missing some of the fields.
export const ERR_CT_STH_INCOMPLETE = -169

// The attempt to reuse a connection to send proxy auth credentials failed
// before the AuthController was used to generate credentials. The caller should
// reuse the controller with a new connection. This error is only used
// internally by the network stack.
export const ERR_UNABLE_TO_REUSE_CONNECTION_FOR_PROXY_AUTH = -170

// Certificate Transparency: Failed to parse the received consistency proof.
export const ERR_CT_CONSISTENCY_PROOF_PARSING_FAILED = -171
