var express = require('express');
var router = express.Router();
var body = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('login.db');
/* GET users listing. */
router.post('/Login', function (req, res, next) {
    console.log(req.body.username);
    var sql = 'select * from hau';
    db.all(sql, function (err, row) {
        if (err) {
            return console.error(err.message);
        }
        row.forEach(function (t) {
            alert(t.a);
        });
    });
    res.send('respond with a resource');
});

router.post('/Register', function (req, res, next) {

    res.send('respond with a resource');
});

module.exports = router;
