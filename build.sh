#!/bin/sh

set -e

rm -rf dist
yarn
version="$(cat package.json | grep version | awk -F\" '{print $4}')"
VUE_APP_VERSION="${version}-$(date +%Y%m%d)" npm run build
git add -f dist
git commit -s -m "build ${version}"
rev="$(git subtree split --prefix dist)"
git push -f origin "${rev}:gh-pages-${version}"
git push -f origin "${rev}:gh-pages"
