const jwt = require("jsonwebtoken");
const jwt_secret = "this string is secret";

const fetchUser = async(req,res,next)=>{
    try {
        
   
    const token = req.header("token")
    if(!token){
      res.status(401).send({error:"please authenticate with a valid token"})
    }
    let verifyToken= jwt.verify(token, jwt_secret);
    req.user = verifyToken.user //here user is take from line no 46 and 96 of (./Routes/user.js) where we assign ID
    next();
}  catch {
    console.error("error");
    res.status(500).send("internal server  error occured");
  }
}
module.exports = fetchUser