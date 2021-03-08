export function isEmpty(data: any): boolean {
  if (data instanceof Object) {
    return Object.keys(data).length === 0
  }

  return false;
}
