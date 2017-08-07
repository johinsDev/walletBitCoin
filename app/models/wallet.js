import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let mongooseHidden = require('mongoose-hidden')()

const walletSchema = new Schema({
	network: String,
	user_id: Number,
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
      data: {
		  _id: this._id,
		  balance: this.balance
	  }
    };
};

export default mongoose.model('Wallet', walletSchema);