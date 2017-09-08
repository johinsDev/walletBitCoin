import passport from 'passport';
import AccessToken from '../app/models/token';
import User from '../app/models/user';
import crypto from 'crypto';
import oauth2orize from 'oauth2orize';
import utils from './utils';
import { UserNotFoundError, WrongPassword } from './errors';
// create OAuth 2.0 server
const server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.refreshToken((client,refreshToken ,done) => {
    // hay que buscar el refreshtoken despues de hacerle un hash
    // si lo encuentra entonces, buscamos el token dueño de ese refrestoken
    // claro si e refresh token no se ha vencido
    // luego actualizamos el token con uno nuevo y una nueva fecha
    // el tiempo de expiracion ojala sea de un archivo config
}))

// token endpoint
exports.token = [
    passport.authenticate('clientPassword', { session: false }),
    server.token(),
    server.errorHandler()
];