import { globbySync } from 'globby'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { dirname } from 'node:path'
import { map, pick, pipe } from 'ramda'

import markdownRender from './lib/markdownRender.js'
import templateRender from './lib/templateRender.js'
import { atomFeed } from './lib/feedRender.js'

// TODO:
// generate tag index pages
// generate date index pages (maybe just redirect to home index?)

// look out below: pretending to understand functional programming
// the following functions are in order of execution

// returns a list of strings representing all file paths matching the pattern
const globbyPaths = (pattern) => globbySync(pattern)

// read the file at the specified path string
// returns a string with the content of the file
const readFile = (path) => readFileSync(path, { encoding: 'utf8' })

// takes a string of markdown and yaml and extracts the frontmatter
// returns an object with the frontmatter key/values plus `.content` which
// is the remainder of the markdown content
const parseFrontmatter = (file) => {
  const { content, data } = matter(file)
  return { content, ...data }
}

// takes an object with `.date` and `.slug` and calculates the permalink
// returns the whole object with the permalink added as `.path`
const addPermalink = (post) => {
  const slug = post.slug
  const year = format(post.date, 'yyyy')
  const month = format(post.date, 'MM')
  const path = `/brian/${year}/${month}/${slug}`

  return { ...post, path, filePath: path + '.html' }
}

// adds a default `.layout` key/value to all posts
const addLayout = (post) => {
  return { ...post, layout: 'post' }
}

// if `draft: true` is set in the frontmatter of a post
// filter out the post unless we're in dev mode
const removeDrafts = (posts) => {
  if (process.env.NODE_ENV === 'dev') return [...posts]
  return posts.filter((post) => post.draft !== true)
}

// sorts posts by date
const sortPosts = (posts) => [...posts].sort((a, b) => b.date - a.date)

// now that the posts are sorted, we pick the `.title` and permalink `.path`
// from previous and next posts and add them as `.next` and `.previous` objects
const addPrevNextLinks = (x) => {
  const keys = ['title', 'path']
  return x.map((y, i) => {
    if (x[i + 1]) y.next = pick(keys, x[i + 1])
    if (x[i - 1]) y.previous = pick(keys, x[i - 1])
    return y
  })
}

// now we can add a non-post page without messing up next/previous and sorting
// we add the homepage which has no content but renders the homepage template
// TODO: when we add tag index pages, remember to filter by `layout: post`
// to avoid including this and other nonsense. see `addFeed()` for an example
const addHomepage = (posts) => {
  return [
    ...posts,
    {
      filePath: '/brian/index.html',
      path: '/brian/',
      layout: 'homepage',
      title: 'Index',
      content: '',
      posts: [...posts],
    },
  ]
}

// takes an object with markdown `.content` and renders it to html
// returns the same object with `.content` as html
const renderMarkdown = (file) => ({
  ...file,
  content: markdownRender(file.content),
})

const addAtomFeed = (files) => {
  const feed = {
    filePath: '/brian/feed.xml',
    content: atomFeed(files.filter((file) => file.layout === 'post')),
  }
  return [...files, feed]
}

// takes an object with html `.content` and runs it through liquid templates
// returns the same object with `.content` rendered in templates
const renderTemplate = (file) => {
  const copy = { ...file }
  if (file.layout) copy.content = templateRender(file, file.layout)
  return copy
}

const writeFile = (file) => {
  mkdirSync('./site' + dirname(file.filePath), { recursive: true })
  writeFileSync('./site' + file.filePath, file.content)
  return file
}

pipe(
  globbyPaths,
  map(pipe(readFile, parseFrontmatter, addPermalink, addLayout)),
  removeDrafts,
  sortPosts,
  addPrevNextLinks,
  addHomepage,
  map(renderMarkdown),
  addAtomFeed, // markdown needs to be rendered, but not put into templates yet
  map(pipe(renderTemplate, writeFile)),
)('./obsidian-vault/Blog/Posts/*.md')
