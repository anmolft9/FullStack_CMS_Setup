//emaile configuration and send email notification
//email template

import nodemailer from "nodemailer";

const emailProcessor = async (emailBody) => {
  try {
    ///
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, ///GENERATED ethereal Name
        pass: process.env.EMAIL_PASSWORD, ///GENERATED ethereal passowrd
      },
    });
    ///send email
    const info = await transporter.sendMail(emailBody);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

export const verificationEmail = (emailData) => {
  const emailBody = {
    from: '"Anmol Store 👻" <test@example.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Email Verification instruction ✔", // Subject line
    text: `Hi ${emailData.fName}, please folloe the lin to verify: ${emailData.url}`, // plain text body
    html: `
          <p>${emailData.fName}</p>
          <br/>
          <br/>
          <p>Please follow the link to verify your email</p>
          <br/>
          <br/>
          <p> <a href="${emailData.url}">Verify Email<a/></p>
        `, // html body
  };
  emailProcessor(emailBody);
};
export const userVerifiednotification = (emailData) => {
  const emailBody = {
    from: '"Anmol Store 👻" <test@example.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "your acc has been verified ✔", // Subject line
    text: `Hi ${emailData.fName}, your acc has been verified:login now ${process.env.ROOT_DOMAIN}`, // plain text body
    html: `
          <p>${emailData.fName}</p>
          <br/>
          <br/>
          <p>Please follow the link to verify your email</p>
          <br/>
          <br/>
          <p> <a href="${process.env.ROOT_DOMAIN}">Login<a/></p>q
        `, // html body
  };
  emailProcessor(emailBody);
};
