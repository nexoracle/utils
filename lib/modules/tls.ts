import tls from "tls";

function formatHostname(host: string): string {
  return host.replace(/^https?:\/\//i, "");
}

export function checkTLSHandshake(hostname: string, port = 443): Promise<boolean> {
  const host = formatHostname(hostname);
  return new Promise((resolve) => {
    const socket = tls.connect(port, host, { rejectUnauthorized: false }, () => {
      resolve(true);
      socket.end();
    });

    socket.on("error", () => resolve(false));
  });
}

export function getSSLCertificate(hostname: string, port = 443): Promise<tls.PeerCertificate | null> {
  const host = formatHostname(hostname);
  return new Promise((resolve) => {
    const socket = tls.connect(port, host, { rejectUnauthorized: false }, () => {
      resolve(socket.getPeerCertificate());
      socket.end();
    });

    socket.on("error", () => resolve(null));
  });
}

export async function isTLSValid(hostname: string, port = 443): Promise<boolean> {
  const host = formatHostname(hostname);
  const cert = await getSSLCertificate(host, port);
  if (!cert || !cert.valid_to) return false;

  const expiryDate = new Date(cert.valid_to);
  return expiryDate > new Date();
}
