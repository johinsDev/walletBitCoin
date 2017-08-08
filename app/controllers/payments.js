import HTTPStatus from 'http-status';
import BlockIo from '../models/blockIo';
import Wallet from '../models/wallet'
import Payment from '../models/payment'
const blockIo = new BlockIo()

const store = async (req, res, next) => {
    const data = req.body;

    try {
        blockIo.withdraw_from_addresses({
            'amounts': data.amounts,
            'from_addresses': data.from_address,
            'to_addresses': data.to_address
        }, async (err, payment) => {
            if(err) return res.status(HTTPStatus.BAD_REQUEST).json(payment);

            const from_wallet = await Wallet.findOne({'address': data.from_address});
            const to_wallet = await Wallet.findOne({'address': data.to_wallet});

            payment.data.from_wallet = from_wallet;
            payment.data.to_wallet = to_wallet;
            payment.data.status = payment.status;
            const newPayment = await Payment.create(payment.data);

            return res.json(newPayment)
        });
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}


const show = (req, res) => {
}


const get = async (req, res) => {

}

module.exports = {
  store,
  show,
  get
}