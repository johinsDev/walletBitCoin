import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
const Schema = mongoose.Schema;
let mongooseHidden = require('mongoose-hidden')()

const encryptPassword =  (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

const userSchema = new Schema({
	name: String,
	email: String,
	username: String,
	password: { type: String, set: encryptPassword, hideJSON: true },
	created_date: Date,
	updated_date: Date
});

userSchema.plugin(mongooseHidden)

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);  
};

userSchema.statics.all = function(cb){
    return this.find({}, cb);
}

export default mongoose.model('users', userSchema);