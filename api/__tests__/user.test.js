// Copyright Interactive Object. 2015,2016. All Rights Reserved.

// const faker = require('faker')
const chai = require('chai')
const path = require('path')
const log = require('mocha-logger').log

const expect = chai.expect
const turf = require('@turf/turf')
const moment = require('moment')
const app = require(path.join(__dirname, '../server/server'))

describe('User test', () => {
  var User, otherAccessToken

  before(async () => {
    User = app.models.user
   
    var promises = []

    // clear all user accounts
    await User.destroyAll()

    await User.register({
      firstname: 'yy',
      lastname: 'yy',
      email: 'yy@yy.com',
      password: 'yy',
      confirmation: 'yy'
    })

    return
  })

  it('should registre a new user test', async () => {
    const user = await User.register({
      firstname: 'x',
      lastname: 'x',
      email: 'x@y.com',
      password: 'x',
      confirmation: 'x'
    })
    expect(user.id).to.exist
    return
  })

  it('should loging', async () => {
    const data = await User.login({
      email: 'x@y.com',
      password: 'x'
    })
    expect(data).to.have.property('userId')
    return
  })

  it('should update profile', async () => {
    const res = await User.findOne({
      where: {
        email: 'x@y.com'
      }
    })
    expect(res).to.have.property('id')
    res.firstname = 'david'
    const saved = await res.save()
    expect(saved.firstname).to.equal('david')
  })


})
