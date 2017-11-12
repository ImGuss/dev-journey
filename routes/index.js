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


router.get('/repos', (req, res, next) => {
  res.render('repos');
});


router.post('/repos', (req, res, next) => {
  const gitUser = req.body.gitUser;

  const options = {
    url: `${githubUrl}/users/${gitUser}/repos?per_page=100`,
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret
    }),
    json: true,
    headers: {
      'User-Agent': 'imguss'
    }
  };

  request.get(options, (err, response, repos) => {
    // console.log('REPOS ARRAY!!!~~~~~', repos);
    let languages = repos;
    languages.sort( (a, b) => {
      if (a.created_at < b.created_at) {
        return -1;
      }

      if (b.created_at < a.created_at) {
        return 1;
      }

      return 0;
    });

    // console.log('LANGUAGES ARRAY!!!~~~~', languages);

    res.render('show-repos-view', { repos: repos, languages: languages });
  });
});



// router.post('/repos', (req, res, next) => {
//
//   const gitUser = req.body.gitUser;
//
//   const options = {
//     url: `${githubUrl}/users/${gitUser}/repos?per_page=100`,
//     body: JSON.stringify({
//       client_id: clientId,
//       client_secret: clientSecret
//     }),
//     json: true,
//     headers: {
//       'User-Agent': 'imguss'
//     }
//   };
//
//   request.get(options, (err, response, repos) => {
//     if (err) { return next(err); }
//
//
//     const languageObj = {};
//
//     // added an element so that i can loop through it.
//     const languages = [];
//
//     // iterate over each repo
//     repos.forEach( (repo) => {
//       let elementFound;
//       let cnt = 1;
//
//       // if languages array is empty
//       if (languages.length === 0) {
//         languages.push(repo.language);
//         languageObj[repo.language] = 1;
//         return;
//       }
//
//       // iterate of each language in the language array
//       languages.forEach( (language) => {
//
//         // if repo's language and element in language array are the SAME
//         // AND the language doesn't exist in the object
//         if (repo.language === language && !languageObj[language]) {
//           // add the language as a key and make the value 1
//            languageObj[language] = 1;
//            return;
//         }
//
//         // if the repo's language and the element in language are are the SAME
//         // AND the language DOES exist in the object
//         if (repo.language === language && languageObj[language]) {
//           // add one to the value
//           languageObj[language] += 1;
//           return;
//         }
//
//         elementFound = false;
//
//         // if goes through full array and no elements match
//         if (cnt === languages.length) {
//           elementFound = false;
//           cnt += 1;
//           return;
//         }
//
//       }); // end languages.forEach
//
//       if (elementFound === false) {
//         languages.push(repo.language);
//         languageObj[repo.language] = 1;
//         elementFound = true;
//         return;
//       }
//       // console.log('LANGUAGES ARRAY',languages);
//       // console.log('LANGUAGE OBJ', languageObj);
//       console.log(repos);
//     }); // end repos.forEach
//
//     res.render('show-repos-view', { repos, languages: languageObj } );
//   });
// });

module.exports = router;
