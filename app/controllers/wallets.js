import Wallet from '../models/wallet';
import BlockIo from '../models/blockIo';
import HTTPStatus from 'http-status';
import { NotFoundError } from '../../config/errors';
const blockIo = new BlockIo()

const create = (req, res, next) => {
    const wallet = new Wallet();
     blockIo.get_new_address({'label': `${wallet._id}`}, (err, address) => {
        if (err){
            return res.status(HTTPStatus.CONFLICT).json(data); 
        }
        wallet.label = address.data.label;
        wallet.network = address.data.network;
        wallet.address = address.data.address;
        wallet.user = req.user;
        wallet.save();
        req.user._wallets.push(wallet);
		req.user.save();
        return res.json(wallet);
    });
}

const show = (req, res) => {
    // validate that user ahs this wallet
    blockIo.get_address_by_label({'label': req.params.id}, (err, wallet) => {
        if (err) return res.status(HTTPStatus.CONFLICT).json(wallet); 
        return res.status(HTTPStatus.OK).json(wallet.data);
    });
}

const update = (req, res) => {
  
}

const findWallet = (wallet, req) => {
    for(var i = 0; i < req.user._wallets.length; i++) {
        if (req.user._wallets[i]._id == wallet.label) {
            return true;
        }
    }
    return false;
}

const get = (req, res) => {
    blockIo.get_my_addresses({}, (err, wallets) => {
        if (err) return res.status(HTTPStatus.CONFLICT).json(wallets.data);
        const userWallets = wallets.data.addresses.filter((wallet) => findWallet(wallet, req));
        return res.status(HTTPStatus.OK).json(userWallets);
    });
}


module.exports = {
  create,
  show,
  update,
  get
}