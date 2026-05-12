import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'placeholder_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder_secret',
    callbackURL: '/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        // If user signed up via local auth, update them to have google info as well
        if (user.authProvider === 'local') {
            user.googleId = profile.id;
            user.avatar = profile.photos[0].value;
            // Optionally change authProvider to 'google' or keep as 'local'
            await user.save();
        }
        return done(null, user);
      }

      // Create new user
      const newUser = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        avatar: profile.photos[0].value,
        authProvider: 'google'
      });

      await newUser.save();
      done(null, newUser);

    } catch (error) {
      console.error(error);
      done(error, null);
    }
  }
));
