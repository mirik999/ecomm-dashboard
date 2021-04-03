export function isEmpty(data: any): boolean {
  if (data === undefined || data === null) {
    return true;
  }

  if (data instanceof Object) {
    return Object.keys(data).length === 0;
  }

  if (data instanceof Array) {
    return data.length === 0;
  }

  return false;
}
