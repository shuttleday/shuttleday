# Installing the Shuttleday Backend

**Note:** All commands will have to be run in their respective directories. In other words, `cd` into the backend/frontend folder before you run the included commands.

There are some prerequisites before you can start working on the backend:

1. [Docker](https://docs.docker.com/get-docker/)
2. [Node and npm](https://nodejs.org/en/download/)

Consult their official websites for advice on how to install them on your system.

### Installation Steps

1. Fork or clone this repo locally.
2. Add a `.env` file to the root directory of your project. You may refer to `.env.example` for the required values.
3. Ensure `pnpm` is installed globally on your dev system. If not, run the following command in your terminal:

   ```bash
   npm i -g pnpm
   ```

4. Finally, install all dependencies:
   ```bash
   pnpm i
   ```

# Developing

Before you can develop, you'll need to get a Dockerized MongoDB instance running. Run the following command in your terminal:

```bash
sudo docker run -p 2600:27017 -v /your/database/path/here/:/data/db --name mongodb -d mongo
```

where the -v flag specifies the path of your MongoDB on your host system.

To start a development server using **ts-node** for hot reloads:

```bash
pnpm dev
```

# Building

To transpile the app, run the following:

```bash
pnpm build
```

To create a Docker container, you may use the included Dockerfile:

```bash
docker build -t shuttleday .
```

Optionally, you can also use `docker-compose.local.yml` as a template to create your own compose specification. This is good to simulate a live deployment on a server.

# Deployment

Refer to [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions.
