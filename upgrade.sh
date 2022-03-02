#!/bin/bash

git pull
sudo docker build -t pianyslap -f docker/Dockerfile .
sudo docker-compose -f docker/docker-compose.yml up -d