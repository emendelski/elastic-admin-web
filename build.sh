#!/bin/sh

set -e

rm -rf public tmp
npm install
bower install
gulp profile-inject
gulp build
git checkout src/config/appInject.js
git add -f index.html lib public
version="$(cat package.json | grep version | awk -F\" '{print $4}')"
git commit -s -m "build ${version}"
