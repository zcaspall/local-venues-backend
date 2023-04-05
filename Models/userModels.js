"use strict";
const db = require("./db");
const crypto = require("crypto");
const argon2 = require("argon2");
const { env } = require("process");

async function createUser(first, last, username, email, password) {
    const uuid = crypto.randomUUID();
    const hash = await argon2.hash(password);

    const sql = `
        INSERT INTO users
            (userId, firstname, lastname, email, username, passwordHash)
        VALUES
            (@userId, @firstname, @lastname, @email, @username, @passwordHash)
    `;

    const stmt = db.prepare(sql);

    try{
        stmt.run({
            id: uuid,
            first,
            last,
            email,
            username,
            password: hash
        });
    }
    catch(err){
        console.error(err);
    }
};

module.exports = {
    createUser
}