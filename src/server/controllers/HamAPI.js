// Harvard Art Museum (HAM) Api Controller
const request = require('request');

const { HARVARD_KEY } = process.env;

const getRandomPainting = (req, res) => {
  const paintingNumParams = {
    apikey: HARVARD_KEY,
    classification: 'Paintings',
    size: 0
  };

  // Get number of paintings
  request(
    { url: 'https://api.harvardartmuseums.org/object', qs: paintingNumParams },
    // eslint-disable-next-line consistent-return
    (err, response, body) => {
      if (err) return res.status(500).json({ error: 'Error retrieving info from HAM API' });
      if (body === 'Unauthorized') return res.status(500).json({ error: 'Missing HAM API Key' });

      const parsedBody = JSON.parse(body);
      const paintNum = parsedBody.info.totalrecords;

      const randomPaintParams = {
        apikey: HARVARD_KEY,
        classification: 'Paintings',
        fields:
          'id,title,primaryimageurl,colors,dated,culture,medium,department,division,url,period,places',
        page: Math.floor(Math.random() * (paintNum + 1)),
        size: 1,
        height: '<500'
      };

      request(
        { url: 'https://api.harvardartmuseums.org/object', qs: randomPaintParams },
        // eslint-disable-next-line consistent-return
        (err2, response2, body2) => {
          if (err2) return res.status(500).json({ error: 'Error retrieving info from HAM API' });
          if (body2 === 'Unauthorized') return res.status(500).json({ error: 'Missing HAM API Key' });

          const parsedBody2 = JSON.parse(body2);
          let randomPainting = parsedBody2.records[0];

          if (!randomPainting.primaryimageurl || !randomPainting.id) {
            getRandomPainting(req, res);
          } else {
            randomPainting = JSON.stringify(randomPainting);
            res.status(200).send(randomPainting);
          }
        }
      );
    }
  );
};

module.exports = {
  getRandomPainting
};
