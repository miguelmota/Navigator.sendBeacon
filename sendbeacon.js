(function(root) {
  'use strict';

  function sendBeacon(url, data, _settings) {
    var xhr = ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('POST', url, false);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Accept', '*/*');
    if (typeof data === 'string') {
      xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
      xhr.responseType = 'text/plain';
    } else if (Object.prototype.toString.call(data) === '[object Blob]') {
      if (data.type) {
        xhr.setRequestHeader('Content-Type', data.type);
      }
    }

    if (typeof _settings === 'object') {
      if (!isNaN(_settings.timeout)) {
        // xhr.timeout doesn't work for synchronous requests
        setTimeout(function() {
          if (xhr.readyState !== 4) {
            xhr.abort();
          }
        }, _settings.timeout);
        ;
      }
    }

    xhr.send(data);
    return true;
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = sendBeacon;
    }
    exports.sendBeacon = sendBeacon;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return sendBeacon;
    });
  } else if ('navigator' in root && !('sendBeacon' in root.navigator)) {
    root.navigator.sendBeacon = sendBeacon;
  }
})(this);
