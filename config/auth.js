import passport from 'passport';
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as LocalStrategy } from 'passport-local';
import Client from '../app/models/client';
import AccessToken from '../app/models/token'
import User from '../app/models/user';
import crypto from 'crypto';
import oauth2orize from 'oauth2orize';
import utils from './utils';
import { ExpiredToken, NotToken } from './errors'

passport.use('clientPassword', new ClientPasswordStrategy(
  function(clientId, clientSecret, done) {
    Client.findOne({ client_id: clientId }, function (err, client) {
      if (err) { return done(err); }
      if (!client) { return done(null, false); }
      if (client.client_secret != clientSecret) { return done(null, false); }
      return done(null, client);
    });
  }
));


passport.use("accessToken", new BearerStrategy(
    function (accessToken, done) {
        const accessTokenHash = crypto.createHash('sha1').update(accessToken).digest('hex');
        AccessToken.findOne({token: accessTokenHash}, function (err, token) {
            if (err) return done(err)
            if (!token) return done(new NotToken())
            if (new Date() > token.expirationDate) {
                AccessToken.remove({token: accessTokenHash}, function (err) { done(err) });
                return done(new ExpiredToken());
            } else {
                User.findById(token.user, function (err, user) {
                    if (err) return done(err)
                    if (!user) return done(null, false)
                    var info = { scope: '*' }
                    done(null, user, info);
                })
            }
        })
    }
));
