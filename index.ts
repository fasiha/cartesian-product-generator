import {optimizeInd2sub} from 'ind2sub';
export function* product(...arrs: any[]) {
  const sizes = arrs.map(arr => arr.length);
  const ind2subOpt = optimizeInd2sub(sizes);
  const ntotal = sizes.reduce((acc, n) => acc * n, 1);
  for (let i = 0; i < ntotal; i++) {
    let subs = ind2subOpt(i);
    yield subs.map((sub, dim) => arrs[dim][sub]);
  }
}
