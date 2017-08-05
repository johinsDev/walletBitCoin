import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import Wallet from './wallet';
const Schema = mongoose.Schema;
let mongooseHidden = require('mongoose-hidden')()

const encryptPassword =  (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

const userSchema = new Schema({
	name: String,
	lastName: String,
	email: String,
	username: String,
	password: { type: String, set: encryptPassword, hideJSON: true },
	createdAt: { type: Date, set: () => (new Date) },
	updateAt: { type: Date },
	phone: String,
	avatar: String,
	wallets : [{ type: Schema.Types.ObjectId, ref: 'wallets' }]
});

userSchema.plugin(mongooseHidden)

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);  
};

userSchema.methods.updateModel = function(data) {
    if (data instanceof Object){
		for (const i in data) {
			if (i !== 'password' || i !== 'email') {
				this[i] = data[i];
			}
		}
		this['updateAt'] = new Date;
		return this;
	}
};

userSchema.methods.update = function(data) {
	this.updateModel(data).save();
	return this;
};
userSchema.methods.getTotalWallets = function(data) {
	return (this.wallets.length || 0);
};

userSchema.methods.createWallet = function createWallet(wallet, cb) {
	wallet.user = this._id;
	Wallet.create(wallet, (err, res) => {
		 this.wallets.push(res);
		 this.save();
		 return cb(err, res);
	});
}

userSchema.statics.all = function(cb){
    return this.find({}, cb);
}

export default mongoose.model('users', userSchema);