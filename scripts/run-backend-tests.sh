#!/bin/bash

set -e
cd backend
chmod +x ./gradlew
./gradlew test
