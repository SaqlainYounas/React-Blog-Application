"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const posts_route_1 = __importDefault(require("./routes/posts.route"));
const app = (0, express_1.default)();
/* CONFIGURATIONS */
const corsOptions = {
    origin: process.env.FRONTEND_HOST,
};
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use((0, morgan_1.default)('common'));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../public/images')));
/* ROUTES */
app.use('/', users_route_1.default);
app.use('/', posts_route_1.default);
// Catch-all 404 handler (MUST be after all other routes)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: '404 Invalid Route',
    });
});
exports.default = app;
