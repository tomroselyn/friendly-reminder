const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//DELETE friend by id
router.delete('/:id', rejectUnauthenticated, (req, res) => {
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
router.get('/', rejectUnauthenticated, (req, res) => {
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

//POST friend using SQL transaction
router.post('/', rejectUnauthenticated, async (req, res) => {
    const friend = req.body
    //calculate due date
    const dueDate = new Date(friend.last_date);
    dueDate.setDate(dueDate.getDate() + (friend.frequency * 7));

    //use the same connection for all queries
    const connection = await pool.connect()

    try {
        //begin the transaction
        await connection.query('BEGIN');

        //add friend first
        const addFriendQuery = `INSERT INTO "friend" ("first_name", "last_name", "user_id") VALUES ($1, $2, $3) RETURNING "id";`;
        const addFriendValues = [friend.first_name, friend.last_name, req.user.id];
        //and save returning id
        const result = await connection.query(addFriendQuery, addFriendValues);
        const newFriendId = result.rows[0].id;

        //then, add address
        const addAddressQuery = `INSERT INTO "address" ("email", "sms", "url", "pref", "friend_id") VALUES ($1, $2, $3, $4, $5);`;
        const addAddressValues = [friend.email, friend.sms, friend.url, friend.pref, newFriendId];
        await connection.query(addAddressQuery, addAddressValues);

        //then, add timing
        const addTimingQuery = `INSERT INTO "timing" ("frequency", "last_type", "last_date", "due_date", "friend_id") VALUES ($1, $2, $3, $4, $5);`;
        const addTimingValues = [friend.frequency, friend.last_type, friend.last_date, dueDate, newFriendId];
        await connection.query(addTimingQuery, addTimingValues);

        //commit the transaction
        await connection.query('COMMIT');
            res.sendStatus(201);

    } catch (error) {
        //if any steps fail, abort entire transaction
        await connection.query('ROLLBACK');
        console.log('transaction error - rolling back add new friend:', error);
            res.sendStatus(500);

    } finally {
        connection.release()
    }
}); //end POST

//PUT everything using SQL transaction
router.put('/:id', rejectUnauthenticated, async (req, res) => {
    const friend = req.body
    //calculate due date
    const dueDate = new Date(friend.last_date);
    dueDate.setDate(dueDate.getDate() + (friend.frequency * 7));

    //use the same connection for all queries
    const connection = await pool.connect()

    try {
        //begin the transaction
        await connection.query('BEGIN');

        //update friend first
        const updateFriendQuery = `UPDATE "friend" SET "first_name" = $1, "last_name" = $2 WHERE "id" = $3 AND "user_id" = $4;`;
        const updateFriendValues = [friend.first_name, friend.last_name, req.params.id, req.user.id];
        await connection.query(updateFriendQuery, updateFriendValues);

        //then, update address
        const updateAddressQuery = `UPDATE "address" SET "email" = $1, "sms" = $2, "url" = $3, "pref" = $4 WHERE "friend_id" = $5;`;
        const updateAddressValues = [friend.email, friend.sms, friend.url, friend.pref, req.params.id];
        await connection.query(updateAddressQuery, updateAddressValues);

        //then, add timing
        const updateTimingQuery = `UPDATE "timing" SET "frequency" = $1, "last_type" = $2, "last_date" = $3, "due_date" = $4 WHERE "friend_id" = $5;`;
        const updateTimingValues = [friend.frequency, friend.last_type, friend.last_date, dueDate, req.params.id];
        await connection.query(updateTimingQuery, updateTimingValues);

        //commit the transaction
        await connection.query('COMMIT');
        res.sendStatus(200);

    } catch (error) {
        //if any steps fail, abort entire transaction
        await connection.query('ROLLBACK');
        console.log('transaction error - rolling back update friend:', error);
        res.sendStatus(500);

    } finally {
        connection.release()
    }
}); //end PUT everything

//PUT extra day by id
router.put('/extraday/:id', rejectUnauthenticated, (req, res) => {
    const extraDayQuery = `UPDATE "timing" SET "due_date" = "due_date" + integer '1' WHERE "friend_id" = $1;`;
    pool.query(extraDayQuery, [req.params.id])
    .then(result => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    }); //end extraDay query

}); //end PUT extra day by id

module.exports = router;