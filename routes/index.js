var express = require('express');
var router = express.Router();
var fs=require('fs');
var unirest=require("unirest");

GLOBAL.type_num=0;
GLOBAL.positions=[0,0,0,0,0,0,0,0,0];

router.GetImageTags=function(){
  var apikey="acc_3124dae9d21af59";
  var apisecret="6467c7ebba6f77d55d6692046794d732";
  var b64="YWNjXzMxMjRkYWU5ZDIxYWY1OTo2NDY3YzdlYmJhNmY3N2Q1NWQ2NjkyMDQ2Nzk0ZDczMg==";
  var apiendpoint="http://api.imagga.com";

  var calling="http://api.imagga.com/v1/tagging?url=http://spaceremoved.herokuapp.com/img";

  var req = unirest("GET", "http://api.imagga.com/v1/tagging");

  req.query({
    "url": "http://spaceremoved.herokuapp.com/img"
  });

  req.headers({
    "authorization": "Basic "+b64,
    "accept": "application/json"
  });


  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
  });

}

router.resetPositions=function(){
  GLOBAL.positions=[0,0,0,0,0,0,0,0,0];
}
router.calcPosition=function(r1,r2,r3,c1,c2,c3){

  router.resetPositions();
  if(r1>70 && r1<100 && c3>1 && c3<30){
    GLOBAL.positions[8]=1;
    return;
  }
  if(r2>70 && r2<100 && c3>30 && c3<70){
    GLOBAL.positions[7]=1;
    return;
  }

  if(r3>70 && r3<100 && c3>70 && c3<100){
    GLOBAL.positions[6]=1;
    return;
  }
  if(r1>30 && r1<70 && c2>1 && c2<30){
    GLOBAL.positions[5]=1;
    return;
  }
  if(r2>30 && r2<70 && c2>30 && c2<70){
    GLOBAL.positions[4]=1;
    return;
  }
  if(r3>30 && r3<70 && c2>70 && c2<100){
    GLOBAL.positions[3]=1;
    return;
  }
  if(r1<30 && r1>1 && c1>1 && c1<30){
    GLOBAL.positions[2]=1;
    return;
  }
  if(r2<30 && r2>1 && c1>30 && c1<70){
    GLOBAL.positions[1]=1;
    return;
  }
  if(r3<30 && r3>1 && c1>70 && c1<100){
    GLOBAL.positions[0]=1;
    return;
  }
router.resetPositions();
  return;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Space. Removed.' });
});

router.get('/poprange',function(req,res){
  var range1=Number(req.query.r1);
  var range2=Number(req.query.r2);
  var range3=Number(req.query.r3);
  var range4=Number(req.query["c1"]);
  var range5=Number(req.query["c2"]);
  var range6=Number(req.query["c3"]);


  router.calcPosition(range1,range2,range3,range4,range5,range6);
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
   router.calcPosition(0,0,0,0,0,0);
  res.json({response:'reset-success'});
});


router.post('/sensor/:id',function(req,res){
  GLOBAL.positions[req.param("id")-1]=0;
  res.json({response:'sensor-success'});
})
router.post('/img',function(req,res){
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {

    fstream = fs.createWriteStream('/app/images/' + filename);
    file.pipe(fstream);
    fstream.on('close', function () {
      router.GetImageTags();

      res.json({response:'img-success'});
    });
  });
})
router.get('/range',function(req,res){
  res.json({response:'success'});
})
router.get('/pepper/:id',function(req,res){
  var filepath=process.cwd()+"/images/pepper01.jpg";
  res.sendFile(filepath);
})
router.get('/img',function(req,res){
  var filepath="/app/images/capture.jpg";
  res.sendFile(filepath);
})
router.get('/pepperp',function(req,res){
  var html_return="<html><head>";
  html_return+="<meta http-equiv='refresh' content='20'>";
  html_return="</head><body><style>body{background-color:#000;}</style><img src='/img' style='height:100%'/></body>";
  res.send(html_return);
})
router.get('/image',function(req,res){
  var type_found="";

  //GLOBAL.type_num=Math.floor(Math.random()*10)
  if(GLOBAL.type_num==1)type_found="cat";
  if(GLOBAL.type_num==2)type_found="dog";
  if(GLOBAL.type_num==3)type_found="king";

  var json={type:type_found};
  res.json(json);
})

module.exports = router;
