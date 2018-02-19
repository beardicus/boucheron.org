var debug = require('debug')('permalinks')
var multimatch = require('multimatch')
var moment = require('moment')
var path = require('path')

module.exports = plugin

// creates year/month/title permalinks w/ '.html' removed

function plugin(opts) {
  return function(files, metalsmith, done) {
    setImmediate(done)
    Object.keys(files).forEach(function(file) {
      if (multimatch(file, opts.pattern).length) {
        debug('updating path for file: %s', file)

        var post = files[file]
        var dateDirs = moment(post.date).format('YYYY/MM')
        var filePath = dateDirs + '/' + path.basename(file, '.html')
        post.path = '/' + filePath

        debug('new permalink is: %s', post.path)

        delete files[file]
        files[filePath + '.html'] = post
      }
    })
  }
}
