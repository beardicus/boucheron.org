const debug = require('debug')('metalsmith-strip')
const multimatch = require('multimatch')

const regex = /^\/?(.*?)(index\.html|\.html)$/

// this strips .html or index.html off of every url
// and ensures the path starts with /

module.exports = function plugin(options) {
  return function(files, metalsmith, done) {
    setImmediate(done)
    Object.keys(files).forEach(file => {
      if (multimatch(file, options.pattern).length) {
        debug('stripping extension on: %s', files[file].path)

        const oldPath = files[file].path
        const newPath = '/' + regex.exec(oldPath)[1]

        files[file].path = newPath

        debug('new path is: %s', newPath)
      }
    })
  }
}
