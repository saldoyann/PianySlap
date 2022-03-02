#!/bin/bash

git pull
sudo docker build -t pianyslap -f Dockerfile .
sudo docker-compose up -d