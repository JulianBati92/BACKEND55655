import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { MongoManager } from "../data/mongo/manager.mongo.js";
import EmailService from "../services/emailService.js";
import { sendSMS } from "../services/twilioService.js";

const emailService = new EmailService();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                let user = await MongoManager.readOne({ googleId: profile.id }); 

                if (!user) {
                    // Crear el usuario si no existe en la base de datos
                    user = await MongoManager.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                    });

                    // Enviar correo electrónico de bienvenida
                    await emailService.sendWelcomeEmail(user.email);
                    
                    // Enviar mensaje de texto de bienvenida con Twilio
                    const message = '¡Bienvenido a nuestra Tienda!';
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

export default passport;
