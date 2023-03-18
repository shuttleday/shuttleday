# Deployment

**UNDER CONSTRUCTION**

## Cloud Deployment

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
