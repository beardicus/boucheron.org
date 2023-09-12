#!/bin/bash -e

# runs chokidar and parcel together to do the dev server thing

export NODE_ENV=dev

# run chokidar to rebuild when content or templates change
npx chokidar --silent \
  "obsidian-vault/Blog/+(Posts|Pages)/*.md" "templates/*.liquid" \
  -c "node build.js" \
  & PIDS[0]=$!

# run parcel to handle the dev server and do some bundling
# this will normal reload after chokidar rebuilds the html
# and hot-reload when any of the css files change
npx parcel serve \
  "site/*.html" "site/brian/**/*.html" \
  & PIDS[1]=$!

# kill both watchers on CTRL+C
trap "kill ${PIDS[*]}" SIGINT

wait
