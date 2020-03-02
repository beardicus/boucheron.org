const debug = require('debug')('metalsmith-bb-embed')
const visit = require(`unist-util-visit`)

// turns [youtube:videoID] into an iframe embed
module.exports = function plugin(options) {
  return tree => {
    visit(tree, `linkReference`, (node, i, parent) => {
      if (node.identifier.match(/^youtube/)) {
        const regex = /^youtube\:\s*?(\w+)/
        const id = regex.exec(node.label)[1]
        node.type = 'html'
        node.value = `<iframe width="800" height="450" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      }
    })
  }
}
