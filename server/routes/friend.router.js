const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//DELETE friend by id
router.delete('/:id', (req, res) => {
    const deleteQuery = `DELETE FROM "friend" WHERE "id" = $1 AND "user_id" = $2;`;
    pool.query(deleteQuery, [req.params.id, req.user.id])
        .then(deleteQueryResult => {
            res.sendStatus(204);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        }); //end deleteQuery

}); //end DELETE friend by id

//GET friend
router.get('/', (req, res) => {
    const getQuery = `SELECT "friend".id, "friend".first_name, "friend".last_name, "address".email, "address".sms, "address".url, "address".pref, "timing".frequency, "timing".last_type, "timing".last_date, "timing".due_date FROM "friend"
    JOIN "address" ON "address".friend_id = "friend".id
    JOIN "timing" ON "timing".friend_id = "friend".id
    WHERE "user_id" = $1;`;
    pool.query(getQuery, [req.user.id])
    .then(getQueryResult => {
        res.send(getQueryResult.rows);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    }); //end getQuery

}); //end GET friend

//POST friend
router.post('/', (req, res) => {
    const friend = req.body
    const dueDate = new Date(friend.last_date);
    dueDate.setDate(dueDate.getDate() + (friend.frequency * 7));
    
    // `${friend.last_date} + integer '${friend.frequency * 7}'`;

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
    }); //end friend query

}); //end POST friend

//PUT friend by id (update everything)
router.put('/:id', (req, res) => {
    const friend = req.body;
    const dueDate = '2020/01/09';

    const updateFriendQuery = `UPDATE "friend" SET "first_name" = $1, "last_name" = $2 WHERE "id" = $3 AND "user_id" = $4;`;
    pool.query(updateFriendQuery, [friend.first_name, friend.last_name, req.params.id, req.user.id])
        .then(updateFriendQueryResult => {

            const updateAddressQuery = `UPDATE "address" SET "email" = $1, "sms" = $2, "url" = $3 WHERE "friend_id" = $4;`;
            pool.query(updateAddressQuery, [friend.email, friend.sms, friend.url, req.params.id])
                .then(updateAddressQueryResult => {

                    const updateTimingQuery = `UPDATE "timing" SET "frequency" = $1, "last_type" = $2, "last_date" = $3, "due_date" = $4 WHERE "friend_id" = $5;`;
                    pool.query(updateTimingQuery, [friend.frequency, friend.last_type, friend.last_date, dueDate, req.params.id])
                    .then(timingQueryResult => {
                        res.sendStatus(200);

                    }).catch(err => {
                        console.log(err);
                        res.sendStatus(500);
                    }) //end update timing

                }).catch(err => {
                    console.log(err);
                    res.sendStatus(500);
                }) //end update address

        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        }); //end update friend

}); //end PUT friend by id (update everything)

module.exports = router;