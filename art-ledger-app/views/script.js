/* getParticipantsInfo()
 * Get the information on all participants of type 'pType' in the ledger.
*/
function getParticipantsInfo(pType, cFunction) {
  var xhttp;
  url = "https://art-ledger.mybluemix.net/api/"+pType;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
function cbGetParticipantsInfo(xhttp) {
  var myObj = JSON.parse(xhttp.responseText);

  document.getElementById("participantsInfo").innerHTML =
    xhttp.responseText;
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
      cFunction(this);
    }
  }
  xhttp.open("GET", url+id, true);
  xhttp.send();
}
function cbGetParticipantInfo(xhttp) {
  var myObj = JSON.parse(xhttp.responseText);

  document.getElementById("participantInfo").innerHTML =
    xhttp.responseText;
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
  console.log(inputJSON);

  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  }

  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(inputJSON);

}
function cbCreateParticipantInfo(xhttp) {
  var myObj = JSON.parse(xhttp.responseText);

  document.getElementById("newParticipantInfo").innerHTML =
    xhttp.responseText;
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
      cFunction(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
function cbGetAssetsInfo(xhttp) {
  var myObj = JSON.parse(xhttp.responseText);

  document.getElementById("assetsInfo").innerHTML =
    xhttp.responseText;
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
      cFunction(this);
    }
  }
  xhttp.open("GET", url+id, true);
  xhttp.send();
}
function cbGetAssetInfo(xhttp) {
  var myObj = JSON.parse(xhttp.responseText);

  document.getElementById("assetInfo").innerHTML =
    xhttp.responseText;
}
