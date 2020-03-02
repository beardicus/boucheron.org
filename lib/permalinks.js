const debug = require('debug')('metalsmith-bb-permalinks')
const multimatch = require('multimatch')
const moment = require('moment')
const path = require('path')

// creates year/month/title permalinks w/ '.html' removed
module.exports = function plugin(options) {
  return function(files, metalsmith, done) {
    setImmediate(done)
    Object.keys(files).forEach(file => {
      if (multimatch(file, options.pattern).length) {
        debug('updating path for file: %s', file)

        const post = files[file]
        const dateDirs = moment(post.date).format('YYYY/MM')
        const filePath = dateDirs + '/' + path.basename(file, '.html')
        post.path = '/' + filePath

        debug('new permalink is: %s', post.path)

        delete files[file]
        files[filePath + '.html'] = post
      }
    })
  }
}
