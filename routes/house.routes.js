import { Router } from 'express';
import * as HouseController from '../controllers/house.controller';
const router = new Router();
// router.route('/locationlist').get(HouseController.index);

router.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// search
//router.route('/house/search/:city/:district/:fno/:bno/:bthno/:bedno/:lno/:kno/:square/:price').get(HouseController.search);
router.route('/house/search/*').get(HouseController.search);
router.route('/house').get(HouseController.findAllHouse);
// CREATE info nha
router.route('/house/create').post(HouseController.createHouse);
// READ info theo cuid
router.route('/house/:id').get(HouseController.findById);
// UPDATE
router.route('/house/update').put(HouseController.updateAllField);
router.route('/house/updateSold').put(HouseController.updateSold);
// DELETE nha
router.route('/house/delete').delete(HouseController.deleteHouse);

export default router;