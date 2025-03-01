"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, message = "Success") => {
    res.status(200).json({ success: true, message, data });
};
exports.successResponse = successResponse;
const errorResponse = (res, error, statusCode = 500) => {
    res.status(statusCode).json({ success: false, message: error.message });
};
exports.errorResponse = errorResponse;
