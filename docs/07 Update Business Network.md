# Step 7 (Optional): Update the Business Network
Once you have a basic business network up and running you can start to play around with it and add new chaincode. It's best to test this out using Composer Playground and then upgrade on IBM Cloud once you are ready. By way of example I've created a v0.0.2 of **art-ledger** which adds some very basic auction functionality. The updated chaincode can be found [here](../archive/logic-v0.0.2.js) and model file [here](../archive/org.artledger-v0.0.2.cto). To upgrade to this version follow these steps.

If you are performing this upgrade following a break and have restarted your **Terminal** session remember to set `NODE_CONFIG` again with this command:
```
$ export NODE_CONFIG=$(cat cardstore-cloudant.json)
```

## Step 7.1: Copy the New Code
Copy the v0.0.2 chaincode from the archive file into **lib/logic.js** and the v0.0.2 model into **models/org.artledger.cto**.

In the file **package.json** in the project root directory change the version number to be 0.0.2.

## Step 7.2: Regenerate the BNA File
To be able to install and start the updated business network, you need to regenerate the Business Network Archive (.bna) file by zipping up the necessary artifacts again. From the project root directory issue the following command:
```
$ composer archive create -t dir -n .
```
This will result in the creation of a new version of **art-ledger**, `art-ledger@0.0.0.2.bna`. The new version number is obtained from the **package.json** file you updated in the previous step. Since the Starter Plan instance does not accept files with @ in the name, rename it to `art-ledger-0.0.0.2.bna`.

## Step 7.3: Upgrade the Network
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

## Step 7.4: Re-install the REST Server
You'll now need to re-install the REST server to pick up the new APIs. To do this first stop the server either by going to the IBM Cloud dashboard, finding the REST server app and selection `Stop` or login to your IBM Cloud account (see **Step 9**) and issue a stop from the command line:
```
$ ibmcloud cf stop art-ledger
```
You can then re-install the REST server and start it again using:
```
$ ibmcloud cf push art-ledger --docker-image ibmblockchain/composer-rest-server:0.19.5 \
  -c "composer-rest-server -c admin@art-ledger -n never -w true" \
  -i 1 -m 256M --no-start --no-manifest
$ ibmcloud cf start art-ledger
```
If you go to the IBM Cloud dashboard and select the URL of the REST server you should see it running with the additional APIs.

## Step 7.5: Re-Generate the Angular Application
This is a straight forward re-run of [Step 6 (Optional): Create an Angular Application](../docs/06%20Angular%20App.md).

Now go to [Step 8 (Optional): Art-Ledger Front-End Application](../docs/08%20Art-Ledger%20Front-End%20App.md). 
