import UserTransforer from '../transformers/UserTransformer';

const signUp = (req, res, next) => {
}


const signIn = (req, res) => {
}


const profile = (req, res) => {
  return res.send(UserTransforer(req.user))
}

const update = (req, res) => {
    const user = req.user.update(req.body);
    res.send(UserTransforer(user));
}

module.exports = {
  signUp,
  signIn,
  profile,
  update
}