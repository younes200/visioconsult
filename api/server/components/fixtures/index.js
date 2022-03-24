const fixtureLoader = require('./fixtures-loader')

module.exports = function(app, options) {
  options = Object.assign(
    {
      fixturePath: '/fixtures/data/',
      append: false,
      autoLoad: false
    },
    options
  )

  const loadFixtures = async function() {
    if (!options.append) {
        await fixtureLoader.purgeDatabase(app.models)
        console.log('Data purged')
    } 
    await fixtureLoader.loadFixtures(app.models, options.fixturePath)
    return
  }

  return (app.loadFixtures = () => loadFixtures())
}
