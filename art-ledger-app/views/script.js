/* This is the API of the REST server used for making HTTP requests against. */
const RESTAPI = "https://art-ledger.mybluemix.net/api/";

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
 * inputJSON is the data to send in the POST.
 * Async response is sent to a callback function and
 * the response text written to 'elementId'.
 */
function httpPOST(uri, elementId, inputJSON) {
   var xhttp=new XMLHttpRequest();

   if (DEBUGMODE) {
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
