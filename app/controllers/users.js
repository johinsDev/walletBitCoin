import UserTransforer from '../transformers/UserTransformer';
import HTTPStatus from 'http-status';
import { BadRequestError } from '../../config/errors';
import User from '../models/user';
import BlockIo from '../models/blockIo';
const blockIo = new BlockIo()

const signUp = (req, res, next) => {
}


const signIn = (req, res) => {
}



const findWallet = (wallet, req) => {
    for(var i = 0; i < req.user._wallets.length; i++) {
        if (req.user._wallets[i]._id == wallet.label) {
            return true;
        }
    }
    return false;
}


const profile = (req, res) => {
    blockIo.get_my_addresses({}, (err, wallets) => {
        console.log(wallets.data.addresses)
        if (err) return res.status(HTTPStatus.CONFLICT).json(wallets.data);
        const userWallets = wallets.data.addresses.filter((wallet) => findWallet(wallet, req));
        req.user._wallets = userWallets;
        return res.json(req.user);
    });
    
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