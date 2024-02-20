var express = require('express');
var router = express.Router();

var database = require('../data/database');


router.get('/get_data', function(req, res, next){
    var search_query = req.query.search_query;
    var query = `
    SELECT location_name FROM locations 
    WHERE location_name LIKE '%${search_query}%' 
    LIMIT 6
    `;

    database.query(query, function(error, data){
        res.json(data);
    });
});

module.exports = router;
