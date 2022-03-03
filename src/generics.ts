type Length = {
    length: number;
}

export function objMerge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

export function countAndDescribe<T extends Length>(element: T): [T, string] {
  let descriptionText: string = '';
  if (element.length === 1) {
    descriptionText = 'Got 1 element';
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements`;
  }
  return [element, descriptionText];
}

export function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return `Value ${obj[key]}`;
}

export class DataStorage <T extends string | number | boolean> {
  private data: T[] = [];

  addData(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [
      ...this.data
    ];
  }
}
