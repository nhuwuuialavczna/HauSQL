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
var users = function (username, pass1, pass2, email, key, info) {
    this.username = username;
    this.pass1 = pass1;
    this.pass2 = pass2;
    this.email = email;
    this.key = key;
    this.info = info;

    this.getUsername = function () {
        return this.username;
    };
    this.getPass1 = function () {
        return this.pass1;
    };
    this.getPass2 = function () {
        return this.pass2;
    };
    this.getEmail = function () {
        return this.email;
    };
    this.getKey = function () {
        return this.key;
    };
    this.getInfo = function () {
        return this.info;
    };
    this.toString = function () {
        return this.username + "\t" + this.pass1 + "\t" + this.pass2 + "\t" + this.key + "\t" + this.email + "\t" + this.info;
    };
};

/* GET users listing. */
router.post('/Login', function (req, res, next) {
    var username = req.body.username;
    var pass1 = req.body.password1;
    var pass2 = req.body.password2;
    var sql = "select * from account where username='" + username + "' and pass1='" + pass1 + "' and pass2='" + pass2 + "'";
    db.all(sql, function (err, row) {
        if (err) {
            res.send('Has occurred an error');
            return;
        }
        if (row.length == 0) {
            res.render('Index', {re: 'Username or password is correct !', sess: req.session.acc});
        } else {
            req.session.acc = new users(row[0].username, row[0].pass1, row[0].pass2, row[0].key, row[0].email, row[0].info);
            res.render("DBManagement", {sess: req.session.acc});
        }

        // res.send('aa');
    });
});

router.post('/Register', function (req, res, next) {
    var username = req.body.user;
    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;
    var email = req.body.email;
    var sql = "select * from account where username='" + username + "'";
    db.all(sql, function (err, row) {
        if (err) {
            res.render('Index', {re: "Has occurred an error"});
            return;
        }
        if (row.length > 0) {
            res.render('Index', {re: 'Account already exists'});
        } else {
            var key = (username + pass1 + pass2).substr(0, 9);
            var info = 'rw';
            // var languages = [username, pass1, pass2, key, email, info];
            // var placeholders = languages.map(function (language) {
            //     return '(?)';
            // }).join(',');
            var sql = "INSERT INTO account " +
                "(username,pass1, pass2,key,email,info) VALUES('" + username + "','" + pass1 + "','" + username + "','" + key + "','" + email + "','" + info + "')";
            db.run(sql, function (err) {
                if (err) {
                    res.render('Index', {re: "Has occurred an error"});
                    return;
                }
                // var db = new sqlite3.Database('database\\' + username + '.db');
                req.session.acc = new users(username, pass1, pass2, email, key, info);
                res.render("Excute", {sess: req.session.acc});
            });
        }
    });
});

module.exports = router;
