pipeline {
    agent any
    environment{
        PATH = "${env.PATH}:/usr/local/bin"
    }
    triggers {
        cron('H * * * *') 
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'fingrow-jenkins-ci/cd', url: 'https://github.com/varun-everest/testing-fingrow.git'
            }
        }

        stage('Install the Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Tests and coverage') {
            steps {
                dir('frontend') {
                    sh 'npm test'
                    sh 'npm test -- --watchAll=false'
                }
            }
        }
    }

    post {
        success {
            mail bcc: '', body: 'Hey!!Congrats your build succeded', cc: '', from: '', replyTo: '', subject: """'Jenkins Build Success - ${env.JOB_NAME} #${env.BUILD_NUMBER}'""", to: 'varunkumar.martha@everest.engineering'
        }
        failure {
            mail bcc: '', body: 'Oooops!! You build failed', cc: '', from: '', replyTo: '', subject: """'Jenkins Build Failure - ${env.JOB_NAME} #${env.BUILD_NUMBER}'""", to: 'varunkumar.martha@everest.engineering'
        }
    }
}
