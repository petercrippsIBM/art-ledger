## Possible Errors
Unless you are very careful in following these instructions you are bound to get errors first time through. Here are some of the ones I encountered with fixes.

### *Error: Building .BNA File*
Errors when building the .bna file.
### *Fix*
First time through the .bna file failed to build because I still had the **permissions.acl** file created when I used **yo** to build a skeleton directory structure. If you get that problem then paste the contents of [this file](https://github.com/petercrippsIBM/art-ledger/blob/master/archive/permissions-v0.0.1.acl) **permissions.acl** into the one in the project directory.

### *Error: Cannot Find Business Card*
Cannot find business card.
### *Fix*
This is either caused because you have not created all the cards you should have (i.e. you missed a step out) or because you have not set the environment variable `NODE_CONFIG`.

To see what cards you have issue the command `composer card list`. You should see something like this:
![composer card list](../images/Card%20List.png "composer card list")

Check `NODE_CONFIG` is set by issuing a `printenv NODE_CONFIG` command and if not export the NODE_CONFIG environment variable using this instruction:
```
$ export NODE_CONFIG=$(cat cardstore-cloudant.json)
```

### *Error: Failed to Load Connector Module*
```
Failed to load connector module "composer-connector-hlfv1" for connection type "hlfv1". Failed to load gRPC binary module because it was not installed for the current system
Expected directory: node-v57-darwin-x64-unknown
Found: [node-v48-darwin-x64-unknown]
```
This problem can often be fixed by running "npm rebuild" on the current system

### *Fix*
To rebuild first go to the directory containing the tool to be rebuilt (**generator-hyperledger-composer** in this case) then issue the rebuild command.
```
$ cd /usr/local/lib/node_modules/generator-hyperledger-composer`
$ npm rebuild --unsafe-prem
```
### *Error:*
I got [this error](https://github.com/hyperledger/composer/issues/4250) when trying to push the REST server to IBM Cloud:
```
Failed getting docker image by tag: manifest unknown: manifest unknown
  Staging process failed: Exit trace for group:
  builder exited with error: failed to fetch metadata from [ibmblockchain/composer-rest-server] with tag [0.19.12] and insecure registries [] due to manifest unknown: manifest unknown
```
### *Fix*
The IBM Blockchain images are not updated as quick as the Hyperledger ones. Check the latest of each:
* https://hub.docker.com/r/ibmblockchain/composer-rest-server/tags/
* https://hub.docker.com/r/hyperledger/composer-rest-server/tags/

### *Error: Composer Runtime Incompatibility*
I got [this error](https://github.com/hyperledger/composer/issues/4266) when trying to build the Angular application using **yo**.
```
Error: Composer runtime (0.19.5) is not compatible with client (0.19.0)
```
