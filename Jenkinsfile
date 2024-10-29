pipeline {
    agent any
    environment{
        PATH = "${env.PATH}:/usr/local/bin"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'fingrow-jenkins-ci/cd', url: 'https://github.com/varun-everest/testing-fingrow.git'
            }
        }

        stage('Installing Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
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
                    sh 'npm test -- --coverage watchAll = false'
                }
            }
        }
    }
}
