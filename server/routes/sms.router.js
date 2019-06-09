const express = require('express');
const router = express.Router();
require('dotenv').config();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const accountSid = process.env.sms_accountSid;
const authToken = process.env.sms_authToken;
const twilio = require('twilio');

//POST route to send sms
router.post('/send', rejectUnauthenticated, (req, res) => {
    
    const client = new twilio(accountSid, authToken);

    client.messages.create({
        body: req.body.message, // body of sms message
        to: `+1${req.body.friend.sms}`,  // text this number
        from: '+16127126565' // from a valid twilio number
    }).then(message => {
        console.log(message.sid);
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
}); //end POST

module.exports = router;