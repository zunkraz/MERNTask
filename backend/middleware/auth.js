const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //reading token at header
    const token = req.header('x-auth-token');
    //check if not exists token
    if(!token){
        return res.status(401).json({msg: "permission denied, the token not exists"})
    }
    // token validation 
    try {
        const encryption = jwt.verify(token, process.env.SECRET);
        req.user = encryption.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'invalid Token'})
    }
}
