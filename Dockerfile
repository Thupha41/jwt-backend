#prepare nodejs environment 21/alpine
FROM node:16.20.2-alpine

#Define directory in Docker
WORKDIR /jwt/backend

#Copy all file package.json in local and push into Docker
COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

#Copy all remains file in src code into working directory
COPY . .

RUN npm run build-src

# Finally, run the command
CMD [ "npm", "run", "build"]

#docker build --tag node-jwt-docker .
#docker run -p 8080:8080 -d node-jwt-docker