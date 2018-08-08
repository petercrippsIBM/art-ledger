# Step 8 (Optional): Art-Ledger Front-End Application
To provide a simple way of creating and viewing Art-Ledger participants and assets as well as running transactions a simple HTML5 and JavaScript front-end is also provided. This will be compatible with the most current version of the art-ledger application.

For now this front-end application runs locally but should be able to be run in IBM Cloud as well.

The application uses the [Express Framework](https://expressjs.com).

The following steps are the general procedure to set up and deploy the front-end application. See more detailed instructions in the [Getting started tutorial for Node.js](https://console.bluemix.net/docs/runtimes/nodejs/getting-started.html#getting-started-with-node-js-on-bluemix).

The idea is that you can use this as the basis for developing a more sophisticated application. If you need help getting started with HTML5, CSS2 and JavaScript [W3Schools](https://www.w3schools.com/default.asp) is a great learning resource.
Also check out [these instructions](https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/) if you want a good explanation of building a HTML and JavaScript application that makes basic REST calls.

If you have cloned art-ledger from [here](https://github.com/petercrippsIBM/art-ledger) then you should have the application in the directory `art-ledger-app`. To run it change to that directory then issue the instruction:
```
$ npm install
```
This will pull down various packages. When that completes issue:
```
$ npm start
```
and you should see this:

![art-ledger-app01](../images/Art-Ledger%20App01.png "art-ledger-app01")

When you point your browser at `http://localhost:3000` as instructed the following page should appear.

![art-ledger-app02](../images/Art-Ledger%20App02.png "art-ledger-app02")

There are four pages each of which allow you to request information on the particpants and assets you have created or to create new ones. You can also execute transactions from here.

Here is an example of the `Work with artists` page having selected the `Get Artists` button to see a list of artists already in the blockchain network.

![art-ledger-app03](../images/Art-Ledger%20App03.png "art-ledger-app03")
