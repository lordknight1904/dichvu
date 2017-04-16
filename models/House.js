import mongoose from 'mongoose';
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const houseSchema = new Schema({
    "stt":{type: Number},
    "cuid": {type: String, required: true},
    "location": {type: String},
    "img_Link": [{
        type: String
    }],
    "floor_No": {type: Number},
    "basement_No": {type: Number},
    "square": {type: Number},
    "price": {type: Number},
    "bathroom_No": {type: Number},
    "bedroom_No": {type: Number},
    "livingroom_No": {type: Number},
    "kitchen": {type: Number},
    "contact": {
        "name": {type: String},
        "phone": {type: String},
        "company": {type: String},
        "email": {type: String}
    },
    "onSale":{type: Boolean, default: true}
});
export default mongoose.model('House', houseSchema);
// module.exports. default mongoose.model('House', houseSchema);