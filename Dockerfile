# Stage 0, Node.js for Angular
FROM node:8.6 as node
WORKDIR /app
COPY ./app/package.json /app/
RUN npm install
COPY ./app/ /app/
ARG APP_ENV=dev
RUN if [ ${APP_ENV} = prod ]; then \
    npm run build-prod \
;else \
    npm run build \
;fi

EXPOSE 8080

CMD [ "npm", "start" ]