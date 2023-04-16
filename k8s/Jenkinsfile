pipeline {

    agent any

    environment {
        ACCESS_TOKEN = credentials('GH_ACCESS_TOKEN')
    }

    parameters {
        string(name: 'DOCKERTAG', description: 'K8s manifest version number to point to.')
    }

    stages {
        stage("Update Deployment Manifest Image Version Number") {
            steps {
                dir("k8s/") {
                    sh("sed -i 's+ghcr.io/shuttleday/api.*+ghcr.io/shuttleday/api:${params.DOCKERTAG}+g' manifests/shuttleday-api.yaml")
                    sh("git checkout main")
                    sh("git pull")
                    sh("git add .")
                    sh("git commit -m 'cicd: update manifest to point to shuttleday/api:${params.DOCKERTAG}'")
                    sh("git push https://${ACCESS_TOKEN}@github.com/shuttleday/shuttleday.git")
                }
            }
        }
    }
}
