const logger = require('winston');

module.exports = (app, next) => {
  
    const i18n = require("i18n-node-yaml")({
        locales:['en', 'fr'],
        debug: process.NODE_ENV != "production",
        translationFolder: __dirname + '/../../common/translations',
        defaultLocale: 'fr'
    });

    i18n.ready.then((res)=>{
        logger.info("i18n loaded")
        app.i18n = i18n.api()
        next()
    }).catch(err => {
        logger.error('Failed loading translations', err);
    });


    
}