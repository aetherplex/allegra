import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export const shortenAddress = (str: string, maxLength = 6): string =>
  `${str.slice(0, maxLength)}...${str.slice(
    str.length - maxLength,
    str.length
  )}`;

export async function generateHash(value: string) {
  const crypto = window.crypto;
  const buffer = str2ab(value);
  const hash_bytes = await crypto.subtle.digest('SHA-1', buffer);
  return [...new Uint8Array(hash_bytes)]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');
}

// https://stackoverflow.com/a/11058858
function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export function capitalize(str: string) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}
