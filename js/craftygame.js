// OPTIONS
// let's start with 4 players for simplicity sake
// debug option to display debug values on the front end (potential option)
var gameOptions = {
	"MAX_PLAYERS": 4,
	"DEBUG" : false
};

var playersArray = [];

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
		/*Crafty.sprite("./gamepieces_alpha.png", {
											bulbasaur:[7,7,50,50],
											charmander:[398,10,50,50],
											squirtle:[135,75,50,50],
											pikachu:[523,265,50,50]
										});*/



		//Test Sprite animation
		//Tiles are 65x65
		var assetsObj = {
    "sprites": {
        "./gamepieces_alpha.png": {
            tile: 65,
            tileh: 65,
            // We give names to three individual images
            map: {
                bulbasaur: [0, 0]
            }
        }
    }
};

	  Crafty.load(assetsObj);
		Crafty.enterScene("menu");
	},

	initPlayers: function(numPlayers, players) {
		//TODO figure out how to resize image and zoom in on players
		Crafty.scene("game", function() {
			//Crafty.background("url('./wall-old.png')");
			$("#menu").hide();
			Crafty.e("2D, Canvas, Image").image("./wall-old.png");
			currentNumPlayers = numPlayers;
			for(i = 0;i < numPlayers;i++) {
				// Create players, move to Pallet Town
				playersArray[i] = Crafty.e("2D, Canvas,"+players[i].starter+",SpriteAnimation,Tween").reel("idle",1000,[[0,0],[1,0],[2,0],[3,0]])
										.attr({x:325, y:1825}).animate("idle", -1);
				playersArray[i].name = players[i].name;
				// Set the players initial space on the board to pallet town
				playersArray[i].space = 0;
				// Keep the players initial status effect
				playersArray[i].effect = "none";
				// Idk what circle does
				//Crafty.circle(0,0,10);
			}

		});

		Game.playGame();
		// Play the game after the players are created
	},

	playGame: function() {
		Crafty.enterScene("game");
		Crafty.viewport.clampToEntities = false;
		Crafty.viewport.follow(playersArray[currentPlayer],-800,-800);
		//Crafty.viewport.centerOn(playersArray[0], 3000);
		//  On key press roll the dice
		// Temporary code, testing stuff.
		// On site press "R", look at top left of screen
		Crafty.e("2D, Canvas, Color")
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
			  		nextPlayer(player);
			  	}
			  });
	}
};
