# Step 4: Create Certificates and Business Network Archive
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

Now go to [Step 5: Expose and Test REST APIs](docs/05%20REST%20APIs.md).
