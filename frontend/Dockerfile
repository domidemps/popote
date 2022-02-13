FROM node:14-bullseye as builder
WORKDIR /usr/src/app

COPY ./frontend /usr/src/app/frontend
COPY ./package.json /usr/src/app/package.json
COPY ./babel.config.js /usr/src/app/babel.config.js

RUN yarn
RUN echo $(ls -la /usr/src/app)
RUN yarn build
RUN echo $(ls -la /usr/src/app)


FROM nginx:1.13.12-alpine as production
COPY --from=builder /usr/src/app/frontend/static /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
