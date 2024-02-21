var express = require('express')
var router = express.Router()

var database = require('../data/database')

router.get('/get_locations', function (req, res, next) {
  var search_query = req.query.search_query;

  // Check if search_query is empty
  if (!search_query) {
      return res.status(400).json({ error: 'Search query is empty' });
  }

  var query = `
      SELECT 
          country_name AS location_name, 
          '' AS desc_name,
          tags 
      FROM 
          countries 
      WHERE 
          country_name LIKE '%${search_query}%' 
      UNION 
      SELECT 
          regions.region_name AS location_name, 
          countries.country_name AS desc_name,
          regions.tags 
      FROM 
          regions 
      JOIN 
          countries ON regions.country_id = countries.country_id
      WHERE 
          regions.region_name LIKE '%${search_query}%' 
      UNION 
      SELECT 
          cities.city_name AS location_name, 
          CONCAT(regions.region_name, ', ', countries.country_name) AS desc_name,
          cities.tags 
      FROM 
          cities 
      JOIN  
          regions ON cities.region_id = regions.region_id
      JOIN
          countries ON regions.country_id = countries.country_id
      WHERE 
          cities.city_name LIKE '%${search_query}%' 
      LIMIT 6;
  `;

  database.query(query, function (error, data) {
      if (error) {
          console.error('Error executing query:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(data);
  });
});

module.exports = router
