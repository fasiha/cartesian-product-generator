import {ind2sub} from 'ind2sub';
export function* product(...arrs: any[]) {
  const sizes = arrs.map(arr => arr.length);
  const ntotal = sizes.reduce((acc, n) => acc * n, 1);
  for (let i = 0; i < ntotal; i++) {
    let subs = ind2sub(sizes, i);
    yield subs.map((sub, dim) => arrs[dim][sub]);
  }
}
