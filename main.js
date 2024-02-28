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


app.listen(process.env.PORT);
