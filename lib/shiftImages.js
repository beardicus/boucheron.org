import { visit } from 'unist-util-visit'

// prepends all markdown image urls with the obsidian attachments path
// so parcel can resolve them properly
export default function plugin() {
  return (tree) => {
    visit(tree, `image`, (node) => {
      node.url = '/obsidian-vault/Blog/Attachments/' + node.url
    })
  }
}
