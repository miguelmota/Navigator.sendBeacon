;(function(root) {
  'use strict';

  var isSupported = (('navigator' in root) &&
                     ('sendBeacon' in root.navigator));

  var sendBeacon = function (url, data) {
    var xhr = ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('POST', url, false);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Accept', '*/*');
    if (typeof data === 'string') {
      xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
      xhr.responseType = 'text/plain';
    } else if (({}).toString.call(data) === '[object Blob]') {
      if (data.type) {
        xhr.setRequestHeader('Content-Type', data.type);
      }
    }

    try {
      xhr.send(data);
    } catch (error) {}
    return true;
  }

  if (isSupported) {
    sendBeacon = navigator.sendBeacon;
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
  } else if (!isSupported) {
    root.navigator.sendBeacon = sendBeacon;
  }
})(window || this);
