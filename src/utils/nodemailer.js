const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    }
});


const sendOTPEmail = (email,otp)=>{
    transporter.sendMail(
              {
                from: process.env.USER,
                to: email,
                subject: `verify email`,
                text: `code OTP to verify your email ${otp} , it will expired after 5mins`,
              },
              (err, info) => {
                if (err) {
                  console.log(err.message);
                } else {
                  console.log(info);
                }
              }
            );
    
}


module.exports =  sendOTPEmail ;