import user from '../app/controllers/users';
import clients from '../app/controllers/clients';
import wallets from '../app/controllers/wallets';
import payments from '../app/controllers/payments';
import haveManyWallets from '../app/middlewares/haveManyWallets'
import oauth from '../config/token';
import registerToKen from '../config/registerToKen';
import 'express-namespace';

export default function (app, passport) {
    app.namespace('/api/v1/',  () => {

        //AUTH
        app.post('register',registerToKen.token ,  user.signUp);
        app.post('login',oauth.token ,  user.signIn);
        
        // USER PROFILE
        app.get('me', passport.authenticate(['accessToken'], { session: false }), user.profile);
        app.put('me', passport.authenticate(['accessToken'], { session: false }), user.update);

        // API CLIENTS
        app.post('clients', clients.store);

        //WALLETS
        app.post('wallet',[passport.authenticate(['accessToken'], { session: false }), haveManyWallets ], wallets.create);
        app.get('wallet/:id', passport.authenticate(['accessToken'], { session: false }), wallets.show);
        app.put('wallet', passport.authenticate(['accessToken'], { session: false }), wallets.update);
        app.get('wallets', passport.authenticate(['accessToken'], { session: false }), wallets.get);

        // PAYMENTS
        app.post('payment',passport.authenticate(['accessToken'], { session: false }), payments.store);
        app.get('payment/:id', passport.authenticate(['accessToken'], { session: false }), payments.show);
        app.get('payments', passport.authenticate(['accessToken'], { session: false }), payments.get);
    });
}
