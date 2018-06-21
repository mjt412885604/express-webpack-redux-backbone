'use strict';

if (typeof Promise === 'undefined') {
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}


// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');
