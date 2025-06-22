#!/bin/bash

set -e
cd backend-java
chmod +x ./gradlew
./gradlew test
