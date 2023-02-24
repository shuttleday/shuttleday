<div align='center'>

## shuttleday.info

<p>
  <img src="docs/shuttlecock.webp" width=300>
</p>
<p>
  <a href="https://github.com/PScoriae/PCPartsTool/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/license-WTFPL-brightgreen">
  </a>
</p>
<a href="https://jenkins.pierreccesario.com/job/Shuttleday/">
        <img src="https://jenkins.pierreccesario.com/buildStatus/icon?job=Shuttleday">
</a>
<a href="https://sonarqube.pierreccesario.com/dashboard?id=shuttleday_shuttleday_AYaC1XqOjJNBmqHJy_6N">
    <img src="https://sonarqube.pierreccesario.com/api/project_badges/measure?project=shuttleday_shuttleday_AYaC1XqOjJNBmqHJy_6N&metric=alert_status&token=sqb_9aeb7c71da525241c292560b8787ce67ff1a529c">
</a>
<a href="https://sonarqube.pierreccesario.com/dashboard?id=shuttleday_shuttleday_AYaC1XqOjJNBmqHJy_6N">
    <img src="https://sonarqube.pierreccesario.com/api/project_badges/measure?project=shuttleday_shuttleday_AYaC1XqOjJNBmqHJy_6N&metric=security_rating&token=sqb_9aeb7c71da525241c292560b8787ce67ff1a529c">
</a>
<a href="https://sonarqube.pierreccesario.com/dashboard?id=shuttleday_shuttleday_AYaC1XqOjJNBmqHJy_6N">
    <img src="https://sonarqube.pierreccesario.com/api/project_badges/measure?project=shuttleday_shuttleday_AYaC1XqOjJNBmqHJy_6N&metric=sqale_rating&token=sqb_9aeb7c71da525241c292560b8787ce67ff1a529c">
</a>
<a href="https://sonarqube.pierreccesario.com/dashboard?id=shuttleday_shuttleday_AYaC1XqOjJNBmqHJy_6N">
    <img src="https://sonarqube.pierreccesario.com/api/project_badges/measure?project=shuttleday_shuttleday_AYaC1XqOjJNBmqHJy_6N&metric=reliability_rating&token=sqb_9aeb7c71da525241c292560b8787ce67ff1a529c">
</a>

</div>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
      <ol>
        <li><a href="#features">Features</a></li>
        <li><a href="#cloud-architecture">Cloud Architecture</a></li>
      </ol>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li>
      <a href="#developing">Developing</a>
    </li>
    <li>
      <a href="#testing">Testing</a>
    </li>
    <li>
      <a href="#building">Building</a>
    </li>
    <li>
      <a href="#deployment">Deployment</a>
      <ol>
        <li><a href="#cloud-deployment">Cloud Deployment</a></li>
        <li><a href="#local-deployment">Local Deployment</a></li>
      </ol>
    </li>
  </ol>
</details>
<hr/>

# About

## Background

[Pierre](https://pierreccesario.com) didn't like using a messaging app for organising badminton sessions. Fortunately he and [Jonathan](https://tjonathan.com) are developers.

## Tech Stack

|                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Infrastructure | <img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white"> <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">                                                                                                                                                                                                                                     |
| Deployment     | <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white"> <img src="https://img.shields.io/badge/Sonar%20cloud-F3702A?style=for-the-badge&logo=sonarcloud&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">                                                                                                                                                                                                                                     |
| Backend        | <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> </br> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"> |
| Frontend       | <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"><img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white"> </br> <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white">                                                                                                                        |

## Features

- Passwordless Authentication
- Badminton Session Creation and Participation
- Payment Receipt Upload and Retrieval
- Admin Tooling

# Prerequisites

**Note:** All commands will have to be run in their respective directories. In other words, `cd` into the backend/frontend folder before you run the included commands.

## Backend

There are some prerequisites before you can start working on the backend:

1. [Docker](https://docs.docker.com/get-docker/)
2. [Node and npm](https://nodejs.org/en/download/)

Consult their official websites for advice on how to install them on your system.

### Installation Steps

1. Fork or clone this repo locally.
2. In your desired project folder, run the following command in your terminal:

   ```bash
   git clone https://github.com/yourUsername/shuttleday
   ```

3. Add a `.env` file to the root directory of your project. You may refer to `.env.example` for the required values.
4. Ensure `pnpm` is installed globally on your dev system. If not, run the following command in your terminal:

   ```bash
   npm i -g pnpm
   ```

5. Finally, install all dependencies:
   ```bash
   pnpm i
   ```

## Frontend

**UNDER CONSTRUCTION**

# Developing

## Backend

Before you can develop, you'll need to get a Dockerized MongoDB instance running. Run the following command in your terminal:

```bash
sudo docker run -p 2600:27017 -v /your/database/path/here/:/data/db --name mongodb -d mongo
```

where the -v flag specifies the path of your MongoDB on your host system.

To start a development server using **ts-node** for hot reloads:

```bash
pnpm dev
```

## Frontend

**UNDER CONSTRUCTION**

# Building

## Backend

To transpile the app, run the following:

```bash
pnpm build
```

To create a Docker container, you may use the included Dockerfile:

```bash
docker build -t shuttleday .
```

## Frontend

**UNDER CONSTRUCTION**

# Deployment

## Cloud Deployment

**UNDER CONSTRUCTION**

This section talks about deploying the Dockerised app to a domain using Jenkins CI/CD and Ansible.

Since my infrastructure has two servers (a build server and a web server), the included Jenkinsfile, Docker Compose files and Ansible Playbooks are catered towards that. As such, these instructions are catered towards my infrastructure.

If other repositories are mentioned, refer to their READMEs on how to set up and use them.

1. Provision AWS and Cloudflare resources using [terraform-infra](https://github.com/PScoriae/terraform-infra)'s `.tf` files.
2. Configure AWS EC2 servers using [ansible-ec2](https://github.com/PScoriae/ansible-ec2)'s Playbooks.
3. Modify `ansible/inventory`'s target web server to the IP address of your own web server.
4. Setup a GitHub Webhook on your forked repository to point to your Jenkins instance.
5. Add a new Jenkins Pipeline job and point it to your forked repo with the following enabled:
   - Do not allow concurrent builds
   - GITScm polling
   - Pipeline Script from SCM
   - Repository URL should be whatever your forked repository's URL is
   - Branches to build: `*/main`
   - Additional Behaviours:
     - Polling ignores commits in certain paths: `README.md` in **Excluded regions**

If all was configured well, a new Docker Compose build should automatically be deployed from your CICD build server to your Web server after each push or merge to the `main` branch.

## Local Deployment

This section details how to locally deploy the Docker Compose on your own dev machine.

1. Run the build command to compile the source code, as detailed in the [Building](#building) section.
2. Run the following command in the root directory of this project:
   ```bash
   docker compose -f docker-compose.local.yml up -d --build
   ```
   What this command does is instruct `docker compose` to use the `docker-compose.local.yml` file and simultaneously build the shuttleday backend before composing and starting the MongoDB container, shuttleday backend and shuttleday web app itself.
