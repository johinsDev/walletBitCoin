
import passport from 'passport';
import AccessToken from '../app/models/token';
import User from '../app/models/user';
import Wallet from '../app/models/wallet';
import crypto from 'crypto';
import oauth2orize from 'oauth2orize';
import utils from './utils';
import { UserNotFoundError, WrongPassword, EmailError, BadRequestError } from './errors'
import HTTPStatus from 'http-status';

import BlockIo from '../app/models/blockIo';
const blockIo = new BlockIo()


const server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.clientCredentials((client,scope ,req ,done) => {
    const token = utils.uid(256)
    const tokenHash = crypto.createHash('sha1').update(token).digest('hex')
    const expiresIn = 180000
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    User.create(req,(err, user) => {
        if (err) {
            return done(new BadRequestError(err));
        }
        const wallet = new Wallet();
        blockIo.get_new_address({'label': `${wallet._id}`}, (err, address) => {
             if (address.status == 'fail'){
                return done(new BadRequestError(data));
            }
            wallet.label = address.data.label;
            wallet.network = address.data.network;
            wallet.address = address.data.address;
            wallet.user = req.user;
            wallet.save();
            user._wallets.push(wallet);
            user.save();
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
    });
}));

// token endpoint
exports.token = [
    passport.authenticate('clientPassword', { session: false }),
    server.token(),
    server.errorHandler()
];