# Building Your First Hyperledger Network

**Art-Ledger:** A blockchain network for buying, selling and tracking art works.

These instructions take you through every step of building your very first blockchain network with Hyperledger. They won't repeat things that are already published elsewhere but rather *link* to the best and most current information. The instructions assume no, or at least very little, knowledge not only of Hyperledger but also tools you will use along the way such as [Git](https://git-scm.com), [NPM](https://www.npmjs.com) and [Docker](https://www.docker.com). Where there is background information you need to know these instructions will link to that.

For this exercise we'll be building a blockchain network called **Art-Ledger**, an application for artists and art lovers to buy, sell and track works of art. All of the files will be kept on GitHub and can be cloned or downloaded from: https://github.com/petercrippsIBM/art-ledger

If you want to follow through the complete development of **Art-Ledger** from v0.0.1 you'll need to take the archived versions stored in the subdirectory **archive** and copy them into **lib** (in the case of the .js file) or **models** (in the case of the .cto file). **Step 1** starts assuming v0.0.1 of these logic and model files.

This file (**README.md**) is written using Markdown which you can get a cheatsheet for [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

You may get errors at various points as you step through these instructions. You can find a list of errors I have encountered (with fixes) in [Possible Errors](docs/Possible%20Errors.md).

## Step 1: Install prerequisites
As we'll be building this project locally and trying it out there first we need to install a number of tools to do this. The best place to get instructions for how to do setup of an environment is from [here](https://console.bluemix.net/docs/services/blockchain/develop_install.html#installing-a-development-environment). To install the prerequisites follow the instructions [here](https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html). These give information for both Ubuntu and macOS. If you need to uninstall an environment that you previously set up follow the instructions [here](https://hyperledger.github.io/composer/latest/installing/uninstall-dev-env).

What follows here mostly assumes you are using macOS because that's the machine I use. Note that for macOS you need to download Xcode (for the C++ compiler, used to install native Node.js modules) from the [AppStore](https://itunes.apple.com/bm/app/xcode/id497799835?mt=12) if you don't have it. This is a BIG application and for me tool several hours to download so you may want to kick that off and then go to bed or for a long walk.

**Important Note** You can get a number of problems if you don't load compatible versions of these tools. In particular take note of the fact you need to install the LTS (long term support) version of Node using the command: `nvm use --lts`. If you don't do this you can get problems later on when trying to use tools such as **yo**. See the section on possible errors for more information.

**Another Important Note** When installing the Hyperledger Composer tools (i.e. `composer-cli`, `composer-rest-server` and `generator-hyperledger-composer`) it is important to make sure they are all at the same version. Rather than risking it specify the version when you are installing. For example:

```
$ npm install -g composer-cli@0.19.5
```

**Version 0.19.5 of the Hyperledger Composer tools are the latest versions that work with Hyperledger Fabric 1.1, currently used on IBM Blockchain Starter Plan.**

You will also need an editor to create new files. I use Atom which you can get [here](https://atom.io). You can also get a plugin for Atom for working with Composer which will give you syntax highlighting that you can get [here](https://github.com/hyperledger/composer-atom-plugin). Another good editor is VScode which you can get [here](https://code.visualstudio.com/download).

Finally when working with IBM Cloud you need to install the command line tools for interacting with it. You can get these from [Getting started with IBM Cloud CLI](https://console.bluemix.net/docs/cli/reference/bluemix_cli/get_started.html).

## Step 2: Create a new project locally
We're going to first set up the directory structure locally that you will build your Hyperledger business network project files in. Once you have generated those files you can push them into GitHub where they can be put under source control and shared.

We can use [Yeoman](http://yeoman.io/) to create the recommended directory structure for business networks. You should have Yeoman installed already if you followed the instructions for setting up your development environment but if not can get it [here](http://yeoman.io/). Instructions for using Yeoman to build the right directory structure as well as a description of what all the parts are can be found in the IBM Cloud documentation [here](https://ibm-blockchain.github.io/develop/business-network/bnd-create).

## Step 3: Add the project to GitHub using the command line
Now that you have a skeletal directory structure created with **yo** (albeit with no real content yet) you can add it to GitHub so you can share it and keep it under source control. You first need to initialise the project directory created in **Step 2** as being a Git repository following [these instructions](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository).

You can now push your project to GitHub using the Git CLI as described [here](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/).

## Step 4: Launch the IBM Blockchain Starter Plan instance on the IBM Cloud
You'll need an IBM Cloud account for this which you can get [here](https://console.bluemix.net/registration/). Once you are signed in you need to create a new blockchain instance. For details on how to do this follow **Step 2** [here](https://www.ibm.com/developerworks/cloud/library/cl-deploy-blockchain-starter-plan-network/). Note that once you have created the network you may want to change the name which you can do from your IBM Cloud dashboard. Click on the three dots to the right of the blockchain service and select **rename**.

Once your blockchain service is up and running you can go to the monitor and browse what you have. The Starter Plan gives you two company/organisations, each with a single peer and CA and one ordering service. There is a default channel shared by the peers. If you look at the default channel you will see it has a block height of 3 corresponding to the three transactions that have taken place to create the network.

More information on Hyperledger Fabric can be found in the [Hyperledger Fabric ](http://hyperledger-fabric.readthedocs.io/en/latest/index.html) documentation.

## Step 5: Define your business network
The IBM Blockchain Platform provides a free development environment based on industry standard tools and technologies (Hyperledger Composer, Hyperledger Fabric, JavaScript, Docker, etc) that you can use to model and code a ready-to-deploy use case. The web playground, where you can define your first network, can be got [here](https://blockchaindevelop.mybluemix.net/editor). It can also be run locally in Docker.

Business Network Definitions are composed of:

* a set of model files
* a set of JavaScript files
* an Access Control (ACL) file

The model files define the business domain for a business network, while the JavaScript files contain transaction processor functions. The transaction processor functions run on a Hyperledger Fabric and have access to the asset registries that are stored in the world state of the Hyperledger Fabric blockchain. The Access Control file contains a set of access control rules that define the rights of the different participants in the business network. More information on this as well as descriptions of the modelling and ACL language can be found [here](https://ibm-blockchain.github.io/develop/business-network/businessnetworkdefinition).

You should use the web playground to define and test your network before deploying it onto IBM Blockchain. You can either define your own network or use the **art-ledger** network defined in this project. The rest of these instructions assume you are using **art-ledger** so if you have defined your own network you will need to change the names to those you have used. If you are defining your own model and logic files you should do so in playground then paste your model file into **models/org.artledger.cto** (or whatever you have called your project) and logic into **lib/logic.js**. Note that for **art-ledger** you can get the initial versions of both of these files from the subdirectory **archive**.

## Step 6: Download the Connection Profile
A **Connection Profile** is used by Hyperledger Composer and other client programmes to connect to a runtime. You can find a full description of Connection Profiles in the Hyperledger Composer documentation [here](https://hyperledger.github.io/composer/latest/reference/connectionprofile). Note that Connection Profiles have changed between different versions of Composer so you need to ensure you are using a format compatible with the version of Composer you are using. If you just stick with the latest versions you should be okay.

You can download the Connection Profile for the blockchain network you have created by following **Step 3** of [these instructions](https://www.ibm.com/developerworks/cloud/library/cl-deploy-blockchain-starter-plan-network/). Make sure you download the Connection Profile, rename it to **connection-profile.json** and place it in the root directory of your project. In a later step you will need to get the **enrollSecret** from the Connection Profile file.

## Step 7: Create a Cloudant NoSQL DB Service
We will be exposing the REST APIs for the business network from IBM Cloud so we have to use a cloud-based wallet to store the cards that we will be creating with Hyperledger Composer. We need therefore to create a Cloudant NoSQL Database service on IBM Cloud with a new database for the wallet.

Set up a new Cloudant NoSQL Database instance with a database by following **Step 4** of [these instructions](https://www.ibm.com/developerworks/cloud/library/cl-deploy-blockchain-starter-plan-network/).

Make sure you have installed the `composer-wallet-cloudant` node module as follows:
```
$ npm install -g @ampretia/composer-wallet-cloudant
```
An important point to emphasise is to export the `NODE_CONFIG` environment variable using this instruction:
```
$ export NODE_CONFIG=$(cat cardstore-cloudant.json)
```
From this point on, all the subsequent commands **must** be executed in the same Terminal window in which environment variable `NODE_CONFIG` was set to ensure that the cloud-based wallet is populated with the necessary cards. If you close or crash your Terminal window remember to re-run this command when you open a new Terminal.

## Step 8: Create certificates and business network cards
A *Business Network Card* provides all of the information needed to connect to a blockchain business network. It is only possible to access a blockchain business network through a valid Business Network Card. A Business Network Card contains an *Identity* for a single *Participant* within a deployed business network. You can have multiple Business Network Cards for a single deployed business network, where those Business Network Cards belong to multiple Participants.

To create certificates and Business Network Cards for your network follow these steps:
* Step 5 - Create the Certificate Authority Card
* Step 6 - Add a certificate to the Starter Plan
* Step 7 - Create and import a business network card for the admin
* Step 8 - Install and start the business network
* Step 9 - Create a card for the network administrator

from [these instructions.](https://www.ibm.com/developerworks/cloud/library/cl-deploy-blockchain-starter-plan-network/)

Remember to substitute the name of your network at the appropriate points when executing the commands in these steps. Specifically:

**Step 5**
```
$ composer card create -f ca.card -p connection-profile.json -u admin -s <your-enrollSecret>
```

**Step 8**
```
$ composer network install -c adminCard -a art-ledger-0.0.1.bna
$ composer network start -c adminCard -n art-ledger -V 0.0.1 -A admin -C ./credentials/admin-pub.pem -f delete_me.card
```

**Step 9**
```
$ composer card create -n art-ledger -p ./connection-profile.json -u admin -c ./credentials/admin-pub.pem -k ./credentials/admin-priv.pem
$ composer card import -f admin@art-ledger.card
```

Before creating the business network archive (.bna) file you'll need to tweak the **permissions.acl** file. The ones you get by default probably won't be compatible with changes you'll have added in the model file. If you get that problem then paste the contents of [this file](https://github.com/petercrippsIBM/art-ledger/blob/master/archive/permissions-v0.0.1.acl) **permissions.acl** into the one in the project directory.

If you check the block height of your channel you should see it set at '4' meaning there are four blocks in your network corresponding to:
* 0 - the GENESIS block
* 1 - addition of the certificate
* 2 - instantiation of the chaincode
* 4 - invocation of the chaincode

At this point you can check the network is up and running by issuing a ping command:
```
$ composer network ping -c admin@art-ledger
```
This will return some information about the network including the version number of the network composer runtime (o.19.5 if you've been using the same version numbers in these instructions) and your network (0.0.1).

You can also check your `composer-wallets` Cloudant database where you should see the three cards that have been created.

## Step 9: Expose REST APIs in the cloud for the business network
Once you have a deployed business network you need a way to interact with it. There is a REST server provided as part of the tooling that can be deployed onto IBM Cloud that generates and exposes a set of REST APIs allowing you to interact with your network. This needs to be uploaded as a Cloud Foundry application to IBM Cloud. To do this you need the IBM CLoud CLI to be installed. If you've not done that already you can down load from [here](https://console.bluemix.net/docs/cli/reference/bluemix_cli/get_started.html).

Once the IBM Cloud CLI is downloaded and installed you should have a set of **bx** commands at your disposal. First, log into IBM Cloud using your credentials. Issue the command:
```
$ bx login -a https://api.ng.bluemix.net --sso
```
Note that if you omit the `-sso` parameter you will need to login with your IBM Cloud email and password. 2You need to specify the region you are working with if its different from the above (which is US South). Then use:
```
$ bx target --cf
```
to target the right Cloud Foundry org/space. When prompted select the space you are using. Next push the REST server to IBM Cloud:
```
$ bx cf push art-ledger --docker-image ibmblockchain/composer-rest-server:0.19.5 \
  -c "composer-rest-server -c admin@art-ledger -n never -w true" \
  -i 1 -m 256M --no-start --no-manifest
```
Make sure you provide the name of your choosing for the REST server (here it's **art-ledger**) and also the correct admin card name (i.e. **admin@art-ledger**). Also it's worth specifying the version of the 'composer-rest-server' you want loaded to ensure it's compatible with the version of `composer`.

Next set the environment variable for NODE_CONFIG on IBM Cloud (again using a suitable replacement for **art-ledger**):
```
$ bx cf set-env art-ledger NODE_CONFIG "${NODE_CONFIG}"
```
Then start the REST server (**art-ledger** is whatever yours is called):
```
$ bx cf start art-ledger
```
This takes some time but once you get the message the app is started if you go to the IBM Cloud dashboard you should see the REST server running like this.

![rest server](images/REST%20Server.png "rest server")

If you go to that application and click on **Visit App URL** you'll launch the REST server and see a screen like this:

![running rest server](images/Running%20REST%20Server.png "running rest server")

You can now interact with the REST server by adding assets and participants and running transactions. If you switch to IBM Blockchain Starter Plan monitor and check the Channels link you should see the number of blocks increasing as you execute transactions.

![blockchain network](images/Blockchain%20Network.png "blockchain network")

## Step 10: Generate and run an Angular application for interacting with your business network
The REST server created on IBM Cloud in the previous step can also be used by applications. You can build a basic Angular application using the **yo** command. First make sure you have both the generator as well as Yeoman installed:
```
$ npm install -g generator-hyperledger-composer
$ npm install -g yo
```
Then, from the project root directory issue the command:
```
$ yo hyperledger-composer:angular
```
You will be prompted with a series of questions which you should answer as follows (substituting your information as needed):
```
Welcome to the Hyperledger Composer Angular project generator
? Do you want to connect to a running Business Network? Yes
? Project name: art-ledger-app
? Description: Art-Ledger Application
? Author name:  P Cripps
? Author email: pete_cripps@uk.ibm.com
? License: Apache-2.0
? Name of the Business Network card: admin@art-ledger
? Do you want to generate a new REST API or connect to an existing REST API? Connect to an existing
REST API art-ledger-app
? REST server address: https://art-ledger.mybluemix.net
? REST server port: 443
? Should namespaces be used in the generated REST API? Namespaces are not used
```
Note that the REST server address can be obtained from the previous step when you selected the REST server application. This will generate an application in the (in my case) art-ledger-app folder.

This will take a while to complete but once it does so you will have a new subdirectory (the name of your application, **art-ledger-app** in my case) with all of the generated files in. You can now change to that directory and issues the command:
```
$ npm start
```
This will compile the application. Once you see `webpack: Compiled successfully` you can point your browser at `http://localhost:4200` and interact with you application through a similar screen to this one:

![art-ledger application](images/Application.png "art-ledger application")

That's it! You should now have a blockchain network with chaincode deployed to it as well as a REST server that exposes the APIs to control network participants, assets and transactions. You should also have an application, running locally, that can consume the APIs to also control your network.

## Step 11: Upgrading the business network
Once you have a basic business network up and running you can start to play around with it and add new chaincode. It's best to test this out using Composer Playground and then upgrade on IBM Cloud once you are ready. By way of example I've created a v0.0.2 of **art-ledger** which adds some very basic auction functionality. The updated chaincode can be found [here](archive/logic-v0.0.2.js) and model file [here](archive/org.artledger-v0.0.2.cto). To upgrade to this version follow these steps.

If you are performing this upgrade following a break and have restarted your **Terminal** session remember to set `NODE_CONFIG` again with this command:
```
$ export NODE_CONFIG=$(cat cardstore-cloudant.json)
```

### Step 11.1: Copy the new code
Copy the v0.0.2 chaincode from the archive file into **lib/logic.js** and the v0.0.2 model into **models/org.artledger.cto**.

In the file **package.json** in the project root directory change the version number to be 0.0.2.

### Step 11.2: Regenerate the BNA file
To be able to install and start the updated business network, you need to regenerate the Business Network Archive (.bna) file by zipping up the necessary artifacts again. From the project root directory issue the following command:
```
$ composer archive create -t dir -n .
```
This will result in the creation of a new version of **art-ledger**, `art-ledger@0.0.0.2.bna`. The new version number is obtained from the **package.json** file you updated in the previous step. Since the Starter Plan instance does not accept files with @ in the name, rename it to `art-ledger-0.0.0.2.bna`.

### Step 11.3: Upgrade the network
First we need to install a new version of the Hyperledger Composer business network to our blockchain. Issue the command:
```
$ composer network install -c adminCard -a art-ledger-0.0.2.bna
```

Next upgrade the Hyperledger Composer business network to the new version
```
$ composer network upgrade -n art-ledger -V 0.0.2 -c admin@art-ledger
```

This will take a few minutes. When you see a success message you can check this has worked by pinging the network:
```
$ composer network ping -c admin@art-ledger
```
you should see the new version has been installed. Finally you can go to the Blockchain Starter Plan monitor on IBM Cloud and check the default channel. There should be a new block showing the recent activity if new chaincode being installed.

### Step 11.4: Re-install the REST server
You'll now need to re-install the REST server to pick up the new APIs. To do this first stop the server either by going to the IBM Cloud dashboard, finding the REST server app and selection `Stop` or login to your IBM Cloud account (see **Step 9**) and issue a stop from the command line:
```
$ bx cf stop art-ledger
```
You can then re-install the REST server and start it again using:
```
$ bx cf push art-ledger --docker-image ibmblockchain/composer-rest-server:0.19.5 \
  -c "composer-rest-server -c admin@art-ledger -n never -w true" \
  -i 1 -m 256M --no-start --no-manifest
$ bx cf start art-ledger
```
If you go to the IBM Cloud dashboard and select the URL of the REST server you should see it running with the additional APIs.

### Step 11.4: Generate and run an Angular application for interacting with your business network
This is a straight forward re-run of **Step 10**  

## Other getting started guides
There are numerous guides and videos for getting started with Hyperledger some of which were used in writing these instructions. They are listed here for reference:

[Deploy a blockchain business network to the cloud using the IBM Blockchain Starter Plan](https://www.ibm.com/developerworks/cloud/library/cl-deploy-blockchain-starter-plan-network/) on IBM developerWorks by Sanjay Saxena.

[Hyperledger Composer Basics, Parts I, II & III](https://www.ibm.com/developerworks/cloud/library/cl-model-test-your-blockchain-network-with-hyperledger-composer-playground/index.html) on IBM developerWorks by Steven Perry.

[How to Create an Application on Blockchain Using Hyperledger](https://medium.freecodecamp.org/ultimate-end-to-end-tutorial-to-create-an-application-on-blockchain-using-hyperledger-3a83a80cbc71) on Medium freeCodeCamp() by Niharika Singh.

[Developing a Blockchain Application with Starter Plan](https://developer.ibm.com/tv/blockchain-innovators/#bigc) on developerWorks TV by various people.
```
