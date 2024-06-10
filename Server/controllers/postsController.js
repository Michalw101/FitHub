const model = require('../model/postsModel');

async function createPost(body) {
    try {
        return model.createPost(body);
    }
    catch (err) {
        throw err;
    }
};

async function getAllPosts() {
    try {
        return model.getAllPosts();
    }
    catch (err) {
        throw err;
    }
};

async function getPostsById(id) {
    try {
        console.log('b');
        return model.getPosts(id);
    }
    catch (err) {
        throw err;
    }
};


async function updatePost(body) {
    try {
        return model.updatePost(body);
    }
    catch (err) {
        throw err;
    }
};

async function deletePost(id) {
    try {
        return model.deletePost(id);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { createPost, getAllPosts, getPostsById, updatePost, deletePost}