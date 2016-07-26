var GameTitle = function(game){};

GameTitle.prototype = {

	create: function(){
		
		this.game.stage.backgroundColor = '479cde';
		var playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, "playbutton", this.startGame, this);
		playButton.anchor.setTo(0.5,0.5);
		
	},

	startGame: function(){
		this.game.state.start("Main");
	}

}