"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.getRepository = exports.Admin = exports.UserVotes = exports.User = exports.Politician = void 0;
const typeorm_1 = require("typeorm");
/*
contains database models
*/
let Politician = class Politician {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Politician.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Politician.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Politician.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Politician.prototype, "image", void 0);
Politician = __decorate([
    (0, typeorm_1.Entity)()
], Politician);
exports.Politician = Politician;
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "ip", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
let UserVotes = class UserVotes {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserVotes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "userID" }),
    __metadata("design:type", User)
], UserVotes.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Politician, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "politicianID" }),
    __metadata("design:type", Politician)
], UserVotes.prototype, "politician", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], UserVotes.prototype, "isCorrupt", void 0);
UserVotes = __decorate([
    (0, typeorm_1.Entity)()
], UserVotes);
exports.UserVotes = UserVotes;
let Admin = class Admin {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Admin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Admin.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
Admin = __decorate([
    (0, typeorm_1.Entity)()
], Admin);
exports.Admin = Admin;
let connection;
function getRepository(entity) {
    return __awaiter(this, void 0, void 0, function* () {
        if (connection === undefined) {
            connection = yield (0, typeorm_1.createConnection)({
                type: 'mysql',
                database: 'corruptornot',
                username: "root",
                password: "",
                synchronize: true,
                entities: [
                    Politician,
                    User,
                    UserVotes,
                    Admin
                ],
            });
        }
        return connection.getRepository(entity);
    });
}
exports.getRepository = getRepository;
