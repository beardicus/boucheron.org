
dev: node_modules clean
	node dev.js

build: node_modules clean
	node build.js

clean:
	rm -rf build/brian

node_modules: package.json
	npm install

publish: build
	ghp-import -b gh-pages build

.PHONY: clean build dev publish
