var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.7
router.get("/", function(req, res) {
 
  burger.all(function (data) {
    var hbsObject = {
      burgers: data
    }
    console.log(hbsObject)
    res.render('index', hbsObject)
  })
});

// post route -> back to index
router.post('/api/burger', function (req, res) {

  console.log(req.body)
  burger.create([
    'burger_name', 'flavored'
  ], [
    req.body.name, req.body.Burgers
  ], function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId })
  })
});

// put route -> back to index
router.put("/api/burger/:id", function(req, res) {
  burger.update(req.params.id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

module.exports = router;
