var express = require('express');
var router = express.Router();
var EMBEDLY_KEY = '12eea0a7d9e140b1bc526f1b08eca80c';

var embedly = require('embedly'),
    util = require('util');

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/yves', function(req, res) {
  getArticle('http://www.theverge.com/2014/8/6/5930539/the-makers-mark-yves-behar-fuseproject-profile', function(data){
    console.log(data);
    res.render('article', data);
  });
});

router.get('/data', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(yvesContext));
});

module.exports = router;

function getArticle(link,cb){
  new embedly({key: EMBEDLY_KEY}, function(err, api) {
    if (!!err) {
      console.error('Error creating Embedly api');
      console.error(err.stack, api);
      return;
    }

    // call single url
    var url = link;
    api.extract({url: url}, function(err, objs) {
      if (!!err) {
        console.error('request #1 failed');
        console.error(err.stack, objs);
        return;
      }
      var data = objs[0];
      data.content = data.content.replace(/<img/g, '<img class="img-rounded img-responsive"')
      return cb(objs[0]);
    });
  });
};

var yvesContext = {
  YvesBehar: {
    title: "Yves Behar",
    keyVariants: ["Yves Behar", "Yves Behar's", "Behar", "Behar's", "Yves"],
    articleText : {
      text: "Renowned industrial designer. Behar has become one of the leading industrial designers of his generation, creating iconic objects for Jawbone, Herman Miller, General Electric, and Puma, among many others. ‘ He’s broadly interested in \"moving design closer to the body,\" through objects that adapt to you over time. \"Our principal role as designers is to accelerate new ideas, and the adoption of new ideas,\"."
    },
    wikipedia: {
      title: "Yves Behar",
      summary: "Yves Béhar (born 1967) is a Swiss designer, entrepreneur, and sustainability advocate.He is the founder and principal designer of Fuseproject, an award-winning industrial design and brand development firm. Béhar is also Chief Creative Officer of the wearable technology company Jawbone, and Co-founder and Chief Creative Officer of August, a Smart Lock maker.",
      img: "http://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Yves_Behar.jpg/440px-Yves_Behar.jpg",
      source: "http://en.wikipedia.org/wiki/Yves_B%C3%A9har"
    }
  },
  BlueFocus: {
    title: "BlueFocus",
    keyVariants: ["BlueFocus"],
    articleText : {
      text: "Paid a reported $46.7 million for its (Fuseproject) stake, and plans to expand Behar’s model of \"venture design\" — forming long-term partnerships with startups in exchange for equity in the companies — around the world"
    }
  },
  FanTV: {
    title: "Fan TV",
    keyVariants: ["Fan TV", "Fan TV remote"],
    quote:{
      text: "It’s a glossy, white, touch-enabled pebble that fits neatly in the hand. It snaps, via magnet, onto the accompanying set-top box, and the shape of the remote mirrors that of the box.",
      source: "https://www.fan.tv/",
      name: "Fan.tv"
    },
    gallery:{
      images:[
        {
          src:"http://rack.3.mshcdn.com/media/ZgkyMDEzLzA1LzMxL2UxL2ZhbnR2dGh1bWIuNmI5NDUuanBnCnAJdGh1bWIJOTUweDUzNCMKZQlqcGc/5d2fc88b/2f7/fan-tv-thumb.jpg"
        },
        {
          src:"http://rack.1.mshcdn.com/media/ZgkyMDEzLzA1LzMwL2E2L2ZhbnR2My5mOGVkYy5qcGcKcAl0aHVtYgkxMjAweDk2MDA-/9618a4ef/4a3/fan-tv-3.jpg"
        }
      ]
    }
  },
  CannesLion:{
    title: "Cannes Lion",
    keyVariants: ["Cannes Lion", "Cannes"],
    wikipedia: {
      title: "Cannes Lion",
      summary: "Cannes Lions Festival of International Creativity, an annual festival for advertisers.",
      source: "http://en.wikipedia.org/wiki/Cannes_Lions_International_Festival_of_Creativity"
    }
  }
};





