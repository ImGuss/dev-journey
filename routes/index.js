const express = require('express');
const request = require('request');

const router  = express.Router();

// github id and secret
const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

const githubUrl = 'https://api.github.com';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/users/search', (req, res, next) => {

  const options = {
    url: `${githubUrl}/users/${req.body.searchUser}`,
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret
    }),
    json: true,
    headers: {
      'User-Agent': 'imguss'
    }
  };

  request.get(options, (err, response, user) => {
    if (err) { return next(err); }

    res.render('show-user-view', { user } );
  });
});

module.exports = router;
