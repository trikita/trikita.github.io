#!/bin/bash

KNORK_README=/home/serge/src/trikita/knork/README.md
CHAIN_README=/home/serge/src/trikita/chain/README.md

cd gen && npm install &&

cd ../knork && node ../gen/build.js $KNORK_README index.tmpl &&
cd ../chain && node ../gen/build.js $CHAIN_README index.tmpl
