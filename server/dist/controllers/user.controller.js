"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = void 0;
const users_data_1 = __importDefault(require("../data/users.data"));
// Get all users
const getAllUsers = (req, res) => {
    res.json(users_data_1.default);
};
exports.getAllUsers = getAllUsers;
// Get single user by ID
const getUserById = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(404).json({ error: 'No ID' });
    }
    const user = users_data_1.default.find((u) => u.id === `${req.params.id}`);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const { posts } = user, userWithoutPosts = __rest(user, ["posts"]);
    res.json(userWithoutPosts);
};
exports.getUserById = getUserById;
