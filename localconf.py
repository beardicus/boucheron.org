#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Brian Boucheron'
SITENAME = u'Brian Boucheron'
SITEURL = 'http://localhost:8000'

PATH = 'content'
ARTICLE_PATHS = ['articles']
THEME = 'theme'

TIMEZONE = 'America/New_York'
DEFAULT_LANG = u'en'
TYPOGRIFY = True
SLUGIFY_SOURCE = 'title'

INDEX_SAVE_AS = 'index.html'
TAGS_SAVE_AS = 'tags.html'
ARCHIVES_SAVE_AS = 'archive.html'
YEAR_ARCHIVE_SAVE_AS = '{date:%Y}/index.html'
MONTH_ARCHIVE_SAVE_AS = '{date:%Y}/{date:%m}/index.html'
AUTHORS_SAVE_AS = ''
AUTHOR_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''
CATEGORY_SAVE_AS = ''


DIRECT_TEMPLATES = ('index', 'tags', 'archives')

DEFAULT_PAGINATION = 5
DEFAULT_ORPHANS = 1

PAGINATED_DIRECT_TEMPLATES = ('index',)
PAGINATION_PATTERNS = (
    (1, '{base_name}/', '{base_name}/index.html'),
    (2, '{base_name}/{number}', '{base_name}/{number}.html'),
)

ARTICLE_URL = '{date:%Y}/{date:%m}/{slug}'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{slug}.html'

PAGE_URL = '{slug}'
PAGE_SAVE_AS = '{slug}.html'

TAG_URL = 'tag/{slug}'
TAG_SAVE_AS = 'tag/{slug}.html'

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
