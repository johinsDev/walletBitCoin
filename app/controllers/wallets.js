import Wallet from '../models/wallet';
import HTTPStatus from 'http-status';
import { NotFoundError } from '../../config/errors';

import BlockIo from 'block_io';
const block_io = new BlockIo('1574-5f7a-611e-ad39','maleja280516', 2);

const create = (req, res, next) => {
    block_io.get_new_address({'label': `${req.user._id}_${req.user.getTotalWallets()}`}, (err, data) => {
        if (data.status == 'fail'){
           return res.status(HTTPStatus.CONFLICT).json(data); 
        }
        req.user.createWallet(data.data, (err, wallet) => {
            return res.json(wallet);
        });
    });
}


const show = async (req, res) => {
    try {
        const wallet = await Wallet.findById(req.params.id);
        return res.status(HTTPStatus.OK).json(wallet.toJSON());
    } catch (e) {
        const message = 'Not found wallet';
        return res.status(HTTPStatus.NOT_FOUND).json(new NotFoundError(message, 'wallet'));
    }
}

const update = (req, res) => {
  
}

const get = (req, res) => res.json(req.user._wallets);


module.exports = {
  create,
  show,
  update,
  get
}