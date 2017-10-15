var express = require('express');
var router = express.Router();
var body = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
/* GET users listing. */

var connection = function (sql, db, key, username) {
    this.sql = sql;
    this.key = key;
    this.username = username;
    this.db = db;
    this.addTable = function () {
        this.db.run(sql, function (err) {
            if (err) {
                return err.message;
            }
        });
        return "Success";
    };

    this.addRow = function () {
        this.db.run(sql, function (err) {
            if (err) {
                return err.message;
            }
        });
        return 'Success';
    };

    this.find = function () {
        return this.a;
    };

    this.delete = function () {
        this.db.run(sql, function (err) {
            if (err) {
                return err.message;
            }
        });
        return 'Success';
    };

    this.update = function () {
        this.db.run(sql, function (err) {
            if (err) {
                return err.message;
            }
        });
        return 'Success';
    };
};

// day la khu vuc cho thuc thi bang key
router.post('/ExcuteQuery', function (req, res, next) {
    var sql = req.body.statement;
    var ss = req.session.acc;
    var db = new sqlite3.Database('database\\' + ss.username + '.db');
    var conn = new connection(sql, ss.key, ss.username, db);
    // res.send(conn.addTable());
});
// day la khu vuc thuc thi cau lenh bang key


router.post('/ExcuteTable', function (req, res, next) {
    var sql = req.body.statement;
    var ss = req.session.acc;
    var action = sql.trim().split(' ')[0];
    var db = new sqlite3.Database('database\\' + ss.username + '.db');
    var conn = new connection(sql, db);

    if (action.toUpperCase() === 'INSERT') {
        var create = conn.addRow();
        res.redirect('/DB/Return');
    }

    if (action.toUpperCase() === 'DELETE') {
        var del = conn.delete();
        res.redirect('/DB/Return');
    }
    if (action.toUpperCase() === 'UPDATE') {
        var upd = conn.update();
        res.redirect('/DB/Return');
    }
});

router.get('/Return', function (req, res) {
    var ss = req.session.acc;
    var tableEx = req.session.tb;
    var db = new sqlite3.Database('database\\' + ss.username + '.db');
    var sql = "select * from " + tableEx;
    // var conn = new connection(sql, db);
    db.all(sql, function (err, row) {
        var a = [];
        row.forEach(function (t) {
            a.push(t);
        });
        res.render('Excute', {all: "", sess: ss, re: a});
    });
});


router.get('/Manage', function (req, res, next) {
    var ss = req.session.acc;
    var db = new sqlite3.Database('database\\' + ss.acc + '.db');
    var table = req.param('tb');
    // console.log(table);
    req.session.tb = table;
    // var conn = new connection(sql, ss.key, ss.username, db);
    // var x = conn.loadData();

    res.render('Excute', {all: "", sess: ss, re: ""});

});

module.exports = router;