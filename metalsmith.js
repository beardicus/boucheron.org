var metalsmith = require('metalsmith')
var markdown = require('metalsmith-markdownit')
var layouts = require('metalsmith-layouts')
var collections = require('metalsmith-collections')
var concat = require('metalsmith-concat')
var cleanCSS = require('metalsmith-clean-css')
var metallic = require('metalsmith-metallic')
var fingerprint = require('metalsmith-fingerprint')
var ignore = require('metalsmith-ignore')
var feed = require('metalsmith-feed-atom')
var prefix = require('metalsmith-prefix')

// handle permalinks as TBL commands <https://www.w3.org/Provider/Style/URI>
var permalinks = require('./lib/permalinks')

// fix some nunjucks configuration that can't be passed through metalsmith
var consolidate = require('consolidate')
var nunjucks = require('nunjucks')
consolidate.requires.nunjucks = nunjucks.configure('templates')
consolidate.requires.nunjucks.addFilter('date', require('nunjucks-date'))

// do the thing
var app = metalsmith(__dirname)
  .metadata({
    title: 'Brian Boucheron',
    url: 'https://boucheron.org/brian',
    author: 'Brian Boucheron',
    description: 'Occasional writing about stuff and also things'
  })
  .source('./source')
  .destination('./build/brian')
  .clean(false)
  .use(
    // syntax highlighting
    metallic()
  )
  .use(
    // markdown rendering
    markdown({
      typographer: true,
      html: true
    })
  )
  .use(
    // this prefixes all image tags in a post
    prefix({
      prefix: 'brian/img',
      selector: 'img'
    })
  )
  .use(
    // gather posts into a collection
    // needs to go before permalinks() because it blindly overwrites .path
    collections({
      posts: {
        pattern: '_posts/*.html',
        sortBy: 'date',
        reverse: true
      }
    })
  )
  .use(
    // create custom permalink scheme for all posts
    permalinks({
      pattern: '_posts/*.html'
    })
  )
  .use(
    // create an atom feed of all posts at feed.xml
    feed({
      collection: 'posts',
      destination: 'feed.xml',
      limit: 100,
      metadata: {
        title: 'Brian Boucheron',
        author: 'Brian Boucheron',
        url: 'https://boucheron.org/brian/'
      }
    })
  )
  .use(
    cleanCSS({
      files: 'css/*.css'
    })
  )
  .use(
    concat({
      files: 'css/*.css',
      output: 'css/build.css'
    })
  )
  .use(
    fingerprint({
      pattern: 'css/build.css'
    })
  )
  .use(ignore(['css/build.css']))
  .use(
    // render content into nunjucks templates
    layouts({
      pattern: '**/*.html',
      engine: 'nunjucks',
      directory: 'templates',
      default: 'post.njk'
    })
  )
  .use(
    prefix({
      prefix: 'brian',
      selector: 'a, link, script'
    })
  )

module.exports = app
