let mongoose = require('mongoose');
import User from '../models/user';
import sanitizeHtml from 'sanitize-html';
import bcrypt from 'bcrypt';

export function signUp(req, res){
    const user = req.body.user;
    if (!user.name || !user.email && !user.password) {
       res.json({"error":"missing value!"})
    }else {
        const newUser = new User(req.body.user);
        newUser.name = sanitizeHtml(newUser.name);
        newUser.email = sanitizeHtml(newUser.email);
        bcrypt.hash(newUser.password, 10, (err, hash) => {
            if (err) {
                res.json({"error":"DB failed."})
            } else {
                newUser.password = hash;
                newUser.save((err, saved) => {
                    if (err) {
                        res.json({err: err});
                    } else {
                        res.json({user: saved});
                    }
                });
            }
        });
    }
}

export function login(req, res) {
    User.findOne({email: req.body.user.email}).exec((err, user) => {
        if (err) {
            res.json({"error":"DB failed."})
        }else {
            if (user !== null) {
                bcrypt.compare(req.body.user.password, user.password, function (err, result) {
                    if (err) res.json({err: err});
                    else {
                        if(result){
                            res.json({user})
                        }else{
                            res.json({user: 'Wrong Password'})
                        }
                    }
                });
            }else{
                res.json({user: 'Unexisted'})
            }
        }
    });
}

export function update(req, res) {
    if (!req.body.user._id) {
        res.json({"error":"missing value!"})
    }else {
        let updateInfo = req.body.user;
        let oldInfo = {};
        User.findOne({'_id': req.body.user._id}, function (err, old) {
            if (err) {
                res.send(err);
            } else {
                oldInfo = old;
            }
        }).then(() => {
            if (!updateInfo.hasOwnProperty('name')) updateInfo.name = oldInfo.name;
            User.update({'_id': req.body.user._id}, {
                "name": updateInfo.name,
            }, function (err) {
                if (err)
                    res.json({"error": "DB failed"});
                else {
                    res.send({"response": "Successfully updated"});
                }
            });
        });
    }
}