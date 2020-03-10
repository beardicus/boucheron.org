const debug = require('debug')('metalsmith-remark')
const multimatch = require('multimatch')

const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const html = require('rehype-stringify')
const highlight = require('remark-highlight.js')
const raw = require('rehype-raw')

const smartypants = require('./remark-smartypants')
const embed = require('./remark-embed')

module.exports = function plugin(opts) {
  return function(files, metalsmith, done) {
    setImmediate(done)
    Object.keys(files).forEach(function(file) {
      if (multimatch(file, opts.pattern).length) {
        debug('remarking file: %s', file)

        const source = String(files[file].contents)
        const result = unified()
          .use(markdown)
          .use(highlight)
          .use(smartypants)
          .use(embed)
          .use(remark2rehype, { allowDangerousHTML: true })
          .use(raw)
          .use(html)
          .processSync(source)

        files[file].contents = result.contents
        const data = files[file]
        delete files[file]
        files[file.replace('.md', '.html')] = data
      }
    })
  }
}
