FROM node:10.15.1-stretch-slim

# install deps
ADD package.json /tmp/package.json
RUN cd /tmp && npm install

# Copy deps
RUN mkdir -p /opt/meproz && cp -a /tmp/node_modules /opt/meproz

# Setup workdir
WORKDIR /opt/meproz
COPY . /opt/meproz

# run
EXPOSE 3000
CMD ["npm", "run", "prod"]
