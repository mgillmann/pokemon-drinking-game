// Page utils
// Form handlers etc.


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
		diceVal = Math.ceil(diceVal / 2);
		// Remove effect
		player.effect = "none";
	}
	if (player.effect == "fast") {
		diceVal = diceVal * 2;
		// Remove effect
		player.effect = "none";
	}
	// Need to create an if statement if we need to stay on the same space but roll dice
	return 1;
}

function pokemonFight(p1, p2) {
	// if 1 pokemon is stronger than the other we need to roll 2 dice
	// TODO
}

// Move the player, need to tweak x/y values a bit
function moveSpaces(numberOfSpaces, player) {
	oldSpace = player.space;
	newSpace = player.space + numberOfSpaces;

	newSpace = handleSpecialTiles(oldSpace, newSpace, player)


	// Add movement animation?
	// Update the player space
	player.space = newSpace;
	moveTo = spaces[newSpace];
	player.attr({x:moveTo.x, y:moveTo.y});
}


// This is the last thing that will happen at the end of a players turn
function nextPlayer(player) {
	// handle players with extra turns
	if(player.effect == "extraTurn") {
		// Remove the effect
		player.effect = "none";
		// Stay on the current player, they get another turn
		return;
	}

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

// Pokegyms we need the player to always stop at.
// If player square >= required square
// 		playerSq = rSq;
//      do required square logic
// else playerSq = square+diceroll
// combine this with the spaces array?

function handleSpecialTiles(oldSpace, newSpace, player) {
	// Player wins, don't move call win command
	if (newSpace > 71) {
		return 71;
		// TODO return win screen/animation
	}

	// First Abra teleport logic
	if(newSpace == 11 && oldSpace < 11) {
		return 28;
	}
	// Second Abra teleport logic
	if(newSpace == 28 && (oldSpace > 11 && oldSpace < 28)) {
		return 11;
	}

	if(newSpace == 2 || newSpace == 41) {
		player.effect = "extraTurn";
	}

	if(newSpace == 3) {
		// TODO give all other players the slow effect
	}

	if(newSpace == 20) {
		player.effect = "fast";
	}

	if(newSpace == 4) {
		// TODO 
		// update the player sprite 
		// we shouldn't have to create a new entity here?
		player.sprite("pikachu");
		player.starter = "pikachu";
	}

	// TODO add more special tiles
	return newSpace;
}


