FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY Canadel.sln ./
COPY Canadel/Canadel.csproj ./Canadel/
COPY Canadel.Tests/Canadel.Tests.csproj ./Canadel.Tests/

RUN dotnet restore Canadel.sln

COPY . .

RUN dotnet publish Canadel/Canadel.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 5000

ENTRYPOINT ["dotnet", "Canadel.dll"]
