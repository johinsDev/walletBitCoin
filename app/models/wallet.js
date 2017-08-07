import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let mongooseHidden = require('mongoose-hidden')()

const walletSchema = new Schema({
	network: String,
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	address: String,
	label: String,
	available_balance:  {
      type: Number,
      default: 0,
    },
	pending_received_balance:  {
      type: Number,
      default: 0,
    }
});

walletSchema.plugin(mongooseHidden)

walletSchema.methods.toJSON = function(){
	return {
       	_id: this._id,
		pending_received_balance: this.pending_received_balance,
		label: this.label,
		address: this.address,
		available_balance: this.available_balance,
		network: this.network
    };
};

export default mongoose.model('Wallet', walletSchema);