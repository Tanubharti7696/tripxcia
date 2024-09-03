"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const app = (0, express_1.Router)();
exports.AuthRoutes = app;
app.post('/login', auth_controller_1.AuthLogin);
app.post('/register', auth_controller_1.AuthRegister);
