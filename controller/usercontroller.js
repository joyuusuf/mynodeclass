const usermodel = require('../model/usermodel') 
const mail = require('../middleware/mailer')

const usersignup = async (req, res)=>{ 
  try{ 
    console.log(req.body);
    const {username, email, password} = req.body
    if (email==="" || username==="" || password=== "") {
        res.status(404).send({message:"input field cannot be empty", status:false})
    }
    const existinguser = await usermodel.findOne({email:email}) 
    if(existinguser){
        res.status(409).send({message: 'user already exists', status: false})
    }
    const user = await usermodel.create({username, email, password})
    if (!user) {
        res.status(405).send({message: "unable to save user omo",  status : false})
    }
     await mail(email, username)
  
     return res.status(200).send({message: "Signed up!!", status: true})
  }catch (error){
    console.log(error);
     res.status(500).send({message: "internal server error", status: false})
    // if (error) {
    //   res.status(407).send({message:"error occured", status:false}) 
    // }
  }
}

module.exports = {usersignup}