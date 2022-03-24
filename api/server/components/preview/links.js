const { Router } = require('express');
const linkPreview = require('../lib/LinkPreview')
const { BadRequest, Unauthorized, NotFound } = require('http-errors');

const router = new Router();

router.get('/preview', async (req, res, next) => {
    if(req.query && req.query.url){
      linkPreview.getPreview(req.query.url).then((data)=>{
        res.json(data);
      }).catch(e=>{
        return next(new BadRequest());
      })
    }else {
      return next(new BadRequest());
    }
});

module.exports = router
