const nodemailer = require('nodemailer');

//transporter


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,

    },

});

async function sendOtpEmail(recipientEmail,otp,expirationTime){
    const mailOptions = {
        from: process.env.EMAIL,
        to: recipientEmail,
        subject:'Your OTP for Password Reset',
        text:`Enter this ${otp} to generate a new password, the OTP is valid for ${expirationTime} minutes`,
    };

    try{
        await transporter.sendMail(mailOptions);
        console.log('OTP send to', recipientEmail);
       
    }


    catch(err){
        console.error('Error sending OTP', err);
    }
}

async function sendAppointmentEmail(recipientEmail, subject, message){
    const mailOptions = {
        from: process.env.EMAIL,
        to: recipientEmail,
        subject,
        texxt:message,
    };

    try{
        await transporter.sendMail(mailOptions);
        console.log(`Appointment email sent to ${recipientEmail}`);
    }
    catch(err){
        console.error(`Error sending appointment email:`, err);
    }
}

module.exports= { sendOtpEmail, sendAppointmentEmail };