var sharp = require('metalsmith-sharp')
var htmlMinifier = require('metalsmith-html-minifier')
var brotli = require('metalsmith-brotli')
var compress = require('metalsmith-gzip')

var app = require('./metalsmith')

app
  .use(
    // resize and sharpen images
    sharp({
      src: 'img/*.jpg',
      methods: [
        {
          name: 'resize',
          args: [1600, null] // default filter is lanczos
        },
        {
          name: 'sharpen',
          args: [1, 1, 0.5]
        },
        {
          name: 'jpeg',
          args: {
            quality: 33
          }
        }
      ]
    })
  )
  .use(htmlMinifier())
  .use(
    brotli({
      brotli: {
        quality: 11
      }
    })
  )
  .use(
    compress({
      gzip: { level: 9 }
    })
  )
  .build(function(err) {
    if (err) throw err
  })
