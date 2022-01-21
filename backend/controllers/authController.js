const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.userAuthentication = async (req,res) => {
     //check if exist errors
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()})
     }
    const {email,password} = req.body;
    
     try {
         //check if the user already exist
         let user = await User.findOne({email});
         if(!user){
             return res.status(400).json({msg: 'The user not exists'});
         }
         const passCorrect = await bcryptjs.compare(password, user.password);
         if(!passCorrect){
             return res.status(400).json({msg: 'Invalid Password'})
         }
         // create and sign JWT
         const payload = {
            user:{
                id:user.id
            }
        };
        //sign JWT
        jwt.sign(payload,process.env.SECRET,{
            expiresIn: 3600
        }, (error,token) => {
            if(error) throw error;
            res.json({token})
        });
        
     } catch (error) {
        res.status(500).json({msg: 'Something went wrong in userAuthenticated'})
         
     }
}
exports.userAuthenticated = async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        res.status(500).json({msg: 'Something went wrong in userAuthenticated'})
    }
}