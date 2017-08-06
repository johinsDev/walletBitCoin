import UserTransforer from '../transformers/UserTransformer';
import HTTPStatus from 'http-status';

const signUp = (req, res, next) => {
}


const signIn = (req, res) => {
}


const profile = (req, res) => {
  return res.send(UserTransforer(req.user))
}

const update = async (req, res) => {
    console.log(req);
    try {
        const user = req.user;
        await user.update(req);
        
        return res.status(HTTPStatus.OK).send(user.toJSON());
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}

module.exports = {
  signUp,
  signIn,
  profile,
  update
}