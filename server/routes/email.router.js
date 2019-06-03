const express = require('express');
const router = express.Router();
require('dotenv').config();

//email transporter
const nodemailer = require('nodemailer');

const transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.email_user,
        pass: process.env.email_pass
    }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

//POST route to send email
router.post('/send', (req, res) => {
    const name = `${req.user.first_name} ${req.user.last_name}`;
    const sendEmail = req.user.username;
    const message = req.body.message
    const content = `from: ${name} \n reply to: ${sendEmail} \n message: ${message} `

    const mail = {
        from: name,
        to: req.body.friend.email,  //Change to email address that you want to receive messages on
        subject: req.body.subject,
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                msg: 'fail'
            })
        } else {
            res.json({
                msg: 'success'
            })
        }
    })
}); //end POST route

module.exports = router;
