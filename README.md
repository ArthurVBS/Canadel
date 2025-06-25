<h1 align="center">Canadel</h1>

<div align="center">
<img src="https://img.shields.io/badge/GitHub-000?style=social&logoColor=469BD2&logo=github">&nbsp;
<img src="https://img.shields.io/badge/Docker-000?style=social&logoColor=469BD2&logo=docker">&nbsp;
<img src="https://img.shields.io/badge/TypeScript-000?style=social&logoColor=469BD2&logo=typescript">&nbsp;
<img src="https://img.shields.io/badge/Vue-000?style=social&logoColor=469BD2&logo=vue.js">&nbsp;
<img src="https://img.shields.io/badge/Java-000?style=social&logoColor=469BD2&logo=openjdk">
<img src="https://img.shields.io/badge/Spring-000?style=social&logoColor=469BD2&logo=spring">&nbsp;
<img src="https://img.shields.io/badge/C%23-000?style=social&logoColor=469BD2&logo=c#">&nbsp;
<img src="https://img.shields.io/badge/.NET-000?style=social&logoColor=469BD2&logo=dotnet">&nbsp;
</div>

## ✨ About the project:

- 🪑 The project is a **Product Manager for Canadel.inc**.
- 🧪 The project has unit tests for backend and frontend and allow the developer see its coverage.
- 🧹 The project has linters for backend and frontend to validate the quality of the code and format it.
- 🐳 The project uses CI-CD to validate the Merge Requests with pipelines in the GitHub actions.
- 🧑‍💻 The project was two approaches:
  - Java 17 + Spring in the backend and Typescript + Vue 3 in the frontend.
  - C# + .NET 8 in the backend and Typescript + Vue 3 in the frontend.

## 💻 Project status:

- Finished project ✔️

## 🛠 Technologies:

- Backend:
  - Java Ecosystem
    - **Java**
    - **Spring**
    - **Gradlew**
    - Spotless
    - Lombok
    - H2 Database
    - Jacoco Reporter
  - C# Ecosystem
    - **C#**
    - **.NET**
    - Xunit
    - SQLite
- Frontend:
  - **TypeScript**
  - **Vue**
  - **Yarn**
  - Node
  - CSS
  - Vuetify
  - Vuex
  - Vite
  - Vitest
- General:
  - **Docker Compose**
  - Makefile

## 📝 Features:

- The application is a CRUD product manager:
  - Allow user create a product with name, description and its price.
  - Allow user read all products data: ID, name, description, price and createdAt.
  - Allow user read a specific product data based in its ID. (Backend endpoint only).
  - Allow user update a product by its ID with name, description and its price.
  - Allow user delete a product by its ID.
- The application validates the CRUD in both connection parts (frontend and backend).
  - Do not allow to create or to update with empty name, empty description or zero price.
  - Do not allow to read by id, to update by id or to delete by id using an invalid ID.
- The application is accessible for the most used screen sizes:
  - Allow user access the application by web.
  - Allow user access the application by mobile.
- The application stores the data in a database.
- The application holds the information in frontend using state.

## ⚙️ Prerequisites:

### 🏃‍♂️‍➡️ Run

- General:
  - Docker Compose
  - Makefile

### 🧑‍💻 Develop

- Backend:
  - Java Ecosystem
    - Java 17
    - Gradle 8
  - C# Ecosystem
    - C#
    - .NET 8
- Frontend:
  - Node 20
  - Yarn
- General:
  - Makefile
  - Docker Compose

## 🚀 How to run the application?

### 🏃‍♂️‍➡️ Run

- Download the ZIP or Clone the application on your machine;
  - Open one CMD terminal in the root of the project folder,
  - Run `make run-docker-compose-dotnet` or `make run-docker-compose-java`,
  - Access the application through `http://localhost:5173`.

### 💻 Develop

- Clone the application on your machine;
  - Open two CMD terminal in the root of the project folder,
  - The first terminal access one of the backend folders: ,
    - To use Java Ecosystem: `cd backend-java`
      - Install gradle modules: `./gradlew`,
      - Finally, start a localhost: `./gradlew bootRun`,
      - The available endpoint: `http://localhost:5000`.
    - To use C# Ecosystem: `cd backend-dotnet`
      - Install modules: `dotnet build`,
      - Finally, start a localhost: `dotnet run --project ./Canadel/Canadel.csproj`,
      - The available endpoint: `http://localhost:5000`.
  - The second terminal access the frontend folder: `cd frontend`,
    - Install node modules: `yarn`,
    - Finally, start a localhost: `yarn dev`,
    - The available endpoint: `http://localhost:5173`.
  - Access the application through `http://localhost:5173`.

## 🧪 How to run the tests?

### 🏃‍♂️‍➡️Just Run

- Backend:
  - Open the CMD terminal,
  - Access the backend folder,
    - To use Java Ecosystem: `cd backend-java`
      - Install gradle modules: `./gradlew`,
      - Finally run the tests: `./gradlew test`.
    - To use C# Ecosystem: `cd backend-dotnet`
      - Build project: `dotnet build`,
      - Finally run the tests: `dotnet test`.
- Frontend:
  - Open the CMD terminal,
  - Access the frontend folder: `cd frontend`,
  - Install node modules: `yarn`,
  - Finally, run the test: `yarn test`.

### 📊 Run with Coverage

- Backend
  - Open the CMD terminal,
  - Access the backend folder `cd backend`
    - To use Java Ecosystem: `cd backend-java`
      - Install gradle modules: `./gradlew`
      - Finally run the tests with coverage: `./gradlew test jacocoTestCoverageVerification`,
      - Open the `backend-java/build/reports/jacoco/test/html/index.html` file in browser.
    - To use C# Ecosystem: `cd backend-dotnet`
      - Build project: `dotnet build`,
      - Install globally the report generator tool: `dotnet tool install -g dotnet-reportgenerator-globaltool`
      - Run the tests with the coverage result: `dotnet test --collect:"XPlat Code Coverage"`
      - Convert the coverage to html: `reportgenerator -reports:"Canadel.Tests/TestResults/**/coverage.cobertura.xml" -targetdir:"coverage-report" -reporttypes:Html`
        - `or`
      - Convert the coverage to html: `reportgenerator.exe -reports:"Canadel.Tests\TestResults\**\coverage.cobertura.xml" -targetdir:"coverage-report" -reporttypes:Html`
      - Open the `backend-dotnet/coverage-report/index.html` file in browser.
- Frontend
  - Open the CMD terminal,
  - Access the frontend folder: `cd frontend`
  - Install node modules: `yarn`,
  - Run the test with coverage: `yarn test:coverage`,
  - Open the `frontend/coverage/index.html` file in browser.

<h2 align="center">👨🏽‍💻 Author</h2>

<div align="center">
<img width="100px;" src="https://avatars.githubusercontent.com/u/84406367?v=4" alt="Author's photo"/>
<br><span>Made by <a href="https://github.com/ArthurVBS" target="_blank" rel="external">Arthur V.B.S.</a>✌🏽</span>
</div>

<h6 align="center">Made with <a href="https://github.com/ArthurVBS/ReadmeGenerator" target="_blank" rel="external">ArthurVBS's Readme Generator</a></h6>
