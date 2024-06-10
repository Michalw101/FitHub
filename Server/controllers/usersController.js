const model = require('../model/usersModel');

async function createUser(fullname, username, email, address_id, company_id, phone, website) {
    try {
        return model.createUser(fullname, username, email, address_id, company_id, phone, website);
    }
    catch (err) {
        throw err;
    }
};

async function getAllUsers() {
    try {
        return model.getUsers();
    }
    catch (err) {
        throw err;
    }
};

async function getUserById(id) {
    try {
        return model.getUser(id);
    }
    catch (err) {
        throw err;
    }
};

async function getUserByQuery(query) {
    try {
        return model.getUserByQuery(query);
    }
    catch (err) {
        throw err;
    }
};

async function updateUser(user_id, fullname, username, email, address_id, company_id, phone, website) {
    try {
        return model.updateUser(user_id, fullname, username, email, address_id, company_id, phone, website);
    }
    catch (err) {
        throw err;
    }
};

async function deleteUser(id) {
    try {
        return model.deleteUser(id);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser, getUserByQuery}