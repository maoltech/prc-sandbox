
const User =  require('./models/user');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');


const Register =  async (req,res) =>{
 const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSSEC).toString(),
    isverified: false
}
 )
 try{
    const saveUser = await newUser.save();
    res.status(201).json(saveUser); 
 }catch(err){
    res.status(500).json(err); 
 }

};

const Login = async (req,res) => {
  try{
    const user = await User.findOne({username: req.body.username})
    !user && res.status(401).json('not a user');

    const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSSEC)
    
    const logpassword = hashPassword.toString(CryptoJS.enc.Utf8);
    logpassword !== req.body.password && res.status(201).json('password');

    const accessToken = jwt.sign({
      id: user._id
  }, process.env.JWT_SEC,
  {expiresIn:"10d"})

    const {password, ...others} = user._doc;
    res.status(200).json({...others, accessToken});

  } catch(err){
    res.status(500).json(err);
  }
}

const Update = async (req,res)=>{
 
  try{

    const userPassword = await User.findOne({email: req.body.email}) 
      !userPassword && res.status(401).json('no user with this email')
      
      const token = jwt.sign({_id: userPassword._id}, process.env.PASS_RESET_KEY, {expiresIn:"600sec"})
      const api_key = MAIL_GUN_SEC_KEY;
      const domain = MAIL_GUN_DOMAIN;
      const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
      
      var data = {
        from: 'noreply@mail.com',
        to: email,
        subject: 'RESET YOUR PASSWORD',
        text: `<P> Click the link below, to reset your password</p><br>
                <p>http://localhost:3000/passwordreset/${email}/${token}</p>`
      };
    
      userPassword.updateOne({resent: token })
 
      mailgun.messages().send(data, function (err, body)
       {
        if(err){
              res.status(400).json('message not sent');
            }else{
              res.status(200).json('mail sent');
            }
            console.log(body);
       }
      )
          }catch(err){
            res.status(500).json(err);
          }
    
 
 /* if(req.body.password){
      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
  } 
  try{

      const updatedUser = await User.findByIdAndUpdate(req.body.email, {
          $set: req.body
      }, {new:true})
      res.status(200).json(updatedUser); 
  }catch(err){
      res.status(500).json(err);
  }*/
}




module.exports = {Register, Login, Update};