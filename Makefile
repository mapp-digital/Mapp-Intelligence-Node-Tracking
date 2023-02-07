#!/usr/bin/make

USER_ID := $(shell id -u)
GROUP_ID := $(shell id -g)

export USER_ID
export GROUP_ID

shop:
	bash -c "docker-compose build shop && docker-compose up shop"

shop-cron-fail:
	docker exec webtrekk-node_shop_1 /bin/bash -c "/app/example/node_modules/.bin/mapp-intelligence-node -i 111111111111111 -d q3.webtrekk.net -f /app/example/log/ --debug"

shop-cron-success:
	docker exec webtrekk-node_shop_1 /bin/bash -c "/app/example/node_modules/.bin/mapp-intelligence-node -i 123451234512345 -d q3.webtrekk.net -f /app/example/log/ --debug"

shop-log:
	docker exec -it -w /app/example/log/ webtrekk-node_shop_1 bash

shop-ssh:
	docker exec -it webtrekk-node_shop_1 bash

start:
	CONTAINER_VERSION="$(CONTAINER_VERSION)" bash -c "docker-compose build && docker-compose run node && docker-compose down --volumes"

build:
	make start TYPE="build" CONTAINER_VERSION="14.17.3"

release:
	make start TYPE="release" CONTAINER_VERSION="14.17.3"

test-all:
	make test-node10 && make test-node11 && make test-node12 && make test-node13 && make test-node14 && make test-node15 && make test-node16

test-latest:
	make start TYPE="test" CONTAINER_VERSION="latest"

test-node10:
	make start TYPE="test" CONTAINER_VERSION="10.24.1"

test-node11:
	make start TYPE="test" CONTAINER_VERSION="11.15.0"

test-node12:
	make start TYPE="test" CONTAINER_VERSION="12.22.3"

test-node13:
	make start TYPE="test" CONTAINER_VERSION="13.14.0"

test-node14:
	make start TYPE="test" CONTAINER_VERSION="14.17.3"

test-node15:
	make start TYPE="test" CONTAINER_VERSION="15.14.0"

test-node16:
	make start TYPE="test" CONTAINER_VERSION="16.5.0"

.PHONY: test-all
