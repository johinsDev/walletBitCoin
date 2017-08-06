
import passport from 'passport';
import AccessToken from '../app/models/token';
import User from '../app/models/user';
import crypto from 'crypto';
import oauth2orize from 'oauth2orize';
import utils from './utils';
import { UserNotFoundError, WrongPassword, EmailError, BadRequestError } from './errors'
import BlockIo from 'block_io';
import HTTPStatus from 'http-status';
const block_io = new BlockIo('25ae-b1f8-9579-a4f2','17931793', 2);

const server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.clientCredentials((client,scope ,req ,done) => {
    const token = utils.uid(256)
    const tokenHash = crypto.createHash('sha1').update(token).digest('hex')
    const expiresIn = 180000
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    User.create(req,(err, result) => {
        if (err) {
            return done(new BadRequestError(err));
        }
        block_io.get_new_address({'label': `${result._id}`}, (err, data) => {
            result.createWallet(data.data, (err, wallet) => {
                AccessToken.create({
                    token: tokenHash,
                    user: result,
                    expirationDate: expirationDate, 
                    client: client
                }, (err) => {
                    if (err) return done(new Error(err))
                    return done(null, token, {expires_in: expiresIn, result})
                });
            });
        });
    });
}));

// token endpoint
exports.token = [
    passport.authenticate('clientPassword', { session: false }),
    server.token(),
    server.errorHandler()
];