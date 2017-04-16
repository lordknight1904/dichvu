let mongoose = require('mongoose');
import House from '../models/House';
import sanitizeHtml from 'sanitize-html';
import cuid from 'cuid';

export function index(req, res){
    res.json({"abc":"123"})
}
export function findAllHouse(req, res){
    House.find({}, function (err, doc){
        if(err){
            res.send(err);
        }else{
            res.send(doc)
        }
    });
}
export function createHouse(req, res){
    let house = new House(req.body.house);
    house.location = sanitizeHtml(house.location);
    house.cuid = cuid();
    // house.img_Link = sanitizeHtml(house.img_Link);
    house.floor_No = sanitizeHtml(house.floor_No);
    house.basement_No = sanitizeHtml(house.basement_No);
    house.square = sanitizeHtml(house.square);
    house.price = sanitizeHtml(house.price);
    house.bathroom_No = sanitizeHtml(house.bathroom_No);
    house.bedroom_No = sanitizeHtml(house.bedroom_No);
    house.livingroom_No = sanitizeHtml(house.livingroom_No);
    house.kitchen = sanitizeHtml(house.kitchen);
    house.contact.name = sanitizeHtml(house.contact.name);
    house.contact.phone = sanitizeHtml(house.contact.phone);
    house.contact.company = sanitizeHtml(house.contact.company);
    house.contact.email = sanitizeHtml(house.contact.email);
    house.onSale = true;
    House.findOne().sort({'stt':-1}).exec((err, item) =>{
        console.log(item);
        if(err || item === null){
            house.stt = 1;
            house.save((err,saved) => {
                if (err) {
                    res.status(500).send(err);
                }else res.json({user: saved});
            });
        }
        else {
            house.stt = item.toObject().stt+1;
            house.save((err,saved) => {
                if (err) {
                    res.status(500).send(err);
                }else res.json({user: saved});
            });
        }
    });
}
export function findById(req, res){
    House.findOne({'_id': req.params.id}, function (err, doc){
        if(err){
            res.send(err);
        }else{
            res.send(doc)
        }
    });
}
export function updateAllField(req, res){
    let updateInfo = req.body;
    let oldInfo = {};
    House.findOne({'_id': req.body._id}, function (err, old){
        if(err){
            res.send(err);
        }else{
            oldInfo = old;
        }
    }).then(()=>{
        console.log('before');
        console.log(updateInfo);
        if(!updateInfo.hasOwnProperty('location')       ) updateInfo.location = oldInfo.location;
        if(!updateInfo.hasOwnProperty('img_Link')       ) updateInfo.img_Link = oldInfo.img_Link;
        if(!updateInfo.hasOwnProperty('floor_No')       ) updateInfo.floor_No = oldInfo.floor_No;
        if(!updateInfo.hasOwnProperty('basement_No')    ) updateInfo.basement_No = oldInfo.basement_No;
        if(!updateInfo.hasOwnProperty('square')         ) updateInfo.square = oldInfo.square;
        if(!updateInfo.hasOwnProperty('price')          ) updateInfo.price = oldInfo.price;
        if(!updateInfo.hasOwnProperty('bathroom_No')    ) updateInfo.bathroom_No = oldInfo.bathroom_No;
        if(!updateInfo.hasOwnProperty('bedroom_No')     ) updateInfo.bedroom_No = oldInfo.bedroom_No;
        if(!updateInfo.hasOwnProperty('livingroom_No')  ) updateInfo.livingroom_No = oldInfo.livingroom_No;
        if(!updateInfo.hasOwnProperty('kitchen')        ) updateInfo.kitchen = oldInfo.kitchen;
        if(!updateInfo.hasOwnProperty('contact')        ) updateInfo.contact = oldInfo.contact;
        console.log('after');
        console.log(updateInfo);
        House.update({'_id': req.body._id},{
            "location": updateInfo.location,
            "img_Link": updateInfo.img_Link,
            "floor_No": updateInfo.floor_No,
            "basement_No": updateInfo.basement_No,
            "square": updateInfo.square,
            "price": updateInfo.price,
            "bathroom_No": updateInfo.bathroom_No,
            "bedroom_No": updateInfo.bedroom_No,
            "livingroom_No": updateInfo.livingroom_No,
            "kitchen": updateInfo.kitchen,
            "contact": updateInfo.contact
        } ,function (err) {
            if(err)
                res.send(err);
            else {
                res.send({"response": "Successfully updated"});
            }
        });
    });
}
export function updateSold(req, res) {
    House.update({'cuid': req.body.cuid},{
        "onSale": false
    } ,function (err) {
        if(err)
            res.send(err);
        else {
            res.send({"response": "Successfully updated"});
        }
    });
}
export function deleteHouse(req, res) {
    House.remove({'cuid': req.body.cuid}, function (err) {
        if(err)
            res.send(err);
        else {
            res.send("Todo successfully deleted");
        }
    });
}
export function search(req, res) {

}