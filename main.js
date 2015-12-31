// JavaScript Document
//Costants

var _SLAVECOST = 50.00;
var _FACTORYCOST = 100.00;
var _COSTMULTIPLIER = 1.09;

var isConsoleOn = true;
var money = 0;
var slave = 0;
var factory = 0;
var slaveMultiplier = 0.01;
var factoryMultiplier = 0.25;
var currentMilestone = 0;

var factoryCost = _FACTORYCOST;

function init(){
	//$("#deleteSave").hide();
	hide("#requestNewFeature");
	hide("#save");
	hide("#load");

	hide("#slave-current");
	hide("#slave-label");
	hide("#slave-get");

	hide("#factory-current");
	hide("#factory-label");
	hide("#factory-get");

	hide("#milestone-label");
	hide("#secretstash-toggle");	// Hides secret stash
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
//---------------

function checkMilestone(){
	if (currentMilestone != milestones.length){
		var milestoneObj = milestones[currentMilestone];
		if (money >= milestoneObj.moneyNeeded && !milestoneObj.isReached) {	
			milestoneObj.isReached = true;
			show("#requestNewFeature");		// Show the request button
		}
	}
}

function requestNewFeature(){									
	hide('#requestNewFeature');
	if (currentMilestone == 0) {			// Add the save and load buttons
		show("#load");
		show("#save");
		appendToConsole(milestones[currentMilestone].msg);
	} else if (currentMilestone == 1) {		// Unlocks the slave and adds a +1/s
		show("#slave-current");
		show("#slave-label");
		show("#slave-get");
		appendToConsole(milestones[currentMilestone].msg);
	} else if (currentMilestone == 2) {		// Add Next Milestone label
		appendToConsole(milestones[currentMilestone].msg);
		show("#factory-current");
		show("#factory-label");
		show("#factory-get");
	} else if (currentMilestone == 3) {		// Add Next Milestone label
		appendToConsole(milestones[currentMilestone].msg);
		show("#milestone-label");
	} else if (currentMilestone == 4) {		// Add Next Milestone label
		appendToConsole(milestones[currentMilestone].msg);
		
	}

	currentMilestone++;						// Update the milestones index	
}

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


	} else if (!isConsoleOn) {
		$("#console").show(0);
		$("#console-toggle").show(0);
		$("#console-clear").show(0);
		//$("#secretstash-toggle").show(0);				// It shouldn't show it

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




// Stock methods

function getFactoryCost (factory) {
	return _FACTORYCOST * Math.pow(_COSTMULTIPLIER, factory);
}

function getEasyNumber(n){
	return parseFloat(n).toFixed(2);
}

function refreshCounters(){
	document.getElementById("money-current").innerHTML = getEasyNumber(money) + "$";
	document.getElementById("slave-current").innerHTML = slave;
	document.getElementById("factory-current").innerHTML = factory;
	document.getElementById("slave-label").innerHTML = "Slave - " + _SLAVECOST + "$";
	document.getElementById("factory-label").innerHTML = "Factory - " + getEasyNumber(factoryCost) + "$";
	document.getElementById("milestone-label").innerHTML = "Next milestone at: " + milestones[currentMilestone].moneyNeeded + "$";
}

function refreshMilestones(n){
	if (n > 0) {
		show("#load");
		show("#save");
	}
	if (n > 1) {
		show("#slave-current");
		show("#slave-label");
		show("#slave-get");
	}
	if (n > 2) {
		show("#factory-current");
		show("#factory-label");
		show("#factory-get");
	}
	if (n > 3) {
		show("#milestone-label");
	}
}

//----------------------------------------------

function saveGame(){
	if (spendMoney(50)) {
		if (getPrompt()) {
			var save = {
		    	money: money,
				slave: slave,
				factory: factory,
				milestones: milestones,
				items: items,
				slaveMultiplier: slaveMultiplier,
				factoryMultiplier: factoryMultiplier,
				factoryCost: factoryCost,
				currentMilestone: currentMilestone,
			}
			localStorage.setItem("save",JSON.stringify(save));
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
		if (typeof savedgame.factoryCost !== "undefined") factoryCost = savedgame.factoryCost;
		if (typeof savedgame.milestones !== "undefined") milestones = savedgame.milestones;
		if (typeof savedgame.items !== "undefined") items = savedgame.items;
		if (typeof savedgame.slaveMultiplier !== "undefined") slaveMultiplier = savedgame.slaveMultiplier;
		if (typeof savedgame.factoryMultiplier !== "undefined") factoryMultiplier = savedgame.factoryMultiplier;
		if (typeof savedgame.currentMilestone !== "undefined") currentMilestone = savedgame.currentMilestone;

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
}, 500);

window.setInterval(function(){
	addFromSlave();
	addFromFactory();
}, 100);