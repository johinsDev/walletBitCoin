import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let mongooseHidden = require('mongoose-hidden')()

const walletSchema = new Schema({
	network: String,
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	address: String,
	label: String,
	balance:  {
      type: Number,
      default: 0,
    },
});

walletSchema.plugin(mongooseHidden)

walletSchema.methods.toJSON = function(){
	return {
       	_id: this._id,
		balance: this.balance,
		label: this.label
    };
};

export default mongoose.model('Wallet', walletSchema);