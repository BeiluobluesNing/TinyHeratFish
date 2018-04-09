var can1;//前面的图形容器
var can2;//下面的图形容器

var ctx1;
var ctx2;

var lastTime;//上一帧执行的时间
var deltaTime;//两帧执行的时间差

var bgPic=new Image();//背景图片

var canWidth;
var canHeight;

var mx;//鼠标当前的位置
var my;//鼠标当前的位置

var ane;//海葵对象

var fruit;//果实对象

var mom;//大鱼对象

var baby;//小鱼对象

var babyTail=[];//小鱼尾巴图像数组

var babyEye=[];//小鱼眼睛数组 

var babyBody=[];//小鱼身体数组

var momTail=[];//大鱼尾巴数组

var momEye=[];//大鱼的眼睛

var data;//data对象

var wave;//线圈对象

var momBodyOra=[];//大鱼身体图片数组  
var momBodyBlue=[];//大鱼身体图片数组

document.body.onload=game;//html界面加载完成之后就执行game方法
function game()
{
	init();
	lastTime=Date.now();//上一次的时间
	deltaTime=0;//间隔差
	gameloop();
}
function init()
{
	//获得canvas context
	//canvas1在前面，canvas2在后面
	can1=document.getElementById("canvas1");//fishes，dust，UI，circle
	ctx1=can1.getContext("2d");
	can2=document.getElementById("canvas2");//background,ane,fruits
	ctx2=can2.getContext("2d");
	bgPic.src="./src/background.jpg";
	can1.addEventListener('mousemove',onMouseMove,false);

	canWidth=can1.width;
	canHeight=can1.height;

	ane=new aneObj();//调用海葵构造函数
	ane.init();//对海葵对象进行初始化

	fruit=new fruitObj();//调用果实的构造函数
	fruit.init();//果实初始化

	mom=new momObj();//new对象
	mom.init();//鱼妈妈

	baby=new babyObj();//小鱼对象
	baby.init();//初始化

	//data对象
	data=new dataObj();

	//wave对象
	wave=new waveObj();
	wave.init();

	mx=canWidth*0.5;
	my=canHeight*0.5;
	//babyTail
	for(var i=0;i<8;i++)
	{
		babyTail[i]=new Image();
		babyTail[i].src="./src/babyTail"+i+".png";
	}
	//babyEye
	for(var i=0;i<2;i++)
	{
		babyEye[i]=new Image();
		babyEye[i].src="./src/babyEye"+i+".png";
	}
	//babyBody
	for(var i=0;i<20;i++)
	{
		babyBody[i]=new Image();
		babyBody[i].src="./src/babyFade"+i+".png";
	}
	//momTail
	for(var i=0;i<8;i++)
	{
		momTail[i]=new Image();
		momTail[i].src="./src/bigTail"+i+".png";
	}
	//momEye
	for(var i=0;i<2;i++)
	{
		momEye[i]=new Image();
		momEye[i].src="./src/bigEye"+i+".png";
	}
	//momBody
	for(var i=0;i<8;i++)
	{
		momBodyOra[i]=new Image();
		momBodyBlue[i]=new Image();
		momBodyOra[i].src="./src/bigSwim"+i+".png";
		momBodyBlue[i].src="./src/bigSwimBlue"+i+".png";
	}
	ctx1.font="30px Verdana";
	ctx1.textAlign="center";
}
function gameloop()//loop-循环
{
	requestAnimFrame(gameloop);//setInterval,seTimeout,fps(frame per second)有动态的时间间隔
	var now=Date.now();
	deltaTime=now-lastTime;//刷新的时间间隔差
	//ctx2.clearRect(0,0,can2.width,can2.height);
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0,0,canWidth,canHeight);//消除之前画上去的
	//为什么只需要清楚ctx1，而不需要清楚ctx2，因为ctx2的背景遮盖了前面画上去的东西
	mom.draw();//大鱼对象
	baby.draw();//小鱼对象
	data.draw();//分值计算
	wave.draw();//画大鱼吃果实的动画

	momFruitCollision();//大鱼吃食物检测
	momBabyCollision();//大小鱼碰撞检测
}
function onMouseMove(e)
{
	//offsetX/Y获取到是触发点相对被触发dom的左上角距离，不过左上角基准点在不同浏览器中有区别，其中在IE中以内容区左上角为基准点不包括边框，如果触发点在边框上会返回负值，而chrome中以边框左上角为基准点。
	if(!data.gameover)//游戏没有结束
	{
		if(e.offSetX||e.layerX)
		{
			mx=e.offSetX==undefined? e.layerX:e.offSetX;
		}
		if(e.offSetY||e.layerY)
		{
			my=e.offSetY==undefined? e.layerY:e.offSetY;
		}
	}
}