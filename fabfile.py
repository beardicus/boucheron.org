from fabric.api import *


def clean():
    local('rm -rf ./deploy')

def test():
    clean()
    local('hyde gen')
    local('hyde serve &')
    local('google-chrome http://localhost:8080')

def publish():
    clean()
    local('hyde gen -c site-production.yaml')
    local('hyde publish -p github -c site-production.yaml')
