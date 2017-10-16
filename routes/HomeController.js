var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
/* GET users listing. */
router.get('/', function (req, res, next) {
    var ss = req.session.acc;
    if (ss) {
        var userdb = new sqlite3.Database('database\\' + ss.username + '.db');
        userdb.all("SELECT name FROM sqlite_master WHERE type = 'table'", function (err, row) {
            if (err) {
                res.redirect("/Error/ExcuteError?message="+err.message);
                return;
            }
            var a = [];
            row.forEach(function (t) {
                a.push(t.name);
            });
            res.render('Index', {re: a, sess: req.session.acc});

        });
        return;
    }
    res.render('Index', {re: "", sess: req.session.acc});
});

router.get('/Index', function (req, res, next) {
    var ss = req.session.acc;
    if (ss) {
        var userdb = new sqlite3.Database('database\\' + ss.username + '.db');
        userdb.all("SELECT name FROM sqlite_master WHERE type = 'table'", function (err, row) {
            if (err) {
                res.redirect("/Error/ExcuteError?message="+err.message);
                return;
            }
            var a = [];
            row.forEach(function (t) {
                a.push(t.name);
            });
            res.render('Index', {re: a, sess: req.session.acc});

        });
        return;
    }
    res.render('Index', {re: "", sess: req.session.acc});
});

module.exports = router;