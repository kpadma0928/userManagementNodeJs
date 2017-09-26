const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./app/models').user;
const config = require('./config.js');

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.jwtSecret
  };
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    var user_id = jwt_payload.id
    User.findById(user_id).then(function(user, err) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
