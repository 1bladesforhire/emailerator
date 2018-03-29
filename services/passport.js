const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

//get the returned user model from google auth
passport.serializeUser((user, done) => {
    //gets the db record id 
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

//Google oauth with passport
passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            // check the information you receive
            // console.log('accessToken', accessToken);
            // console.log('refresh tokene', refreshToken);
            // console.log('Profile: ', profile);

            //see if there is an existing record
          
            const existingUser = await User.findOne({ googleId: profile.id });
        
            if (existingUser) {
                //if this exists we have this record
                //return done null for errors, user
                return done(null, existingUser);
            } 
            //for no existing user
            //create a new record and save it to db
            const user = new User({ googleId: profile.id }).save();
            done(null, user);
            //after adding to db return done
        
        }
    ));