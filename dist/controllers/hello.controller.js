"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sayHello = void 0;
const http_status_js_1 = require("../types/http-status.js");
const sayHello = (res, next) => {
    try {
        res.success(null, 'Backend Application Running ...', http_status_js_1.HTTP_SUCCESS);
    }
    catch (error) {
        res.error('error', http_status_js_1.HTTP_INTERNAL_SERVER_ERROR, error);
        next(error);
    }
};
exports.sayHello = sayHello;
