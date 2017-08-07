import Wallet from '../models/wallet';
import WalletTransformer from '../transformers/WalletTransformer';
import BlockIo from 'block_io';
const block_io = new BlockIo('25ae-b1f8-9579-a4f2','17931793', 2);

const create = (req, res, next) => {
    block_io.get_new_address({'label': `${req.user._id}_${req.user._wallets.length || 0}`}, (err, data) => {
        req.user.createWallet(data.data, (err, wallet) => {
            return res.json(wallet);
        });
    });
}


const show = (req, res) => {
}


const update = (req, res) => {
  
}

const destroy = (req, res) => {
    
}
// VIERNES --> wallets and stats
// SABADo --> summary and payments
// DOMINGO --> PAYMENTS
// LUNES / MARTES / MIERCOLES--> APP

module.exports = {
  create,
  show,
  destroy,
  update
}