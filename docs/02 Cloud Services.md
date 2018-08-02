# Step 2: Create IBM Cloud Services
You'll need an IBM Cloud account for this which you can get [here](https://console.bluemix.net/registration/).

Once you have an account and are signed in you need to create a new *IBM Blockchain Starter Plan* instance. From the IBM Cloud dasboard select `Create resource` (button at the top right). Type 'blockchain' in the search window and press enter. The IBM Blockchain service appears twice, select either one and this window will appear.

![blockchain01](../images/Blockchain01.png "blockchain01")

Give your network a name (I'm using 'Blockchain-Art-Ledger') and press `Create`. After a few seconds this screen will appear.

![blockchain02](../images/Blockchain02.png "blockchain02")

Once your blockchain service is up and running you can go to the monitor and browse what you have. The Starter Plan gives you two company/organisations, each with a single peer and CA and one ordering service. There is a default channel shared by the peers. If you look at the default channel you will see it has a block height of 3 corresponding to the three transactions that have taken place to create the network.

More information on Hyperledger Fabric can be found in the [Hyperledger Fabric ](http://hyperledger-fabric.readthedocs.io/en/latest/index.html) documentation.

A *Connection Profile* is used by Hyperledger Composer and other client programmes to connect to a runtime. You can find a full description of Connection Profiles in the Hyperledger Composer documentation [here](https://hyperledger.github.io/composer/latest/reference/connectionprofile).

To download the Connection Profile for the blockchain network you have created go to the blockchain monitor on IBM Cloud and in `Overview` select the `Connection Profile` button followed by the `Download` button.

![blockchain03](../images/Blockchain03.png "blockchain03")

Once downloaded rename the file to `connection-profile.json` and place it in the root directory of your project. In a later step you will need to get the `enrollSecret` from the Connection Profile file.

We will be exposing the REST APIs for the business network from IBM Cloud so we have to use a cloud-based *wallet* to store the cards that we will be creating with Hyperledger Composer. We will use a Cloudant NoSQL Database service on IBM Cloud with a new database for the wallet.

Make sure you have installed the `composer-wallet-cloudant` node module as follows:
```
$ npm install -g @ampretia/composer-wallet-cloudant
```

Create a new file (in the project root directory) called `cardstore-cloudant.json` and put this JSON code in it:
```
{
  "composer": {
    "wallet": {
      "type": "@ampretia/composer-wallet-cloudant",
      "options": {
        "database": "composer-wallets",
      }
    }
  }
}
```

From your IBM Cloud account create a new *Cloudant NoSQL Database* service in the same region, org, and space as the Starter Plan instance.

![cloudant01](../images/Cloudant01.png "cloudant01")

Once the service has started create a new database called `composer-wallets` by launching the Cloudant dashboard, entering the database name and selecting `Create Database`.

You then need to create a new credential for accessing the database service and copy these to your Cloudant casrdstore file. Select the Cloudant service and then select `Service Credentials` from the left pane. Select the `New credential` button, give the credential a name (the default is fine) and then select `Add`.

![cloudant02](../images/Cloudant02.png "cloudant02")

This will generate a new credential. Finally copy this to the JSON in the file created previously *immediately after the `"database": "composer-wallets" line`*. The file should now look like this (note these are not the real keys).
```
{
  "composer": {
    "wallet": {
      "type": "@ampretia/composer-wallet-cloudant",
      "options": {
        "database": "composer-wallets",
        "apikey": "Hyu8KHpRXwJM53xJ3txCkDfs-o0UyUeSeRuGansNMOeYY",
        "host": "9897edf4-ef65-454b-b801-f8e5de7e9579-bluemix.cloudant.com",
        "iam_apikey_description": "Auto generated apikey during resource-key operation for Instance - crn:v1:bluemix:public:cloudantnosqldb:us-south:a/7f9dc5355576457f2c09ed244a654ac7:eb2814a4-54d4-4fbb-86e9-ecf087c5acfb::",
        "iam_apikey_name": "auto-generated-apikey-0e25f083-ae04-49836-8f32-1ce1b6af347d",
        "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
        "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/7f9dc8766576457f2c0f53244a654ac7::serviceid:ServiceId-c12efa45d-f165-4fb7-b8b2-0754231fB123",
        "password": "b2c108731bc6e7398fdfd281ee0574b0a5671442c0f93d53da0af9afc08951e1",
        "port": 443,
        "url": "https://0fc4f4e2-ee1c-454b-b801-f8e5de7e9579-bluemix:b2c102947623e7398fdfd281ee0574b0a441e442c0f93d53da0af9afc08951e1@0fc4f4e2-ee1c-454b-e501-f8e5de7e9579-bluemix.cloudant.com",
        "username": "0fdf54e2-ee1c-454b-b801-f8e5de7e9579-bluemix"
      }
    }
  }
}
```  

Finally make sure you are in your project root directory and export the `NODE_CONFIG` environment variable using this instruction:
```
$ export NODE_CONFIG=$(cat cardstore-cloudant.json)
```
From this point on, all the subsequent commands **must** be executed in the same Terminal window in which environment variable `NODE_CONFIG` was set to ensure that the cloud-based wallet is populated with the necessary cards. If you close or crash your Terminal window remember to re-run this command when you open a new Terminal.

Now go to [Step 3: Define a Business Network](../docs/03%20Business%20Network.md).
