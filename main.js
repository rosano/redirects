const app = require('express')();

app.use(function removeWWW (req, res, next) {
  if (req.headers.host.slice(0, 4) !== 'www.') {
    return next();
  }

  return res.redirect(301, 'https://' + req.headers.host.slice(4) + req.originalUrl);
});

app.use(function correctDomain (req, res, next) {
  const map = {
    'oott.rosano.ca': 'archive.rosano.ca',
    'refs.rosano.ca': 'ref.rosano.ca',
    'rcreativ.com': 'rosano.ca',
    'phileplanet.com': 'rosano.ca',
    'list.rosano.ca': 'utopia.rosano.ca',
  };

  if (!Object.keys(map).includes(req.get('host'))) {
    return next();
  }

  return res.redirect(301, 'https://' + map[req.get('host')] + req.originalUrl);
});

app.use(function archiveDomain (req, res, next) {
  const map = {
    'notethesound.com': 'https://rosano.ca/notethesound',
    'scrutinizethis.com': 'https://go.rosano.ca/scrutinizethis',
    'sonogrid.com': 'https://rosano.ca/sonogrid',
  };

  if (!Object.keys(map).includes(req.get('host'))) {
    return next();
  }

  return res.redirect(301, map[req.get('host')]);
});

app.use(function maskDomain (req, res, next) {
  const map = {
    'appindex.app': 'https://utopia.rosano.ca/instant-app-index/',
  };

  if (!Object.keys(map).includes(req.get('host'))) {
    return next();
  }

  return res.send(`<!DOCTYPE html><html><head><meta charset="utf-8" /></head><body><iframe style="border: none;" src="${ map[req.get('host')] }"></iframe><style>html,body,iframe { width: 100vw; height: 100vh; padding: 0; margin: 0; }</style></body></html>`);
});

app.use(function redirectPeerTube (req, res, next) {
  if (!req.get('host').match('play.rosano.ca')) {
    return next();
  }

  const map = {
    // 1 improv
    '1hpQ5mmZBf8Co8YgmNQGzg,24a95dc-0afa-4c15-a9e8-64ea2baddac9': 'https://www.youtube.com/watch?v=fYOrrzkXbdQ',

    // 2 mysterios
    'oTXr6ShvCrWQszLqGickDn,96a24fa-e45f-4c0a-8a77-39b9dd5329eb': 'https://youtu.be/7DDjSDCJHsU',

    // 3 binot
    'qGc7esPs72qFm2okUCxZKM,7f7ec81-6032-42da-b515-e1315094af47': 'https://youtu.be/W6RP8QcjNjU',

    // 4 capitão
    'vqWY1ypWE8HjGaso6UFLzy,e54bed4-3690-4d4f-b1b7-7ce3323a0cc2': 'https://youtu.be/_oM3X98pLy0',

    // 5 improv
    'aR5CqMcpuF8heDeXRrKdT8,fbc8b78-b406-4981-92b7-07fe607eb76d': 'https://youtu.be/8nFWPFJKeqo',

    // 0data
    'noHx7hNSt6K7RnYjv3qDd3': 'https://vimeo.com/767543315',
    'ad3bdf5b-466d-4e0d-9f03-2a7a59b2956e': 'https://player.vimeo.com/video/767543315?color=ffffff&title=0&byline=0&portrait=0&dnt=true',

    // scaffold
    '3aibhs6BVriaYt5gEs6fZi,3aibhs6BVriaYt5gEs6fZi': 'https://youtu.be/eovvgvkc0Js',

    // runtime
    '5vi9mfxUCEqJp1UWeUCERg': 'https://anchor.fm/rafael-kennedy0/episodes/011---Rosano-on-Zero-Data-Apps-e16sie8',

    // fission
    '4v7dH4xManxYxLdzmamuKy': 'https://youtu.be/AjGns4Fu1vQ',
  };
  const match = (Object.entries(map).filter(function ([keys, value]) {
    return keys.split(',').filter(function (e) {
      return req.url.match(e);
    }).length;
  }).pop() || []).pop();

  return res.redirect(301, match || 'https://www.youtube.com/channel/UCPMFNN-2JUuS6D9iYfrVK8g');
});


app.listen(process.env.PORT);
