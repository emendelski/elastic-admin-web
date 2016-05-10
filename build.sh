#!/bin/sh

set -e

rm -rf public tmp
npm install
npm run bower -- --allow-root install
npm run gulp -- profile-inject
npm run gulp -- build
git checkout src/config/appInject.js
git add -f index.html lib public
version="$(cat package.json | grep version | awk -F\" '{print $4}')"
git commit -s -m "build ${version}"
