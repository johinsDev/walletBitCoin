import HTTPStatus from 'http-status';
import BlockIo from '../models/blockIo';
import Wallet from '../models/wallet'
import Payment from '../models/payment'
const blockIo = new BlockIo()

const store = async (req, res, next) => {
    const data = req.body;
    const fee_fenix = data.amounts * 0.1;
    try {
        blockIo.withdraw_from_addresses({
            'amounts': fee_fenix + data.amounts,
            'from_addresses': data.from_address,
            'to_addresses': data.to_address
        }, async (err, payment) => {
            if(err) return res.status(HTTPStatus.BAD_REQUEST).json(payment);

            const from_wallet = await Wallet.findOne({'address': data.from_address});
            const to_wallet = await Wallet.findOne({'address': data.to_address});

            payment.data.from_wallet = from_wallet;
            payment.data.to_wallet = to_wallet;
            payment.data.status = payment.status;
            payment.data.fee_fenix = fee_fenix;
            payment.data.original_amount = data.amounts;
            
            const newPayment = await Payment.create(payment.data);

            return res.json(newPayment)
        });
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}


const show = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        res.json(payment);   
    } catch (error) {
        return res.status(HTTPStatus.NOT_FOUND).json(error);
    }
    
}


const get = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 0);
    const skip = parseInt(req.query.skip, 0);
    const from_wallet = req.params.id;
    const payments = await Payment.list({limit, skip, query: {from_wallet} });
    return res.json(payments);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

module.exports = {
  store,
  show,
  get
}