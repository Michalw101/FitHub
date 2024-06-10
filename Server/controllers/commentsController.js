const model = require('../model/commentsModel');

async function createComment(body) {
    try {
        return model.createComment(body);
    }
    catch (err) {
        throw err;
    }
};


async function getCommentById(id) {
    try {
        return model.getComment(id);
    }
    catch (err) {
        throw err;
    }
};


async function updateComment(body) {
    try {
        return model.updateComment(body);
    }
    catch (err) {
        throw err;
    }
};

async function deleteComment(id) {
    try {
        return model.deleteComment(id);
    }
    catch (err) {
        throw err;
    }
};


module.exports = { createComment,  getCommentById, updateComment, deleteComment}