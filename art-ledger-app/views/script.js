/* This is the API of the REST server used for making application HTTP requests against. */
const RESTAPI = "https://art-ledger.mybluemix.net/api/";

/* This is the API of the REST server used for making application HTTP requests against. */
const RESTQUERYAPI = "https://art-ledger.mybluemix.net/api/queries/";

/* This is the API of the REST server used for making network HTTP requests against. */
const NETWORKAPI = "https://blockchain-starter.ng.bluemix.net/api/v1/networks/";

/* This is the namespace used for the organisation. */
const NAMESPACE = "org.artledger";

/* Set this to 'true' to write to the console rather than read/write the ledger. */
const DEBUGMODE = false;

/* getParticipantsInfo()
 * Get the information on all participants of type 'pType' in the ledger.
 * 'elementId' is the where the callback function writes to on return.
*/
function getParticipantsInfo(pType, elementId) {
  httpGET(RESTAPI+pType, elementId);
}

/* getParticipantInfo()
 * Get the information on a single particpant of type 'pType' in the ledger.
 * 'elementId' is the where the callback function writes to on return.
 * 'formId' is the form where the input data is obtained from.
*/
function getParticipantInfo(pType, elementId, formId) {
  var id = document.forms[formId]["participantId"].value;

  httpGET(RESTAPI+pType+"/"+id, elementId);
}

/* createParticipantInfo()
 * Create the information for a new participant of type 'pType' in the ledger.
 * 'elementId' is the where the callback function writes to on return.
 * 'formId' is the form where the input data is obtained from.
 * Actual information will vary depending on the 'pType'.
*/
function createParticipantInfo(pType, elementId, formId) {
  var input = document.forms[formId];
  var inputJSON;
  var obj;

  switch(pType) {
    case "Artist":
      obj = {
        $class: NAMESPACE+"."+pType,
        artistId: input["artistId"].value,
        firstName: input["firstName"].value,
        lastName:input["lastName"].value};
        break;
    case "Owner":
      var dealer = false;
      if (input["dealer"].value == "yes") {
        dealer = true;
      }
      obj = {
        $class: NAMESPACE+"."+pType,
        ownerId: input["ownerId"].value,
        firstName: input["firstName"].value,
        lastName: input["lastName"].value,
        isDealer: dealer};
        break;
    default:
      console.log("no such participant type");
  }
  httpPOST(RESTAPI+pType, elementId, JSON.stringify(obj));
}

/* getAssetsInfo()
* Get the information on all assets of type 'aType' in the ledger.
* 'elementId' is the where the callback function writes to on return.
*/
function getAssetsInfo(aType, elementId) {
  httpGET(RESTAPI+aType, elementId);
}

/* getAssetInfo()
* Get the information on a single asset of type 'aType' in the ledger.
* 'elementId' is the where the callback function writes to on return.
* 'formId' is the form where the input data is obtained from.
*/
function getAssetInfo(aType, elementId, formId) {
  var id = document.forms[formId]["assetId"].value;

  httpGET(RESTAPI+aType+"/"+id, elementId);
}

/* createAssetInfo()
* Create the information for a new asset of type 'aType' in the ledger.
* 'elementId' is the where the callback function writes to on return.
* 'formId' is the form where the input data is obtained from.
* Actual information will vary depending on the 'aType'.
*/
function createAssetInfo(aType, elementId, formId) {
  var input = document.forms[formId];
  var obj;
  var auction;
  var thisArtist="resource:"+NAMESPACE+".Artist#"+input["artist"].value;
  var thisOwner="resource:"+NAMESPACE+".Owner#"+input["owner"].value;
  var url = RESTAPI+aType;

  if (aType == "ArtWork") {
    auction = false;
    if (input["underAuction"].value == "yes") {
      auction = true;
    }

    obj = {
      $class: "org.artledger.ArtWork",
      artId: input["artId"].value,
      type: input["artType"].value,
      description: input["description"].value,
      currentValue: Number(input["currentValue"].value),
      underAuction: auction,
      artist: thisArtist,
      owner: thisOwner};
    httpPOST(RESTAPI+aType, elementId, JSON.stringify(obj));
  }
}

/* transactAsset()
 * Excute a transaction against an asset. The transaction is of type 'tType'.
 * 'elementId' is the where the callback function writes to on return.
 * 'formId' is the form where the input data is obtained from.
 * Actual information will vary depending on the 'aType'.
*/
function transactAsset(tType, elementId, formId) {
  var input = document.forms[formId];
  var obj;

  switch(tType) {
    case "SellArtWork":
      obj = {
        $class: NAMESPACE+"."+tType,
        newValue: Number(input["sellAmount"].value),
        artWork: "resource:org.artledger.ArtWork#"+input["artId"].value,
        newOwner: "resource:org.artledger.Owner#"+input["newOwner"].value,
        transactionId: ""};
      break;
    case "AuctionArtWork":
      obj = {
        $class: NAMESPACE+"."+tType,
        artWork: "resource:org.artledger.ArtWork#"+input["artId"].value,
        transactionId: ""};
      break;
    case "BidOnArtWork":
      obj = {
        $class: NAMESPACE+"."+tType,
        bidAmount: Number(input["bidAmount"].value),
        artWork: "resource:org.artledger.ArtWork#"+input["artId"].value,
        transactionId: ""};
      break;
      default:
        console.log("no such transaction type");
  }
  httpPOST(RESTAPI+tType, elementId, JSON.stringify(obj));
}

/* getNodeStatus()
 * Get the information on nodes in the network.
 * 'elementId' is the where the callback function writes to on return.
 * 'formId' is the form where the input data is obtained from.
*/
function getNodeStatus(elementId, formId) {
  var channelId = document.forms[formId]["networkId"].value;
  var auth;

  auth = document.forms[formId]["key"].value + ":" + document.forms[formId]["secret"].value;
  httpSecureGET(NETWORKAPI+channelId+"/nodes/status", elementId, auth);
}

/* getChannelStatus()
 * Get the information on a channel in the network.
 * 'elementId' is the where the callback function writes to on return.
 * 'formId' is the form where the input data is obtained from.
*/
function getChannelStatus(elementId, formId) {
  var networkId = document.forms[formId]["networkId"].value;
  var channelId = document.forms[formId]["channelId"].value;
  var auth;

  auth = document.forms[formId]["key"].value + ":" + document.forms[formId]["secret"].value;
  httpSecurePOST(NETWORKAPI+networkId+"/channels/"+channelId, elementId, auth, "{}");
}

/* quertyAssets()
* Query assets with query 'qType' in the ledger.
* 'elementId' is the where the callback function writes to on return.
*/
function queryAssets(qType, elementId) {
  httpGET(RESTQUERYAPI+qType, elementId);
}

/* queryAssetsByParticipant()
 * Query assets with query 'qType' in the ledger.
 * 'pType' is the participant type.
 * 'elementId' is the where the callback function writes to on return.
 * 'formId' is the form where the input data is obtained from.
*/
function queryAssetsByParticipant(qType, pType, elementId, formId) {
  var id = document.forms[formId]["participantId"].value;

  if (pType == 'Artist') {
    id = "?artist=resource%3Aorg.artledger.Artist%23"+id;
  } else {
    id = "?owner=resource%3Aorg.artledger.Owner%23"+id;
  }
  httpGET(RESTQUERYAPI+qType+"/"+id, elementId);
}

/* httpGET
 * Make an asynchrous GET request to the specified 'uri'.
 * Async response is sent to a callback function and
 * the response text written to 'elementId'.
 */
function httpGET(uri, elementId) {
   var xhttp=new XMLHttpRequest();

   if (DEBUGMODE) {
     console.log("GET: ",uri);
   } else {
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
         callback(this, elementId);
       }
     };
     xhttp.open("GET", uri, true);
     xhttp.send();
   }
}

/* httpPOST
 * Make an asynchrous POST request to the specified 'uri'.
 * 'inputJSON' is the data to send in the POST.
 * Async response is sent to a callback function and
 * the response text written to 'elementId'.
 */
function httpPOST(uri, elementId, inputJSON) {
   var xhttp=new XMLHttpRequest();

   if (DEBUGMODE) {
     console.log("HEADER: Content-type: application/json");
     console.log("POST: ",uri, "Data: ", inputJSON);
   } else {
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
         callback(this, elementId);
       }
     };
     xhttp.open("POST", uri, true);
     xhttp.setRequestHeader("Content-type", "application/json");
     xhttp.send(inputJSON);
  }
}

/* httpSecureGET
 * Make an asynchrous GET request to the specified 'uri'.
 * Uses basic authentication by passing an authorization
 * header containing a base64-encoded 'username:password' string.
 * 'auth' is the username and password in the form 'username:password'
 * which is encoded by this function.
 * Async response is sent to a callback function and
 * the response text written to 'elementId'.
 */
function httpSecureGET(uri, elementId, auth) {
   var xhttp=new XMLHttpRequest();
   var encodedAuth = "Basic "+btoa(auth);

   if (DEBUGMODE) {
     console.log("HEADER: ", "Authorization "+encodedAuth);
     console.log("GET: ",uri);
   } else {
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
         callback(this, elementId);
       }
     };
     xhttp.open("GET", uri, true);
     xhttp.setRequestHeader("Authorization", encodedAuth);
     xhttp.send();
   }
}

/* httpSecurePOST
 * Make an asynchrous POST request to the specified 'uri'.
 * 'inputJSON' is the data to send in the POST.
 * Uses basic authentication by passing an authorization
 * header containing a base64-encoded 'username:password' string.
 * 'auth' is the username and password in the form 'username:password'
 * which is encoded by this function.
 * Async response is sent to a callback function and
 * the response text written to 'elementId'.
 */
function httpSecurePOST(uri, elementId, auth, inputJSON) {
   var xhttp=new XMLHttpRequest();
   var encodedAuth = "Basic "+btoa(auth);

   if (DEBUGMODE) {
     console.log("HEADER: Content-type: application/json");
     console.log("HEADER: ", "Authorization "+encodedAuth);
     console.log("POST: ",uri);
   } else {
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
         callback(this, elementId);
       }
     };
     xhttp.open("POST", uri, true);
     xhttp.setRequestHeader("Content-type", "application/json");
     xhttp.setRequestHeader("Authorization", encodedAuth);
     xhttp.send(inputJSON);
   }
}

/* callback()
 * Callback function called when http request (POST or GET) completes.
 * 'xhttp' is return from request and 'elementId' is where to write
 * response text.
*/
function callback(xhttp, elementId) {
  var myObj = JSON.parse(xhttp.responseText);

  document.getElementById(elementId).innerHTML =
    xhttp.responseText;
}
