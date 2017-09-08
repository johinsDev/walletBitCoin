import mongoose from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const STATUS = ["success", "failed", "pending"];

const PaymentSchema = new Schema(
	{
		txid: {
			type: String,
			unique: true,
			required: [true, 'txid is required!'],
		},
        original_amount: {
			type: Number,
			required: [true, 'original_amount is required!'],
		},
		amount_withdrawn: {
			type: Number,
			required: [true, 'amount_withdrawn is required!'],
		},
        fee_fenix: {
			type: Number,
			required: [true, 'fee_fenix is required!'],
		},
        amount_sent: {
			type: Number,
			required: [true, 'amount_sent is required!'],
		},
		network_fee: {
			type: Number,
			required: [true, 'network_fee is required!'],
		},
        blockio_fee: {
			type: Number,
			required: [true, 'blockio_fee is required!'],
		},
        status: { type: String, enum: STATUS },
        from_wallet: { type: Schema.Types.ObjectId, ref: 'Wallet' },
        to_wallet: { type: Schema.Types.ObjectId, ref: 'Wallet' }
	},
	{ timestamps: true },

);

PaymentSchema.plugin(uniqueValidator, {
  message: '{VALUE} txid already  taken!',
});

PaymentSchema.methods.toJSON = function() {
    return {
        data: {
            _id: this._id,
            txid: this.txid,
            amount_sent: this.amount_sent,
            fee: this.network_fee + this.fee_fenix,
            total: this.amount_withdrawn,
			amount: this.original_amount,
            status: this.status
        }
    };
  };

PaymentSchema.statics.list = function({ skip = 0, limit = 5, query} = {}) {
    return this.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user');
};

export default mongoose.model('Payment', PaymentSchema);