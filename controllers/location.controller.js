let mongoose = require('mongoose');
import Location from '../models/Location';
import sanitizeHtml from 'sanitize-html';

export function getLocations(req, res){
    Location.find({}, function (err, doc){
        if(err){
            res.send(err);
        }else{
            res.json(doc)
        }
    });
}