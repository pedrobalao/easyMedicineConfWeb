FROM node:latest

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}
EXPOSE ${PORT}

RUN npm install
RUN npm run build

CMD ["npm", "start"]
