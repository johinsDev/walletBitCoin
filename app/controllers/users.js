import UserTransforer from '../transformers/UserTransformer';
import HTTPStatus from 'http-status';
import { BadRequestError } from '../../config/errors';
import User from '../models/user';

const signUp = (req, res, next) => {
}


const signIn = (req, res) => {
}


const profile = async (req, res) => {
    return res.status(HTTPStatus.OK).json(req.user.toJSON());
}

const update = async (req, res) => {
    try {
        const user = req.user;
        await user.update(req);
        
        return res.status(HTTPStatus.BAD_REQUEST).json(new BadRequestError(e));
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(new BadRequestError(e));
    }
}

module.exports = {
  signUp,
  signIn,
  profile,
  update
}