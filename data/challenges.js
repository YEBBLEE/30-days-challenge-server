import { Day, DaysInfo } from '../class/day.js';
import { Challenge } from '../class/challenge.js';
import { db } from '../db/database.js';
import { setDate } from '../common/date.js';

const ORDER_DESC = 'ORDER BY createdAt DESC';

export async function getByNickname(nickname) {
    return db
        .execute(
            `SELECT ch.id, ch.title, ch.startDate, ch.endDate, ch.createdAt, ch.daysId, 
            us.nickname, 
            dy.1, dy.2, dy.3, dy.4, dy.5, 
            dy.6, dy.7, dy.8, dy.9, dy.10, 
            dy.11, dy.12, dy.13, dy.14, dy.15, 
            dy.16, dy.17, dy.18, dy.19, dy.20, 
            dy.21, dy.22, dy.23, dy.24, dy.25, 
            dy.26, dy.27, dy.28, dy.29, dy.30
            FROM challenges as ch 
            LEFT JOIN users as us ON ch.userId=us.id
            JOIN  days as dy ON ch.daysId=dy.id
            WHERE nickname=? ${ORDER_DESC}`,[nickname]
        ).then((result) => {
            console.log(`[Result] getByNickname Challenges`);
            const challengeRows = result[0];

            const challenges = challengeRows.map((chRow)=> {
                let days = [];
                for (let i = 0; i < 30; i++) {
                    const day = new Day(i+1, chRow[i+1]);
                    days.push(day);
                }
                const daysId = chRow['daysId'];
                const daysInfo = new DaysInfo(daysId,days);

                const id = chRow['id'];
                const title = chRow['title'];
                const startDate = setDate(chRow['startDate']);
                const endDate = setDate(chRow['endDate']);
                const createdAt = chRow['createdAt'];

                const nowDate = new Date();
                const isProgress = new Date(chRow['endDate']) < nowDate ? false: true;
                const nickname = chRow['nickname'];
                const challenge = new Challenge(id,title,daysInfo,startDate,endDate,createdAt,isProgress,nickname);
                return challenge;
            });
            console.log(JSON.stringify(challenges));
            return challenges;
        });
}

export async function getById(challengeId) {
    return db
        .execute(
            `SELECT ch.id, ch.title, ch.startDate, ch.endDate, ch.createdAt, ch.daysId, 
            us.nickname, 
            dy.1, dy.2, dy.3, dy.4, dy.5, 
            dy.6, dy.7, dy.8, dy.9, dy.10, 
            dy.11, dy.12, dy.13, dy.14, dy.15, 
            dy.16, dy.17, dy.18, dy.19, dy.20, 
            dy.21, dy.22, dy.23, dy.24, dy.25, 
            dy.26, dy.27, dy.28, dy.29, dy.30
            FROM challenges as ch 
            LEFT JOIN users as us ON ch.userId=us.id
            JOIN  days as dy ON ch.daysId=dy.id
            WHERE ch.id=?`,[challengeId]
        ).then((result) => {
            console.log(`[Result] getByChallengeId Challenge`);
            const challengeRows = result[0];

            const challenges = challengeRows.map((chRow)=> {
                let days = [];
                for (let i = 0; i < 30; i++) {
                    const day = new Day(i+1, chRow[i+1]);
                    days.push(day);
                }
                const daysId = chRow['daysId'];
                const daysInfo = new DaysInfo(daysId,days);

                const id = chRow['id'];
                const title = chRow['title'];
                const startDate = setDate(chRow['startDate']);
                const endDate = setDate(chRow['endDate']);
                const createdAt = chRow['createdAt'];

                const nowDate = new Date();
                const isProgress = new Date(chRow['endDate']) < nowDate ? false: true;
                const nickname = chRow['nickname'];
                const challenge = new Challenge(id,title,daysInfo,startDate,endDate,createdAt,isProgress,nickname);
                return challenge;
            });
            console.log(JSON.stringify(challenges[0]));
            return challenges[0];
        });
}
export async function create(title, nickname) {
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        const getUserIdResult = await conn.query('SELECT id FROM users WHERE nickname=?',[nickname]);
        const userId = getUserIdResult[0][0]['id'];
        console.log(`userId : ${userId}`);

        const createDaysResult = await conn.query('INSERT INTO days SET ?',{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,'13':0,'14':0,'15':0,'16':0,'17':0,'18':0,'19':0,'20':0,'21':0,'22':0,'23':0,'24':0,'25':0,'26':0,'27':0,'28':0,'29':0,'30':0});
        const daysId = createDaysResult[0].insertId;
        console.log(`daysId : ${daysId}`);

        const startDate = new Date();
        let endDate = new Date();
        endDate.setDate(startDate.getDate()+30);
        const createdAt = new Date();
        const createChallengeResult 
            = await conn.query(`INSERT INTO challenges SET ?`,{title,startDate,endDate,createdAt,userId,daysId});
        const challengeId = createChallengeResult[0].insertId;
        console.log(`challengeId : ${challengeId}`);

        await conn.commit();

        return challengeId;
    } catch (error) {
        console.log(error);
        await conn.rollback();
    } finally {
        conn.release();
    }
}

export async function updateTitle(id, title, nickname) {
    return db
        .execute(
            'UPDATE challenges SET title=? WHERE id=?'
            ,[title,id]
        )
        .then(() =>{
            const challenge = getById(id);
            return challenge;
        });
}

export async function updateDays(daysId,number,isChecked,chId) {
    const conn = await db.getConnection();
    const column = '`'+number+'`';
    try {
        await conn.beginTransaction();
        const tinyInt = parseInt(isChecked ? 1 : 0); //true면 1,아니면 0
        await conn.query(`UPDATE days SET ${column}=? WHERE id=?`,[tinyInt,daysId]);

        await conn.commit();
    } catch (error) {
        console.log(error);
        await conn.rollback();
    }finally {
        conn.release();
    }
}

export async function remove(chId, daysId) {
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();
        await conn.query('DELETE FROM challenges WHERE id=?',[chId]);
        await conn.query('DELETE FROM days WHERE id=?',[daysId]);
        await conn.commit();
    } catch (error) {
        console.log(error);
        await conn.rollback();
    }finally {
        conn.release();
    }
}