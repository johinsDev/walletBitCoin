import User from '../models/user';
import { EmailError } from '../../config/errors'
import UserTransforer from '../transformers/UserTransformer';

// create wallets
const signUp = (req, res, next) => {
    User.findOne({'email': req.body.email}, function (err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            return next(new EmailError('Email alrready to use.',400 ,null ,400))
        }
        var newUser = new User(req);
        User.create(req.body,(err, result) => {
           if (err) {
               return next(err);
           }
           return res.send(UserTransforer(result));
        });
    });
}


const signIn = (req, res) => {
}


const profile = (req, res) => {
  return res.send(UserTransforer(req.user))
}

module.exports = {
  signUp,
  signIn,
  profile
}