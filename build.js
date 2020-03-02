const minify = require('metalsmith-html-minifier')
const sharp = require('metalsmith-sharp')

const app = require('./metalsmith')

app
  .use(
    // resize and sharpen images
    sharp({
      src: 'img/*.jpg',
      methods: [
        {
          name: 'resize',
          args: [800, null], // default filter is lanczos
        },
        {
          name: 'sharpen',
          args: [1, 1, 0.5],
        },
        {
          name: 'jpeg',
          args: {
            quality: 40,
          },
        },
      ],
    })
  )
  .use(minify())
  .build(function(err) {
    if (err) throw err
  })
