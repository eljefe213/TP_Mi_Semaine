"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostById = exports.getAllPosts = void 0;
const PostService_1 = require("../../../domain/services/PostService");
const response_1 = require("../../../utils/response");
const postService = new PostService_1.PostService();
const getAllPosts = (req, res) => {
    const posts = postService.getAllPosts();
    console.table(posts);
    (0, response_1.response)(res, {
        statusCode: 200,
        message: 'OK',
        data: posts
    });
};
exports.getAllPosts = getAllPosts;
// localhost:3000/posts/1
// localhost:3000/posts/125
// localhost:3000/posts/125545
const getPostById = (req, res) => {
    const postId = req.params.id;
    const post = postService.getPostById(postId);
    console.table(post);
    if (!post) {
        (0, response_1.response)(res, { statusCode: 404, message: 'Post not found' });
    }
    else {
        (0, response_1.response)(res, { statusCode: 200, message: 'OK', data: post });
    }
};
exports.getPostById = getPostById;
