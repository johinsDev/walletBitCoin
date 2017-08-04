import user from '../app/controllers/users';
import clients from '../app/controllers/clients';
import oauth from '../config/token';
import 'express-namespace';

export default function (app, passport) {
    app.namespace('/api/v1/',  () => {

        app.post('register',passport.authenticate(['clientPassword'], { session: false }) ,  user.signUp);
        app.post('login',oauth.token ,  user.signIn);
        
        // USER PROFILE
        app.get('me', passport.authenticate(['accessToken'], { session: false }), user.profile);
        app.put('me', passport.authenticate(['accessToken'], { session: false }), user.update);

        // API CLIENTS
        app.post('clients', clients.store);

    });
}
