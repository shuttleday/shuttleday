pipeline {

    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {
        
        stage ("Build Backend") {
            when { changeset "bdlist-backend/"}
            steps {
                dir("bdlist-backend") {
                    sh 'pnpm i'
                    sh 'pnpm build'
                }
            }
        }
        stage("Docker Compose Up") {
            steps {
                sh 'sudo docker compose up'
            }
        }
        
        stage ("Build Frontend") {
            when { changeset "bdlist-frontend/"}
            steps {
                sh 'echo hi'
            }
        }
    }
}