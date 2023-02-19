FROM docker.io/library/node:19-alpine

# setup directory for app
WORKDIR /app

# split COPY into two parts to take advantage of layering system
# builder will use cache if there are no changes in dependencies
COPY package.json pnpm-lock.yaml ./

# install pnpm
RUN npm install -g pnpm

# set production env var for pnpm
# makes pnpm only install deps, not devDeps
ENV NODE_ENV=production

# install deps
RUN pnpm i

COPY . .

CMD node ./dist/index.js