sudo su
usermod -aG sudo juser
sudo su - juser
cd /home/juser
chown juser /home/juser
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
  && chmod +x minikube
sudo install minikube /usr/local/bin/
sudo apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt install conntrack
sudo apt-get -y install docker-ce docker-ce-cli containerd.io
#sudo usermod -aG docker $USER && newgrp docker
sudo minikube start --driver=none
sudo minikube status
wget https://get.helm.sh/helm-v3.3.0-rc.1-linux-amd64.tar.gz
tar -zxvf helm-v3.3.0-rc.1-linux-amd64.tar.gz
sudo mv linux-amd64/helm /usr/local/bin/helm
curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
kubectl version --client
sudo apt-get update && sudo apt-get -y install socat


git clone https://github.com/sanjeevkumar761/kubeapps.git

cd /home/juser/kubeapps/dashboard
docker build -t kubeapps/dashboard .
docker tag kubeapps/dashboard souveniracr.azurecr.io/kubeapps/dashboard
sudo curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
az acr login --name souveniracr --username $2 --password $3
docker push souveniracr.azurecr.io/kubeapps/dashboard

az acr repository list --name souveniracr --username $2 --password $3


cd /home/juser/kubeapps/chart/kubeapps
export HELM_EXPERIMENTAL_OCI=1
helm chart save . kubeapps
helm chart save . souveniracr.azurecr.io/helm/kubeapps:v1
echo $3 | helm registry login souveniracr.azurecr.io \
  --username $2 \
  --password-stdin
helm chart push souveniracr.azurecr.io/helm/kubeapps:v1
# helm chart pull souveniracr.azurecr.io/helm/kubeapps:v1
# helm chart export souveniracr.azurecr.io/helm/kubeapps:v1 \
#  --destination ./install

# sudo helm repo add bitnami https://charts.bitnami.com/bitnami
sudo kubectl create namespace kubeapps
# cd install
cd /home/juser/kubeapps/chart/
helm dependency update kubeapps
sleep 2m
helm install kubeapps --namespace kubeapps ./kubeapps --set useHelm3=true

sudo kubectl create serviceaccount kubeapps-operator
sudo kubectl create clusterrolebinding kubeapps-operator --clusterrole=cluster-admin --serviceaccount=default:kubeapps-operator
kubectl port-forward -n kubeapps svc/kubeapps 8080:80 --address 0.0.0.0
#sudo rm /var/lib/apt/lists/lock
#sudo rm /var/cache/apt/archives/lock
#sudo rm /var/lib/dpkg/lock*