"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRepository = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const CommentRepository_1 = require("./CommentRepository");
// Repository qui gère le CRUD des posts
class PostsRepository {
    posts = [];
    commentRepository = new CommentRepository_1.CommentRepository();
    // Le chemin du fichier JSON des pots (à partir du repertoire courant)
    filePath = path_1.default.join(__dirname, '..', 'data', 'posts.json');
    constructor() {
        // on charge les données des pots à partir du fichier JSON dès le constructeur pour
        // qu'il soient disponibles dans la class
        this.posts = this.loadPosts();
    }
    // Récupérer un post par son id
    getPostById(id) {
        return this.posts.find(post => post.id === id);
    }
    // Récupérer tout les posts existants dans notre posts.json
    getAllPosts() {
        const data = fs_1.default.readFileSync(this.filePath, 'utf-8');
        const posts = JSON.parse(data);
        return posts.map((post) => {
            if (!post.id)
                return post;
            const comments = this.commentRepository.getCommentsByPostId(post.id);
            return { ...post, comments };
        });
    }
    // Charger les données des posts à partir du fichier JSON (en private car utilisé seulement dans la class)
    loadPosts() {
        const data = fs_1.default.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }
    // ajouter un post à notre post.json
    savePosts(post) {
        // On convertit les données en JSON et on les écrit dans le fichier
        const data = JSON.stringify(post);
        // On écrit les données dans le fichier de manière synchrone
        fs_1.default.writeFileSync(this.filePath, data);
    }
    // on récupére l'id d'un post en fonction de son titre
    getPostIdByTitle(title) {
        const post = this.posts.find(post => post.title === title);
        return post?.id;
    }
}
exports.PostsRepository = PostsRepository;
