pipeline {

    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        ENV_VARS     = credentials('shuttleday-env-file')
    }

    stages {
        stage("SonarQube Analysis") {
            agent any
            steps {
              withSonarQubeEnv('My SonarQube Server') {
                echo "Running analysis"
              }
            }
          }

        stage("Quality Gate") {
            steps {
                timeout(time: 30, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
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
                    sh 'sudo docker compose --env-file $ENV_VARS up --build -d'
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