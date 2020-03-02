const retext = require('retext')
const visit = require(`unist-util-visit`)
const smartypants = require('retext-smartypants')

// runs smartypants over all text nodes
module.exports = function plugin(options) {
  return tree => {
    visit(tree, `text`, node => {
      const processedText = String(
        retext()
          .use(smartypants, options)
          .processSync(node.value)
      )
      node.value = processedText
    })
  }
}
