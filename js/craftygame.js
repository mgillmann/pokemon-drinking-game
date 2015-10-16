// OPTIONS
// let's start with 4 players for simplicity sake
// debug option to display debug values on the front end (potential option)
var gameOptions = {
	"MAX_PLAYERS": 4,
	"DEBUG" : false
};

var playersArray = [];

// Pokegyms we need the player to always stop at.
// If player square >= required square
// 		playerSq = rSq;
//      do required square logic
// else playerSq = square+diceroll
// combine this with the spaces array?
var requiredSquares = [];


// Start the game with the 1st player
var currentPlayer = 0;

// The number of players for the current game
var currentNumPlayers = 0;

Game = {
	// Initialize and start our game
	createMenu: function() {
		Crafty.scene("menu", function(){
			$("#menu").show();
			// TODO: take player # input
			var select = document.getElementById('playerNum');

			// We need to remove all the options when the options get updated and recreate the select
			
			// Create the select
			for(var i = 0; i<gameOptions.MAX_PLAYERS; i++) {
				select.options[select.options.length] = new Option(i+1, i+1);
			}
			$("#maxPlayers").html("Max Players: " + gameOptions.MAX_PLAYERS);
			
			// TODO
			// player name entry
			// player character select: dropdown
			// player color select: dropdown of colors
		});
	},

	start: function() {
		Game.createMenu();
		Crafty.init(2216, 2216, document.getElementById('game')).canvas.init();
		// Game pieces for the 4 pokemon you can potentially have
		// Need to create background colors per user for these to sit on (MAYBE?)
		Crafty.sprite("./gamepieces_alpha.png", {
											bulbasaur:[7,7,50,50],
											charmander:[398,10,50,50],
											squirtle:[135,75,50,50],
											pikachu:[523,265,50,50]
										});
		Crafty.enterScene("menu");
	},

	initPlayers: function(numPlayers, players) {
		//TODO figure out how to resize image and zoom in on players
		Crafty.scene("game", function() {
			Crafty.background("url('./wall-old.png')");
			$("#menu").hide();
			currentNumPlayers = numPlayers;
			for(i = 0;i < numPlayers;i++) {
				// Need to create players with crafty as well
				// Create players, move to Pallet Town
				playersArray[i] = Crafty.e("2D, DOM,"+players[i].starter)
										.attr({x:325, y:1825});
				playersArray[i].name = players[i].name;
				// Set the players initial space on the board to pallet town
				playersArray[i].space = 0;
				// Keep the players initial status effect
				playersArray[i].effect = "none";
				// Idk what circle does
				Crafty.circle(0,0,10);
			}
		});
		Game.playGame();
		// Play the game after the players are created
	},

	playGame: function() {
		Crafty.enterScene("game");
		//  On key press roll the dice
		// Temporary code, testing stuff.
		// On site press "R", look at top left of screen
		Crafty.e("2D, DOM, Color")
			  .bind("KeyDown", function(e) {
			  	if(e.key ==  Crafty.keys.R) {
			  		player = playersArray[currentPlayer];
			  		diceNum = rollDice(player);
			  		moveSpaces(diceNum, player);
			  		// TODO: move players
			  		//       do space
			  		//       move this code
			  		$("#diceBlock").html(diceNum);
			  		$("#playerSpace").html(player.name + ": " + player.space);


			  		// This will probably be better if we define every space (with x,y coords) on the board since we'll need to 
			  		// display the rules for each square/what each square does
			  		
			  		
			  		//currentY = player.y;
			  		//currentX = player.x;
			  		// Need to find determine how to move in a smaller rectangle each time
			  		//if (y < )
			  		//newY = currentY - (190*diceNum);
			  		//player.attr({x:325, y:newY});
			  		console.log(player);
			  		// Go to the next player
			  		nextPlayer();
			  	}
			  });
	}	
};

// Select number of players
// TODO - add/remove inputs depending on selected players
function generateMenu(numPlayers) {
	// Generate the form:
	for(i=0;i<numPlayers;i++) {
	    $('#formTable').append(
	        '<tr>'+
	            '<td><input type="text" class="pname" id="player_'+i+'" name="player_'+i+'"></input></td>'+
	            '<td><select class="pstarter" id="starter_'+i+'" name="starter_'+i+'">'+
	                '<option></option>'+
	                '<option value="squirtle">Squirtle</option>'+
	                '<option value="charmander">Charmander</option>'+
	                '<option value="bulbasaur">Bulbasaur</option>'+
	            '</select></td>'+
	        '</tr>'
	    );
	}
}

function updateOptions(maxPlayers) {
	// TODO handle non-numerics
	//		add more options
	gameOptions.MAX_PLAYERS = maxPlayers;
	$("#maxPlayers").html("Max Players: " + gameOptions.MAX_PLAYERS);
	Crafty.enterScene("menu");
}

function rollDice(player) 
{	// Do we need player params or what space the player is on?
	// Also in special cases where players move half spaces/double spaces we need to do something else
	diceVal = Crafty.math.randomInt(1,6);
	if (player.effect == "slow") {
		// do we want to use floor or ceil?  hmmmmm
		diceVal = Math.floor(diceVal / 2);
	}
	if (player.effect == "fast") {
		diceVal = diceVal * 2;
	}
	// Need to create an if statement if we need to stay on the same space but roll dice
	return diceVal;
}

function pokemonFight(p1, p2) {
	// if 1 pokemon is stronger than the other we need to roll 2 dice
	// TODO
}

// Move the player, need to tweak x/y values a bit
function moveSpaces(numberOfSpaces, player) {
	newSpace = player.space + numberOfSpaces;
	// Need to add logic for abra teleport

	// Update the player space
	player.space = newSpace;
	moveTo = spaces[newSpace];
	player.attr({x:moveTo.x, y:moveTo.y});
}


// This is the last thing that will happen at the end of a players turn
function nextPlayer() {
	// since the current player starts at 0, we want to subtract 1 
	// so the current number reflects actual current player values
	actualCurrentPlayers = currentNumPlayers-1;
	if (currentPlayer >= actualCurrentPlayers) {
		// Go back to player 1
		currentPlayer = 0;
	} else {
		// Increment the player
		currentPlayer++;
	}
}

// putting this at the bottoms since it'll be fairly large
// All spaces coords, space attribute for reference only
var spaces = [
	{	
		"space":"0",
		"x":325,
		"y":1800
	},
	{	
		"space":"1",
		"x":325,
		"y":1610
	},
	{	
		"space":"2",
		"x":325,
		"y":1420
	},
	{	
		"space":"3",
		"x":325,
		"y":1230
	},
	{	
		"space":"4",
		"x":325,
		"y":1040
	},
	{	
		"space":"5",
		"x":325,
		"y":850
	},
	{	
		"space":"6",
		"x":325,
		"y":660
	},
	{	
		"space":"7",
		"x":325,
		"y":470
	},
	{	
		"space":"8",
		"x":325,
		"y":280
	},
	{	
		"space":"9",
		"x":515,
		"y":280
	},
	{	
		"space":"10",
		"x":705,
		"y":280
	},
	{	
		"space":"11",
		"x":895,
		"y":280
	},
	{	
		"space":"12",
		"x":1085,
		"y":280
	},
	{	
		"space":"13",
		"x":1275,
		"y":280
	},
	{	
		"space":"14",
		"x":1465,
		"y":280
	},
	{	
		"space":"15",
		"x":1655,
		"y":280
	},
	{	
		"space":"16",
		"x":1845,
		"y":280
	},
	{	
		"space":"17",
		"x":1845,
		"y":470
	},
	{	
		"space":"18",
		"x":1845,
		"y":660
	},
	{	
		"space":"19",
		"x":1845,
		"y":850
	},
	{	
		"space":"20",
		"x":1845,
		"y":1040
	},
	{	
		"space":"21",
		"x":1845,
		"y":1230
	},
	{	
		"space":"22",
		"x":1845,
		"y":1420
	}
];



