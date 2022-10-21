const express = require('express');
// const generateAllCombinations = require('../services/utils');
const router = express.Router();

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

const $ = jQuery = require('jquery')(window);

const sc_api={
  post: function(url,options,callback){
     $.ajax({
        url: url,
        data: options,
        cache: false,
        async: true,
        dataType: 'json',
        timeout: 30000,
        type: 'POST',
        success: function (json) {
          callback(json);
        },
        error: function(xhr, status, error) {
          const err = eval("(" + xhr.responseText + ")");
          alert(err.Message);
        }
    });   
  },
  spin:function(options,callback){
      const url='https://api_new.spinnerchief.com/spin';
      this.post(url,options,callback);
  },
  today_times:function(apikey,username,password,target,callback){
      const url='https://api_new.spinnerchief.com/today_times';
      const options={
          apikey:apikey,
          username:username,
          password:password,
          target:target
      };
      this.post(url,options,callback);
  }
};



function generateAllCombinations(text) {
  let res = [];
  generateTexts(text, res);
  return res;
}

function generateTexts(text, results) {
  let matches, options;
  const regEx = new RegExp(/{([^{}]+?)}/);
  if ((matches = regEx.exec(text)) !== null) {
      options = matches[1].split('|');
      for(let i=0; i<options.length; i++){
          generateTexts(text.replace(matches[0], options[i]), results);
      }
  } else if(!results.includes(text)){
    results.push(text);
  }
}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async function(req, res, next) {
  const text = req.body.text;
  sc_api.spin({
    apikey: 'apiab24a58679e8448db',
    username: 'davidReputa',
    password: 'YMVKbN5xiNt6xPR',
    text: text,
      //More options...
  },function(result){
      // console.log(result);
      if(result.code == 200) {
        // res.send(result.text);
        res.send({masterText: result.text, generatedCombinatios: generateAllCombinations(result.text)});
      }else {
        res.send(result);
      }
  });
});

router.post('/remaining', async function(req, res, next) {
  // const text = req.body.text;
  sc_api.today_times(
    'apiab24a58679e8448db',
    'davidReputa',
    'YMVKbN5xiNt6xPR',
    'remaining', 
    function(result){
      res.send(result)
    }
  );
});


module.exports = router;
