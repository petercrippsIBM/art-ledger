/* getParticipantsInfo()
 * Get the information on all participants of type 'pType' in the ledger.
*/
function getParticipantsInfo(pType, cFunction) {
  var xhttp;
  url = "https://art-ledger.mybluemix.net/api/"+pType;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this, "participantsInfo");
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

/* getParticipantInfo()
 * Get the information on a single particpant of type 'pType' in the ledger.
*/
function getParticipantInfo(pType, cFunction) {
  var xhttp;
  var url = "https://art-ledger.mybluemix.net/api/"+pType+"/";
  var id = document.forms["getParticipant"]["participantId"].value;

  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this, "participantInfo");
    }
  }
  xhttp.open("GET", url+id, true);
  xhttp.send();
}

/* createParticipantInfo()
 * Create the information for a new participant of type 'pType' in the ledger.
 * Actual information will vary depending on the 'pType'.
*/
function createParticipantInfo(pType, cFunction) {
  var xhttp;
  var url = "https://art-ledger.mybluemix.net/api/"+pType;
  var input = document.forms["newParticipant"];
  var obj;
  var inputJSON;

  switch(pType) {
      case "Artist":
        obj = {
          $class: "org.artledger.Artist",
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
          $class: "org.artledger.Owner",
          ownerId: input["ownerId"].value,
          firstName: input["firstName"].value,
          lastName: input["lastName"].value,
          isDealer: dealer};
          break;
      default:
          console.log("no such participant type");
  }
  inputJSON = JSON.stringify(obj);
  // console.log(inputJSON);

  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this, "newParticipantInfo");
    }
  }

  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(inputJSON);

}

/* getAssetsInfo()
 * Get the information on all assets of type 'aType' in the ledger.
*/
function getAssetsInfo(aType, cFunction) {
  var xhttp;
  url = "https://art-ledger.mybluemix.net/api/"+aType;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this, "assetsInfo");
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

/* getAssetInfo()
 * Get the information on a single asset of type 'aType' in the ledger.
*/
function getAssetInfo(aType, cFunction) {
  var xhttp;
  var url = "https://art-ledger.mybluemix.net/api/"+aType+"/";
  var id = document.forms["getAsset"]["assetId"].value;

  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this, "assetInfo");
    }
  }
  xhttp.open("GET", url+id, true);
  xhttp.send();
}

/* createAssetInfo()
 * Create the information for a new asset of type 'aType' in the ledger.
 * Actual information will vary depending on the 'aType'.
*/
function createAssetInfo(aType, cFunction) {
  var xhttp;
  var url = "https://art-ledger.mybluemix.net/api/"+aType;
  var input = document.forms["newAsset"];
  var obj;
  var inputJSON;
  var auction;
  var thisArtist="resource:org.artledger.Artist#"+input["artist"].value;
  var thisOwner="resource:org.artledger.Owner#"+input["owner"].value;

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

  inputJSON = JSON.stringify(obj);
  // console.log(inputJSON);

  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this, "newAssetInfo");
    }
  }

  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(inputJSON);
}

/* transactAsset()
 * Excute a transaction against an asset. The transaction is of type 'tType'.
*/
function transactAsset(tType, cFunction) {
  var xhttp;
  var url = "https://art-ledger.mybluemix.net/api/"+tType;
  var input = document.forms["sellAsset"];
  var obj;
  var inputJSON;

  obj = {
    $class: "org.artledger.SellArtWork",
    newValue: Number(input["sellAmount"].value),
    artWork: "resource:org.artledger.ArtWork#"+input["artId"].value,
    newOwner: "resource:org.artledger.Owner#"+input["newOwner"].value,
    transactionId: ""};

  inputJSON = JSON.stringify(obj);
  console.log(inputJSON);

  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this, "sellAssetInfo");
    }
  }
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(inputJSON);
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
