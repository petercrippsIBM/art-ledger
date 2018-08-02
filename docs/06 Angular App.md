# Step 6 (Optional): Create an Angular Application
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

Now go to [Step 7 (Optional): Update the Business Network](docs/07%20Update%20Business%20Network.md).
