import HTTPStatus from 'http-status';
import BlockIo from '../models/blockIo';
import Payment from '../models/payment'
import mongoose from 'mongoose';

const blockIo = new BlockIo()


const get = async (req, res) => {
  const payments = await Payment.aggregate([
    {
      $match: { from_wallet: mongoose.Types.ObjectId(req.params.id) }
    },
    { 
      "$match": { "createdAt": { "$gte":  new Date('2017','07','1'), "$lte": new Date('2017','07','31') } }
    },
    { 
      "$group": {
        "_id": {  day: { $dayOfMonth: "$createdAt" }, month: { $month: "$createdAt" }, year: { $year: "$createdAt"} },
        "totalValue": { "$sum": "$amount_withdrawn" },
        count: { $sum: 1 }
      }
    }
  ])
  return res.json(payments)
  // por billetera traemos --> ultimso 20 ingresos
  // ultimos 20 pagos
}

module.exports = {
  get
}