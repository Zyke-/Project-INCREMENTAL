// JavaScript Document
//Costants

var _SLAVECOST = 20.00;
var _FACTORYCOST = 50.00;
var _CORPORATIONCOST = 500.00;
var _ESPORTSCOST = 25000.00;

var _COSTMULTIPLIER = 1.09;

var isConsoleOn = true;
var isAchievementsPageOn = false;
var isHackersBoxOn = false;

var timesClickedCheck1 = false;

var timesClicked = 0;
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
		offsetX: 20,
		speed: 250,
		updateAnimation: false 
	});				

	for (var i = 0; i < stringDivsToHide.length; i++) {
		hide("#" + stringDivsToHide[i]);
	}
	appendToConsole("Game Launched. " + stringGameInfo);
}

init();

// ----------------------------------------- Buying methods ----------------------------------------- //

function buy(n){
	money += n;
	timesClicked++;
	refreshCounters();
}

function spendMoney(n) {
	if (money >= n) {
		money -= n;
		return true;
	} else {
		notie.alert(3, stringEnoughMoney + getEasyNumber(n) + '$.', 2);
		return false;
	}
	return false;
}

function removeMoney(n) {
	money -= n;
}

//---------------

function buySlave(n) {
	if (spendMoney(_SLAVECOST)) {
		slave += n;
		checkForAchievement(1);
	}
	refreshCounters();	
}

function buyFactory(n) {
	factoryCost = getFactoryCost(factory);
	if (spendMoney(factoryCost)){ 
		factory += n;
		checkForAchievement(2);
	}
	refreshCounters();
}

function buyCorporation(n) {
	corporationCost = getCorporationCost(corporation);
	if (spendMoney(corporationCost)){ 
		corporation += n;
		checkForAchievement(4);
	}
	refreshCounters();
}

function buyEsports(n) {
	esportsCost = getEsportsCost(esports);
	if (spendMoney(esportsCost)){ 
		esports += n;
		checkForAchievement(5);
	}
	refreshCounters();
}

function addFromInvestments(){

	money += getIncome(); 
}

function getIncome() {
	var totalToAdd = (slave * slaveMultiplier) + (factory * factoryMultiplier) + (corporation * corporationMultiplier) + (esports * esportsMultiplier);
	return totalToAdd + getHackedMoney(totalToAdd);
}

// ------------------------------------ Refresh and Check methods ----------------------------------- //

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

function checkClickCounter() {
	if (timesClicked >= 1000 && !timesClickedCheck1) {
		timesClickedCheck1 = true;
		checkForAchievement(0);
	}
}

// --------------------------------------- Paging & Boxes methods ------------------------------------ //	

function appendToConsole(appendedText) {	
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

function toggleGamePage(){
	// toggles every open page
	if (isAchievementsPageOn) { toggleAchievementsPage(); }
}

// ---------------------------------------- Save & Load methods -------------------------------------- //

function saveGame(){
	notie.confirm('Are you sure?', 'Yes', 'No',  function() { 
		if (spendMoney(50)) {
			var save = {
				timesClicked: timesClicked,
				timesClickedCheck1: timesClickedCheck1,

		    	money: money,
				slave: slave,
				factory: factory,
				corporation: corporation,
				esports: esports,

				milestones: milestones,
				items: items,
				hackers: hackers,
				achievements: achievements,

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
		} else {

		}
	});
}

function loadGame(){
	notie.confirm('Are you sure?', 'Yes', 'No',  function() { 
		var savedgame = JSON.parse(localStorage.getItem("save"));								// TODO make this a for loop
		if (typeof savedgame.timesClicked !== "undefined") timesClicked = savedgame.timesClicked;
		if (typeof savedgame.timesClickedCheck1 !== "undefined") timesClickedCheck1 = savedgame.timesClickedCheck1;
		
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

		if (typeof savedgame.currentMilestone !== "undefined") currentMilestone = savedgame.currentMilestone;
		if (typeof savedgame.milestones !== "undefined") milestones = savedgame.milestones;
		if (typeof savedgame.items !== "undefined") items = savedgame.items;
		if (typeof savedgame.hackers !== "undefined") hackers = savedgame.hackers;
		if (typeof savedgame.achievements !== "undefined") achievements = savedgame.achievements;
		
		refreshMilestones(currentMilestone);
		if (typeof savedgame.money !== "undefined") money = parseFloat(savedgame.money);
		refreshFromSave();
		refreshCounters();
	});
}

function deleateSaveGame(){
	localStorage.removeItem("save");
	refreshCounters();
}

function refreshCounters(){
	document.getElementById("money-current").innerHTML = getNumberWithCommas(money) + " $";
	document.getElementById("income").innerHTML = getNumberWithCommas(getIncome() * 10 )+ " $/s"

	document.getElementById("slave-current").innerHTML = slave;
	document.getElementById("factory-current").innerHTML = factory;
	document.getElementById("corporation-current").innerHTML = corporation;
	document.getElementById("esports-current").innerHTML = esports;

	document.getElementById("slave-label").innerHTML = "Slave - " + _SLAVECOST + " $";
	document.getElementById("factory-label").innerHTML = "Factory - " + getNumberWithCommas(factoryCost) + " $";
	document.getElementById("corporation-label").innerHTML = "Corporation - " + getNumberWithCommas(corporationCost) + " $";
	document.getElementById("esports-label").innerHTML = "E-Sport Team - " + getNumberWithCommas(esportsCost) + " $";
	
	if (milestones[currentMilestone] != undefined) {
		document.getElementById("milestone-label").innerHTML = "Next milestone at: <strong>" + getNumberWithCommas(milestones[currentMilestone].moneyNeeded) + " $</strong>";
	}

	// Refreshing Tooltips

	$("#slave-current").tooltipster('content', getNumberWithCommas(slave * slaveMultiplier) * 10 + ' $/s');
	$("#factory-current").tooltipster('content', getNumberWithCommas(factory * factoryMultiplier) * 10 + ' $/s');
	$("#corporation-current").tooltipster('content', getNumberWithCommas(corporation * corporationMultiplier) * 10 + ' $/s');
	$("#esports-current").tooltipster('content', getNumberWithCommas(esports * esportsMultiplier) * 10 + ' $/s');
}

function refreshFromSave(){
	if (slave > 0 && !milestones[5].isReached) {
		show("#slave-gc");
		show("#slave-label");
	}
	if (factory > 0) {
		show("#factory-gc");
		show("#factory-label");
	}
	if (corporation > 0) {
		show("#corporation-gc");
		show("#corporation-label");
	}
	if (esports > 0) {
		show("#esports-gc");
		show("#esports-label");
	}
	if (milestones[5].isReached) {
		slave = 0;
		hide("#slave-gc");
	}
	if (milestones[7].isReached) {			// Index 7 is the hackers milestone
		show("#hackers-toggle");
	}

	// TODO refresh for the hackers too
}

// ------------------------------------------- Stock methods ----------------------------------------- //

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

function getNumberWithCommas(x) {
	x = getEasyNumber(x);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

// ------------------------------------------- Timer methods ----------------------------------------- //

window.setInterval(function(){
	refreshCounters();
	checkMilestone();
	checkClickCounter();
}, 1000);

window.setInterval(function(){
	addFromInvestments();
	refreshCounters();
}, 100);



// TODO
/* 

Added shadows to HTML Objects
Made the unreached achievements box Grey
Added Random e-sports team victory 1/8192 chance + 250,000$
Added Hired Hacker achievement "Technically Legal"
Added Hacker Tooltips with their respective info
Implement MDL
Made the slaves label not disappear but changed to "Blocked"

*/