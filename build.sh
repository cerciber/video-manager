#!/bin/bash

docker build -t github-api .
docker run -p 3000:3000 github-api