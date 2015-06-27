var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ranges', function(req, res) {
  var q={time:new Date(),ranges:[{position:1,active:false},
    {position:2,active:false},
    {position:3,active:false},
    {position:4,active:false},
    {position:5,active:false},
    {position:6,active:true},
    {position:7,active:false},
    {position:8,active:false},
    {position:9,active:false}]};

  res.json(q);
});

router.get('/range',function(req,res){
    res.json({response:'success'});
})

module.exports = router;
