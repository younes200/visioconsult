const _ = require('lodash')
const faker = require('faker')
const fs = require('fs')
const path = require('path')
const YAML = require('yamljs')
const JSONPath = require('advanced-json-path')
const idKey = 'id'
const moment = require('moment')

module.exports = {
  savedData: {},

  async loadFixtures(models, fixturesPath) {
    // Get all yml files
    const fixturePath = path.join(process.cwd(), fixturesPath)
    const fixtureFolderContents = fs.readdirSync(fixturePath)
    const fixtures = fixtureFolderContents.filter(fileName => fileName.match(/\.yml$/))

    const loadingFixturesPromises = []

    for (var fixture of fixtures) {
      const fixtureData = YAML.load(path.join(fixturePath, fixture))
      console.log('fixture ' + fixture + ' loaded')
      await this.loadYamlFixture(models, fixtureData)
    }

    return

  },

  async purgeDatabase(models) {
    for (const index in models) {
      if (models[index].destroyAll) {
        await models[index].destroyAll()
      }
    }
  },


  getRandomMatchingObject(pattern) {
    const regex = new RegExp(pattern)
    const objects = _.filter(this.savedData, (value, key) => !_.isEmpty(key.match(regex)))
    return _.sample(objects)
  },

  getJSONPathMatchingObject(query) {
    const result = JSONPath(this.savedData, query)
    return _.isArray(result) ? _.sample(result) : result
  },

  replaceReferenceInObjects(object) {

    _.each(object, (value, key) => {
      if (_.values(value)[0] === '@') {
        const identifier = value.substring(1)

        //identifier = identifier.replace('{@}', i.toString())
        const referencedObject = this.getRandomMatchingObject(`^${identifier}$`)

        if (referencedObject != null) {
          object[key] = referencedObject[idKey]
        } else {
          console.log(`[ERROR] Please provide object for @${identifier}`)
        }
      } else if (_.values(value)[0] === '$') {
        const identifier = value

        //identifier = identifier.replace('{@}', i.toString())
        const result = this.getJSONPathMatchingObject(identifier)
        if (result != null) {
          object[key] = result
        }
      }
    })

    return object

  },

  executeGenerators(data) {
    const expandedData = {}

    _.each(data, function (object, identifier) {
      // Try to identify "identifer{m..n}" pattern
      const regex = /(\w+)\{(\d+)..(\d+)\}$/
      const match = identifier.match(regex)

      // If pattern detected
      if ((match != null ? match.length : undefined) === 4) {
        identifier = match[1]
        const min = parseInt(match[2])
        const max = parseInt(match[3])
        // Duplicate object ...
        return (() => {
          const result = []
          for (
            var i = min, end = max, asc = min <= end; asc ? i <= end : i >= end; asc ? i++ : i--
          ) {
            expandedData[identifier + i] = _.clone(object)
            // ... and replace {@} occurences
            result.push(
              _.each(object, function (value, key) {
                let newValue
                if (typeof value === 'string') {
                  newValue = value.replace('{@}', i.toString())
                } else {
                  newValue = value
                }
                return (expandedData[identifier + i][key] = newValue)
              })
            )
          }
          return result
        })()
      } else {
        return (expandedData[identifier] = object)
      }
    })

    return expandedData
  },

  executeFaker(data) {
    const isInt = value => /^[-+]?([0-9]*\.[0-9]+|[0-9]+)$/.test(value)

    const tryInt = value => {
      return isInt(value) ? Number(value) : value
    }

    const fakeIt = value => {
      try {
        return tryInt(faker.fake(value))
      } catch (e) {
        return value
      }
    }

    return _.isObject(data) ?
      Object.keys(data).reduce(
        (r, k) =>
        Object.assign(r, {
          [k]: this.executeFaker(data[k])
        }), {}
      ) :
      _.isString(data) ? fakeIt(data) : data
  },

  // executeFunctions(data) {
  //   _.each(data, (object, identifier) =>
  //     _.each(object, function(value, key) {
  //       try {
  //         const fn = eval(value)
  //         return (data[identifier][key] = fn)
  //       } catch (e) {}
  //     })
  //   )
  //   return data
  // },

  executeFunctions(data) {
    // pass utils lib to be used in context : moment, faker and other here
    var context = {
      moment,
      faker
    }

    function evaluate(js) {
      try {
        return function () {
          return eval(js)
        }.call(context)
      } catch (e) {
        //console.log(e)
        return js
      }
    }

    return _.isObject(data) ?
      Object.keys(data).reduce(
        (r, k) =>
        Object.assign(r, {
          [k]: this.executeFunctions(data[k])
        }), {}
      ) :
      evaluate(data)
  },

  applyHelpers(data) {
    // Repeat "identifier{a..b}"
    let expandedData = this.executeGenerators(data)
    // Execute faker {{name.lastname}} etc
    expandedData = this.executeFaker(expandedData)
    // Exec function
    expandedData = this.executeFunctions(expandedData)
    return expandedData
  },

  // createInstance(model, object){
  //   return new Promise((resolve,reject)=>{
  //     model.create(object).then(resolve).catch(reject)
  //   })
  // },

  async loadYamlFixture(models, fixtureData) {
    fixtureData = _.map(fixtureData, (data, index) => ({
      fixtures: data,
      name: index
    }))

    for (const modelData of fixtureData) {

      console.log(`Running '${modelData.name}' model`)
      modelData.fixtures = this.applyHelpers(modelData.fixtures)
      const modelFixtures = _.map(modelData.fixtures, (data, index) => ({
        object: data,
        identifier: index
      }))

      for (const fixture of modelFixtures) {
        try {
          const object = this.replaceReferenceInObjects(fixture.object)
          const savedObject = await models[modelData.name].create(object)
          this.savedData[fixture.identifier] = savedObject

          console.log(
            `[${modelData.name}] - ${fixture.identifier} ` +
            `imported (id : ${savedObject != null ? savedObject[idKey] : undefined})`
          )

        } catch (e) {
          console.log(`create ${modelData.name} failed`, e)
        }

      }
    }
  }
}