pipeline {

    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        ENV_VARS     = credentials('shuttleday-env-file')
        AT_SECRET = credentials('ACCESS_TOKEN_SECRET')
        RT_SECRET = credentials('REFRESH_TOKEN_SECRET')
    }

    stages {
        stage("Install Dev Deps") {
            when { anyOf { changeset "bdlist-backend/**/*"; changeset "Jenkinsfile"} } 
            steps {
                dir("bdlist-backend/") {
                    sh 'pnpm i'
                }
            }
        }
        stage("Jest Unit Test") {
            when { anyOf { changeset "bdlist-backend/**/*"; changeset "Jenkinsfile"} }
            steps {
                dir("bdlist-backend/") {
                    sh 'docker compose -f src/seedDb/docker-compose.yml up -d --build'
                    sh 'ACCESS_TOKEN_SECRET=$AT_SECRET REFRESH_TOKEN_SECRET=$RT_SECRET pnpm ci:test'
                }
            }
        }
        stage("SonarQube Analysis") {
            steps {
                script {
                    def scannerHome = tool 'sonarqube';
                    withSonarQubeEnv() {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
          }

        stage ("Build Backend") {
            when { anyOf { changeset "bdlist-backend/**/*"; changeset "Jenkinsfile"} }
            steps {
                dir("bdlist-backend/") {
                    sh 'pnpm build'
                }
            }
        }
          
        stage("Build and deploy") {
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

    post {
        always {
            dir('bdlist-backend/') {
                sh 'docker compose -f src/seedDb/docker-compose.yml down'
            }
        }
        cleanup {
            // remove old builds
            sh 'docker system prune'
            sh 'docker volume prune -f'
        }
    }
}