import mongoose from 'mongoose';
import utils from '../../config/utils';
import autoIncrement from 'mongoose-sequence';
const Schema = mongoose.Schema;

const clientSecret = (value) => {
	return utils.uid(32)
}

const clientSchema = new Schema({	
	client_id:{ type: Number, index: { unique: true }},
    client_secret: { type: String, index: { unique: true }, default: clientSecret },
	name: String
});

clientSchema.plugin(autoIncrement, {inc_field: 'client_id'})
export default mongoose.model('clients', clientSchema);