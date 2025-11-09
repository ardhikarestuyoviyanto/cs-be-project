"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const responseHandler = (req, res, next) => {
    res.success = function (data = null, message = 'Success', status = 200) {
        return res.status(status).json({ success: true, message, data });
    };
    res.error = function (message = 'Error', status = 500, errors = null) {
        return res.status(status).json({ success: false, message, errors });
    };
    next();
};
exports.responseHandler = responseHandler;
