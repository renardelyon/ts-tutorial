/* eslint-disable no-redeclare */
type Combinable = number | string;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return (a as number) + (b as number);
}

export default add;
