var maxEWinChance = 50; 	// It's the maximus the maxEWinChance can get to (maxEWinChance / 4096)

var events = [
	{
		name: "E-Sports Team Win",
		msg: "One of your teams just came first in a tournament! You get a percentage of the prize: ",
		moneyExtra: 250000,
		id: 1
	},
];


function displayEvent(n){
	var e = getEventWithID(n);

	appendToConsole(e.msg + getNumberWithCommas(e.moneyExtra));
	notie.alert(1, e.name + "! +" + getNumberWithCommas(e.moneyExtra) + " $", 2.5);
	buy(e.moneyExtra);
}

// --------------------------------------- Stock Methods --------------------------------------- //

function getEventWithID(n) {
	for (var i = 0; i < events.length; i++) {
		if (events[i].id == n) return events[i];
	}
	return undefined;
}
