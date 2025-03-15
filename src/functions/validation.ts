export function isURL(url: string): boolean {
  const urlRegex = /^(https?:\/\/)?(www\.)?([\da-z.-]+)(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
  const ipv4Regex = /^(https?:\/\/)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
  const ipv6Regex = /^(https?:\/\/)?\[([a-f0-9:]+)\](?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
  const localhostRegex = /^(https?:\/\/)?localhost(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
  const fileRegex = /^file:\/\/\/?([\/\w .-]*)*\/?$/i;

  return urlRegex.test(url) || ipv4Regex.test(url) || ipv6Regex.test(url) || localhostRegex.test(url) || fileRegex.test(url);
}

export function toBool(input: string, returnBool: boolean = true): string | boolean {
  return /true|yes|ok|act|sure|enable/gi.test(input) ? (returnBool ? true : "true") : returnBool ? false : "false";
}

export const isEmail = (email: string): boolean => 
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const isObject = (value: unknown): boolean => 
  typeof value === "object" && value !== null && !Array.isArray(value);

export function isArray(input: unknown): input is unknown[] {
  return Array.isArray(input);
}