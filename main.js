const app = require('express')();

app.use(function removeWWW (req, res, next) {
  if (req.headers.host.slice(0, 4) !== 'www.') {
    return next();
  }

  return res.redirect(301, 'https://' + req.headers.host.slice(4) + req.originalUrl);
});


app.listen(process.env.PORT);
