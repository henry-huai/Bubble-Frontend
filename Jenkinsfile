pipeline {
   agent any

   stages {
      stage('checkout') {
          steps {
            checkout scm
          }
      }
      stage('build') {
         steps {
            sh 'node -v'
         }
      }
   }
}