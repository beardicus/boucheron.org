import { atom } from 'xast-util-feed'
import { toXml } from 'xast-util-to-xml'

const author = {
  name: 'Brian Boucheron',
  email: 'brian@boucheron.org',
  url: 'https://boucheron.org/brian',
}

const channel = {
  title: 'Brian Boucheron',
  url: 'https://boucheron.org/brian',
  feedUrl: 'https://boucheron.org/brian/feed.xml',
  lang: 'en',
  author,
}

export function atomFeed(input) {
  const data = input.map((item) => {
    const { title, path, content, date, tags } = item
    return {
      title,
      url: 'https://boucheron.org' + path,
      descriptionHtml: content,
      author,
      published: date,
      tags,
    }
  })

  return toXml(atom(channel, data))
}

export function jsonFeed(input) {
  const items = input.map((item) => {
    const { title, path, content, date, tags } = item
    const url = 'https://boucheron.org' + path
    return {
      title,
      id: url,
      url,
      content_html: content,
      date_published: date,
      tags,
    }
  })

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Brian Boucheron',
    icon: 'https://boucheron.org/android-chrome-512x512.png',
    favicon: 'https://boucheron.org/apple-touch-icon.png',
    home_page_url: 'https://boucheron.org/brian',
    feed_url: 'https://boucheron.org/brian/feed.json',
    authors: [
      {
        name: 'Brian Boucheron',
        url: 'https://boucheron.org/brian',
      },
    ],
    language: 'en-US',
    items,
  }

  return JSON.stringify(feed)
}
