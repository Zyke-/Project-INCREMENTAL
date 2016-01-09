
var achievements = [
	{
		name: "Getting Started",
		msg: "Buy your first slave",
		icon: "gs.png",
		isReached: false
	},
	{
		name: "Working Schedule",
		msg: "Build your first factory",
		icon: "ws.png",
		isReached: false
	},
	{
		name: "Slave Devolution",
		msg: "Lose all of your slaves",
		icon: "sd.png",
		isReached: false
	},
	{
		name: "Money Corp.",
		msg: "Create your first corporation",
		icon: "mc.png",
		isReached: false
	},
	{
		name: "Safelane Farm",
		msg: "Invest on your first E-Sports team",
		icon: "sf.png",
		isReached: false
	},
	{
		name: "",
		msg: "",
		icon: ".png",
		isReached: false
	},

		
]

function unlockAchievement(n, isNew){
	//unlocks the achievement relative to the number
	if (!achievement[n].isReached) {
		achievement[n].isReached = true;
		if (isNew) {
			displayAchievement(n);
		}
	}
}

function checkAchievement(){
	// when loading a save
	// loops from 0 to the achievements list length to check everyone with unlockAchievement
	// Always passes isNew = true
	for (var i = 0; i < achievement.length; i++) {
		unlockAchievemen(i, true);
	}
}

function displayAchievement(n){
	// shows a box that describes the achievement
	// with a "close" button, it goes away
	alert(achievement[n].name + " - " + achievement[n].msg);
}

function getReachedAchievements(){
	// when opening the achevements menu
	// checks every achievement according to isReached
	// returns an array with the list of the reached achieves for the page to read
	var achievementIndexList = [];
	for (var i = 0; i < achievement.length; i++) {
		if (achievement[i].isReached) {
			achievementIndexList.push(i);
		}
	}
	return achievementIndexList;
}