FROM node:12.14-stretch

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN curl https://install.zenaton.com | sh

CMD ["./docker/start.sh"]
