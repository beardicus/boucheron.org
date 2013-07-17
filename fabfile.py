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
    local('rsync -r ./deploy/ bert@bean:/home/bert/public/boucheron.org/')
