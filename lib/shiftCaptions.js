import { visit } from 'unist-util-visit'

// find p nodes that contain an image tag at [0] and a text node at [1]
// this means the text is butted up against the image and should be a caption.
// normal text would have a single line between and be in its own separate p
const test = (node) => {
  return (
    node.tagName === 'p' &&
    node.children[0]?.tagName === 'img' &&
    node.children[1]?.type === 'text'
  )
}

export default function plugin() {
  return (tree) => {
    visit(tree, test, (node) => {
      node.tagName = 'figure' // switch the p to figure

      node.children = [
        node.children[0],
        {
          type: 'element',
          tagName: 'figcaption',
          children: node.children.slice(1),
        },
      ]
    })
  }
}
