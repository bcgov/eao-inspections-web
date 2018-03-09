#!make
include .env
export $(shell sed 's/=.*//' .env)

APP_ENV = dev

local:  | build run-local

deploy:	| build push

new-app : | build push create-app expose

prod:
	$(eval APP_ENV := $(shell echo prod))

dev:
	$(eval APP_ENV := $(shell echo dev))

build:
	@echo "+\n++ Performing build of Docker images...\n+"
	@echo $(APP_ENV)
	@docker build -t $(PROJECT)-$(APP_ENV) . --build-arg APP_ENV=$(APP_ENV)
	@docker tag $(PROJECT)-$(APP_ENV):latest $(REPO)/$(PROJECT)/$(PROJECT)-$(APP_ENV):latest

push:
	@echo "+\n++ Pushing images to Dockerhub...\n+"
	@docker login registry.starter-us-west-2.openshift.com -u $$(oc whoami) -p $$(oc whoami -t)
	@docker push $(REPO)/$(PROJECT)/$(PROJECT)-$(APP_ENV):latest

create-app:
	@echo "+\n++ Creating new application\n+"
	@oc new-app $(PROJECT)-$(APP_ENV) --name=$(PROJECT)-$(APP_ENV) 

expose:
	@echo "+\n++ Exposing the created service\n+"
	@oc expose svc/$(PROJECT)-$(APP_ENV)
	
run-local:
	@echo "+\n++ Running locally\n+"
	@docker run -d -it --name $(PROJECT)-$(APP_ENV) -p $(PORT):$(PORT) $(PROJECT)-$(APP_ENV)

workspace:
	@docker exec -it $$(docker ps -q --filter name=$(PROJECT)-$(APP_ENV)) bash

close-local:
	@docker rm -f $$(docker ps -q --filter name=$(PROJECT)-$(APP_ENV))