pipeline {

    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        ENV_VARS     = credentials('shuttleday-env-file')
    }

    stages {
        
        stage ("Build Backend") {
            when { anyOf { changeset "bdlist-backend/**/*"; changeset "Jenkinsfile"} }
            steps {
                dir("bdlist-backend/") {
                    sh 'pnpm i'
                    sh 'pnpm build'
                }
            }
        }
        stage("Docker Compose Up") {
            when { anyOf { changeset "bdlist-backend/**/*"; changeset "Jenkinsfile"} }
            steps {
                dir("bdlist-backend/") {
                    sh 'sudo docker compose up --build --env-file $ENV_VARS -d'
                }
            }
        }
        
        stage ("Build Frontend") {
            when { anyOf { changeset "bdlist-frontend/**/*"; changeset "Jenkinsfile"} }
            steps {
                sh 'echo hi'
            }
        }
    }
}