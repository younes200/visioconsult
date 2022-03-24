const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const beautify = require('js-beautify').js_beautify
const parse = require('./parse.js')

const apiTemplate = fs.readFileSync(path.join(__dirname, './template/api.hbs'), 'utf-8')
const methods = fs.readFileSync(path.join(__dirname, './template/methods.hbs'), 'utf-8')
const method = fs.readFileSync(path.join(__dirname, './template/method.hbs'), 'utf-8')

const apiMD = fs.readFileSync(path.join(__dirname, './template/api-md.hbs'), 'utf-8')
const methodMD = fs.readFileSync(path.join(__dirname, 'template/method-md.hbs'), 'utf-8')

Handlebars.registerPartial('methods', methods)
Handlebars.registerPartial('method', method)
Handlebars.registerPartial('methodMD', methodMD)

Handlebars.registerHelper('toLowerCase', function(word) {
  return word.toLowerCase()
})

Handlebars.registerHelper('toUpperCase', function(word) {
  return word.toUpperCase()
})

Handlebars.registerHelper('brackets', function(word) {
  return `{${word}}`
})

Handlebars.registerHelper('requireFilter', function(require) {
  return require ? 'required' : 'optional'
})

function codegen(data) {
  let template = Handlebars.compile(apiTemplate)(data)
  template = beautify(template, { indent_size: 2, max_preserve_newlines: -1 })
  return template
}

function mdgen(data) {
  let template = Handlebars.compile(apiMD)(data)
  return template
}

module.exports = function(opt) {
  let data = parse(opt)
  let codeResult = codegen(data)
  let docResult = mdgen(data)
  return { codeResult, docResult }
}
