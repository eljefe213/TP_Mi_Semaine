"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommentsController_1 = require("../controllers/CommentsController");
const router = express_1.default.Router();
// GET localhost:8000/comments/:id
router.get('/:id', CommentsController_1.getCommentsByPostId); // GET /comments/:id
exports.default = router;
