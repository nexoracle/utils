// lib/functions/validation.ts
var isEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
var isGmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@(gmail|google|googlemail)\.com$/i;
  return regex.test(email);
};
export {
  isEmail,
  isGmail
};
