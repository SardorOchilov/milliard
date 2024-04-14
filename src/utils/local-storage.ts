export async function setLocalStorage(key: string, value: string) {
  return localStorage.setItem(key, value);
}

export async function getLocalStorage(key: string) {
  console.log(localStorage.getItem(key));
  return localStorage.getItem(key);
}
