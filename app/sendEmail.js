const nodemailer = require('nodemailer');

// Nodemailer
const sendEmail = async (options) => {
  // 1) Create transporter ( service that will send email )
  const transporter = nodemailer.createTransport({
    service: "gmail",
     
    secure: true,
    auth:{
        user:"islamhassan9631@gmail.com",
        pass:"nmquwvgxiqjmonra"
    }
   
  });

  // 2) Define email options (like from, to, subject, email content)
  const mailOpts = {
    from: 'islamhassan9631@gmail.com',
    to:options.email ,
    // 
    subject: options.subject,
    text: options.message,
  };

  // 3) Send email
  await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;