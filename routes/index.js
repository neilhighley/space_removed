var express = require('express');
var router = express.Router();
GLOBAL.type_num=0;

GLOBAL.positions=[0,0,0,0,0,0,0,0,0];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ranges', function(req, res) {
  var q={time:new Date(),ranges:[{position:1,active:GLOBAL.positions[0]==1},
    {position:2,active:GLOBAL.positions[1]==1},
    {position:3,active:GLOBAL.positions[2]==1},
    {position:4,active:GLOBAL.positions[3]==1},
    {position:5,active:GLOBAL.positions[4]==1},
    {position:6,active:GLOBAL.positions[5]==1},
    {position:7,active:GLOBAL.positions[6]==1},
    {position:8,active:GLOBAL.positions[7]==1},
    {position:9,active:GLOBAL.positions[8]==1}]};

  res.json(q);//rem
});

router.get('/set/:id',function(req,res){

  GLOBAL.positions[req.param("id")-1]=1;
  res.json({response:'sensor-success',id:req.param("id")});
});

router.get('/unset/:id',function(req,res){
  GLOBAL.positions[req.param("id")-1]=0;

  res.json({response:'sensor-success'});
});
router.get('/reset',function(req,res){
  for(var id=0;id<10;id++){
    GLOBAL.positions[id]=0;
  }

  res.json({response:'sensor-success'});
});


router.post('/sensor/:id',function(req,res){
  GLOBAL.positions[req.param("id")-1]=0;
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
  res.sendFile(filepath);
})
router.get('/pepperp',function(req,res){
  var html_return="<html><head>";
  html_return+="<meta http-equiv='refresh' content='20'>";
  html_return="</head><body><style>body{background-color:#000;}</style><img src='/pepper/01' style='height:100%'/></body>";
  res.send(html_return);
})
router.get('/image',function(req,res){
  var type_found="";
  GLOBAL.type_num=Math.floor(Math.random()*10)
  if(GLOBAL.type_num==1)type_found="cat";
  if(GLOBAL.type_num==2)type_found="dog";
  if(GLOBAL.type_num==3)type_found="king";

  var json={type:type_found};
  res.json(json);
})

module.exports = router;
