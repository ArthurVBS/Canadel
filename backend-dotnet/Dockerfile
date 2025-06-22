FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY *.sln ./
COPY *.csproj ./

RUN dotnet restore NewCanadel.sln

COPY . ./

RUN dotnet publish NewCanadel.sln -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 5000

ENTRYPOINT ["dotnet", "NewCanadel.dll"]
