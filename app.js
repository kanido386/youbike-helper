const { initCrawler1 } = require('./service/crawler');
const { initWorker1 } = require('./service/worker');
const { Info } = require('./service/model');
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async() => {
  await sleep(30000);  // waiting for rabbitmq
  initCrawler1();
  await initWorker1();
})()

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.render('index', {
    SEARCH_API_URL: process.env.SEARCH_API_URL
  });
});

app.post('/search', async (req, res, next) => {
  const { longitude, latitude } = req.body;
  console.log(longitude);
  console.log(latitude);

  const result = []

  Info.aggregate(
    [
      {
        '$geoNear': {
          'near': {
            'type': 'Point',
            'coordinates': [ longitude, latitude ]
          },
          'spherical': true,
          'distanceField': 'distance'
        },
      },
      { '$skip': 0 },
      { '$limit': 3 }
    ],
    (err, nearestInfos) => {
      if (err) throw err;
      // console.log(nearestInfos);
      for (const info of nearestInfos) {
        console.log(info['station']);
        console.log(info['available']);
        console.log('==============================');
        result.push({
          station: info['station'],
          available: info['available']
        });
      }

      res.status(200).json({
        result
      });

    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});