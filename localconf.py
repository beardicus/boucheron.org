#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Brian Boucheron'
SITENAME = u'Brian Boucheron'
SITEURL = ''

PATH = 'content'
THEME = 'theme'

TIMEZONE = 'America/New_York'
DEFAULT_LANG = u'en'

DEFAULT_PAGINATION = 5
DEFAULT_ORPHANS = 1
TYPOGRIFY = True

ARTICLE_PATHS = ['articles']

SLUGIFY_SOURCE = 'title'
ARTICLE_URL = '{date:%Y}/{date:%m}/{slug}'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{slug}.html'
PAGE_URL = '{slug}'
PAGE_SAVE_AS = '{slug}.html'
INDEX_SAVE_AS = 'index.html'
ARCHIVES_SAVE_AS = 'archive.html'

PAGINATION_PATTERNS = (
    (1, '{base_name}/', '{base_name}/index.html'),
    (2, '{base_name}/{number}', '{base_name}/{number}.html'),
)

YEAR_ARCHIVE_SAVE_AS = '{date:%Y}/index.html'
MONTH_ARCHIVE_SAVE_AS = '{date:%Y}/{date:%m}/index.html'

# Turn off some pages we don't need
AUTHOR_SAVE_AS = ''
AUTHORS_SAVE_AS = ''
TAG_SAVE_AS = ''
TAGS_SAVE_AS = ''
CATEGORY_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''
FEED_ALL_ATOM = ''
CATEGORY_FEED_ATOM = ''
AUTHOR_FEED_ATOM = ''
AUTHOR_FEED_RSS = ''

# Disable feed generation during development
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

# Use document-relative URLs during development
RELATIVE_URLS = True
