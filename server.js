import Express from 'express';
const app = new Express();
import bodyParser from 'body-parser';

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
let fs = require("fs");
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/dichvu');


//routes
import houses from './routes/house.routes';
import locations from './routes/locations.routes';
import users from './routes/user.routes';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

app.use('/', [houses, locations, users]);


app.listen(3000, function () {
    console.log("Example app listening");
});
