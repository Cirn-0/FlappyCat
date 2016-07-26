var GameOver = function(game){};

GameOver.prototype = {
	
  	create: function(){
  		this.game.stage.backgroundColor = '479cde';
  		var gameOverTitle = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'gameover');
			gameOverTitle.anchor.setTo(0.5, 0.5);
		var playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY - 250, 'retry', this.playTheGame, this);
			playButton.anchor.setTo(0.5, 0.5);
			
	},
	
	playTheGame: function(){
		this.game.state.start("Main");
	}
	
}