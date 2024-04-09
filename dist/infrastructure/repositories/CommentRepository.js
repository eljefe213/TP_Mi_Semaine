"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Repository qui gère le CRUD des commentaires
class CommentRepository {
    filePath = path_1.default.join(__dirname, '..', 'data', 'comments.json');
    // Récupère tous les commentaires du fichier comments.json
    getAllComments() {
        const data = fs_1.default.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }
    // Récupère un commentaire par son id
    getCommentsByPostId(postId) {
        const comments = this.getAllComments();
        return comments.filter(comment => comment.postId === postId);
    }
}
exports.CommentRepository = CommentRepository;
