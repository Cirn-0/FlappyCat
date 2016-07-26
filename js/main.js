var Main = function(game){

};

Main.prototype = {

	create: function() {
		
		this.tileSpeed = -350;

		this.score = -100;

		this.createScore();

		this.tileWidth = this.game.cache.getImage('tile').width;
		this.tileHeight = this.game.cache.getImage('tile').height;

		this.game.stage.backgroundColor = '479cde';

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
        stateText = game.add.text(this.game.world.centerX, this.game.world.centerY,' ', { font: '84px Arial', fill: '#B20F0F' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;		

		this.createPlayer(); 
	
		this.pemitter = this.game.add.emitter(0, 0, 2000);
		this.pemitter.makeParticles('explode');
		this.player.addChild(this.pemitter);
		this.pemitter.y = 10;
		this.pemitter.x = -40;
		this.pemitter.lifespan = 1500;
		this.pemitter.gravity = 30;
		this.pemitter.maxParticleSpeed = new Phaser.Point(-100, 60);
		this.pemitter.minParticleSpeed = new Phaser.Point(-800, -60);

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 
        this.game.input.onDown.add(this.jump, this);

		this.platforms = this.game.add.group();
		this.platforms.enableBody = true;
		this.platforms.createMultiple(50, 'tile');

		this.breakables = this.game.add.group();
		this.breakables.enableBody = true;
		this.breakables.createMultiple(20, 'tile2');

		this.addPlatform();

		this.timer = game.time.events.loop(3000, this.addPlatform, this);

	    this.emitter = game.add.emitter(0, 0, 50);
	    this.emitter.makeParticles('explode');
	    this.emitter.gravity = 200;
	    
	    this.soundButton = this.game.add.button(20, 10, 'note', this.toggleMute, this);
		this.soundButton.fixedToCamera = true;
			
		this.pauseButton = this.game.add.sprite(100, 10, 'pause', 'pause-button');
		this.pauseButton.fixedToCamera = true;
		this.pauseButton.inputEnabled = true;
		this.pauseButton.fixedToCamera = true;
		
		this.pauseButton.events.onInputUp.add(
			function() {
    			this.game.paused = true;
			}, 
		this);
		
		this.game.input.onDown.add(
			function() {
    			if (this.game.paused) this.game.paused = false;
			}, 
		this);

	},

	update: function() {

		this.game.physics.arcade.overlap(this.player, this.platforms, this.gameOver, null, this);
		this.game.physics.arcade.collide(this.player, this.breakables, this.collideTile, null, this);
		this.game.physics.arcade.collide(this.breakables, this.platforms);
        
        if (this.player.angle < 20)
            this.player.angle += 1; 
            
        this.pemitter.emitParticle();
        
	},
	
//	togglePause: function() {
//		if (!this.game.paused) this.game.paused = true;
//		else this.game.paused = false;
//	},
	
	toggleMute: function() {
    	if (!this.game.sound.mute) this.game.sound.mute = true;
    	else this.game.sound.mute = false;
	},
	
    jump: function() {
        this.player.body.velocity.y = -350;
        this.game.add.tween(this.player).to({angle: -20}, 100).start();
        this.j = game.add.audio('jump');
        this.j.play();
        this.j.volume -= 0.7;
    },	

	gameOver: function(){

		this.particleBurst(this.player.body.position.x + (this.player.body.width / 2), this.player.body.position.y + (this.player.body.height / 2));
		this.player.kill();
		
		this.b = game.add.audio('blast');
        this.b.play();
        this.b.volume -= 0.7;

        stateText.text = "YOU DIED"; 
        game.world.bringToTop(stateText);
        stateText.visible = true;

		this.game.time.events.add(2000, function(){
			this.game.state.start("GameOver");
		}, this);

	},

	createPlayer: function(){

		this.player = this.game.add.sprite(this.game.world.centerX / 2, this.game.world.centerY, 'player');

		this.player.anchor.setTo(0.5, 0.5);

		this.game.physics.arcade.enable(this.player);

		this.player.body.gravity.y = 1000;

		this.player.body.collideWorldBounds = true;

		this.player.body.immovable = true;

	},

	addTile: function(x, y, immovable){

		if(immovable){
	    	var tile = this.platforms.getFirstDead();
		} else {
			var tile = this.breakables.getFirstDead();
		}

	    tile.body.gravity.y = 0;
	    tile.reset(x, y);
	    tile.body.velocity.x = this.tileSpeed; 
	    tile.body.immovable = immovable;

	    tile.checkWorldBounds = true;
	    tile.outOfBoundsKill = true;	
	},

	addPlatform: function(){

		this.tileSpeed -= 40;

		var tilesNeeded = Math.ceil(this.game.world.height / this.tileHeight);

	    var hole = Math.floor(Math.random() * (tilesNeeded - 3)) + 1;

	    for (var i = 0; i < tilesNeeded; i++){
	        if (i != hole && i != hole + 1 && i != hole + 2 && i != hole + 3){
	        	this.addTile(this.game.world.width - this.tileWidth, i * this.tileHeight, true); 
	        } else {
	        	this.addTile(this.game.world.width - this.tileWidth, i * this.tileHeight, false); 
	        }	    	
	    }

	    this.incrementScore();

	},

	collideTile: function(player, tile){
		tile.body.gravity.y = 2000;
		
		this.g = game.add.audio('glass');
        this.g.play();
        this.g.volume -= 0.7;
	},

	particleBurst: function(x, y){

	    this.emitter.x = x;
	    this.emitter.y = y;

		this.emitter.start(true, 2000, null, 500);
	},

	createScore: function(){

		var scoreFont = "70px Arial";

		this.scoreLabel = this.game.add.text(300, 50, "0", {font: scoreFont, fill: "#000000"}); 
		this.scoreLabel.anchor.setTo(0.5, 0.5);
		this.scoreLabel.align = 'center';

	},

	incrementScore: function(){

		this.score += 100;   
		this.scoreLabel.text = this.score; 		

	},
};