import User from '../models/user';
import { EmailError } from '../../config/errors'
import UserTransforer from '../transformers/UserTransformer';
import BlockIo from 'block_io';
const block_io = new BlockIo('25ae-b1f8-9579-a4f2','17931793', 2);

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
          block_io.get_new_address({'label': `${result._id}`}, (err, data) => {
            result.createWallet(data.data, (err, wallet) => {
              return res.send(UserTransforer(result));
            });
          });
        });
    });
}


const signIn = (req, res) => {
}


const profile = (req, res) => {
  return res.send(UserTransforer(req.user))
}

const update = (req, res) => {
    req.user
}

module.exports = {
  signUp,
  signIn,
  profile,
  update
}