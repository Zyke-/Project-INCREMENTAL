
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
	{
		name: "Technically Legal",
		msg: "Hire your first hacker",
		icon: "tl.png",
		isReached: false,
		id: 6
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

function checkForAchievement(n) {
	for (var i = 0; i < achievements.length; i++) {
		if(!achievements[i].isReached && achievements[i].id == n){
			unlockAchievement(i, true);
		}
	}	
}

function confrontAchievement(savedAchievement) {
	// When loading achievement from a previous save, it only loads wether
	// they were reached or not, instead of overwriting the whole object.
	for (var i = 0; i < achievements.length; i++) {
		if (savedAchievement[i] != undefined) {
			achievements[i].isReached = savedAchievement[i].isReached;
		}
	}
}


function displayAchievement(n){
	// shows a box that describes the achievement
	// with a "close" button, it goes away
	appendToConsole("<strong>" + stringUnlock + "'" + achievements[n].name + "'" + " achievement!</strong>");
	notie.alert(1, achievements[n].name + " - " + achievements[n].msg, 2.5);
}

function toggleAchievementsPage(){
	if (isAchievementsPageOn) {
		// hides the achieves page
		// Undisplays the achievements
		$("#achievementsPage").slideToggle();
	} else {
		// Shows the achisves page on top of the game page
		// Loads the achievements
		displayAchievementList();
		$("#achievementsPage").slideToggle();
	}
	isAchievementsPageOn = !isAchievementsPageOn	
}

function displayAchievementList() {
	$('#achievementsPage').empty();
	for (var i = 0; i < achievements.length; i++) {
		var a = achievements[i];
		if (a.isReached){
			$('<div/>', {
			    'id':'achievBox',
			    'html':'<div id="achievSubbox" class="achievCompleted"><div id="achievIcon"><img src="' + pathImg + a.icon + '"></div><div id="achievName">' +  a.name + '</div><div id="achievMsg">' + a.msg + '</div></div>'
			}).appendTo('#achievementsPage');	
		} else {
			$('<div/>', {
			    'id':'achievBox',
			    'html':'<div id="achievSubbox" class="achievIncomplete"><div id="achievIcon"><img src="' + pathImg + 'bw' + a.icon + '"></div><div id="achievName">' + stringUnknown + '</div><div id="achievMsg">' + stringUnknown + '</div></div>'
			}).appendTo('#achievementsPage');		

		}
	}	
}

// --------------------------------------- Stock Methods --------------------------------------- //

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
