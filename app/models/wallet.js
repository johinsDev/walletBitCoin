import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let mongooseHidden = require('mongoose-hidden')()

const walletSchema = new Schema({
	network: String,
	user_id: Number,
	address: String,
	label: String
});

walletSchema.plugin(mongooseHidden)

export default mongoose.model('wallets', walletSchema);