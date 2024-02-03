#!/bin/bash

docker build -t kitchen-ms .
docker run -p 3001:3001 kitchen-ms