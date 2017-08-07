import Wallet from '../models/wallet';
import BlockIo from '../models/blockIo';
import HTTPStatus from 'http-status';
import { NotFoundError } from '../../config/errors';
const blockIo = new BlockIo()

const create = (req, res, next) => {
    const wallet = new Wallet();
     blockIo.get_new_address({'label': `${wallet._id}`}, (err, address) => {
        if (address.status == 'fail'){
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
    blockIo.get_address_by_label({'label': req.params.id}, (err, wallet) => {
        if (wallet.status == 'fail'){
            return res.status(HTTPStatus.CONFLICT).json(wallet); 
        }
        return res.status(HTTPStatus.OK).json(wallet.data);
    });
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