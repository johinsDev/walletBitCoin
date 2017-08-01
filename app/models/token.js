import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tokenSchema = new Schema({	
	user: {type: Schema.Types.ObjectId, ref: 'users'},
    client: {type: Schema.Types.ObjectId, ref: 'clients'},
    token: String,
    expirationDate: Date
});

export default mongoose.model('oauth_access_tokens', tokenSchema);