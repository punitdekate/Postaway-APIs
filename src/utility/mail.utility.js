import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "punitdekate.1999@gmail.com",
        pass: "mwkz dcfa fnqa kuqw",
    },
});

export async function mail(fromGmail, toGmail, mailSubject, mailText, mailHtml) {
    try {
        const options = {
            from: fromGmail, // sender address
            to: toGmail, // list of receivers
            subject: mailSubject, // Subject line
            text: mailText, // plain text body
            html: mailHtml, // html body
        };
        const info = await transporter.sendMail(options);
        return { "success": true, "msg": "Email sent successfully", "data": info }
    } catch (error) {
        console.log(error);
    }
}