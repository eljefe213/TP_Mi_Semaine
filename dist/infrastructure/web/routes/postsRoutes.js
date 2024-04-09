"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostController_1 = require("../controllers/PostController");
const router = express_1.default.Router();
router.get('/', PostController_1.getAllPosts);
router.get('/:id', PostController_1.getPostById);
exports.default = router;
