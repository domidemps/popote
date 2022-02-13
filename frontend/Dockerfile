FROM node:14-bullseye

WORKDIR /code

COPY ./package.json /code/package.json
COPY ./webpack.config.js /code/webpack.config.js

RUN [ "yarn" ]

COPY ./frontend /code/frontend
COPY ./jsconfig.json /code/jsconfig.json
COPY ./babel.config.js /code/babel.config.js

CMD [ "yarn", "front:dev" ]
