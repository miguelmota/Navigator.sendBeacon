'use strict';

polyfill.call(typeof window === 'object' ? window : this);

function polyfill() {
  if (isSupported.call(this)) return;

  if (!('navigator' in this)) this.navigator = {};
  this.navigator.sendBeacon = sendBeacon.bind(this);
};

function sendBeacon(url, data) {
  var event = this.event && this.event.type;
  var async = !(event === 'unload' || event === 'beforeunload');

  const xhr = ('XMLHttpRequest' in this) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('POST', url, async);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Accept', '*/*');


  if (isString(data)) {
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    xhr.responseType = 'text/plain';
  } else if (isBlob(data) && data.type) {
    xhr.setRequestHeader('Content-Type', data.type);
  } else if (isObject(data)) {
    data = JSON.stringify(data);
    xhr.setRequestHeader('Content-Type', 'application/json');
  }

  try {
    xhr.send(data);
  } catch (error) {
    return false;
  }

  return true;
}

function isSupported() {
  return ('navigator' in this) && ('sendBeacon' in this.navigator);
}

function isString(val) {
  return typeof val === 'string';
}

function isBlob(val) {
  return val instanceof Blob;
}

function isObject(val) {
  return val instanceof Object;
}
