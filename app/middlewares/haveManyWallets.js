import HTTPStatus from 'http-status';
import { BadRequestError } from '../../config/errors';

export default function (req, res, next) {
    req.user.getTotalWallets() <= 10 ? next() : res.status(HTTPStatus.CONFLICT).json(new BadRequestError({message: 'The user has reached the maximum limit of wallets'}));
};