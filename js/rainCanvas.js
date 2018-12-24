

var can = document.getElementById('canvas');
//画布宽高等于窗口宽高
var w = can.width = window.innerWidth,
	h = can.height = window.innerHeight;
//跟随浏览器宽高
window.onresize = function () {
	w = can.width = window.innerWidth,
	h = can.height = window.innerHeight;
}


//绘制雨滴
var ctx = can.getContext('2d');
// ctx.fillStyle = "rgba(0,255,255,1)";
// ctx.fillRect(50,50,2,10);

// //雨滴下落
// var y = 0;
// setInterval(function(){
// 	y++;
// 	// //清空矩形
// 	// ctx.clearRect(0,0,w,h);
// 	// 叠加透明
// 	ctx.fillStyle = 'rgba(0,0,0,0.05)';
// 	ctx.fillRect(0,0,w,h);
	
// 	ctx.fillStyle = "rgba(0,255,255,1)";
// 	ctx.fillRect(50,y,2,10);
// },1000/60);


//雨滴对象
function Drop(){};

//雨滴原型对象
Drop.prototype = {
	// 雨滴对象初始化
	init:function(){
		this.x = random(0,w);
		this.y = 0;
		this.vy = 1;
		this.l = random(0.3*h,h);
		this.r = 1;
		this.vr = 1;
		this.a = 1;
		this.va = 0.96;
	},
	draw:function(){
		if (this.y<this.l) {
			ctx.fillStyle = "rgba(0,255,255,1)";
			ctx.fillRect(this.x,this.y,2,10);
		}else{
			ctx.strokeStyle = "rgba(0,255,255,"+this.a+")";
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
			ctx.stroke();
		}
		this.update()
		
	},
	update:function(){
		if (this.y<this.l) {
			this.y += this.vy;
		}else{
			if (this.a > 0.03) {
				this.r += this.vr;
				if (this.r > 50) {
					this.a *= this.va;
				}
			}else{
				this.init();
			}

		}		
	}
}

var drops = [];
//实例化对象并加入数组
for (var i = 0; i < 30; i++) {
	setTimeout(function(){
		var drop = new Drop();
		drop.init();
		drops.push(drop);
	},i*200)
}

//把数组的雨滴对象画出来
setInterval(function(){
	ctx.fillStyle = 'rgba(0,0,0,0.05)';
	ctx.fillRect(0,0,w,h);
	for (var i = 0; i < drops.length; i++) {
		drops[i].draw();
	}
},1000/60)



// var drop = new Drop();
// drop.init();
// setInterval(function(){
// 	ctx.fillStyle = 'rgba(0,0,0,0.05)';
//  	ctx.fillRect(0,0,w,h);
// 	drop.draw();
// 	drop.update();
// },1000/60)

// 随机函数
function random(min,max){
	return Math.random()*(max-min)+min;
}






