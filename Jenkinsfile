pipeline {

    agent any

    tools {
        nodejs 'nodejs'
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
                    sh 'sudo docker compose up --build -d'
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