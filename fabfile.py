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
    local('for file in $(find ./deploy -type f -name "*.html" -o -name "*.css" -o -name "*.js"); do zopfli $file; touch -c --reference=$file $file.gz; done')
    local('rsync -r ./deploy/ bert@bean:/home/bert/public/boucheron.org/')
