import { Liquid } from 'liquidjs'
import { URL } from 'url'

const engine = new Liquid({
  root: new URL('../templates/', import.meta.url).pathname,
  extname: '.liquid',
  jsTruthy: true,
})

export default function renderTemplates(data, template) {
  return engine.renderFileSync(template, data)
}
