pipeline {

    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {
        when { changeset "bdlist-backend/**/*"}
        stage ("Build Backend") {
            steps {
                sh 'cd bdlist-backend'
                sh 'pnpm i'
                sh 'pnpm build'
            }
        }
        stage("Docker Compose Up") {
            steps {
                sh 'sudo docker compose up'
            }
        }
        when { changeset "bdlist-frontend/**/*"}
        stage ("Build Frontend") {
            steps {
                sh 'echo hi'
            }
        }
    }
}