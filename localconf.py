#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Brian Boucheron'
SITENAME = u'Brian Boucheron'
SITEURL = 'http://localhost:8000/brian'

PATH = 'content'
ARTICLE_PATHS = ['articles']
STATIC_PATHS = ['images', 'CNAME']
THEME = 'theme'

PLUGIN_PATHS = ['./pelican-plugins']
PLUGINS = ['neighbors']

OUTPUT_PATH = 'output/brian/'

TIMEZONE = 'America/New_York'
DEFAULT_LANG = u'en'
TYPOGRIFY = True
SLUGIFY_SOURCE = 'title'

ARCHIVES_SAVE_AS = ''
AUTHORS_SAVE_AS = ''
AUTHOR_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''
CATEGORY_SAVE_AS = ''
TAGS_SAVE_AS = ''
TAG_SAVE_AS = ''

DIRECT_TEMPLATES = ('index',)

INDEX_SAVE_AS = 'index.html'
YEAR_ARCHIVE_SAVE_AS = '{date:%Y}/index.html'
MONTH_ARCHIVE_SAVE_AS = '{date:%Y}/{date:%m}/index.html'

ARTICLE_URL = '{date:%Y}/{date:%m}/{slug}'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{slug}.html'

PAGE_URL = '{slug}'
PAGE_SAVE_AS = '{slug}.html'

SITEMAP = {'format': 'xml'}

# Disable feed generation during development
FEED_ATOM = None
FEED_RSS = None
FEED_ALL_ATOM = None
FEED_ALL_RSS = None
CATEGORY_FEED_ATOM = None
CATEGORY_FEED_RSS = None
TAG_FEED_ATOM = None
TAG_FEED_RSS = None
TRANSLATION_FEED_ATOM = None
TRANSLATION_FEED_RSS = None
