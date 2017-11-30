var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM food ORDER BY id;', function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    console.log('error', errorMakingDatabaseQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.post('/', function (req, res) {
    var newFood = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO food (name, is_hot, deliciousness_rating)
                          VALUES($1, $2, $3);`, [newFood.name, newFood.is_hot, newFood.deliciousness_rating],
                function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
        }
    });
});

router.delete('/:id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM food WHERE id=$1;`, [req.params.id],
                function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
        }
    });
});

router.put('/:id', function (req, res) {
    var editedFood = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE food SET name=$1, deliciousness_rating=$2, is_hot=$3
            WHERE id=$4;`, [editedFood.name, editedFood.deliciousness_rating, editedFood.is_hot, req.params.id], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
        }
    });
});

module.exports = router;