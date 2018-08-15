# Step 9 (Optional): Using the Composer Query Language and REST APIs

The Hyperledger native query language can filter results returned using criteria and can be invoked in transactions to perform operations, such as updating or removing assets on result sets.

Queries in Hyperledger Composer are written in a bespoke query language. You can find a description of the language in [Hyperledger Composer Query Language](https://hyperledger.github.io/composer/v0.16/reference/query-language.html). For a detailed tutorial on queries refer to the [Queries Tutorial using the Composer Query language and REST APIs](https://hyperledger.github.io/composer/v0.16/tutorials/queries) page of the Hyperledger Composer documentation.

In this step, we will extend the application we have built to demonstrate queries. The queries used by the Transaction Processor logic are defined in a file which must be called queries.qry and goes in the **art-ledger** project root directory. Each query entry defines the resources and criteria against which the query is executed. Here are the queries we'll define for **art-ledger**. You'll see two of the queries take a parameter `_$artist` and `_$owner`. These must be provided through the API when called.

```
query selectArtWorks {
  description: "Select all art works"
  statement:
      SELECT org.artledger.ArtWork
}

query selectArtWorkByArtist {
  description: "Select all art works based on their artist"
  statement:
      SELECT org.artledger.ArtWork
          WHERE (artist==_$artist)
}

query selectArtWorkByOwner {
  description: "Select all art works based on their owner"
  statement:
      SELECT org.artledger.ArtWork
          WHERE (owner==_$owner)
}

query selectArtWorkWithHighValue {
  description: "Select art works based on value"
  statement:
      SELECT org.artledger.ArtWork
          WHERE (currentValue > 1000)
}
```

To activate the queries you simply need to regenerate the **.bna** file and restart the REST server as detailed in [Step 7 (Optional): Update the Business Network](../docs/07%20Update%20Business%20Network.md). Remember to bump up the version number in `package.json`.

Once you have followed these steps you should see an extra set of query APIs in the REST API application as shown.

![query apis](../images/Query%20APIs.png "query apis")

For those that need an ID enter for an Artist e.g.:
```
resource:org.artledger.Artist#ARTIST01
```
or for an owner e.g.:
```
resource:org.artledger.Artist#OWNER01
```

The front-end application includes a page to test out this interface if you prefer to try queries that way.

![query apis ui](../images/Query%20APIs%20UI.png "query apis ui")
