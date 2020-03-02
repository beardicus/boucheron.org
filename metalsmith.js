var metalsmith = require('metalsmith')

// metalsmith plugins
var cleanCSS = require('metalsmith-clean-css')
var collections = require('metalsmith-collections')
var concat = require('metalsmith-concat')
var feed = require('metalsmith-feed-atom')
var fingerprint = require('metalsmith-fingerprint')
var ignore = require('metalsmith-ignore')
var layouts = require('metalsmith-layouts')
var prefix = require('metalsmith-prefix')

// local metalsmith plugins
var remark = require('./lib/remark')
var permalinks = require('./lib/permalinks')

// do the thing
var app = metalsmith(__dirname)
  .metadata({
    title: 'Brian Boucheron',
    url: 'https://boucheron.org/brian',
    author: 'Brian Boucheron',
    description: 'Occasional writing about stuff and also things',
  })
  .source('./source')
  .destination('./build/brian')
  .clean(false)

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
        pattern: '_posts/*.html',
        sortBy: 'date',
        reverse: true,
      },
    })
  )

  // create a custom permalink scheme for all posts
  .use(
    permalinks({
      pattern: '_posts/*.html',
    })
  )

  // create an atom feed of all posts at feed.xml
  .use(
    feed({
      collection: 'posts',
      destination: 'feed.xml',
      limit: 100,
      metadata: {
        title: 'Brian Boucheron',
        author: 'Brian Boucheron',
        url: 'https://boucheron.org/brian/',
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
  .use(
    fingerprint({
      pattern: 'css/build.css',
    })
  )
  .use(ignore(['css/build.css']))

  // render content into nunjucks templates
  .use(
    layouts({
      pattern: '**/*.html',
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

  // add /brian to relevant URLs
  .use(
    prefix({
      prefix: 'brian',
      selector: 'a, link, script, img',
    })
  )

module.exports = app
