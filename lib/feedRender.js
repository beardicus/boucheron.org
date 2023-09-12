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

export default function renderFeed(input) {
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
