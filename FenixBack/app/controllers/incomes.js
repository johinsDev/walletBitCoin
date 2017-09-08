import HTTPStatus from 'http-status';
import BlockIo from '../models/blockIo';
import Payment from '../models/payment'
const blockIo = new BlockIo()


const get = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 0);
    const skip = parseInt(req.query.skip, 0);
    const to_wallet = req.params.id;
    const payments = await Payment.list({ limit, skip, query: { to_wallet } });
    return res.json(payments);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

module.exports = {
  get
}