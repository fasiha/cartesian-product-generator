# cartesian-product-generator

An [ES2015 generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) of the Cartesian product—you know, where you have several arrays and want to iterate over all combinations, but might not want to store them all in memory at the same time, which is what many existing libraries, e.g., [`lodash.product`](https://github.com/SeregPie/lodash.product), do.

Another iterable cartesian product library called [`product-iterable`](https://www.npmjs.com/package/product-iterable) is available, but I wanted this library to be dead simple: it uses a single dependency, [`ind2sub`](https://github.com/fasiha/ind2sub), to handle converting linear indexes into subscripts into a list of arrays, then indexes over all combinations, `yield`ing repeatedly. Furthermore, since it's a TypeScript project, this library is easy to use with TypeScript or other ES6+ environments.

## Installation and usage

**Node.js** In your Node project's directory, execute the following in the command line:
```
$ npm install --save cartesian-product-generator
```
Then you can load it into Node via
```js
const product = require('cartesian-product-generator').product;
const iterator = product(['r', 'g', 'b'], ['early', 'late'], ['high', 'low']);
console.log([...iterator])
// [ [ 'r', 'early', 'high' ],
//   [ 'g', 'early', 'high' ],
//   [ 'b', 'early', 'high' ],
//   [ 'r', 'late', 'high' ],
//   [ 'g', 'late', 'high' ],
//   [ 'b', 'late', 'high' ],
//   [ 'r', 'early', 'low' ],
//   [ 'g', 'early', 'low' ],
//   [ 'b', 'early', 'low' ],
//   [ 'r', 'late', 'low' ],
//   [ 'g', 'late', 'low' ],
//   [ 'b', 'late', 'low' ] ]
```
Note how `product` returns an iterator/iterable. You can use this in `Array.from`, `new Set()`, array slicing like above, and anywhere else in ES2015 that takes an iterable or iterator, including `for...of`, which allows you to iterate over each combination without ever storing all of them in memory:
```js
for (let combo of product(['r', 'g', 'b'], ['early', 'late'], ['high', 'low'])) {
  console.log('Look ma! Easy on the memory: ' + combo.join('+'));
}
```

For *TypeScript*, import it as
```ts
import {product} from 'cartesian-product-generator';
```
If you see errors about `type 'IterableIterator'`, you have to add `"es2015"` to the `"lib"` key in your `tsconfig.json`. If you then encounter errors complaining that `Type IterableIterator is not an array or string type`, you need to enable `"downlevelIteration": true` in your `tsconfig.json`, which, according to the [documentation](https://www.typescriptlang.org/docs/handbook/compiler-options.html), "Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'". (Hopefully this second error message is improved by the time you read this: [see issue](https://github.com/Microsoft/TypeScript/issues/21617).)

**Browser** Load [`cartesian-product-generator-browser.js`](cartesian-product-generator-browser.js) into your HTML via `<script>`, then access it through
```js
const iterator = cartesianProductGenerator.product(['r', 'g', 'b'], ['early', 'late'], ['high', 'low']);
console.log([...iterator])
```
