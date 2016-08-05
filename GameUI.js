var GameUI = cc.Layer.extend({

	scoreText:null,
	

gameLayer:null,


	ctor:function(gameLayer){
		this._super();
		this.gameLayer = gameLayer;
		this._initInfoPanel();
		this.scheduleUpdate();
	},

update: function(){
	
	this.scoreText.setString("" +this.gameLayer.score);
	},


	_initInfoPanel: function(){
		var size = cc.director.getWinSize();
		

		var scoreLabel = new cc.LabelTTF("Score","arial", 36);
		scoreLabel.x = 180;
		scoreLabel.y = size.height - 50 ;
		scoreLabel.setColor(cc.color(0,0,0));
		this.addChild(scoreLabel);

		var scoreText = new cc.LabelTTF("1","arial", 36);
		scoreText.x = 300;
	    scoreText.y = scoreLabel.y  ;
		scoreText.setColor(cc.color(0,0,0));
		this.addChild(scoreText);
		this.scoreText = scoreText;

		
	},
	/*showSuccess: function(){
		var bg = new cc.LayerColor(cc.color(255,255,255),500,500);
		this.addChild(bg,1);
		var size = cc.director.getWinSize();
		bg.x = (size.width - bg.width)/2;
        bg.y = (size.height - bg.height)/2;
        var stepText = new cc.LabelTTF("恭喜，已完成第" + (this.gameLayer.level+1) + "关，\n剩余步数30倍奖励!", "arial", 50);
        stepText.setColor(cc.color(0,0,0));
        stepText.x = 250;
        stepText.y = 250;
        bg.addChild(stepText);  
	},*/
	showFail: function(){
		var bg = new cc.LayerColor(cc.color(255,255,255),400,400);
		this.addChild(bg,1);
		var size = cc.director.getWinSize();
		bg.x = (size.width - bg.width)/2;
        bg.y = (size.height - bg.height)/2;
        var stepText = new cc.LabelTTF("失败了，\n从头来过吧！","arial",56);
         stepText.setColor(cc.color(0,0,0));
        stepText.x = 200;
        stepText.y = 200;
        bg.addChild(stepText);  
    },
});