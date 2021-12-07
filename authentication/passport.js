const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const authenticationService = require('../services/AuthenticationService');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },

     async function(email, password, done) {
        try{
            let user = await authenticationService.getUserInformation(email);
            
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (!validPassword(user.MatKhau, password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        }
        catch(err){
            return done(err);
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, 
        {
            MaKhachHang: user.MaKhachHang,
            Email: user.Email,
        });
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

function validPassword(passwordOfUser, password){
    return passwordOfUser === password;
}

module.exports = passport;