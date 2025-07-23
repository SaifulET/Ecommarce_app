import { EMAIL_USER,EMAIL_HOST,EMAIL_PASS,EMAIL_PORT,EMAIL_SECURITY,EMAIL_UN_AUTH } from "../config/config.js"
import nodemailer from "nodemailer";

const SendEmail=async(EmailTo,EmailText,EmailSubject)=>{
    let transporter=nodemailer.createTransport({
        host:EMAIL_HOST,
        port:EMAIL_PORT,
        secure:EMAIL_SECURITY,
        auth:{
            user:EMAIL_USER,
            pass:EMAIL_PASS
        },
        tls:{
            rejectUnauthorized:false 
        }
    })
    let mailOptions={
        from:'Task manager MERN <info@teamrabbil.com>',
        to:EmailTo,
        subject:EmailSubject,
        text:EmailText,
    }
    return await transporter.sendMail(mailOptions);
}
export default SendEmail;
