const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,"its_a_long_confidential_string");
    next();
  }catch(error){
    res.status(401).json({message:"Auth failed!"});
  }
};
