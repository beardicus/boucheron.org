from fabric.api import *


def clean():
    local('rm -rf ./deploy')

def gen():
    clean()
    local('hyde gen')

def test():
    gen()
    local('hyde serve')

def publish():
    clean()
    local('hyde gen -c site-production.yaml')
    local('hyde publish -p github -c site-production.yaml')
