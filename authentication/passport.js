const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const authenticationService = require('../services/AuthenticationService');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async function(req, email, password, done) {
        try{
            let user = await authenticationService.getAccount(email);
            
            if (!user) {
                return done(null, false, 
                    req.flash('message', ['Email chưa được đăng kí! Hãy tạo tài khoản!'] ));
            }

            if (!await validPassword(password, user.MatKhau, )) {
                return done(null, false, req.flash('message', 'Mật khẩu không chính xác!' ));
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

async function validPassword(password, passwordHash){
    const match = await bcrypt.compare(password, passwordHash);
    return match;
}

module.exports = passport;