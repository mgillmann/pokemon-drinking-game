
Game = {
	// Initialize and start our game
	start: function() {
		Crafty.init(2216,2216);
		Crafty.load(["./wall-old.png"])
		Crafty.background("url('./wall-old.png')");
		Crafty.canvas.init();

		Crafty.sprite("./gamepieces.jpg", {bulbasaur:[7,7,50,50]});
		Crafty.sprite("./gamepieces.jpg", {charmander:[398,10,50,50]});
		Crafty.sprite("./gamepieces.jpg", {squirtle:[135,75,50,50]});
		Crafty.sprite("./gamepieces.jpg", {pikachu:[523,265,50,50]});
		// var bulbasaur = Crafty.e("2D, DOM, bulbasaur");
		// var charmander = Crafty.e("2D, DOM, charmander");
		// var squirtle = Crafty.e("2D, DOM, squirtle");
		var pikachu = Crafty.e("2D, DOM, pikachu");



		// var player = Crafty.e();
		// player.addComponent("2D, DOM, Color")
		// player.color("green").attr({w:30, h:30});	
	}
}