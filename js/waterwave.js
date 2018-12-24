;(function(window,document){
//初始化canvas,canvas跟随浏览器窗口
var can = document.getElementById('canvas');
var ctx = can.getContext('2d');
var w = can.width = window.innerWidth,
	h = can.height = window.innerHeight;
window.onresize = function(){
	var w = can.width = window.innerWidth,
		h = can.height = window.innerHeight;
}

//水波对象
function WaterWave(){};

WaterWave.prototype = {
	init:function(){
		this.x = random(0,w);
		this.y = random(0,h);
		this.r = 1;
		this.vr = 1;
		this.a = 1;
		this.va = 0.96;
	},
	draw:function(){
		ctx.strokeStyle = "rgba(0,255,255,"+this.a+")";
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
		ctx.stroke();
		this.update();
	},
	update:function(){
		if (this.a > 0.03) {
			this.r += this.vr;
			if (this.r > 50) {
				this.a *= this.va
			}
		}else{
			this.init();
		}	
	}
}

var aWateWaves = [];
for (var i = 0; i < 30; i++) {
	setTimeout(function(){
		var oWaterWave = new WaterWave();
		oWaterWave.init();
		aWateWaves.push(oWaterWave);
	},i*200);
}

setInterval(function(){
	ctx.fillStyle = "rgba(0,0,0,0.05)";
	ctx.fillRect(0,0,w,h);
	for (var i = 0,len = aWateWaves.length; i < len; i++) {
		aWateWaves[i].draw();
	}
},1000/60)


// var oWaterWave = new WaterWave();
// oWaterWave.init();
// setInterval(function(){
// 	ctx.fillStyle = "rgba(0,0,0,0.05)";
// 	ctx.fillRect(0,0,w,h);
// 	oWaterWave.draw();
// },1000/60)


//随机函数
function random(min,max){
	return Math.random()*(max-min)+min;
}
})(window,document);