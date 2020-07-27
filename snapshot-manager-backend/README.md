Snapshot Manager Backend

Development environment setup steps:
1) Install node js 12 by executing commands:  
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -  
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -  
    sudo apt install nodejs  


Install and run Snapshot Manager Backend:
1) Install node js 12 by executing commands:  
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -  
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -  
    sudo apt install nodejs  

2) Set these environment variables  
export AZURE_SUBSCRIPION_ID={your subscription id}  
export CLIENT_ID={your client id}  
export APPLICATION_SECRET={your client secret}  
export DOMAIN={your tenant id as a guid OR the domain name of your org <contosocorp.com>}  

3) Start react app:  
    cd snapshot-manager-backend    
    npm install
    npm start  