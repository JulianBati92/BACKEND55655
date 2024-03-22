import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserManager } from "../data/mongo/manager.mongo.js";

// Configuración para la estrategia de autenticación con Google
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
                // Buscar o crear el usuario en la base de datos
                let user = await UserManager.readOne({ googleId: profile.id });

                if (!user) {
                    user = await UserManager.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Serializar y deserializar usuario para almacenar en la sesión
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserManager.readOne({ _id: id }); // Corregido para buscar por _id
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
