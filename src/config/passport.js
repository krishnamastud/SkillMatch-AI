import config from './config.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../model/user.model.js';


passport.use(new GoogleStrategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL,
  },
  // Runs AFTER Passport exchanged the code and fetched the profile
  async (accessToken, refreshToken, profile, done) => {
    try {
      // let user = await userModel.findOne({ googleId: profile.id });
      // if (user) return done(null, user);                 // registered → login

      // user = await userModel.create({                         // new → register
      //   googleId: profile.id,
      //   email: profile.emails[0].value,
      //   name: profile.displayName,
      //   avatar: profile.photos?.[0]?.value,
      // });
      return done(null, profile); // new → register
    } catch (err) {
      return done(err);
    }
  }
));

export default passport;