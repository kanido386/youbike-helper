const { initCrawler1 } = require('./service/crawler');
const { initWorker1 } = require('./service/worker');
const { Info } = require('./service/model');
const express = require('express');
const app = express();
const port = 3000;

initCrawler1();
(async() => {
  await initWorker1();
})()

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/search', async (req, res, next) => {
  Info.aggregate(
    [
      {
        '$geoNear': {
          'near': {
            'type': 'Point',
            // TODO: change to the data that users gave us
            'coordinates': [ 121.5312, 25.0299 ]
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
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});