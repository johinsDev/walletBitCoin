import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const clientSchema = new Schema({	
	client_id:{ type: String, index: true },
    client_secret: String,
	name: String
});

export default mongoose.model('clients', clientSchema);