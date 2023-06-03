FROM node:16-alpine3.13

LABEL maintainer="David Rose-Franklin"

WORKDIR /app

EXPOSE 8080

COPY . .

ARG DEV=false
RUN npm install --only=prod && \
    if [ $DEV = "true" ]; \
    then  \
        npm install --only=dev && \
        echo "DATABASE_URL=postgres://admin:admin@db:5432/mydatabase" > .env; \
    else \
        npm run build; \
    fi && \
    adduser \
        --disabled-password \
        --no-create-home \
        node-user

USER node-user

CMD if [ $DEV = "true" ]; \
    then \
        npm run dev; \
    else \
        npm run build && npm run start; \
    fi