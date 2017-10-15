var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('Index', {re: "", sess: req.session.acc});
});

module.exports = router;