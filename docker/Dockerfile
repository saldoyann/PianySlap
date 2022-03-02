FROM node:17-alpine3.14
RUN apk add --no-cache python2 g++ make
WORKDIR /pianyslap
COPY . .
RUN npm install
CMD ["npm", "run", "prod"]
