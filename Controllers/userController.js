"use strict";
const userModel = require("../Models/userModels");
const argon2 = require("argon2");

async function createNewUser(req, res) {
    const {first, last, username, email, password} = req.body;

    try {
        await userModel.createUser(first, last, username, email, password);
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

module.exports = {
    createNewUser
}