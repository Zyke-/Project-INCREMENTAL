
var hackers = [
	{
		name: "Jonny K. Board",
		nick: "T0xic",
		cost: 50,
		isBought: true
	},
	{
		name: "Theb Estacs",
		nick: "D3stroyER",
		cost: 100,
		isBought: false
	},
	{
		name: "Mike Homputer",
		nick: "Ox1DE",
		cost: 200,
		isBought: false
	},
	{
		name: "Angelo Vergara",
		nick: "Farm_Kid",
		cost: 400,
		isBought: false
	},
	{
		name: "Ai J. Ustowndyu",
		nick: "NME",	// Like in Enemy... get it?
		cost: 1000,
		isBought: false
	},
	{
		name: "Markwin Sdenet",
		nick: "0mega",
		cost: 2000,
		isBought: false
	},

];

function getHackedMoney(n) {
	var total = 0;
	var hacksCount = 0;
	for (var i = 0; i < hackers.length; i++) {
		if (hackers[i].isBought) {
			hacksCount++;
		}
	}
	total = n * (hacksCount / 100);
	return total;
}

function hireHacker(i) {
	hackers[i].isBought = true;
	displayHackerBox();
}

