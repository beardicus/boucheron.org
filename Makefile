.DEFAULT_GOAL := help

dev: node_modules clean ## start a dev build and server
	export NODE_ENV=dev; node build.js
	bash dev.sh

build: node_modules clean ## do a full production build
	node build.js
	npx parcel build "site/*.html" "site/brian/**/*.html"
	cp -a site/apple-touch-icon.png site/robots.txt site/favicon* dist

clean: ## remove the build directories
	rm -rf site/brian dist

node_modules: package.json
	npm install
	touch node_modules

publish: ## push site to github for netlify to build
	git push origin

.PHONY: clean build dev publish help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' 'Makefile' | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
