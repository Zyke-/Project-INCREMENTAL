
var hackers = [
	{
		name: "Jonny K.",
		surname: "Board",
		nick: "T0xic",
		cost: 100000,
		percentBonus: 1,
		dex: "Jonny is a young hacker with little experience and an even smaller potential, but he is still trying to pay the bills with the most entretaining job he could ever find. Hacking.",
		isBought: false
	},
	{
		name: "Theb",
		surname: "Estax",
		nick: "D3stroyER",
		cost: 175000,
		percentBonus: 1,
		dex: "Some may call him an 'absolute douchebag', but Theb knows his way when it comes to computers and stealing from his parents bank account.",
		isBought: false
	},
	{
		name: "Mike",
		surname: "Homputer",
		nick: "Ox1DE",
		cost: 500000,
		percentBonus: 2,
		dex: "Mr. Homputer is a promising guy who, apparently, lives on Greenland. 'The connection here is alright', he confirms in an interview.",
		isBought: false
	},
	{
		name: "Angelo",
		surname: "Vergara",
		nick: "Farm_Kid",
		cost: 1000000,
		percentBonus: 2,
		dex: "From the philippines, this guy only knows how to play videogames, and he's not even that good.",
		isBought: false
	},
	{
		name: "Ai J.",
		surname: "Ustowndyu",
		nick: "NME",
		cost: 10000000,
		percentBonus: 2,
		dex: "Ai is a talented hacker with an ego the size of house. He does, however, always get the job done, on time and with no extra commissions.",
		isBought: false
	},
	{
		name: "Markwin",
		surname: "Sdenet",
		nick: "0mega",
		cost: 350000000,
		percentBonus: 3,
		dex: "Markwin is an experienced guy that made a name for himsel when he single-handedly took down the Fäcebook website. For about 3 months.",
		isBought: false
	},
	{
		name: "Yuki",
		surname: "Hawk",
		nick: "Laser_Hawk",
		cost: 650000000,
		percentBonus: 3,
		dex: "A notorious hacker best known for his risky moves. Not really the guy you would like to lend money to.",
		isBought: false
	},
	{
		name: "?",
		surname: "",
		nick: "hw0",
		cost: 850000000,
		percentBonus: 5,
		dex: "Nobody knows hw0's real identity, some say he is a cyborg, others reckon he is an experiment led by a secret government. All we know for sure is that he is extremely expensive.",
		isBought: false
	},
];

function toggleHackersBox() {
	if (isHackersBoxOn) {
		// hides the hackers page and the opened infoboxes
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
			// Append the Hackers-subbox
			$('<div/>', {
				'class':'tooltip HSI' + i,
				'html':'<div id="hackers-nick">' + hackers[i].nick + '</div><div id="hackers-cost" onClick="hireHacker(' + i + ')">' + getNumberWithCommas(hackers[i].cost) + ' $' + '</div>',
			}).appendTo('#hackers-box');

			$('.HSI' + i).tooltipster({
				'multiple': true,
				'content': $(getHackerInfoHTML(i)),
				'position': 'left',
				'offsetX': 30,
				'animation':'grow',
			});

		} else {
			$('<div/>', {
				'class':'tooltip HSA' + i,
				'html':'<div id="hackers-nick">' + hackers[i].nick + '</div><div id="hackers-tick"><img src="' + pathImg + 'tick-active.png"></div>',
			}).appendTo('#hackers-box');
				
			$('.HSA' + i).tooltipster({
				'multiple': true,
				'content': $(getHackerInfoHTML(i)),
				'position': 'left',
				'offsetX': 30,
				'animation':'grow',
			});
		}

	}
}

//-----------------------

function confrontHackers(savedHackers) {
	// When loading hackers from a previous save, it only loads wether
	// they were bought or not, instead of overwriting the whole object.
	for (var i = 0; i < hackers.length; i++) {
		if (savedHackers[i] != undefined) {
			hackers[i].isBought = savedHackers[i].isBought;
		}
	}
}

function toggleHackersInfobox(i) {
	// hide any aldeay opened infobox
	// Displays the infobox
	if (isHackersInfoxOn) {
		hideHackersInfobox();

		$('<div/>', {
			'id':'hackers-infobox',
			'type':'hidden',
			'html':'<p>' + hackers[i].name + '</p>',
		}).appendTo('#block');

		show('#hackers-infobox');
	} else {
		hideHackersInfobox();
	}
	isHackersInfoxOn = !isHackersInfoxOn;
}

function hideHackersInfobox(){
	// Empties it and Hides it when closing the hackers tab or updating the information inside
	$('#hackers-infobox').empty();
	hide('#hackers-infobox');
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

function getHackerInfoHTML(i) {
	var html = "<div id='hackers-infobox'>";				// TODO Add an image filed for the hacker data
	html += "<p class='hacker-data'>Name: " 		+ "<strong>" 	+ hackers[i].name + " " + hackers[i].surname + "</strong>" + "</p>";
	html += "<p class='hacker-data'>Bonus: " 		+ "<strong>+" 	+ hackers[i].percentBonus	+ "%</strong>" + "</p>";
	html += "<p class='hacker-data'>Description: " 	+ "<span class='hacker-data-description'>" + hackers[i].dex + "</span>"+	"</p>";
	html += "</div>"

	return html;
}