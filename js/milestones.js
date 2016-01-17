
var milestones = [
	{
		moneyNeeded: 10,		//Allowes to save and load games
		isReached: false,
		msg: "The game developer finally replies to one of your emails and add a nice little feature.", 
	},
	{
		moneyNeeded: 50,		// Adds slaves
		isReached: false,
		msg: "You decide to buy a slave to generate money for you."		
	},
	{		
		moneyNeeded: 100,		// Adds Factories
		isReached: false,
		msg: "A slave just isn't enough. You decide to buy an entire factory."		
	},
	{
		moneyNeeded: 1000,		//Shows the next milestone
		isReached: false,
		msg: "In the newest release of the game, your next milestone is now displayed."			
	},
	{
		moneyNeeded: 10000,		// Adds Corporation
		isReached: false,
		msg: "Why play your workers when investors can pay for you?"			
	},
	{
		moneyNeeded: 50000,		// Lose all your slaves - pay a 30k fine
		isReached: false,
		msg: "Some guy comes to your office and tells you that, apparently, having slaves is illegal! You lose all of them and have to play a 30.000$ fine.",			
		moneyLost: 30000
	},
	{
		moneyNeeded: 100000,	// Adds E-Sports Investiments
		isReached: false,
		msg: "Investing in these new E-Sports seems very promising!"		
	},
	{
		moneyNeeded: 500000,	// Adds Hackers
		isReached: false,
		msg: "A shady looking guy aproaches you. He is a hacker and he is willing to help you make more money. For a price."			
	},
	{
		moneyNeeded: 10000000,	// Secret stash: special items - Type E to show
		isReached: false,
		msg: "Something strange just happenEd... ------------------ Not impemented yet"			
	}
]

function unlockSelect (n) {
	appendToConsole("<strong>" + milestones[n].msg + "</strong>");

	if (n == 0) {
		show("#load");
		show("#save");

	} else if (n == 1) {
		show("#slave-gc");
		show("#slave-label");

	} else if (n == 2) {		
		show("#factory-gc");
		show("#factory-label");

	} else if (n == 3) {		
		show("#milestone-label");

	} else if (n == 4) {		
		show("#corporation-gc");
		show("#corporation-label");

	} else if (n == 5) {	
		slave = 0;
		hide("#slave-gc");
		removeMoney(milestones[n].moneyLost);

	} else if (n == 6) {
		show("#esports-gc");
		show("#esports-label");

	} else if (n == 7) {
		show("#hackers-toggle");
	}
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
	if (n > 4) {
		show("#corporation-current");
		show("#corporation-label");
		show("#corporation-get");
	}
	if (n > 5) {	
		checkForAchievement(3);
		slaves = 0;
		//hide("#slave-current");
		hide("#slave-label");
		hide("#slave-get");
		removeMoney(milestones[currentMilestone].lostMoney);
		document.getElementById("slave-current").innerHTML = 0;				// Just to be sure the field updates i'm doing it manually here
	}
	if (n > 6) {	
		show("#esporsts-current");
		show("#esporsts-label");
		show("#esporsts-get");
	} 
}
