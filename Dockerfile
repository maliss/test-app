FROM node:12-alpine AS build
WORKDIR /test-ubisoft-app

COPY package.json ./
COPY package-lock.json ./
RUN ["npm", "install"]

COPY ./src ./src
COPY tsconfig.json ./
COPY angular.json ./
RUN npm install -g @angular/cli 
RUN ["ng", "build" , "--configuration=production"]

FROM nginx
WORKDIR /test-ubisoft-app

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /test-ubisoft-app/dist /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'