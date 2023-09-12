import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeStringify from 'rehype-stringify'

import shiftImages from './shiftImages.js'
import shiftCaptions from './shiftCaptions.js'
import handleImages from './handleImages.js'

const pipeline = unified()
  // parse markdown
  .use(remarkParse)

  // manipulate the remark AST
  .use(remarkGfm)
  .use(remarkSmartypants)
  .use(shiftImages) // update image src urls to obsidian attachments

  // smoosh to the hast HTML AST, allowing any rando HTML we put in the markdown
  .use(remarkRehype, { allowDangerousHtml: true })

  // manipulate the hast AST
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
  .use(rehypePrismPlus)
  .use(shiftCaptions) // create <figure> tags and captions
  .use(handleImages) // create <picture> tags and responsive images

  // output, allowing the raw HTML from imageBuff.js to pass through unaltered
  .use(rehypeStringify, { allowDangerousHtml: true })

export default function markdownRender(input) {
  return String(pipeline.processSync(input))
}
