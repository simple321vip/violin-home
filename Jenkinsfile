def label = "slave-${UUID.randomUUID().toString()}"

podTemplate(
    label: label,
    yaml: """
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins-cicd: cicd-jenkins
spec:
  securityContext:
    runAsUser: 0
    privileged: true
  containers:
  - name: "docker"
    image: "docker:20.10.17-git"
    imagePullPolicy: "IfNotPresent"
    command:
    - cat
    tty: true
    volumeMounts:
    - name: "volume-docker"
      mountPath: "/var/run/docker.sock"
      readOnly: false
    - name: "workspace-volume"
      mountPath: "/home/jenkins/agent"
      readOnly: false
  - name: kubectl
    image: bitnami/kubectl:1.23.7
    imagePullPolicy: "IfNotPresent"
    command:
    - cat
    tty: true
    securityContext:
      allowPrivilegeEscalation: true
    volumeMounts:
      - name: "volume-kube"
        mountPath: "/home/jenkins/.kube"
        readOnly: false
      - name: "workspace-volume"
        mountPath: "/home/jenkins/agent"
        readOnly: false
  volumes:
  - name: "volume-m2"
    hostPath:
      path: "/root/.m2/repository"
  - name: "volume-docker"
    hostPath:
      path: "/var/run/docker.sock"
  - name: "volume-kube"
    hostPath:
      path: "/root/.kube"
  - name: "workspace-volume"
    emptyDir:
      medium: ""
""",
    serviceAccount: 'jenkins-admin'
) {
  node(label) {
    def myRepo = checkout([
      $class: 'GitSCM',
      branches: [[name: "*/master"]],
      doGenerateSubmoduleConfigurations: false,
      extensions:  [[$class: 'CloneOption', noTags: false, reference: '', shallow: true, timeout: 1000]]+[[$class: 'CheckoutOption', timeout: 1000]],
      submoduleCfg: [],
      userRemoteConfigs: [[
        credentialsId: '2448e943-479f-4796-b5a0-fd3bf22a5d30',
        url: 'https://gitee.com/guan-xiangwei/violin-home.git'
        ]]
      ])

    def gitCommit = myRepo.GIT_COMMIT
    def gitBranch = myRepo.GIT_BRANCH

    def imageTag = "v1.00"
    def registryUrl = "ccr.ccs.tencentyun.com"
    def imageEndpoint = "violin/violin-home"
    def image = "${registryUrl}/${imageEndpoint}:${imageTag}"

    stage('单元测试') {
      echo "测试阶段"
    }
    stage('镜像构建') {
      withCredentials([[$class: 'UsernamePasswordMultiBinding',
        credentialsId: '8eb5126b-6a2f-4644-add0-bc2a669e663d',
        usernameVariable: 'DOCKER_USER',
        passwordVariable: 'DOCKER_PASSWORD']]) {
          container('docker') {
            echo "3. 构建 Docker 镜像阶段"
            sh """
              docker login ${registryUrl} --username=${DOCKER_USER} -p ${DOCKER_PASSWORD}
              docker build -t ${image} .
              docker push ${image}
              """
          }
        }
    }
  }
}