import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../model/user.model';


passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  // Runs AFTER Passport exchanged the code and fetched the profile
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await userModel.findOne({ googleId: profile.id });
      if (user) return done(null, user);                 // registered → login

      user = await userModel.create({                         // new → register
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos?.[0]?.value,
      });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = passport;