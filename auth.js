const Person=require('./models/Person.js');
const localStrategy=require('passport-local').Strategy;  
const passport=require('passport');

passport.use(new localStrategy(async (user,pwd,done)=>{
    try{
            //console.log('Received credentials:',user,pwd);
            const usern=await Person.findOne({username:user});
            if(!usern)
                return done(null,false,{message:'Incorrect username'});

            const isPwdmatch=await usern.comparePassword(pwd);
            if(isPwdmatch)
                return done(null,usern);
            else
                return done(null,false,{message:'Incorrect Password'});
    }
    catch(error){
        return done(error);
    }
}));

module.exports=passport;