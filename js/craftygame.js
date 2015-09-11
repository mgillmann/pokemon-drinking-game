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
				// Create players, move to Pallet Town
				playersArray[i] = Crafty.e("2D, DOM,"+players[i].starter)
										.attr({x:325, y:1800});
				playersArray[i].name = players[i].name;
				// Set the players initial space on the board to pallet town
				playersArray[i].space = 0;
				Crafty.circle(0,0,10);
				//playersArray[i].starter = players[i].starter;
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
			  		diceNum = rollDice();
			  		currentSpace = playersArray[currentPlayer].space;
			  		// Update the player space
			  		newSpace = currentSpace + diceNum;
			  		playersArray[currentPlayer].space = newSpace;
			  		// TODO: move players
			  		//       do space
			  		//       move this code
			  		$("#diceBlock").html(diceNum);
			  		$("#playerSpace").html(playersArray[currentPlayer].name + ": " + playersArray[currentPlayer].space);
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

function rollDice() 
{	// Do we need player params or what space the player is on?
	// Also in special cases where players move half spaces/double spaces we need to do something else
	return Crafty.math.randomInt(1,6);
}

function pokemonFight(p1, p2) {
	// if 1 pokemon is stronger than the other we need to roll 2 dice
}

// Move horizontally on the board
function moveX(currentSpace, numberOfSpaces) {

}

// Move vertically on the board
function moveY(currentSpace, numberOfSpaces) {

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