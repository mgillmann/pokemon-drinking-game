// OPTIONS
// let's start with 4 players for simplicity sake
var gameOptions = {
	"MAX_PLAYERS": 4
};

var playersArray = [];

var requiredSquares = [];

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
			//alert("menu!");
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

	playGame: function() {
		Crafty.enterScene("game");
	},

	initPlayers: function(numPlayers, players) {
		//TODO figure out how to resize image and zoom in on players
		Crafty.scene("game", function() {
			Crafty.background("url('./wall-old.png')");
			$("#menu").hide();
			for(i = 0;i < numPlayers;i++) {
				// Create players, move to Pallet Town
				playersArray[i] = Crafty.e("2D, DOM,"+players[i].starter)
										.attr({x:325, y:1800});
				playersArray[i].name = players[i].name;
				//playersArray[i].starter = players[i].starter;
			}
		});
		Game.playGame();
		// Play the game after the players are created
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
