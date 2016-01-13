
var hackers = [
	{
		name: "Jonny K.",
		surname: "Board",
		nick: "T0xic",
		cost: 100000,
		percentBonus: 1,
		isBought: false
	},
	{
		name: "Theb",
		surname: "Estacs",
		nick: "D3stroyER",
		cost: 150000,
		percentBonus: 1,
		isBought: false
	},
	{
		name: "Mike",
		surname: "Homputer",
		nick: "Ox1DE",
		cost: 500000,
		percentBonus: 2,
		isBought: false
	},
	{
		name: "Angelo",
		surname: "Vergara",
		nick: "Farm_Kid",
		cost: 500000,
		percentBonus: 2,
		isBought: false
	},
	{
		name: "Ai J.",
		surname: "Ustowndyu",
		nick: "NME",	// Like in En e my... get it?
		cost: 1000000,
		percentBonus: 2,
		isBought: false
	},
	{
		name: "Markwin",
		surname: "Sdenet",
		nick: "0mega",
		cost: 1000000,
		percentBonus: 3,
		isBought: false
	},

];

function toggleHackersBox() {
	if (isHackersBoxOn) {
		// hides the hackers page
		// Undisplays the hackers
		$("#hackers-box").slideToggle();
	} else {
		// Shows the hackers page on top of the game page
		// Loads the hackers
		displayHackersBox();
		$("#hackers-box").slideToggle();
	}
	isHackersBoxOn = !isHackersBoxOn;
}

function displayHackersBox() {
	$('#hackers-box').empty();

	$('<div/>', {
		'id':'hackers-count',
		'html':'Hackers\' Bonus: <strong>+'  + getHackersBonus() + '%</strong>',
	}).appendTo('#hackers-box');

	for (var i = 0; i < hackers.length; i++) {
		if (!hackers[i].isBought) {
			$('<div/>', {
				'id':'hackers-subbox-inactive',
				'class':'tooltip',
				'html':'<div id="hackers-nick">' + hackers[i].nick + '</div><div id="hackers-cost" onClick="hireHacker(' + i + ')">' + getNumberWithCommas(hackers[i].cost) + ' $' + '</div>',
			}).appendTo('#hackers-box');
		} else {
			$('<div/>', {
				'id':'hackers-subbox-active',
				'html':'<div id="hackers-nick">' + hackers[i].nick + '</div><div id="hackers-tick"><img src="' + pathImg + 'tick-active.png"></div>',
			}).appendTo('#hackers-box');
		}
	}
}

function hireHacker(i) {
	if (spendMoney(hackers[i].cost)) {
		$(this).hide();
		hackers[i].isBought = true;
		displayHackersBox();		// Updates the hackers box

		if (i == 0) {
			unlockAchievement(6, true);
		}
	}
}

// --------------------------------------- Stock Methods --------------------------------------- //

function getHackedMoney(n) {
	var total = 0;
	total = (n * getHackersBonus()) / 100;
	return total;
}

function getHackersBonus() {
	var hacksCount = 0;
	for (var i = 0; i < hackers.length; i++) {
		if (hackers[i].isBought) hacksCount += hackers[i].percentBonus;
	}
	return hacksCount;
}