"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const model_1 = require("./model");
const md5_typescript_1 = require("md5-typescript");
/*
Create a route for each CRUD operaion on admin table
*/
exports.router = (0, express_1.Router)();
exports.router.get('/api/admin', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.Admin);
            const alladmins = yield repository.find();
            res.send(alladmins);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/api/admin/:username', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.Admin);
            const alladmins = yield repository.findOne({ username: req.params.username });
            res.send(alladmins);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/api/admin/login', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.Admin);
            const admin = yield repository.findOne({ username: req.body.username, password: md5_typescript_1.Md5.init(req.body.password) });
            res.send(admin);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/api/admin', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.Admin);
            const admin = new model_1.Admin();
            admin.username = req.body.username;
            admin.password = md5_typescript_1.Md5.init(req.body.password);
            const result = yield repository.save(admin);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/api/admin/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.Admin);
            const admin = yield repository.findOne(req.params.id);
            admin.password = md5_typescript_1.Md5.init(req.body.password);
            const result = yield repository.save(admin);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.delete('/api/admin/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.Admin);
            yield repository.delete(req.params.id);
            res.send('OK');
        }
        catch (err) {
            return next(err);
        }
    });
});
