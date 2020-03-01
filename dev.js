var debug = require('metalsmith-debug')
var browserSync = require('metalsmith-browser-sync')

var app = require('./metalsmith')

app
  .metadata({ dev: true, ...app.metadata() })
  .use(
    browserSync({
      files: ['source/**/*.md', 'source/css/*.css', 'templates/*.njk'],
      server: {
        baseDir: 'build',
        serveStaticOptions: {
          extensions: ['html', 'xml'],
        },
      },
    })
  )
  .use(debug())
  .build(function(err) {
    if (err) throw err
  })
