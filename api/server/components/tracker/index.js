module.exports = function (app, options) {
  const urljoin = require('url-join')
  var path = urljoin(app.get('restApiRoot'), options.path)

  app.use(path, function (req, res) {
    function returnPixel () {
      var buf = new Buffer(35)
      buf.write('R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64')
      res.end(buf, 'binary')
    }

    if (req.query.email) {
      var Email = app.models.Email
      // validate the email
      if (Email.subscribe) {
        Email.subscribe(process.env.MAILJET_MASSMAIL_LIST_ID, req.query.email).finally(() => {
          returnPixel()
        })
      } else {
        returnPixel()
      }
    } else {
      returnPixel()
    }
  })
}
