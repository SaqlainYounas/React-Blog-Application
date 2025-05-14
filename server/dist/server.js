"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const port = Number(process.env.PORT) || 3000;
app_1.default.listen(port, "0.0.0.0", () => {
    console.log("🚀 Server running on port", port);
});
