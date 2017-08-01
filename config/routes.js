import users from '../app/controllers/users';
import 'express-namespace';
import oauth from '../config/token';

export default function (app, passport) {
    app.namespace('/api/v1/',  () => {
        app.post('register',passport.authenticate(['clientPassword'], { session: false }) ,  users.signUp);
        app.post('login',oauth.token ,  users.signIn);
        app.get('me', passport.authenticate(['accessToken'], { session: false }), users.profile);
    });
}
