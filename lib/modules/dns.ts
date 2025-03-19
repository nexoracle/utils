import dns from "dns";

/** Resolves a domain to its DNS records */
export function resolveDNS(host: string, recordType: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS"): Promise<string[]> {
  return new Promise((resolve, reject) => {
    dns.resolve(host, recordType, (err, records) => {
      if (err) reject(err);
      else resolve(records as string[]);
    });
  });
}

/** Performs a reverse DNS lookup on an IP address */
export function reverseLookup(ip: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    dns.reverse(ip, (err, hostnames) => {
      if (err) reject(err);
      else resolve(hostnames);
    });
  });
}

/** Checks if a domain is reachable via DNS */
export function isDomainReachable(host: string): Promise<boolean> {
  return new Promise((resolve) => {
    dns.resolve(host, "A", (err) => resolve(!err));
  });
}
