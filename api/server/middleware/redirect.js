'use strict'

module.exports = () => (req, res) => {
  if (req.query && req.query.url) {
    res.redirect(req.query.url)
  } else {
    res.status(500).send('Url missing')
  }
}
