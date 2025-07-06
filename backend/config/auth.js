import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import client from './database.js' 

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecrect: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async(accessToken, refreshToken, profile, done) => {
    try{

        const user = await client.user.findUnique({
            where: {
                googleId: profile.id    
            }
        })

        if(!user){
            await client.user.create({
                googleId: profile.id, 
                name: profile.displayName, 
                email: profile.emails[0].value, 
            });
        }

        done(null, user); 
    }
    catch(err){
        console.log('Google Strategy Error:', err); 
        done(err, null)
    }
})); 


export default passport; 

