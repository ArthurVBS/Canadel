FROM node:18 AS build

WORKDIR /app

COPY . .

RUN yarn install && yarn build

FROM node:18

WORKDIR /app

COPY --from=build /app .

RUN yarn global add serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
