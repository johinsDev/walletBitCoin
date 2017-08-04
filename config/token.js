import passport from 'passport';
import AccessToken from '../app/models/token';
import User from '../app/models/user';
import crypto from 'crypto';
import oauth2orize from 'oauth2orize';
import utils from './utils';
import { UserNotFoundError, WrongPassword } from './errors'

// podemos crear una libreria basados en la de laravel passport
// podemos usar algunas de las cosas de aqui como passport bearer
// mejorar usar modelos ya definidos

// create OAuth 2.0 server
const server = oauth2orize.createServer();

//Client Credentials --> cambiar por password credentials
server.exchange(oauth2orize.exchange.clientCredentials((client,scope ,req ,done) => {
    const token = utils.uid(256)
    const tokenHash = crypto.createHash('sha1').update(token).digest('hex')
    const expiresIn = 180000
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    User.findOne({'email': req.email}, function (err, user) {
        if (err) {
            return done(new Error(err));
        }
        if (!user) {
            return done(new UserNotFoundError('No user found.', 400, null, 400));
        }
        if (!user.validPassword(req.password)) {
            return done(new WrongPassword('Wrong password', 400, null, 400));
        }
        AccessToken.create({
            token: tokenHash,
            user: user,
            expirationDate: expirationDate, 
            client: client
        }, (err) => {
            if (err) return done(new Error(err))
            return done(null, token, {expires_in: expiresIn, user})
        });
    });
}))


// token endpoint
exports.token = [
    passport.authenticate('clientPassword', { session: false }),
    server.token(),
    server.errorHandler()
];