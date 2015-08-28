from fabric.api import *
from livereload import Server, shell
import os
import shutil

env.output_path = 'output/brian'
env.deploy_path = 'output/'
env.deploy_branch = 'gh-pages'


def clean():
    """Remove generated files"""
    if os.path.isdir(env.output_path):
        shutil.rmtree(env.output_path)
        os.makedirs(env.output_path)


def build_html():
    """Build local version of site markup"""
    local('pelican -s localconf.py')


def build_css():
    """Build local version of site styles"""
    local('scss --sourcemap=file theme/scss/main.scss output/brian/theme/css/main.css')


def build():
    """Build local version of site"""
    build_html()
    build_css()


def rebuild():
    """`clean` then `build`"""
    clean()
    build()


def serve():
    """Serve site at http://localhost:8000/"""
    rebuild()
    server = Server()
    server.watch('content/*/*.md', build_html)
    server.watch('theme/templates/*.html', build_html)
    server.watch('theme/scss/*.scss', build_css)
    server.watch('theme/scss/base/*.scss', build_css)
    server.serve(root='output', port=8000, host='localhost', open_url_delay=0.1)


def prepublish():
    """Build production version of site"""
    clean()
    local('pelican -s publishconf.py')
    local('scss theme/scss/main.scss output/brian/theme/css/main.css')


def publish():
    """Build and push to output branch"""
    prepublish()
    local("ghp-import -b {deploy_branch} {deploy_path}".format(**env))
    local("git push origin {deploy_branch}".format(**env))
