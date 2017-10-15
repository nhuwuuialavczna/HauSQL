var express = require('express');
var router = express.Router();
var body = require('body-parser');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('login.db');
var re = function () {

};
re.prototype.result = function (s) {
    return s;
};


/* GET users listing. */
router.post('/Login', function (req, res, next) {
    var username = req.body.username;
    var pass1 = req.body.password1;
    var pass2 = req.body.password2;
    var sql = "select * from account where username='" + username + "' and pass1='" + pass1 + "' and pass2='" + pass2 + "'";
    db.all(sql, function (err, row) {
        if (err) {
            res.send(err);
        }
        if (row.length == 0) {
            res.render('Index', {re: 'Username or password is correct !', sess: req.session.username});
        } else {
            req.session.username = row[0].username;
            res.render("DBManagement", {sess: req.session.username});
        }

        // res.send('aa');
    });
});

router.post('/Register', function (req, res, next) {

    res.send(a);
});

module.exports = router;
