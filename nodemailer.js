const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  secure: false, // true for port 465, false for other ports
  port: 587,
  auth: {
    user: 'zoey.halvorson34@ethereal.email',
    pass: 'DNvv2e4D5vAHa9qeQb',
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMain() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"DRCP 👻" <zoey.halvorson34@ethereal.email>', // sender address
    to: 'zoey.halvorson34@ethereal.email', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world DRCP?', // plain text body
    html: '<b>Hello world DRCP?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendMain();
