const nodeMailer = require("nodemailer");


exports.sendMail = async(options) => {
    const transporter = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "66d45ba3321f51",
          pass: "0749fc8a6e6a1d"
        }
      });

    const mailOptions = {
        from: "66d45ba3321f51",
        to: options.email,
        subject: options.subject,
        text: options.resetPasswordUrlMessage,
    }

    await transporter.sendMail(mailOptions);
}