import tls from "tls";

/** Checks if a server supports TLS by performing a handshake */
export function checkTLSHandshake(host: string, port = 443): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = tls.connect(port, host, { rejectUnauthorized: false }, () => {
      resolve(true);
      socket.end();
    });

    socket.on("error", () => resolve(false));
  });
}

/** Fetches SSL certificate details of a domain */
export function getSSLCertificate(host: string, port = 443): Promise<tls.PeerCertificate | null> {
  return new Promise((resolve) => {
    const socket = tls.connect(port, host, { rejectUnauthorized: false }, () => {
      resolve(socket.getPeerCertificate());
      socket.end();
    });

    socket.on("error", () => resolve(null));
  });
}

/** Checks if a domain's TLS certificate is valid */
export async function isTLSValid(host: string, port = 443): Promise<boolean> {
  const cert = await getSSLCertificate(host, port);
  if (!cert || !cert.valid_to) return false;

  const expiryDate = new Date(cert.valid_to);
  return expiryDate > new Date();
}
