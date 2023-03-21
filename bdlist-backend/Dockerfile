FROM docker.io/library/node:18-alpine

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

# give user write access for pnpm install
RUN chown nonroot /usr/local/lib/node_modules/
RUN chown nonroot /usr/local/bin/

USER nonroot

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

COPY dist/ ./dist/

CMD node ./dist/index.js