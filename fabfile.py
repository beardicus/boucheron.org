from fabric.api import *
import os
import shutil

env.deploy_path = 'output'
env.output_branch = 'output'


def clean():
    """Remove generated files"""
    if os.path.isdir(env.deploy_path):
        shutil.rmtree(env.deploy_path)
        os.makedirs(env.deploy_path)


def build():
    """Build local version of site"""
    local('pelican -s localconf.py')


def rebuild():
    """`clean` then `build`"""
    clean()
    build()


def serve():
    """Serve site at http://localhost:8000/"""
    os.chdir(env.deploy_path)
    local('python -m pelican.server')


def preview():
    """Build production version of site"""
    local('pelican -s publishconf.py')


def publish():
    """Build and push to output branch"""
    local('pelican -s publishconf.py')
    local("ghp-import -b {github_pages_branch} {deploy_path}".format(**env))
    local("git push origin {github_pages_branch}".format(**env))
