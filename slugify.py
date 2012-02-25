from hyde.plugin import Plugin
from django.template import defaultfilters

def slugify(value):
    return defaultfilters.slugify(value)

class SlugifyPlugin(Plugin):

    def template_loaded(self, template):
        template.env.filters['slugify'] = slugify
