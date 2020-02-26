FROM node:10.13

COPY package.json /package.json
COPY package-lock.json /package-lock.json
COPY gulpfile.js /gulpfile.js
COPY webpack.config.js /webpack.config.js

# WORKDIR /

RUN npm install -g npm
RUN npm update npm
RUN npm install -g gulp gulp-cli
RUN npm install node-sass@4.13 --save-dev

RUN npm install --no-optional
