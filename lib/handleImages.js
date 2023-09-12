// some ideas yoinked from Soichiro Kashima's rehype-img-size:
// https://github.com/ksoichiro/rehype-img-size

import { visit } from 'unist-util-visit'
import sizeOf from 'image-size'

export default function plugin() {
  return (tree) => {
    visit(tree, `element`, (node) => {
      if (node.tagName === 'img') {
        const src = node.properties.src
        const alt = node.properties.alt || ''
        const dimensions = sizeOf('.' + src) || {}
        const width = 800
        const height = Math.round(
          (width / dimensions.width) * dimensions.height
        )

        // we have to use a raw node here, because rehype-stringify always
        // encodes the ampersands in the following query strings, thus breaking
        // parcel's image resizing transformations

        // TODO: we could add loading="lazy" to the <img> tag here if
        // we can count nodes somehow and only do it on the third+ image
        node.type = 'raw'
        node.value = `
          <picture>
            <source
              type="image/webp"
              srcset="${src}?as=webp&width=400 400w,
                      ${src}?as=webp&width=800 800w,
                      ${src}?as=webp&width=1600 1600w"
            >
            <source
              type="image/jpeg"
              srcset="${src}?as=jpeg&width=400 400w,
                      ${src}?as=jpeg&width=800 800w,
                      ${src}?as=jpeg&width=1600 1600w"
            >
            <img
              src="${src}?width=${width}&height=${height}"
              alt="${alt}"
              width="${width}"
              height="${height}"
            >
          </picture>
        `
      }
    })
  }
}
