const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../modals/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    // ExtractJwt.fromAuthHeader replaced with ExtractJwt.fromAuthHeaderWithScheme('jwt') otherwies error ExtractJwt.fromAuthHeader is not a function. Due to jwt upgrade.
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    console.log(opts.jwtFromRequest);
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        User.getUserById(jwt_payload._id, (err, user) => {
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}