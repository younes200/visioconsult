'use strict'
// Copyright Interactive Object. 2016. All Rights Reserved.

const logger = require('winston')
const _ = require('lodash')

module.exports = function(Comment) {
  

  Comment.on('set', app => {


    const ObjectID = Comment.getDataSource().connector.getDefaultIdType()

    // Because of this: https://github.com/strongloop/loopback-connector-mongodb/issues/1441
    Comment.defineProperty('patientId', {
      type: ObjectID,
    })  

    // Comment.defineProperty('patientSheetId', {
    //   type: ObjectID,
    // })   
  })

  Comment.observe('before save', async ctx => {
    const User = Comment.app.models.user
    const PatientSheet = Comment.app.models.PatientSheet
    const instance = ctx.instance
    const ObjectId = Comment.getDataSource().connector.dataSource.ObjectID
    
    if (ctx.isNewInstance && instance.patientId && instance.operatorId) {
      let operator
      let patient
      instance.patientId = new ObjectId(instance.patientId)
      try {
        operator = await User.findById(instance.operatorId, { include: 'roles'})
        patient = await User.findById(instance.patientId, { include: ['patientSheet', 'roles'] })

        const patientType = patient.toJSON().roles.filter(role => role.name == "patient").length > 0
        const operatorType = operator.toJSON().roles.filter(role => role.name == 'operator' || role.name == 'admin' ).length > 0

        if(!operatorType) {
          const errorText = 'User is not a operator'
          const err = new Error(errorText)
          err.code = 'USER_NOT_OPERATOR'
          err.statusCode = 401
          logger.error(err)
          return err
        }
        
        if(!patientType) {
          const errorText = 'User is not a patient'
          const err = new Error(errorText)
          err.code = 'USER_NOT_PATIENT'
          err.statusCode = 401
          logger.error(err)
          return err
        } else { 

          var filter = {where: { userId: instance.patientId }};
          var data = {
            firstname: patient.username,
            userId: patient.id
          }
  
          let patientSheet = await PatientSheet.findOrCreate(filter, data)
            
            if(patientSheet.length > 0) {
              patientSheet = patientSheet[0].toJSON()
              instance.patientSheetId = patientSheet.id
              ctx.instance = instance
              
              return ctx
            } 
          return ctx                    
        }        
      } catch (e) {
        logger.error('error:', e)
        return e
      }
    } else {
      const error = new Error('patientId and operator are Required')
      error.statusCode = 400
      error.code = 'PATIENTID_OPERATORID_REQUIRED'
      throw error
    }
    
  })

  Comment.disableRemoteMethodByName('createChangeStream')
}
