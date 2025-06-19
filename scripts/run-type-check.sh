#!/bin/bash

set -e
cd frontend
yarn install --frozen-lockfile
yarn type:check
