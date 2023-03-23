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
        stage("Install Dependencies") {
            steps {
                dir("bdlist-backend/") {
                    sh 'pnpm i'
                }
            }
        }
        stage("Jest Unit Test") {
            steps {
                dir("bdlist-backend/") {
                    sh 'pnpm startTestDb'
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

        stage ("Transpile TypeScript to JavaScript") {
            steps {
                dir("bdlist-backend/") {
                    sh 'pnpm build'
                }
            }
        }
          
        stage("Build Docker Image and Deploy") {
            steps {
                dir("bdlist-backend/") {
                    sh 'sudo docker compose --env-file $ENV_VARS up --build -d'
                }
            }
        }
        
    }

    post {
        always {
            dir('bdlist-backend/') {
                sh 'pnpm stopTestDb'
            }
        }
        cleanup {
            // remove old builds
            sh 'docker system prune'
            sh 'docker volume prune -f'
        }
    }
}