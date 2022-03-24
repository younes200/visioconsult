'use strict'
// Copyright Interactive Object. 2016. All Rights Reserved.

const utils = require('loopback/lib/utils')
const debug = require('debug')('nour:model:user')
const urljoin = require('url-join')
const moment = require('moment')
const speakeasy = require('speakeasy')
const b64url = require('b64url')
const crypto = require('crypto')
const axios = require('axios')
const _ = require('lodash')
const querystring = require('querystring')
const logger = require('winston');
// const {ObjectId} = require('mongodb'); // or ObjectID 
var qs = require('qs');
const {
  filter
} = require('p-iteration');
var vCard = require('vcards-js')

var BLACK_LIST_FIELDS = [
  'lastname',
  'verificationSentAt',
  'verificationToken',
  'password',
]
const {Storage} = require('@google-cloud/storage');


module.exports = function (user) {

 

  // send verification email after registration
  user.afterRemote('register', function (context, login, next) {
    user.findById(login.userId).then(userInstance => {
      userInstance.verify(function (err, response) {
        if (err) {
          logger.error('afterRemote register err: %j', err)
          return next(null, login)
        }
        next(null, login)
      })
    })
  })

  user.beforeRemote('prototype.patchAttributes', function(ctx, unused, next) {
    const Role = user.app.models.Role
    const RoleMapping = user.app.models.RoleMapping
    const roleExist = ctx.req.body.roles.find(role => role.id === ctx.req.body.role )

    if(!roleExist) {
      Role.findById(ctx.req.body.role).then((role)=>{
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: ctx.req.body.id
        });
      })
    }

    delete ctx.req.body.role
    delete ctx.req.body.roles
    delete ctx.req.body.patientContact
    delete ctx.req.body.patientSheet
    next();
  });
  
  user.observe('after save', async ctx => {
    let AccessToken = user.app.models.accessToken
    const query = {
      userId: ctx.instance.id,
      ttl: 1209600
    }
  
      try {
      await AccessToken.create(query)
      }catch(error){
        logger.error(error)
      }
  })
  user.afterRemote('confirm', function (context, data) {
    if (context.args && context.args.redirect) {
      context.res.redirect(context.args.redirect)
    }
  })

  user.afterRemoteError('confirm', function (ctx, next) {
    ctx.res.redirect(urljoin(user.app.get('url') + '/confirm-error'))
  })

  user.afterRemote('findById', function (ctx, user, next) {
    // remove protected field from the result : lastname, email
    if (user != null && user.id != null && ctx.req.accessToken != null && (ctx.req.accessToken && ctx.req.accessToken.userId != user.id.toString())) {
      BLACK_LIST_FIELDS.forEach(key => {
        if (ctx.result) ctx.result.unsetAttribute(key)
      })
    }
    next()
  })

  // send password reset link when requested
  user.on('resetPasswordRequest', function (info) {
    var url = urljoin(user.app.get('url'), '/resetpassword/', info.accessToken.id)
    user.app.models.Email.sendResetPassword(info.user)
  })


  const parseSignedRequest = (raw, secret, ttl) => {
    if (!secret) throw Error('A secret must be provided.')
    var dotPos = raw.indexOf('.'),
      sig = raw.substr(0, dotPos),
      payload = raw.substr(dotPos + 1),
      hmac = crypto.createHmac('sha256', secret).update(payload),
      expectedSig = b64url.safe(hmac.digest('base64'))
    var data = JSON.parse(b64url.decode(payload))
    return data
  }



  user.register = (body, cb) => {
    cb = cb || utils.createPromiseCallback()

    // var Role = user.app.models.Role
    // var RoleMapping = user.app.models.RoleMapping
    var error
    if (!body.email && !body.username) {
      error = new Error('username or email is required')
      error.statusCode = 400
      error.errorCode = 'USERNAME_AND_EMAIL_REQUIRED'
      cb(error)
      return cb.promise
    }

    if (!body.password) {
      error = new Error('Mot de passe obligatoire')
      error.statusCode = 400
      error.errorCode = 'PASSWORD_REQUIRED'
      cb(error)
      return cb.promise
    }

    if (!body.confirmation || body.password !== body.confirmation) {
      error = new Error('Password dot not match')
      error.statusCode = 400
      error.errorCode = 'PASSWORD_DO_NOT_MATCH'
      cb(error)
      return cb.promise
    }

    user.findOne({
        where: {
          email: body.email
        }
      },
      (err, userExist) => {
        var defaultError = new Error('Registration failed')
        defaultError.statusCode = 401
        defaultError.errorCode = 'REGISTRATION_FAILED'

        if (err) {
          debug('user.findOne', err)
          cb(defaultError)
          return cb.promise
        }

        if (userExist) {
          defaultError.message = 'Email exists'
          defaultError.statusCode = 401
          defaultError.errorCode = 'EMAIL_EXISTS'
          cb(defaultError)
          return cb.promise
        }

        // user.findOne({ where: { phone: body.phone } }, (err, userExist) => {
        //   if (err) {
        //     debug('user.findOne', err)
        //     cb(defaultError)
        //     return cb.promise
        //   }
        //   if (userExist) {
        //     console.log(userExist, 'phone exit')
        //     defaultError.message = 'Phone exists'
        //     defaultError.statusCode = 401
        //     defaultError.errorCode = 'REGISTRATION_FAILED_PHONE_EXISTS'
        //     cb(defaultError)
        //     return cb.promise
        //   }
        // create user
        user.create({
            firstname: body.firstname,
            lastname: body.lastname,
            username: body.username,
            email: body.email,
            password: body.password,
            phone: body.phone,
            gender: body.gender,
            birthday: body.birthday
          },
          (err, createdUser) => {
            if (err) {
              debug('error creating user', err)

              cb(defaultError)
              return cb.promise
            }

            user.login({
                email: body.email,
                password: body.password,
                ttl: -1
              },
              'user',
              function (err, result) {
                if (err) {
                  debug('error login', err)
                  cb(defaultError)
                  return cb.promise
                }
                cb(null, result)
              }
            )
          }
        )
        //})
      }
    )

    return cb.promise
  }

  user.prototype.verify = function (done) {
    logger.debug('verify email')

    done = done || utils.createPromiseCallback()

    var userInstance = this
    var userModel = this.constructor
    var app = userModel.app

    if (
      userInstance.verificationSentAt &&
      moment()
      .subtract(moment(userInstance.verificationSentAt), 'hours')
      .hours() < 3
    ) {
      var err = new Error('Wait before resent verification email')
      err.statusCode = 400
      err.errorCode = 'VERIFICATION_ALREADY_SENT'
      return done(err)
    }

    var redirect = urljoin(app.get('url'), '/login')
    var restApiRoot = (app && app.get('restApiRoot')) || '/api'

    var verifyHref = urljoin(
      app.get('url'),
      restApiRoot,
      userModel.http.path,
      userModel.sharedClass.findMethodByName('confirm').http.path,
      '?uid=' + userInstance.id,
      '&redirect=' + redirect
    )

    // Set a default token generation function if one is not provided
    var token = speakeasy.generateSecret({
      length: 20
    }).base32

    userInstance.updateAttributes({
        verificationSentAt: new Date(),
        verificationToken: token
      },
      function (err, result) {
        if (err) {
          debug(err)
          done(err)
        } else {
          debug('verificationToken saved', token)

          verifyHref += '&token=' + token


          done(null, {
            email: userInstance.email,
            token: token,
            uid: userInstance.id
          })
        }
      }
    )

    return done.promise
  }

  user.changePassword = (ctx, body, cb) => {
    cb = cb || utils.createPromiseCallback()

    var User = user.app.models.user
    var AccessToken = user.app.models.accessToken
    var error

    if (!body.credentials || !body.credentials.password) {
      error = new Error('password is required')
      error.statusCode = 400
      error.errorCode = 'PASSWORD_REQUIRED'
      cb(error)
      return cb.promise
    }

    if (!body.credentials.confirmation ||
      body.credentials.password !== body.credentials.confirmation
    ) {
      var error = new Error('password do not match')
      error.statusCode = 400
      error.errorCode = 'PASSWORD_DO_NOT_MATCH'
      cb(error)
      return cb.promise
    }

    if (!body.accessToken) {
      error = new Error('accessToken does not exist')
      error.statusCode = 400
      error.errorCode = 'ACCESS_TOKEN_REQUIRED'
      cb(error)
      return cb.promise
    }

    AccessToken.findOne({
        where: {
          id: body.accessToken
        },
        include: ['user']
      },
      function (err, token) {
        if (err || !token) {
          error = new Error(err)
          error.statusCode = 401
          error.errorCode = 'INVALID_ACCESS_TOKEN'
          cb(error)
          return cb.promise
        }

         User.findById(token.user().id, function (err, user) {
          if (err) {
            error = new Error(err)
            error.statusCode = 401
            error.errorCode = 'USER_NOT_EXIST'
            cb(error)
            return cb.promise
          }

          if (user.realm === 'admin') {
            error = new Error(err)
            error.statusCode = 401
            error.errorCode = 'UNAUTHORIZED'
            cb(error)
            return cb.promise
          }

          user.updateAttribute('password', body.credentials.password, function (err, result) {
            if (err) {
              error = new Error(err)
              error.statusCode = 401
              error.errorCode = 'USER_UPDATE_FAILED'
              cb(error)
              return cb.promise
            }

            cb(null, result)
            return cb.promise
          })
        })
      }
    )
  }

  user.prototype.updateUser = async function (body) {
    try {
      const User = user.app.models.user
      const userInstance = await User.findById(body.id)
      if(userInstance) {
        await User.updateAttributes({
          firstname: body.firstname,
          lastname: body.lastname,
          username: body.username,
          email: body.email
        })
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  user.prototype.uploadSignature = async function (body) {
   return user.app.googleCloud.signature(body)
  }

  user.prototype.deviceUpsert = function (uid, data, callback) {
    var Device = user.app.models.Device

    Device.upsertWithWhere({
      uid,
      userId: this.id
    }, data, (err, result) => {
      callback(err, result)
    })
  }


  
  const getGatewayToken = () => {
    const timeout = 86400 // 24h
    const expiry = Math.floor(Date.now() / 1000) + timeout;
    const realm= "janus"
    const data = ['janus.plugin.videoroom', 'janus.plugin.videocall']
    const strdata = [expiry.toString(), realm, ...data].join(',');
    const hmac = crypto.createHmac('sha1', process.env.GATEWAY_AUTH_SECRET);
    hmac.setEncoding('base64');
    hmac.write(strdata);
    hmac.end();

    return [strdata, hmac.read()].join(':');
  };


  user.me = async function (accessToken, req, param) {
   
    var User = user.app.models.user
    if (req.accessToken && req.accessToken.userId) {
      var userId = req.accessToken.userId;
      const instance = await User.findById(userId)
      const token = getGatewayToken()
      return {...instance.toJSON(), gatewayToken:token, accessToken:req.accessToken.id}
    } else {
      throw new Error("Authorization Required")
    }
  };



  // read only
  // user.disableRemoteMethodByName('create')
  // user.disableRemoteMethodByName('delete')
  // user.disableRemoteMethodByName('deleteById')
  user.disableRemoteMethodByName('exists')
  user.disableRemoteMethodByName('createChangeStream')
  user.disableRemoteMethodByName('updateAll')
  user.disableRemoteMethodByName('replaceOrCreate')
  user.disableRemoteMethodByName('upsertWithWhere')
  //user.disableRemoteMethodByName('findOne')
  //user.disableRemoteMethodByName('find')
  user.disableRemoteMethodByName('patchOrCreate')


  // disable remote methods for  credentials
  user.disableRemoteMethodByName('prototype.__get__credentials')
  user.disableRemoteMethodByName('prototype.__create__credentials')
  user.disableRemoteMethodByName('prototype.__delete__credentials')
  user.disableRemoteMethodByName('prototype.__destroyById__credentials')
  user.disableRemoteMethodByName('prototype.__updateById__credentials')
  user.disableRemoteMethodByName('prototype.__count__credentials')
  user.disableRemoteMethodByName('prototype.__findById__credentials')

  // disable remote methods for  credentials
  user.disableRemoteMethodByName('prototype.__get__identities')
  user.disableRemoteMethodByName('prototype.__create__identities')
  user.disableRemoteMethodByName('prototype.__delete__identities')
  user.disableRemoteMethodByName('prototype.__destroyById__identities')
  user.disableRemoteMethodByName('prototype.__updateById__identities')
  user.disableRemoteMethodByName('prototype.__count__identities')
  user.disableRemoteMethodByName('prototype.__findById__identities')

  user.disableRemoteMethodByName('prototype.__create__roles')
  user.disableRemoteMethodByName('prototype.__delete__roles')
  user.disableRemoteMethodByName('prototype.__destroyById__roles')
  user.disableRemoteMethodByName('prototype.__updateById__roles')

  user.disableRemoteMethodByName('prototype.__get__accessTokens')
  user.disableRemoteMethodByName('prototype.__delete__accessTokens')
  user.disableRemoteMethodByName('prototype.__destroyById__accessTokens')
  user.disableRemoteMethodByName('prototype.__updateById__accessTokens')
  user.disableRemoteMethodByName('prototype.__count__accessTokens')
  // user.disableRemoteMethodByName('prototype.__findById__accessTokens')

  // rides

  user.disableRemoteMethodByName('prototype.__delete__support')
  user.disableRemoteMethodByName('prototype.__destroyById__support')
  user.disableRemoteMethodByName('prototype.__updateById__support')


  user.disableRemoteMethodByName('prototype.__create__devices')
  user.disableRemoteMethodByName('prototype.__updateById__devices')
  user.disableRemoteMethodByName('prototype.__delete__devices')
  user.disableRemoteMethodByName('prototype.__destroyById__devices')


}