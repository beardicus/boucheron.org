const metalsmith = require('metalsmith')

// metalsmith plugins
const cleanCSS = require('metalsmith-clean-css')
const collections = require('metalsmith-collections')
const concat = require('metalsmith-concat')
const feed = require('./lib/metalsmith-feed-atom')
const fingerprint = require('metalsmith-fingerprint')
const ignore = require('metalsmith-ignore')
const layouts = require('metalsmith-layouts')
const prefix = require('metalsmith-prefix')
const drafts = require('@metalsmith/drafts')

// local metalsmith plugins
const remark = require('./lib/metalsmith-remark')
const permalinks = require('./lib/metalsmith-permalinks')
const strip = require('./lib/metalsmith-strip')

// do the thing
const app = metalsmith(__dirname)
  .metadata({
    title: 'Brian Boucheron',
    url: 'https://boucheron.org/',
    author: 'Brian Boucheron',
    description: 'Occasional writing about stuff and also things',
  })
  .source('source')
  .ignore(['.DS_Store'])
  .destination('build')
  .clean(false)

  // yeet drafts but not in dev
  // this can't go in dev.js because it needs to be before collections
  .use(drafts(process.env.NODE_ENV === 'dev'))

  // custom markdown rendering pipeline
  .use(
    remark({
      pattern: '**/*.md',
    })
  )

  // this prefixes all image tags in a post
  .use(
    prefix({
      prefix: 'img',
      selector: 'img',
    })
  )

  // gather all posts into a `posts` collection. this needs to go before
  // permalinks because it overwrites `.path` info
  .use(
    collections({
      posts: {
        pattern: 'brian/_posts/*.html',
        sortBy: 'date',
        reverse: true,
      },
    })
  )

  // create a custom permalink scheme for all posts
  .use(
    permalinks({
      pattern: 'brian/_posts/*.html',
    })
  )

  .use(
    strip({
      pattern: '**/*.html',
    })
  )

  // create an atom feed of all posts at feed.xml
  .use(
    feed({
      collection: 'posts',
      destination: 'brian/feed.xml',
      limit: 100,
      metadata: {
        title: 'Brian Boucheron',
        author: {
          name: 'Brian Boucheron',
          uri: 'https://boucheron.org/brian',
          email: 'brian@boucheron.org',
        },
        url: 'https://boucheron.org/brian',
      },
    })
  )
  .use(
    cleanCSS({
      files: 'css/*.css',
    })
  )
  .use(
    concat({
      files: 'css/*.css',
      output: 'css/build.css',
    })
  )

  // fingerprint the css file for cache-busting then ignore the original
  .use(
    fingerprint({
      pattern: 'css/build.css',
    })
  )
  .use(ignore(['css/build.css']))

  // render content into nunjucks templates
  .use(
    layouts({
      pattern: 'brian/**/*.html',
      engine: 'nunjucks',
      engineOptions: {
        filters: {
          date: 'nunjucks-date',
        },
      },
      directory: 'templates',
      default: 'post.njk',
    })
  )

module.exports = app
