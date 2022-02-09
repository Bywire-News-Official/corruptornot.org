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
  Create a route for each CRUD operaion on user_vote table
*/
exports.router = (0, express_1.Router)();
exports.router.get('/api/vote', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.UserVotes);
            const allvotes = yield repository.find({ relations: ["user", "politician"] });
            res.send(allvotes);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/api/vote/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.UserVotes);
            const vote = yield repository.findOne(req.params.id);
            res.send(vote);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/api/vote/user/:userID/politician/:politicianID', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.UserVotes);
            const vote = yield repository.findOne({ user: req.params.userID, politician: req.params.politicianID });
            res.send(vote);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/api/vote/result/:politicianID', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.UserVotes);
            const result = yield repository.find({ politician: req.params.politicianID });
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/api/vote', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.UserVotes);
            const vote = new model_1.UserVotes();
            vote.user = req.body.user;
            vote.politician = req.body.politician;
            vote.isCorrupt = req.body.isCorrupt;
            const result = yield repository.save(vote);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/api/vote/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.UserVotes);
            const vote = yield repository.findOne(req.params.id);
            vote.user = req.body.user;
            vote.politician = req.body.politician;
            vote.isCorrupt = req.body.isCorrupt;
            const result = yield repository.save(vote);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.delete('/api/vote/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield (0, model_1.getRepository)(model_1.UserVotes);
            yield repository.delete(req.params.id);
            res.send('OK');
        }
        catch (err) {
            return next(err);
        }
    });
});
