var express = require('express');
var router = express.Router();
var body = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('login.db');
var re = function () {

};
re.prototype.result = function (s) {
    return s;
};


/* GET users listing. */
router.post('/Login', function (req, res, next) {
    console.log(req.body.username);
    var sql = 'select * from hau';
    // var a = [];
    db.all(sql, function (err, row) {
        if (err) {
            res.send(err);
        }
        res.send('z');
    });
});

router.post('/Register', function (req, res, next) {

    res.send(a);
});

module.exports = router;
