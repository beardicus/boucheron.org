#/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

import os
import sys
sys.path.append(os.curdir)
from localconf import *

SITEURL = 'http://boucheron.org/brian'
RELATIVE_URLS = False

ARTICLE_URL = '{date:%Y}/{date:%m}/{slug}'
PAGE_URL = '{slug}'
TAG_URL = 'tag/{slug}'


FEED_ALL_ATOM = 'feed.xml'

DELETE_OUTPUT_DIRECTORY = True

GOOGLE_ANALYTICS = "UA-604905-1"
