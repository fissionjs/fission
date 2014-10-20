## Plugins

#### Sync
Sync methods can be swapped out on initialization of Fission with plugins.

```js
var Fission = require('fission');
var LocalStorageSync = require('fission-sync-localstorage');
var fission = new Fission({
  sync: LocalStorageSync
});

```

**fission sync plugins on npm should be prefixed with fission-sync**

