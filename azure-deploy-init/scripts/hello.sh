sudo su
cd /home/juser
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
  && chmod +x minikube
install minikube /usr/local/bin/
apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
apt-get update
apt install conntrack
apt-get -y install docker-ce docker-ce-cli containerd.io
#sudo usermod -aG docker $USER && newgrp docker
usermod -aG docker juser && newgrp docker
minikube start --driver=none
minikube status
wget https://get.helm.sh/helm-v3.3.0-rc.1-linux-amd64.tar.gz
tar -zxvf helm-v3.3.0-rc.1-linux-amd64.tar.gz
mv linux-amd64/helm /usr/local/bin/helm
curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
chmod +x ./kubectl
mv ./kubectl /usr/local/bin/kubectl
kubectl version --client
apt-get update && sudo apt-get -y install socat
helm repo add bitnami https://charts.bitnami.com/bitnami
kubectl create namespace kubeapps
helm install kubeapps --namespace kubeapps bitnami/kubeapps --set useHelm3=true
kubectl create serviceaccount kubeapps-operator
kubectl create clusterrolebinding kubeapps-operator --clusterrole=cluster-admin --serviceaccount=default:kubeapps-operator

#sudo rm /var/lib/apt/lists/lock
#sudo rm /var/cache/apt/archives/lock
#sudo rm /var/lib/dpkg/lock*