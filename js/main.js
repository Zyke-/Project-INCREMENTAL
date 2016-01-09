// JavaScript Document
//Costants

var _SLAVECOST = 20.00;
var _FACTORYCOST = 50.00;
var _CORPORATIONCOST = 500.00;
var _ESPORTSCOST = 10000.00;

var _COSTMULTIPLIER = 1.09;

var isConsoleOn = true;
//var isAchievementsPageOn = false;

var money = 0;
var slave = 0;
var factory = 0;
var corporation = 0;
var esports = 0;

var slaveMultiplier = 0.01;
var factoryMultiplier = 0.20;
var corporationMultiplier = 1.00;
var esportsMultiplier = 5.00;

var currentMilestone = 0;

var factoryCost = _FACTORYCOST;
var corporationCost = _CORPORATIONCOST;
var esportsCost = _ESPORTSCOST;

function init(){
	$(".tooltip").tooltipster({ 		// Sets tooltip options
		theme: 'tooltipster-shadow',
		position: 'left', 	
		updateAnimation: false 
	});				

	for (var i = 0; i < stringDivsToHide.length; i++) {
		hide("#" + stringDivsToHide[i]);
	}
	appendToConsole("Game Launched. " + stringGameInfo);
}

init();

//---------------

function buy(n){
	money += n;
	refreshCounters();
}
function spendMoney(n) {
	if (money >= n) {
		money -= n;
		return true;
	} else {
		appendToConsole(stringEnoughMoney + getEasyNumber(n) + "$. " + hideText("FeelsBadMan"));
		return false;
	}
	return false;
}

function removeMoney(n) {
	money -= n;
}

//---------------

function buySlave(n) {
	if (spendMoney(_SLAVECOST)) slave += n;
	refreshCounters();
}
function addFromSlave() {
	money += slave*slaveMultiplier;
	refreshCounters();
}
//---------------

function buyFactory(n) {
	factoryCost = getFactoryCost(factory);
	if (spendMoney(factoryCost)){ 
		factory += n;

	}
	refreshCounters();
}
function addFromFactory() {
	money += factory * factoryMultiplier;
	refreshCounters();
}
//--------------------------

function buyCorporation(n) {
	corporationCost = getCorporationCost(corporation);
	if (spendMoney(corporationCost)){ 
		corporation += n;

	}
	refreshCounters();
}

function addFromCorporation() {
	money += corporation * corporationMultiplier;
	refreshCounters();
}
//------------------------

function buyEsports(n) {
	esportsCost = getEsportsCost(esports);
	if (spendMoney(esportsCost)){ 
		esports += n;
	}
	refreshCounters();
}
function addFromEsports() {
	money += esports * esportsMultiplier;
	refreshCounters();
}
//--------------------------

function checkMilestone(){
	if (currentMilestone != milestones.length){
		var milestoneObj = milestones[currentMilestone];
		if (money >= milestoneObj.moneyNeeded && !milestoneObj.isReached) {	
			milestoneObj.isReached = true;
			show("#requestNewFeature");	
		}
	}
}
function unlock(){
	hide('#requestNewFeature');
	unlockSelect(currentMilestone);
	currentMilestone++;						// Update the milestones index
}

// ------------------------------------------------------------------------------------

function appendToConsole(appendedText) {	// Console-like box for info and milestones
	document.getElementById("console").innerHTML += appendedText + "<br>";
}

function toggleConsole() {
	if (isConsoleOn) {
		$("#console").animate({ "bottom": "-=200px" }, "slow" );
		$("#console-toggle").animate({ "bottom": "-=200px" }, "slow" );
		$("#console-clear").animate({ "bottom": "-=200px" }, "slow" );
		$("#secretstash-toggle").animate({ "bottom": "-=200px" }, "slow" );

		$("#console").delay(100).hide(0);
		$("#console-toggle").delay(100).html("Show Console");		
		$("#console-clear").delay(100);
		$("#secretstash-toggle").delay(100);

	} else {
		$("#console").show(0);
		$("#console-toggle").show(0);
		$("#console-clear").show(0);
		//$("#secretstash-toggle").show(0);				// It shouldn't show it now

		$("#console").delay(100).animate({ "bottom": "+=200px" }, "slow" );		
		$("#console-toggle").delay(100).animate({ "bottom": "+=200px" }, "slow" ).html("Hide Console");
		$("#console-clear").delay(100).animate({ "bottom": "+=200px" }, "slow" );
		$("#secretstash-toggle").delay(100).animate({ "bottom": "+=200px" }, "slow" );
	}
	isConsoleOn = !isConsoleOn;
}

function clearConsole() {
	document.getElementById("console").innerHTML = "";
}

function toggleAchievementsPage(){
	/*if (isAchievementsPageOn) {
		// hides the achieves page
	} else {
		//Shows the achisves page on top of the game page
		$("#achievementsPage").slideToggle();
	}
	isAchievementsPageOn = !isAchievementsPageOn*/

	$("#achievementsPage").slideToggle();		// This method seems to be easier
												// althout it is a bit limited
}

function toggleGamePage(){
	// sets all of the page toggles to TRUE and calls all of their respective 
	// toggle functions so that they hide
}

// --------------------------------------- Stock methods --------------------------------------- //

function getFactoryCost (factory) {
	return _FACTORYCOST * Math.pow(_COSTMULTIPLIER, factory);
}

function getCorporationCost (corporation) {
	return _CORPORATIONCOST * Math.pow(_COSTMULTIPLIER, corporation);
}

function getEsportsCost (esports) {
	return _ESPORTSCOST * Math.pow(_COSTMULTIPLIER, esports);
}

function getEasyNumber(n){
	return parseFloat(n).toFixed(2);
}

function refreshCounters(){
	document.getElementById("money-current").innerHTML = getEasyNumber(money) + "$";

	document.getElementById("slave-current").innerHTML = slave;
	document.getElementById("factory-current").innerHTML = factory;
	document.getElementById("corporation-current").innerHTML = corporation;
	document.getElementById("esports-current").innerHTML = esports;

	document.getElementById("slave-label").innerHTML = "Slave - " + _SLAVECOST + "$";
	document.getElementById("factory-label").innerHTML = "Factory - " + getEasyNumber(factoryCost) + "$";
	document.getElementById("corporation-label").innerHTML = "Corporation - " + getEasyNumber(corporationCost) + "$";
	document.getElementById("esports-label").innerHTML = "E-Sport Team - " + getEasyNumber(esportsCost) + "$";
	
	if (milestones[currentMilestone] != undefined) {
	document.getElementById("milestone-label").innerHTML = "Next milestone at: " + milestones[currentMilestone].moneyNeeded + "$";
	}

	// Refreshing Tooltips

	$("#slave-label").tooltipster('content', getEasyNumber(slave * slaveMultiplier) + '$/s');
	$("#factory-label").tooltipster('content', getEasyNumber(factory * factoryMultiplier) + '$/s');
	$("#corporation-label").tooltipster('content', getEasyNumber(corporation * corporationMultiplier) + '$/s');
	$("#esports-label").tooltipster('content', getEasyNumber(esports * esportsMultiplier) + '$/s');
}

//----------------------------------------------

function saveGame(){
	if (spendMoney(50)) {
		if (getPrompt()) {
			var save = {
		    	money: money,
				slave: slave,
				factory: factory,
				corporation: corporation,
				esports: esports,

				milestones: milestones,
				items: items,

				slaveMultiplier: slaveMultiplier,
				factoryMultiplier: factoryMultiplier,
				corporationMultiplier: corporationMultiplier,
				esportsMultiplier: esportsMultiplier,

				factoryCost: factoryCost,
				corporationCost: corporationCost,
				esportsCost: esportsCost,

				currentMilestone: currentMilestone,
			}
			localStorage.setItem("save", JSON.stringify(save));
			appendToConsole(stringSavedGame);
		}
	}
}

function loadGame(){
	if (getPrompt()) {
		var savedgame = JSON.parse(localStorage.getItem("save"));
		if (typeof savedgame.money !== "undefined") money = savedgame.money;
		if (typeof savedgame.slave !== "undefined") slave = savedgame.slave;
		if (typeof savedgame.factory !== "undefined") factory = savedgame.factory;
		if (typeof savedgame.corporation !== "undefined") corporation = savedgame.corporation;
		if (typeof savedgame.esports !== "undefined") esports = savedgame.esports;
		
		if (typeof savedgame.factoryCost !== "undefined") factoryCost = savedgame.factoryCost;
		if (typeof savedgame.corporationCost !== "undefined") corporationCost = savedgame.corporationCost;
		if (typeof savedgame.esportsCost !== "undefined") esportsCost = savedgame.esportsCost;
		
		if (typeof savedgame.slaveMultiplier !== "undefined") slaveMultiplier = savedgame.slaveMultiplier;
		if (typeof savedgame.factoryMultiplier !== "undefined") factoryMultiplier = savedgame.factoryMultiplier;
		if (typeof savedgame.corporationMultiplier !== "undefined") corporationMultiplier = savedgame.corporationMultiplier;
		if (typeof savedgame.esportsMultiplier !== "undefined") esportsMultiplier = savedgame.esportsMultiplier;
		
		if (typeof savedgame.milestones !== "undefined") milestones = savedgame.milestones;
		if (typeof savedgame.items !== "undefined") items = savedgame.items;
		if (typeof savedgame.currentMilestone !== "undefined") currentMilestone = savedgame.currentMilestone;

		checkAchievement();
		
		refreshMilestones(currentMilestone);
		refreshCounters();
	}
}

function deleateSaveGame(){
	localStorage.removeItem("save");
	refreshCounters();
}

function getPrompt(){
	return confirm("Are you sure?");
}

function hide(obj) {
	$(obj).hide();
}

function show(obj) {
	$(obj).show("fast");
}

function hideText(text){
	return "<span class='white'>" + text + "</span>";
}

//------------------------------------------------------
window.setInterval(function(){
	refreshCounters();
	checkMilestone();
	
}, 1000);

window.setInterval(function(){
	addFromSlave();
	addFromFactory();
	addFromCorporation();
	addFromEsports();
}, 100);