(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classCallCheck, global.createClass);
    global.transport = mod.exports;
  }
})(this, function (exports, _classCallCheck2, _createClass2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var LokkaTransport = function () {
    function LokkaTransport() {
      (0, _classCallCheck3.default)(this, LokkaTransport);
    }

    (0, _createClass3.default)(LokkaTransport, [{
      key: 'send',
      value: function send(rawQuery, variables, operationName) {
        throw new Error('not implemented!');
        // return new Promise();
      }
    }]);
    return LokkaTransport;
  }();

  exports.default = LokkaTransport;
});