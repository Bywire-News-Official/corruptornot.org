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
Create a route for each CRUD operaion on politician table
*/
exports.router = (0, express_1.Router)();
exports.router.get('/api/politician', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.Politician);
            const allpoliticians = yield repository.find();
            res.send(allpoliticians);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/api/politician/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.Politician);
            const politician = yield repository.findOne(req.params.id);
            res.send(politician);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/api/politician', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.Politician);
            const politician = new model_1.Politician();
            politician.name = req.body.name;
            politician.image = req.body.image;
            politician.description = req.body.description;
            const result = yield repository.save(politician);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/api/politician/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.Politician);
            const politician = yield repository.findOne(req.params.id);
            politician.name = req.body.name;
            politician.image = req.body.image;
            politician.description = req.body.description;
            const result = yield repository.save(politician);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.delete('/api/politician/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.Politician);
            yield repository.delete(req.params.id);
            res.send('OK');
        }
        catch (err) {
            return next(err);
        }
    });
});
