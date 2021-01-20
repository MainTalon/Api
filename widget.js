
window.addEventListener("load",main);

function main(){




Affichage();

}




function Affichage() {

	this.divIcon =	document.createElement("div");
	this.divIcon.setAttribute("id", "divIcon");

	var Api = document.createElement("a");
	Api.innerHTML = "Key : ";
	document.body.appendChild(Api);

	this.ApiKeyTextField = document.createElement("input");
	this.ApiKeyTextField.setAttribute("id", "ApiKeyTextField");
 	this.ApiKeyTextField.setAttribute("size", "40");
 	this.ApiKeyTextField.setAttribute("type", "text");


	this.ChampTexte = document.createElement("input");
	this.ChampTexte.setAttribute("id", "ChmpTxt");
	this.ChampTexte.setAttribute("size", "15");
	this.ChampTexte.setAttribute("type", "text");

	this.divP = document.createElement("div")


	var pseudo = document.createElement("a");
	pseudo.innerHTML = "Nom d'invocateur : ";

	this.divP.appendChild(pseudo);

	this.divP.appendChild(ChampTexte);

	var button = document.createElement("button");
	button.setAttribute("id", "Clic");
	button.innerHTML = "Valider";

	this.divP.appendChild(button);

	this.click = button.addEventListener("click", event => load(this.n));
	//button.setAttribute("size", "10");


	document.body.appendChild(this.ApiKeyTextField);
	document.body.appendChild(this.divP);
	document.body.appendChild(this.divIcon);	
}

function load() {
	var supprime =document.getElementById("actuelle") 
	var supprimeD =document.getElementById("lvlactuelle")
	if(supprime){
		supprime.remove();
		supprimeD.remove();
	}
	this.nom = document.getElementById("ChmpTxt").value;
	this.ApiKey = document.getElementById("ApiKeyTextField").value;

	console.log(name);
	this.ApiKey = "RGAPI-04d3f7ff-9123-40e1-91f6-7ed8d22236cd";
	GetDateName(this.nom, this.ApiKey);
	//GetDataId(newId, this.ApiKey);
	
}

function GetDataId(id, ApiKey) {

	var request = new XMLHttpRequest();

	var url = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + id + "?api_key=" + ApiKey;
	console.log(url);

	request.open('GET', url, true)
	request.onload = function() {

	  var data = JSON.parse(this.response);

	  if (request.status >= 200 && request.status < 400) {
	  	if(data[0].queueType == "RANKED_FLEX_SR"){
		  	var tier = data[1].tier;
	 	 	var rank = data[1].rank;
	 	 	var Classement = document.createElement("a");
	 	 	Classement.setAttribute("id","actuelle");
		 	Classement.innerHTML = "Ranked Solo/Duo : " + tier + " " + rank + " [" + data[1].leaguePoints + "] " + " ( Win : " + data[1].wins + " / Lose : " + data[1].losses + ")" ;
	 	 	document.getElementById("divIcon").appendChild(Classement);
	  	} else {
	  		var tier = data[0].tier;
	 	 	var rank = data[0].rank;
	 	 	var Classement = document.createElement("a");
		 	Classement.innerHTML = "Ranked Solo/Duo : " + tier + " " + rank + " [" + data[0].leaguePoints + "] " + " ( Win : " + data[0].wins + " / Lose : " + data[0].losses + ")" ;
	 	 	document.getElementById("divIcon").appendChild(Classement);

	  	}
	  } else {
	    console.log('error');
	  }
	}

	request.send();
}

function GetDateName(name, ApiKey) {

	var request = new XMLHttpRequest();

	var url = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name + "?api_key=" + ApiKey;
	console.log(url);

	request.open('GET', url, true);
	request.onload = function() {

	  var data = JSON.parse(this.response);

	  if (request.status >= 200 && request.status < 400) {
	  	var lvlView = document.createElement("p");
	  	lvlView.setAttribute("id","lvlactuelle");
	  	lvlView.innerHTML = data.name + " level :" + data.summonerLevel;
	  	document.getElementById("divIcon").appendChild(lvlView);

	  	console.log(url);

	  	LoadChampionImage(data.profileIconId);
	  	GetDataId(data.id, ApiKey); 

	  } else {
	  	if(request.status == 403){
				console.log("Forbidden");
				alert("Acces Forbidden ! (API Key as expired)");
		} else {
			console.log(request.status);
		}
	  }
	}

	request.send();
}
 function LoadChampionImage(name) {	

 	var url = 'http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/' + name + '.png';	

	document.getElementById("divIcon").style.backgroundImage = "url(" + url + ")";
 	console.log(divIcon.style.backgroundImage);
	
}
