import HTTPStatus from 'http-status';
import BlockIo from '../models/blockIo';
import Payment from '../models/payment'
import mongoose from 'mongoose';
import moment from 'moment';

const blockIo = new BlockIo()


const get = async (req, res) => {
  const date = moment();
  const payments = await Payment.aggregate([
    {
      $match: { from_wallet: mongoose.Types.ObjectId(req.params.id) }
    },
    { 
      "$match": { "createdAt": { "$gte":  date.subtract(1, 'months'), "$lte": date } }
    },
    { 
      "$group": {
        "_id": {  day: { $dayOfMonth: "$createdAt" }, month: { $month: "$createdAt" }, year: { $year: "$createdAt"} },
        "totalValue": { "$sum": "$amount_withdrawn" },
      }
    }
  ]);
  let obj = {};
  obj.stats = payments;
  
  const from_wallet = req.params.id;
  const to_wallet = req.params.id;
  const lastPayments = await Payment.list({limit: 20, query: {from_wallet} });
  const lastIncomes = await Payment.list({limit: 20, query: {to_wallet} });
  obj.lastPayments = lastPayments
;
  obj.lastIncomes = lastIncomes;
  return res.json(obj)
}

module.exports = {
  get
}