const transporter = require('../config/emailConfig');

const sendEmail = async(to, subject, text) => {
    try{
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text
        });
        console.log('Email sent successfully!');
    }
    catch(err){
        console.log('Email error:', err.message);
    }
};

module.exports = sendEmail;