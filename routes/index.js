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

  res.json(q);//rem
});

router.post('/sensor/:id',function(req,res){
  res.json({response:'sensor-success'});
})
router.post('/img',function(req,res){
  res.json({response:'img-success'});
})
router.get('/range',function(req,res){
  res.json({response:'success'});
})
router.get('/pepper/:id',function(req,res){
  var filepath=process.cwd()+"/images/pepper01.jpg";
  res.sendfile(filepath);
})
router.get('/pepperp',function(req,res){
  var html_return="<html><head></head><body><style>body{background-color:#000;}</style><img src='/pepper/01' style='height:100%'/></body>";
  res.send(html_return);
})

module.exports = router;
