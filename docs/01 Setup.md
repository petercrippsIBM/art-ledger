# Step 1: Setup a Development Environment
We need a number of tools installed locally to develop our network. The best place to get instructions for how to do setup of an environment is from [here](https://console.bluemix.net/docs/services/blockchain/develop_install.html#installing-a-development-environment). To install the prerequisites follow the instructions [here](https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html). These give information for both Ubuntu and macOS.

If you need to *uninstall* an environment that you previously set up follow the instructions [here](https://hyperledger.github.io/composer/latest/installing/uninstall-dev-env).

What follows mostly assumes you are using macOS because that's the OS I use (currently v10.13.5). For macOS you also need to download Xcode (for the C++ compiler, used to install native Node.js modules) from the [AppStore](https://itunes.apple.com/bm/app/xcode/id497799835?mt=12) if you don't have it. This is a **BIG** application and for me took several hours to download so you may want to kick that off and then go to bed or for a long walk.

**Important Note** You can get a number of problems if you don't load compatible versions of these tools. In particular take note of the fact you need to install the LTS (long term support) version of Node using the command: `nvm use --lts`. If you don't do this you can get problems later on when trying to use tools such as **yo**. See the section on [possible errors](../docs/Possible%20Errors.md) for more information.

**Another Important Note** When installing the Hyperledger Composer tools (i.e. `composer-cli`, `composer-rest-server` and `generator-hyperledger-composer`) it is important to make sure they are all at the same version. Rather than risking it specify the version when you are installing. For example:

```
$ npm install -g composer-cli@0.19.5
```

**Version 0.19.5 of the Hyperledger Composer tools are the latest versions that work with Hyperledger Fabric 1.1, currently used on IBM Blockchain Starter Plan.**

You will also need an editor to create new files. I use `Atom` which you can get [here](https://atom.io). You can also get a plugin for `Atom` for working with `composer` which will give you syntax highlighting that you can get [here](https://github.com/hyperledger/composer-atom-plugin). Another good editor is `VScode` which you can get [here](https://code.visualstudio.com/download).

Finally when working with IBM Cloud you need to install the command line tools for interacting with it. You can get these from [Getting started with IBM Cloud CLI](https://console.bluemix.net/docs/cli/reference/bluemix_cli/get_started.html). Note that the command line name has recently changed from `bx` to `ibmcloud`. These instructions will use the new name but the previous one should work in the same way.

We're going to first set up the directory structure locally that you will build your Hyperledger business network project files in. Once you have generated those files you can push them into GitHub where they can be put under source control and shared.

We can use [`Yeoman`](http://yeoman.io/) to create the recommended directory structure for business networks. You should have Yeoman installed already if you followed the instructions for setting up your development environment but if not can get it [here](http://yeoman.io/). Instructions for using Yeoman to build the right directory structure as well as a description of what all the parts are can be found in the IBM Cloud documentation [here](https://ibm-blockchain.github.io/develop/business-network/bnd-create).

To create a project directory change to the directory you want to add your project files to and run this command:
```
$ yo hyperledger-composer:businessnetwork
```
You will be prompted with a series of questions about your business network which I answered as follows resulting in the files shown being created:
```
Welcome to the business network generator
? Business network name: art-ledger
? Description: Art Ledger Network
? Author name:  P Cripps
? Author email: pete_cripps@uk.ibm.com
? License: Apache-2.0
? Namespace: org.artledger
? Do you want to generate an empty template network? No: generate a populated sample network
   create package.json
   create README.md
   create models/org.artledger.cto
   create permissions.acl
   create .eslintrc.yml
   create features/sample.feature
   create features/support/index.js
   create test/logic.js
   create lib/logic.js
```

This creates a new directory called (in my case) `art-ledger`. From now on this will be referred to as the *project root directory* in these instructions.

Now that you have a skeletal directory structure created with `yo` (albeit with no real content yet) you can add it to GitHub so you can share it and keep it under source control. You first need to initialise the project directory as being a Git repository following [these instructions](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository).

You can now push your project to GitHub using the Git CLI as described [here](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/).

Once you have your development environment set up you can check all is as it should be by issuing the commend:
```
$ npm list -g --depth=0
```
which shows what packages you have installed. You should see something like this.

![npm list](../images/NPM%20List.png "npm list")

Now go to [Step 2: Create IBM Cloud Services](../docs/02%20Cloud%20Services.md).
