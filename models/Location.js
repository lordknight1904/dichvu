import mongoose from 'mongoose';
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const locationSchema = new Schema({
    "name": {type: String, required: true},
});
export default mongoose.model('Location', locationSchema);