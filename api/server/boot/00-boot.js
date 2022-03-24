const logger = require('winston');
module.exports = (app, next) => {
  // Because of this: https://github.com/strongloop/loopback-connector-mongodb/issues/128
  // principalId must RoleMapping id must be a MongoDB ObjectID type

  const dataSource = app.models.RoleMapping.getDataSource()
  var ObjectID = dataSource.connector.getDefaultIdType()

  app.registry.modelBuilder.defineValueType(ObjectID)
  app.models.RoleMapping.defineProperty('principalId', {
    type: ObjectID
  })

  app.models.Device.defineProperty('userId', {
    type: ObjectID
  })

  dataSource.autoupdate(function(err, result) {
    if(err){
      logger.error(err)
    }
    logger.debug("dataSource autoupdate")
    next()
  });


}
