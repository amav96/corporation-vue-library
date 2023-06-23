#!/bin/sh

set -e

echo 'Installing deps'
npm install --force

# ignorar error y levantar npm con
# docker-compose run --rm --service-ports npm_smart npm run watch