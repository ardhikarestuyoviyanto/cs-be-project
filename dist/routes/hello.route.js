"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hello_controller_js_1 = require("../controllers/hello.controller.js");
const helloUser = (0, express_1.Router)();
helloUser.get('/', hello_controller_js_1.sayHello);
exports.default = helloUser;
