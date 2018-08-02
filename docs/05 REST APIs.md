# Step 5: Expose and Test REST APIs
Once you have a deployed business network you need a way to interact with it. There is a REST server provided as part of the tooling that can be deployed onto IBM Cloud that generates and exposes a set of REST APIs allowing you to interact with your network. This needs to be uploaded as a Cloud Foundry application to IBM Cloud. To do this you need the IBM CLoud CLI to be installed. If you've not done that already you can down load from [here](https://console.bluemix.net/docs/cli/reference/bluemix_cli/get_started.html).

Once the IBM Cloud CLI is downloaded and installed you should have a set of **ibmcloud** commands at your disposal. First, log into IBM Cloud using your credentials. Issue the command:
```
$ ibmcloud login -a https://api.ng.bluemix.net --sso
```
Note that if you omit the `-sso` parameter you will need to login with your IBM Cloud email and password. 2You need to specify the region you are working with if its different from the above (which is US South). Then use:
```
$ ibmcloud target --cf
```
to target the right Cloud Foundry org/space. When prompted select the space you are using. Next push the REST server to IBM Cloud:
```
$ ibmcloud cf push art-ledger --docker-image ibmblockchain/composer-rest-server:0.19.5 \
  -c "composer-rest-server -c admin@art-ledger -n never -w true" \
  -i 1 -m 256M --no-start --no-manifest
```
Make sure you provide the name of your choosing for the REST server (here it's **art-ledger** but you should choose something unique, possibly by prepending your name otherwise you will clash with this version if you are in the same region/space) and also the correct admin card name (i.e. **admin@art-ledger**). Also it's worth specifying the version of the 'composer-rest-server' you want loaded to ensure it's compatible with the version of `composer`.

The `ibmcloud` CLI can use a YAML manifest file for the instructions to push to IBM Cloud. An example manifest can be found [here](../manifest.yaml). If you have this file in your project root directory then you can just issue the command:
```
$ ibmcloud cf push
```

Next set the environment variable for NODE_CONFIG on IBM Cloud (again using a suitable replacement for **art-ledger**):
```
$ ibmcloud cf set-env art-ledger NODE_CONFIG "${NODE_CONFIG}"
```
Then start the REST server (**art-ledger** is whatever yours is called):
```
$ ibmcloud cf start art-ledger
```
This takes some time but once you get the message the app is started if you go to the IBM Cloud dashboard you should see the REST server running like this.

![rest server](../images/REST%20Server.png "rest server")

If you go to that application and click on **Visit App URL** you'll launch the REST server and see a screen like this:

![running rest server](../images/Running%20REST%20Server.png "running rest server")

You can now interact with the REST server by adding assets and participants and running transactions. If you switch to IBM Blockchain Starter Plan monitor and check the Channels link you should see the number of blocks increasing as you execute transactions.

![blockchain network](../images/Blockchain%20Network.png "blockchain network")

Open a web page and enter the URL of the API REST server for your network e.g. `https://art-ledger.mybluemix.net/explorer/`. You will see a number of HTTP methods for each of the assets, participants and transactions you have deployed onto your blockchain network. Test them out by using the following examples.

Create owners using the `POST/Owner` method with the following example data:
```
{
    "$class": "org.artledger.Owner",
    "ownerId": "OWNER01",
    "firstName": "Tim",
    "lastName": "Trotter",
    "isDealer": true
}
```

Create artists using the `POST/Artist` method with the following example data:
```
{
    "$class": "org.artledger.Artist",
    "artistId": "ARTIST01",
    "firstName": "Jenny",
    "lastName": "Jones"
}
```

Create art works using the `POST/ArtWork` method with the following example data:
```
{
    "$class": "org.artledger.ArtWork",
    "artId": "ART01",
    "type": "PAINTING",
    "description": "Landscape in Oils",
    "currentValue": 1000,
    "underAuction": false,
    "artist": "resource:org.artledger.Artist#ARTIST01",
    "owner": "resource:org.artledger.Owner#OWNER01"
  }
```

Run a transaction using the `POST/SellArtWork` method with the following example data:
```
{
  "$class": "org.artledger.SellArtWork",
  "newValue": 1500,
  "artWork": "resource:org.artledger.ArtWork#ART01",
  "newOwner": "resource:org.artledger.Owner#OWNER02"
}
```

Once you have run some transactions check the **defaultChannel** on your blockchain network and look at the blocks that have been created.

Now go to [Step 6 (Optional): Create an Angular Application](../docs/06%20Angular%20App.md).
