# Select base image
FROM node:16-alpine3.13

# Image maintainer info
LABEL maintainer="David Rose-Franklin"

# Create app directory
WORKDIR /app

# Install app dependencies
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Install postgresql client and TypeScript
RUN apk add --update --no-cache postgresql-client && \
    npm install && \
    npm install typescript -g

# If DEV=true, install dev dependencies
ARG DEV=false
RUN if [ $DEV = "true" ]; \
        then npm install --only=dev ; \
    fi

# Bundle app source
COPY . .

# TypeScript compile
RUN tsc

# Bind the port that the app listens on
EXPOSE 8080

# Add user in image (Best Practice to not use root user)
# Don't create home or password and specify name "node-user"
RUN adduser \
        --disabled-password \
        --no-create-home \
        node-user

# Switch to new user
USER node-user

# Define the command to run the app
CMD [ "node", "dist/app.js" ]