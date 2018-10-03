const isString = val => typeof val === 'string';
const isBlob = val => val instanceof Blob;
const isObject = val => val != null && typeof val == 'object';

polyfill.call(typeof window === 'object' ? window : this);

function polyfill() {
  if (isSupported.call(this)) return;

  if (!('navigator' in this)) this.navigator = {};
  this.navigator.sendBeacon = sendBeacon.bind(this);
};

function sendBeacon(url, data) {
  const event = this.event && this.event.type ? this.event.type : this.event;
  const sync = event === 'unload' || event === 'beforeunload';

  const xhr = ('XMLHttpRequest' in this) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('POST', url, !sync);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Accept', '*/*');


  if (isString(data)) {
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    xhr.responseType = 'text/plain';
  } else if (isBlob(data) && data.type) {
    xhr.setRequestHeader('Content-Type', data.type);
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
