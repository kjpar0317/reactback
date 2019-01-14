var express = require('express');
var router = express.Router();

var dbPool = require('../lib/db_connect');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  //var userId = req.body['userId'];
  //var userPw = req.body['userPw'];

  dbPool.query("select * from board", null, function (data, error) {
    if(!error) {
      res.json({
         "code": 200,
         "status": "Success",
         "userData": data,
         "message": "데이터 조회 성공"
      });
    } else {
      res.json({"code": 200, "status": "Error", "message": "Error for selecting board"});
      return;
    }
  });
});

router.post('/write', function (req, res, next) {
  var name = req.body['name'];
  var country = req.body.country;
  var city = req.body.city;
  var salary = req.body.salary;
  
  if(name != null && country != null && city != null && salary != null) {
    dbPool.query("INSERT INTO board (name, country, city, salary) VALUES (?, ?, ?, ?)", [name,country,city,salary], function (data, error) {
      if(!error) {
        res.json({
           "code": 200,
           "status": "Success",
           "data" : data,
           "message": "데이터 조회 성공"
        });
      } else {
        res.json({"code": 200, "status": "Error", "message": "Error for insert board"});
        return;
      }
    });
  } else {
    res.json(JSON.stringify(req.body));
    return;
  }
});



module.exports = router;
