## Sync
### Fission {options}


Sync methods can be swapped out on Fission initialization.


```js
var Fission = require('fission');

var SyncAdapter = require('fission-sync-localstorage');

var fission = new Fission({
  sync: SyncAdapter
});

```


```js
var Fission = require('fission');

var SyncAdapter = function(method, model, options){
  return model;
};

var fission = new Fission({
  sync: SyncAdapter
});

```
