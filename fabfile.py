from fabric.api import *


def clean():
    local('rm -rf ./deploy')

def gen():
    clean()
    local('hyde gen')

def serve():
    gen()
    local('hyde serve')

def publish():
    clean()
    local('hyde gen -c site-production.yaml')
    local('yui-compressor ./deploy/brian/media/js/plugins.js -o ./deploy/brian/media/js/plugins.js')
    local('for file in $(find ./deploy -type f -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.xml"); do zopfli --i100 $file; touch -c --reference=$file $file.gz; done')
    local('rsync -r --delete --progress ./deploy/ bert@bean:/home/bert/public/boucheron.org/')

def slurp():
    from datetime import datetime
    from glob import glob
    from iptcinfo import IPTCInfo
    import os

    stamp = datetime.now()
    imagepath = '/home/bert/Projects/boucheron.org/images/'
    staticpath = '/home/bert/Projects/boucheron.org/content/brian/media/static/'
    blogpath = '/home/bert/Projects/boucheron.org/content/brian/{}/{}/'.format(stamp.year, stamp.month)

    files = glob('/home/bert/Dropbox/Transfer/Draft/*.jpg')

    blogdir = os.path.dirname(blogpath)
    if not os.path.exists(blogdir):
        os.makedirs(blogdir)

    targetfile = open(blogpath + "draft.html", 'w')

    targetfile.write("""---
title: 
created: !!timestamp '{}'
tags: []
---


""".format(str(stamp).split('.')[0]))

    for index, jpg in enumerate(files):
        title = IPTCInfo(jpg).data['object name']
        newname = stamp.strftime('%Y%m%d-') + str(index) + '.jpg'
       
        # move jpgs to originals storage
        os.rename(jpg, imagepath + newname)
        
        # resize and crush originals to media dir
        local('convert -resize "800>" -strip -interlace Plane -quality 90% -filter Lanczos -unsharp 0.5x0.5+2+0.005 {} {}'.format(imagepath + newname, staticpath + newname))
        local('jpgcrush ' + staticpath + newname)

        # add image markdown to the draft
        markdown = '![{}](/brian/media/static/{})\n\n'
        targetfile.write(markdown.format(title, newname))

    targetfile.close()
    local('gvim ' + blogdir + 'draft.html')
