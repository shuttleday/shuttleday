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
</br>
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

| Stack          | Technologies                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
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

# Read More

[BACKEND_DEV.md](./docs/BACKEND_DEV.md)

[FRONTEND_DEV.md](./docs/FRONTEND_DEV.md)

[DEPLOYMENT.md](./docs/DEPLOYMENT.md)
