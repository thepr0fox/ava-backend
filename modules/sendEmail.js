const nodemailer = require('nodemailer');

function sendEmail(toEmail, subject, message){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWD
        }
      });
      
      let mailOptions = {
        from: 'avaverifier@gmail.com',
        to: toEmail,
        subject: subject,
        html: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response + ' ' + toEmail);
        }
      });
      
}

module.exports = sendEmail