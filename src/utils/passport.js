import passport from 'passport';
import './localStrategy.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { MongoManager } from "../data/mongo/manager.mongo.js";
import EmailService from "../services/emailService.js";
import { sendSMS } from '../services/twilioService.js';

const emailService = new EmailService();

const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT,
        callbackURL: process.env.GOOGLE_URL,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          let user = await MongoManager.readOne({ googleId: profile.id });

          if (!user) {
            user = await MongoManager.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
            });

            await emailService.sendWelcomeEmail(user.email);
            const message = "¡Bienvenido a nuestra Tienda!";
            await sendSMS(user.phoneNumber, message);
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await MongoManager.readOne({ _id: id });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default configurePassport;
