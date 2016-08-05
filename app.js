
var GameLayer = cc.Layer.extend({
    map1:null,
    map2:null,
    player:null,
    map:[],
    ui:null,
    score:0,
    isend:false,
    isgo:false,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
   cc.spriteFrameCache.addSpriteFrames(res.baoza_plist);
         this.player = new cc.Sprite("res/player.png");
        this.addChild(this.player,2);
        this.player.x = size.width/2;
        this.player.y = 50;
         this.map1 =  new cc.Sprite("res/bg.png");
        this.addChild(this.map1,1);
        this.map1.x = size.width/2;
       this.map1.y = size.height/2;

           this.map2 =  new cc.Sprite("res/bg.png");
        this.addChild(this.map2,1);
        this.map2.x = size.width/2;
        this.map2.y = size.height/2+size.height;

  for(var i = 0;i<7;i++){

       
        var enemy1 = Enemy.createRandomType(260+140*i);
       
     
        this.addChild(enemy1,2);
        this.map.push(enemy1);

        }

    this.ui = new GameUI(this);
    this.addChild(this.ui, 3);

       
       
       

        if("touches" in cc.sys.capabilities){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: this._onTouchBegan.bind(this)
            },this);
        }else{
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: this._onMouseDown.bind(this),
                onMouseUp: this._onMouseUp.bind(this)
            }, this);
        }
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
       
        // add "HelloWorld" splash screen"
        this.scheduleUpdate();

        return true;
    },
    


    
 
    _onTouchBegan: function (touch, event) {
        this.isgo = true;
        return true;
    },
    _onTouchEnded: function (touch, event) {
        this.isgo = false;
    },
    _onMouseDown: function (event) {
        this.isgo = true;
    },
    _onMouseUp: function (event) {
        this.isgo = false;
    },

   updatemap:function(dt){
    if(this.isend == true){return;}
        var size = cc.winSize;
    var map_y1 = this.map1.getPositionY() - dt*Constant.MAP_SPEED; 
    var map_y2 = this.map2.getPositionY() - dt*Constant.MAP_SPEED;
    this.score += 1;
    if (this.map1.getPositionY() <(0 - size.height/2 ))
    {
        this.map1.setPositionY( size.height + size.height +  map_y1);
    }
    else{
        this.map1.setPositionY(map_y1);
    }
    if (this.map2.getPositionY() <(0 - size.height/2 ))
    {
        this.map2.setPositionY(size.height + size.height + map_y2);
    }
    else{
        this.map2.setPositionY(map_y2);
    }
    

    for(var i = 0;i < 7;i++){
        var enemy_y1 = this.map[i].getPositionY() - dt*Constant.MAP_SPEED; 
        if (this.map[i].getPositionY() < -23)
    {
        this.map[i].setPositionY( size.height  +  enemy_y1+45);
    }
    else{
        this.map[i].setPositionY(enemy_y1);

    }
}
},

boom:function(x,y)
    {
                var baozha=new cc.Sprite();
               baozha.setPosition(x,y);
                var animation = new cc.Animation();                             
             for (var i = 1; i <= 6; i++) {  
                 var frameName = "bao" + i + ".png";        
                 var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);       
               animation.addSpriteFrame(spriteFrame);                          
             }  
  
            animation.setDelayPerUnit(0.15);           //设置两个帧播放时间          
             animation.setRestoreOriginalFrame(false);    //动画执行后还原初始状态      
  
             var action = cc.animate(animation);                                
            baozha.runAction(action); 
            this.addChild(baozha,3);

    },
      
 update : function( dt ) { 
    if(this.isend == true){return;}
    if(this.isgo){
                this.updatemap(dt);
                
            }
    for(var i = 0; i<7;i++){
   var h1 = this.player.getBoundingBox();
    var h2 = this.map[i].getBoundingBox();
    if(cc.rectIntersectsRect(h1,h2))
    {
     var jj = parseInt(Math.random()*5)
        cc.log(jj);
            x=this.map[i].getPositionX();
            y=this.map[i].getPositionY();
            this.boom(x,y);
   
        this.ui.showFail();
        this.isend = true;
        for(var i = 0; i<7;i++){
            this.map[i].isstop=true;
        }}
          

    
    }

        

}
     

    

        
    
    
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

