const nodemailer = require("nodemailer")
const token = Math.floor(Math.random()* 10000)

const mail = async (email, username) =>{

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:"yuusufjawadolamide67@gmail.com",
            pass: "ilutohitsjlfzjiw"
        }
    })
 
    const messageTemplate = `
    <div>
      <h1 style= "color: white;"> <strong> Dear ${username}</strong></h1>
      <h1> welcome to Sqi college of ict <strong> ${username}</strong></h1>
      <h1>this is your verification token <strong> ${token}</strong></h1>
    </div>
    `
    const mailOptions = {
        from:"yuusufjawadolamide67@gmail.com",
        to: email,
        subject: "Registration Message",
        text: "Test App",
        html: messageTemplate
    }

    try {
      await transporter.sendMail(mailOptions)  
       console.log("mail sent successfully");
    } catch (error) {
        console.log("mail", error);
        throw {
            name:"mail error",
            message: error
        }
    }

}

module.exports = mail