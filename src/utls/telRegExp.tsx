export const telRegExp = /\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/;
export const telValidation = (str: string) =>
  str.replace(telRegExp, "").length === 11;
