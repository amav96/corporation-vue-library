#!/bin/bash

DOCKER_CONTAINER = corporation
DOCKER_DB = dbcenter

SPORT = --service-ports
DCOMPOSER = docker-compose

OS := $(shell uname)

help: ## Show this help message
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

run:
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down

restart:
	$(MAKE) stop && $(MAKE) run

bash:
	docker-compose exec ${DOCKER_CONTAINER} /bin/sh

dev:
	docker-compose run --rm --service-ports ${DOCKER_CONTAINER} npm run dev
