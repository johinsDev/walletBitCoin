import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import Wallet from './wallet';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;
let mongooseHidden = require('mongoose-hidden')()

const encryptPassword =  (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

const GENDERS = {m: 'masculino', f: 'femenino'};

function getGender (value) {
	return GENDERS[value];
}
const userSchema = new Schema(
	{
		name: String,
		lastName: String,
		email: {
			type: String,
			unique: true,
			required: [true, 'Email is required!'],
			trim: true,
			validate: {
				validator(email) {
				return validator.isEmail(email);
				},
				message: '{VALUE} is not a valid email!',
			},
		},
		gender: {
			type: String,
			enum: ['m', 'f'],
			get: getGender
		},
		username: {
			type: String,
			required: [true, 'UserName is required!'],
			trim: true,
			unique: true, 
		},
		password: { type: String, set: encryptPassword, hideJSON: true },
		phone: String,
		avatar: String,
		_wallets : [{ type: Schema.Types.ObjectId, ref: 'Wallet' }]
	},
	{ timestamps: true },
);

userSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

userSchema.plugin(mongooseHidden)

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);  
};

userSchema.methods.update = function(req) {
	Object.keys(req.body).forEach(key => {
		this[key] = req.body[key];
	});
	return this.save();
};

userSchema.methods.getTotalWallets = function() {
	return this._wallets.length || 0;
};

userSchema.methods.walletsToJSON = function() {
	return this._wallets.map(wallet => wallet.toJSON())
  };

userSchema.methods.toJSON = function() {
    return {
      data: {
			_id: this._id,
		name: this.name,
		userName: this.username,
		firstName: this.firstName,
		lastName: this.lastName,
		avatar: this.avatar,
		wallets: {data: this.walletsToJSON()},
		gender: this.gender,
		phone: this.phone
	}
    };
  },
	
userSchema.methods.createWallet = function createWallet(wallet, cb) {
	wallet.user = this._id;
	Wallet.create(wallet, (err, res) => {
		 this._wallets.push(res);
		 this.save();
		 return cb(err, res);
	});
}

userSchema.statics.all = function(cb){
    return this.find({}, cb);
}

export default mongoose.model('User', userSchema);