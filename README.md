# Building Your First Hyperledger Network on IBM Cloud
These instructions take you through five steps (plus two optional ones) to building your very first blockchain network with [Hyperledger Fabric](https://www.hyperledger.org) on [IBM Cloud](https://console.bluemix.net) using the [IBM Blockchain Platform Starter Plan](https://www.ibm.com/blogs/blockchain/2018/06/by-developers-for-developers-the-ibm-blockchain-platform-starter-plan/). The instructions assume no, or at least very little, knowledge not only of Hyperledger but also the tools you will use along the way such as [Git](https://git-scm.com), and [NPM](https://www.npmjs.com). Where there is background information you need to know these instructions will link to that.

For this exercise we'll be building a blockchain network called **Art-Ledger**, an application for artists and art lovers to buy, sell and track works of art. All of the files will be kept on GitHub and can be cloned or downloaded from https://github.com/petercrippsIBM/art-ledger

Okay, let's get started. Here are the five steps (plus three optional ones) to get you up and running with your first blockchain network on the IBM Blockchain Starter Plan. Each step links to the next one at the end or you can return here to navigate your way through the instructions.

* [Step 1: Setup a Development Environment](docs/01%20Setup.md)
* [Step 2: Create IBM Cloud Services](docs/02%20Cloud%20Services.md)
* [Step 3: Define a Business Network](docs/03%20Business%20Network.md)
* [Step 4: Create Business Network Artefacts](docs/04%20Business%20Network%20Artefacts.md)
* [Step 5: Expose and Test REST APIs](docs/05%20REST%20APIs.md)

Plus optionally:

* [Step 6 (Optional): Create an Angular Application](docs/06%20Angular%20App.md)
* [Step 7 (Optional): Update the Business Network](docs/07%20Update%20Business%20Network.md)
* [Step 8 (Optional): Art-Ledger Front-End Application](docs/08%20Art-Ledger%20Front-End%20App.md)

You may get some errors at various points as you step through these instructions. You can find a list of errors I have encountered (with fixes) in [Possible Errors](docs/Possible%20Errors.md).

There are numerous guides and videos for getting started with Hyperledger some of which were used in writing these instructions. They are listed here for reference:

* [Deploy a blockchain business network to the cloud using the IBM Blockchain Starter Plan](https://www.ibm.com/developerworks/cloud/library/cl-deploy-blockchain-starter-plan-network/) on IBM developerWorks by Sanjay Saxena.
* [Hyperledger Composer Basics, Parts I, II & III](https://www.ibm.com/developerworks/cloud/library/cl-model-test-your-blockchain-network-with-hyperledger-composer-playground/index.html) on IBM developerWorks by Steven Perry.
* [How to Create an Application on Blockchain Using Hyperledger](https://medium.freecodecamp.org/ultimate-end-to-end-tutorial-to-create-an-application-on-blockchain-using-hyperledger-3a83a80cbc71) on Medium freeCodeCamp() by Niharika Singh.
* [Developing a Blockchain Application with Starter Plan](https://developer.ibm.com/tv/blockchain-innovators/#bigc) on developerWorks TV by various people.
* [Hyperledger Blockchain for Business](https://medium.com/swlh/hyperledger-chapter-1-foundation-7ad5bd94d452) on Medium by Moses Sam Paul, this is part 1 of 10 with the others being linked from this chapter.

Finally, this file (**README.md**) and the ones it links to are written using Markdown which you can get a cheatsheet for [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).
