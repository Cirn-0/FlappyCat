var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
		
		this.game.stage.backgroundColor = '479cde';
		var loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loading');
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);
		this.game.load.image('tile', 'assets/img/tile.png'); 
		this.game.load.image('tile2', 'assets/img/tile2.png');
		this.game.load.image('explode', 'assets/img/explode.png'); 
		this.game.load.image('player', 'assets/img/player.png');
		this.game.load.image('star', 'assets/img/star.png');
		this.game.load.image('note', 'assets/img/note.png');
		this.game.load.image('pause', 'assets/img/pause.png');
		this.game.load.image('playbutton', 'assets/img/playbutton.png');
		this.game.load.image('gameover', 'assets/img/gameover.png');
		this.game.load.image('retry', 'assets/img/retry.png');
		this.game.load.audio('jump', 'assets/sound/jump.wav');
		this.game.load.audio('glass', 'assets/sound/glass.wav');
		this.game.load.audio('blast', 'assets/sound/blast.wav');
		
	},

	create: function() {
//		this.game.sound.setDecodedCallback([ jump, glass, blast ], start, this);
		this.game.state.start("GameTitle");	
	},
	
//	start: function() {
//		this.game.state.start("GameTitle");		
//	}
}