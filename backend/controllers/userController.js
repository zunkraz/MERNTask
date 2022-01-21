const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.createUser = async (req,res) => {
    //check if exist errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    //extract email and password 
    const {email,password} = req.body;
    

    try{
        //check if the user exist
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'This user already exist'})
        }
        //creating new user in db
        user = new User(req.body);

        //hash password using salt
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //confirmation message
        await user.save();
        
        //Create a sign JWT
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

    }catch(error){
        console.log(error);
        res.status(400).send('Something went wrong!')
    }
}

