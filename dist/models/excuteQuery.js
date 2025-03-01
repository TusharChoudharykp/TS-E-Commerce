"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConnection_1 = __importDefault(require("../config/databaseConnection"));
const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        databaseConnection_1.default.query(query, params, (err, results) => {
            if (err)
                reject(err);
            else
                resolve(results);
        });
    });
};
exports.default = executeQuery;
