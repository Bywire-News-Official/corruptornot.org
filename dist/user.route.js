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
/*
Create a route for each CRUD operaion on user table
*/
exports.router = (0, express_1.Router)();
exports.router.get('/api/user', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.User);
            const allusers = yield repository.find();
            res.send(allusers);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/api/user/:email', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.User);
            const user = yield repository.findOne({ email: req.params.email });
            res.send(user);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/api/user', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.User);
            const user = new model_1.User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.ip = req.body.ip;
            const result = yield repository.save(user);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/api/user/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.User);
            const user = yield repository.findOne(req.params.id);
            user.name = req.body.name;
            user.email = req.body.email;
            user.ip = req.body.ip;
            const result = yield repository.save(user);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.delete('/api/user/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.User);
            yield repository.delete(req.params.id);
            res.send('OK');
        }
        catch (err) {
            return next(err);
        }
    });
});
