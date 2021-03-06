.DEFAULT_GOAL := help

dev: node_modules clean ## start a dev server and lightweight build
	node dev.js

build: node_modules clean ## do a full build w/ image optimization
	node build.js

clean: ## remove the build directory
	rm -rf build

node_modules: package.json
	npm install
	touch node_modules

publish: ## push site to github for netlify to build
	git push origin

dat-publish: build ## build the site and sync to dat
	rsync -rh ./build/ ~/Sites/boucheron.org/ --exclude '*.gz'

.PHONY: clean build dev publish help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' 'Makefile' | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
