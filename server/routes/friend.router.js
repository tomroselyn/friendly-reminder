const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET friend
router.get('/', (req, res) => {
    const friendQuery = `SELECT "friend".id, "friend".first_name, "friend".last_name, "address".email, "address".sms, "address".url, "address".pref, "timing".frequency, "timing".last_type, "timing".last_date, "timing".due_date FROM "friend"
    JOIN "address" ON "address".friend_id = "friend".id
    JOIN "timing" ON "timing".friend_id = "friend".id
    WHERE "user_id" = $1;`;
    pool.query(friendQuery, [req.user.id])
    .then(friendQueryResult => {
        res.send(friendQueryResult.rows);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    }) //end friendQuery
    
}); //end GET friend

//POST friend
router.post('/', (req, res) => {
    const friend = req.body
    const dueDate = '2020/01/01';

    //friend query
    const friendQuery = `INSERT INTO "friend" ("first_name", "last_name", "user_id") VALUES ($1, $2, $3) RETURNING "id";`;
    pool.query(friendQuery, [friend.first_name, friend.last_name, req.user.id])
    .then(friendQueryResult => {

        //address query
        const addressQuery = `INSERT INTO "address" ("email", "sms", "url", "pref", "friend_id") VALUES ($1, $2, $3, $4, $5);`;
        pool.query(addressQuery, [friend.email, friend.sms, friend.url, friend.pref, friendQueryResult.rows[0].id])
        .then(addressQueryResult => {

            //timing query
            const timingQuery = `INSERT INTO "timing" ("frequency", "last_type", "last_date", "due_date", "friend_id") VALUES ($1, $2, $3, $4, $5);`;
            pool.query(timingQuery, [friend.frequency, friend.last_type, friend.last_date, dueDate, friendQueryResult.rows[0].id])
            .then(timingQueryResult => {
                res.sendStatus(200);
            }).catch(err => {
                console.log(err);
                res.sendStatus(500);
            }) //end timing query
        
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        }) //end address query

    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    }) //end friend query

}); //end POST friend

module.exports = router;