import dns from "dns";

export function resolveDNS(host: string, recordType: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS"): Promise<string[]> {
  return new Promise((resolve, reject) => {
    dns.resolve(host, recordType, (err, records) => {
      if (err) reject(err);
      else resolve(records as string[]);
    });
  });
}

export function reverseLookup(ip: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    dns.reverse(ip, (err, hostnames) => {
      if (err) reject(err);
      else resolve(hostnames);
    });
  });
}

export function isDomainReachable(host: string): Promise<boolean> {
  return new Promise((resolve) => {
    dns.resolve(host, "A", (err) => resolve(!err));
  });
}

export function getIPAddress(host: string): Promise<string> {
  return new Promise((resolve, reject) => {
    dns.resolve4(host, (err, addresses) => {
      if (err) reject(err);
      else resolve(addresses[0]);
    });
  });
}

export function getAllIPs(host: string): Promise<{ ipv4: string[]; ipv6: string[] }> {
  return Promise.all([new Promise<string[]>((resolve) => dns.resolve4(host, (err, addresses) => resolve(err ? [] : addresses))), new Promise<string[]>((resolve) => dns.resolve6(host, (err, addresses) => resolve(err ? [] : addresses)))]).then(([ipv4, ipv6]) => ({ ipv4, ipv6 }));
}

export function hasMXRecords(host: string): Promise<boolean> {
  return new Promise((resolve) => {
    dns.resolveMx(host, (err, addresses) => resolve(!err && addresses.length > 0));
  });
}
