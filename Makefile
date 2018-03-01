
dev: node_modules clean
	node dev.js

build: node_modules clean
	node build.js

clean:
	rm -rf build/brian

node_modules: package.json
	npm install

publish: build
	ghp-import -b bb-pages build
	git push origin bb-pages
	rsync -rh ./build/ ~/Sites/boucheron.org/ --exclude '*.gz'

.PHONY: clean build dev publish
