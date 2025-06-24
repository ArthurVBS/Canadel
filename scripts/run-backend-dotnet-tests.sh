#!/bin/bash

set -e
cd backend-dotnet
dotnet restore
dotnet build --no-restore
dotnet test --no-build --verbosity normal
