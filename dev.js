const debug = require('metalsmith-debug')
const sync = require('metalsmith-browser-sync')

const app = require('./metalsmith')

app
  .metadata({ dev: true, ...app.metadata() })
  .use(
    sync({
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
  .build((err) => {
    if (err) throw err
  })
