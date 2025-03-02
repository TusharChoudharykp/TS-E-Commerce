"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./config/databaseConnection");
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const PORT = 8001;
app.use(body_parser_1.default.json());
// Routes
app.use("/api", index_1.default);
// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something broke!" });
});
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
