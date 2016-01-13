
var achievements = [
	{
		name: "Just... one... more... click!",
		msg: "Click on Grab Money 1000 times",
		icon: "jo.png",
		isReached: false,
		id: 0
	},
	{
		name: "Getting Started",
		msg: "Buy your first slave",
		icon: "gs.png",
		isReached: false,
		id: 1
	},
	{
		name: "Working Schedule",
		msg: "Build your first factory",
		icon: "ws.png",
		isReached: false,
		id: 2
	},
	{
		name: "Slave Devolution",
		msg: "Lose all of your slaves",
		icon: "sd.png",
		isReached: false,
		id: 3
	},
	{
		name: "Money Corp.",
		msg: "Create your first corporation",
		icon: "mc.png",
		isReached: false,
		id: 4
	},
	{
		name: "Safelane Farm",
		msg: "Invest in your first E-Sports team",
		icon: "sf.png",
		isReached: false,
		id: 5
	},
	

]

function unlockAchievement(n, isNew){
	//unlocks the achievement relative to the number
	if (!achievements[n].isReached) {
		achievements[n].isReached = true;
		if (isNew) {
			displayAchievement(n);
		}
	}
}

function displayAchievement(n){
	// shows a box that describes the achievement
	// with a "close" button, it goes away
	appendToConsole(stringUnlock + "'" + achievements[n].name + "'" + " achievement!");
	notie.alert(1, achievements[n].name + " - " + achievements[n].msg, 2.5);
}


// --------------------------------------- Not used --------------------------------------- //

function getReachedAchievements(){
	// Checks every achievement according to isReached
	// Returns an array with the list of the reached achieves for the page to read
	var achievementIndexList = [];
	for (var i = 0; i < achievement.length; i++) {
		if (achievements[i].isReached) {
			achievementIndexList.push(i);
		}
	}
	return achievementIndexList;
}

function getAchievementWithID(n){
	// Returns the first milestone object that matches the id in input
	// Returns undefined if there are no matches
	for (var i = 0; i < achievements.length; i++) {
		if (achievements[i].id == n) { return achievements[i]; }
	}
	return undefined;
}
