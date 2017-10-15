var express = require('express');
var router = express.Router();
var body = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
/* GET users listing. */

var connection = function (sql, key, username, db) {
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
        return 'Success';
    };

    this.addRow = function () {
        this.db.run(sql, function (err) {
            if (err) {
                // res.render("DBManagement", {sess: req.session.acc, err: err});
                return err.message;
            }
        });
        return 'Success';
    };
};

// var addRow = function (sql, key, username) {
//     var db = new sqlite3.Database('database\\' + username + '.db');
//
// };

router.post('/ExcuteQuery', function (req, res, next) {
    var sql = req.body.statement;
    var ss = req.session.acc;
    var db = new sqlite3.Database('database\\' + ss.username + '.db');
    var conn = new connection(sql, ss.key, ss.username, db);
    // console.log(conn.addTable());
    res.send(conn.addTable());
    // console.log(ss);
});

module.exports = router;