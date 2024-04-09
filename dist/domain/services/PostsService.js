"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const PostRepository_1 = require("../../infrastructure/repositories/PostRepository");
const crypto_1 = __importDefault(require("crypto"));
class PostService {
    postsRepository;
    constructor() {
        this.postsRepository = new PostRepository_1.PostsRepository();
    }
    getPostById(id) {
        return this.postsRepository.getPostById(id);
    }
    getAllPosts() {
        return this.postsRepository.getAllPosts();
    }
    addPost(post) {
        const posts = this.postsRepository.getAllPosts();
        // On ajoute le nouveau post à la liste des posts
        posts.push({
            id: crypto_1.default.randomUUID(),
            ...post,
        });
        // On sauvegarde les posts
        this.postsRepository.savePosts(posts);
    }
    getPostIdByTitle(title) {
        return this.postsRepository.getPostIdByTitle(title);
    }
}
exports.PostService = PostService;
