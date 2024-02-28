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


app.listen(process.env.PORT);
