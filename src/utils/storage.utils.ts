import Cookie from 'js-cookie';

//localStorage
export function saveToLocalStorage(key: string, value: any): void {
  const readyToSave = typeof value !== "string" ? JSON.stringify(value) : value;
  localStorage.setItem(key, readyToSave);
}

export function getFromLocalStorage(key: string): any {
  const data = localStorage.getItem(key);
  if (typeof data === "string") {
    return data;
  }
  if (data) {
    return JSON.parse(data);
  }
  return "";
}

export function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

export function cleanLocalStorage(): void {
  localStorage.clear();
}

// js-cookie
export function saveToCookies(key: string, value: any): void {
  const readyToSave = typeof value !== "string" ? JSON.stringify(value) : value;
  Cookie.set(key, readyToSave);
}

export function getFromCookies(key: string): any {
  const data = Cookie.getJSON(key);
  return data ? data : "";
}

export function removeFromCookies(key: string): void {
  Cookie.remove(key);
}
