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

app.use(function redirectGhost (req, res, next) {
  if (!req.get('host').match('ephemerata.rosano.ca')) {
    return next();
  }

  const map = {
    'feed': 'feed',
    'rss': 'rss',
    'let-time-work-for-you': 'let-time-work-for-you',
    '2022': '2022',
    'ive-never-worked-for-a-company': 'ive-never-worked-in-a-company',
    '01gfggykmr5b5fhm3a0ghv4z1y': 'thirty-four',
    '01gdmrksee48hte06mv436emf6': 'how-i-build-a-digital-project-archive',
    '01fvmvwv1p0te9nh86z4r2h82x': 'applying-note-taking-reflexes-to-making-music',
    '01fsf9z4d1yq29sk00y32w1ynm': 'what-we-want',
    '01fra43ge7yaj2rgv2cya33q46': '2021',
    '01fqhhwczcs76rgy4fqestpmdb': 'secular-churches-for-continuity',
    '01fpxjtkv33xawr09px2ftppr9': 'why-i-added-text-to-my-pure-icon-site-after-eight-years',
    '01fpp2xb6fe3xbpswvfc4pxbmq': 'platform-puzzle-pieces-for-sustainable-community',
    '01fp3ke8f9z7adc6gbe1pdyyse': 'evolution-one',
    '01fmkad2j6gtxtx0hhedse2s3k': 'dating-apps-take-one',
    '01eyk3k2fazfza5rceyvbdb8n6': 'sixth-times-a-charm',
    '01eyk6mwbw9g2nb1dht0ffkqza': 'coming-to-the-guitar-later-in-life',
    '01eyy9nhtzmx74zqn4gp55nyqp': 'learning-portuguese',
    '01f1wjp6bb4raqdqd4aanb0evn': 'teaching-languages-to-friends',
    '01f5cfkdd1x912wsyer3099bkr': 'my-mothers-gift',
    '01f6srp7b67f2pe06bk7dqk9y1': 'six-guns-pointed-at-my-face',
    '01fawxsfwn9erqg2c2mz3psycs': 'inner-feedback-loops',
    '01fhvazke1y4bqfd883c9t9cm5': 'thirty-three',
    '01evv3hq1ak4b6ng1jzppx5n2j': 'going-doorless',
    '01fcnd5gyp3nw6yhecz6q94rvg': 'family-language-exchange',
    '01fj7k48m0915q7rcc7jcb1v3q': 'rethinking-analytics',
    '01fh30m6w0njmbbt4jayzyr2yq': 'events-are-work',
    '01fj75ct40ajy45tqhafdbm3tm': 'community-essence',
    '01fk3v8d7s6jw0wbhp3ck7xkyf': 'wetware-of-writing-and-doing',
    '01fmeehzvr3n9q0rkrnf7y2d5c': 'going-fully-web',
  };
  const match = (Object.entries(map).filter(function ([key, value]) {
    return key.split(',').filter(function (e) {
      return req.url.match(e);
    }).length;
  }).pop() || []).pop();

  return res.redirect(301, 'https://utopia.rosano.ca/' + (match || ''));
});

app.listen(process.env.PORT);
