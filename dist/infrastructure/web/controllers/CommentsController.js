"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByPostId = void 0;
const CommentRepository_1 = require("../../repositories/CommentRepository");
const response_1 = require("../../../utils/response");
const commentRepository = new CommentRepository_1.CommentRepository();
const getCommentsByPostId = (req, res) => {
    const { id } = req.params;
    const comments = commentRepository.getCommentsByPostId(id);
    console.table(comments);
    (0, response_1.response)(res, { statusCode: 200, data: comments, message: 'OK' });
};
exports.getCommentsByPostId = getCommentsByPostId;
