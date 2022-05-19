import { db } from '../db/database.js';

export async function findByNickname(nickname) {
    return db
        .execute(
            'SELECT * FROM users WHERE nickname=?',
            [nickname]
        )
        .then((result) => {
            console.log(`[Result] findByNickname : ${JSON.stringify(result[0][0])}`);
            return result[0][0];
        });
}

export async function createUser(user) {
    const {nickname, password, email, url} = user;
    return db
        .execute(
            'INSERT INTO users (nickname, password, email, url) VALUES (?,?,?,?)',
            [nickname, password, email, url]
        )
        .then((result) => {
            console.log(`[Result] created User Id : ${result[0].insertId}`);
            return result[0].insertId
        });
}

export async function findById(userId) {
    return db
        .execute(
            'SELECT * FROM users WHERE id=?',
            [userId]
        )
        .then((result) => result[0][0]);
}