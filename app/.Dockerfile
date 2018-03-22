# Stage 0, Node.js for Angular
FROM node:8.6 as node
ENV APP_ENV dev
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build-prod

EXPOSE 8080

CMD [ "npm", "start" ]
