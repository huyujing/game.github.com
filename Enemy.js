var Enemy = cc.Sprite.extend({
	speed:0,
	dir:1,
	type: 0,
	isstop:false,
	aitype:0,
	m_r:0,
	nowmr:0,
	r:0,
	midx:0,
	midy:0,

	

	ctor: function (y){
		this._super();
		this.init_enemy(y);
	
	
	},
   init_enemy: function (y){
   		var num = parseInt(Math.random()*10);
		if(num<2){
			this.type = 1;
			this.initWithFile(res.ball0_png);
			this.scale = 1;
		}else if (num > 8)
		{
			this.type = 2;
			this.initWithFile(res.ball1_png);
			this.scale = 2;
		}else {
			this.type = 3;
			this.initWithFile(res.ball1_png);
			this.scale = 1;
		} this.y = y;
   	num = parseInt(Math.random()*10);
		if(num>1) {
			this.aitype = 1;
			this.x = parseInt(Math.random()*(cc.winSize.width-this.width*2)+this.width);
			this.speed = parseInt(Math.random()*500+100);
		}else{
			this.aitype = 2;
			this.midx = cc.winSize.width/2;
			this.midy = this.y;
			this.x = this.midx;
			this.r = parseInt(Math.random()*40)+80;
			this.speed = Math.random() + 3;
		}

   	this.scheduleUpdate();
   },
   update:function(dt){
   	if(this.isstop==true){return;}

		if(this.aitype == 1){
			if(this.dir == 0){
				this.x -= this.speed*dt;
				if(this.x<this.width/2){
					this.dir = 1;
				}
			}else{
				this.x+=this.speed*dt;
				if(this.x>cc.winSize.width-this.width/2){
					this.dir = 0;
				}
			}
		}else if(this.aitype == 2){
			var hd = cc.degreesToRadians(this.nowmr)
			var x = this.r*Math.sin(hd);
			var y = this.r*Math.cos(hd);
           	if(this.isgo == true)
            {this.midy-=dt*Constant.MAP_SPEED;} 
			this.x = this.midx +x;
			this.y = this.midy +y;
		
			this.nowmr += this.speed;
			if(this.nowmr>360)
			{
				this.nowmr = 0;
			}
		}
	}

   });
Enemy.createRandomType = function (y){
	return new Enemy(y);
};
