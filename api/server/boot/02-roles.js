const logger = require('winston');

module.exports = async (app) => {
  const Role = app.models.Role
  const User = app.models.user
  const RoleMapping = app.models.RoleMapping


  Role.byName = function(name, callback){
    Role.findOne({where: {name: name}}, callback);
  }

  RoleMapping.getAdmin = function(callback){

    Role.byName("admin", function(err, role){
      if( err || !role ) return callback(err);
      RoleMapping.find({
        where: {
          principalType: RoleMapping.USER
        }
      }, function(err, mappings){

        if( err ) return callback(err);
        var users = mappings.map(function (m) {
          return m.principalId;
        });

        callback(null, users);
      });
    });

  }

  try {

    let role = await Role.findOne({
      where: {
        name: 'admin'
      }
    })

    if (!role) {
      role = await Role.create({
        name: 'admin'
      })
      logger.debug("admin role created")
    } 


    let patientRole = await Role.findOne({
      where: {
        name: "patient"
      }
    })

    if (!patientRole) {
      patientRole = await Role.create({
        name: 'patient'
      })
      logger.debug("patient role created")
    } 

      const operatorRole = await Role.findOne({
      where: {
        name: "operator"
      }
    })

    if (!operatorRole) {
      await Role.create({
        name: 'operator'
      })
      logger.debug("operator role created")
    } 
    

      if (process.env.CONSOLE_PWD) {
        let user = await User.findOne({
          where: {
            username: "admin"
          }
        })
        if (user == null) {
          user = await User.create({
            username: "admin",
            email: "admin@visioconsult.care",
            password: process.env.CONSOLE_PWD
          })

          await role.principals.create({
            principalType: RoleMapping.USER,
            principalId: user.id
          });
          logger.info("user admin created")
          return

        } 
        return
      } else {
        logger.warn("CONSOLE_PWD not defined !")
        return
      }
    
  } catch (e) {
    logger.error(e)
  }


}