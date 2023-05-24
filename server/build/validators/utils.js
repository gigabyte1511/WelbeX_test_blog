"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreparedErrorsFromYup = void 0;
var getPreparedErrorsFromYup = function (e) { return e.inner.reduce(function (acc, el) {
    acc[el.path] = el.errors.join(', ');
    return acc;
}, {}); };
exports.getPreparedErrorsFromYup = getPreparedErrorsFromYup;
