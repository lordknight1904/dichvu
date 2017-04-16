import mongoose from 'mongoose';
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const houseSchema = new Schema({
    "stt":{type: Number},
    "cuid": {type: String, required: true},
    "location": {
        "city": {type: String},
        "district": {type: String}
    },
    "img_Link": [{
        type: String
    }],
    "floorNo": {type: Number},
    "basementNo": {type: Number},
    "square": {type: Number},
    "price": {type: Number},
    "bathroomNo": {type: Number},
    "bedroomNo": {type: Number},
    "livingroomNo": {type: Number},
    "kitchenNo": {type: Number},
    "contact": {
        "name": {type: String},
        "phone": {type: String},
        "company": {type: String},
        "email": {type: String}
    },
    "onSale":{type: Boolean, default: true}
});
export default mongoose.model('House', houseSchema);