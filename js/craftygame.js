// OPTIONS
var gameOptions = {
	"MAX_PLAYERS": 4
};

Game = {
	// Initialize and start our game
	createMenu: function() {
		Crafty.defineScene("menu", function(){
			// TODO: take player # input
			var select = document.getElementById('playerNum');

			// We need to remove all the options when the options get updated and recreate the select
			
			// Create the select
			for(var i = 0; i<gameOptions.MAX_PLAYERS; i++) {
				select.options[select.options.length] = new Option(i+1, i);
			}
			$("#maxPlayers").html("Max Players: " + gameOptions.MAX_PLAYERS);
			generateMenu(gameOptions.MAX_PLAYERS);
			// TODO
			// player name entry
			// player character select: dropdown
			// player color select: dropdown of colors
			//alert("menu!");
		});
	},

	start: function() {
		Game.createMenu();
		Crafty.init(2216, 2216, document.getElementById('game'));
		//Crafty.load(["./wall-old.png"])
		Crafty.background("url('./wall-old.png')");
		Crafty.canvas.init();
		// Game pieces for the 4 pokemon you can potentially have
		// Need to create background colors per user for these to sit on
		Crafty.sprite("./gamepieces.jpg", {bulbasaur:[7,7,50,50]});
		Crafty.sprite("./gamepieces.jpg", {charmander:[398,10,50,50]});
		Crafty.sprite("./gamepieces.jpg", {squirtle:[135,75,50,50]});
		Crafty.sprite("./gamepieces.jpg", {pikachu:[523,265,50,50]});

		Crafty.enterScene("menu");

		// Displays the sprites
		// var bulbasaur = Crafty.e("2D, DOM, bulbasaur");
		// var charmander = Crafty.e("2D, DOM, charmander");
		// var squirtle = Crafty.e("2D, DOM, squirtle");
		// var pikachu = Crafty.e("2D, DOM, pikachu");	
	},

	initPlayers: function() {
		//TODO create all players
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
