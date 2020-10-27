# data-storager
> Simple storage for you data with customized transports/provirers


[![NPM version][npm-image]][npm-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]


## Installation

```
npm install data-storager --save
```

## Usage

```javascript
const storage = require('data-storager');

// create a named data store. If the data in the storage has already 
// been saved earlier, it will be read and placed in `test.data`
const test = storage.create(
    // set storage name
    "test", 
    // Set block working type of data block (array or object). 
    // It will work when the storage is first initiated 
    // on this transport.
    {},
    // Set transport. The transport object must have methods
    // `.store(name, data)` and `.restore(name)`
    new storage.transports.File({
        storragePath: "./store",
        humanize: true
    })
);

// take data from storage and output it to the console
console.log(test.data);
   // при первом запуске выведет: `{}`
   // при следующем запуске выведет: `{foo: 123, bar: {test: true}}`

// put data into storage
test.data.foo = 123;
test.data.bar = {test: true};

// save all data changes to the storage
storage.store();
```

... documentation in processed


## Participation in development
```
https://github.com/lastuniverse/data-storager/issues
```
## License

MIT

[![NPM](https://nodei.co/npm/data-storager.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/data-storager/)

[npm-image]: https://img.shields.io/npm/v/data-storager.svg?style=flat
[npm-url]: https://npmjs.org/package/data-storager
[david-image]: http://img.shields.io/david/lastuniverse/data-storager.svg?style=flat
[david-url]: https://david-dm.org/lastuniverse/data-storager
[license-image]: http://img.shields.io/npm/l/data-storager.svg?style=flat
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/data-storager.svg?style=flat
[downloads-url]: https://npmjs.org/package/data-storager