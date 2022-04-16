import Cookies, { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export function setCookie(
  key: string,
  value: string,
  options?: CookieSetOptions
) {
  return cookies.set(key, value, options);
}

export function getCookie(key: string) {
  return cookies.get(key);
}
