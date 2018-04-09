var momObj=function()
{
	this.x;
	this.y;
	this.angle;

	//momTail
	this.momTailTimer=0;//大鱼尾巴计时器
	this.momTailCount=0;//大鱼图片数组计数
	//momEye
	this.momEyeTimer=0;//大鱼眼睛计时器
	this.momEyeCount=0;//大鱼图片计数
	this.momEyeInterval=1000;//自定义间隔
	//momBody
	this.momBodyCount=0;
}
momObj.prototype.init=function()
{
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
}
momObj.prototype.draw=function()
{
	this.x=lerpDistance(mx,this.x,0.9);
	this.y=lerpDistance(my,this.y,0.9);
	var deltaX=mx-this.x;//鼠标和鱼X轴坐标差
	var deltaY=my-this.y;//鼠标和Y轴的坐标差
	var deta=Math.atan2(deltaY,deltaX)+Math.PI;//当前鱼妈妈坐标和鼠标坐标的角度, -PI PI
	this.angle=lerpAngle(deta,this.angle,0.6);

	//momTail
	this.momTailTimer+=deltaTime;
	if(this.momTailTimer>50)
	{
		this.momTailTimer%=50;
		this.momTailCount=(this.momTailCount+1)%8;
	}
	//momEye
	this.momEyeTimer+=deltaTime;
	if(this.momEyeTimer>this.momEyeInterval)
	{
		this.momEyeTimer%=this.momEyeInterval;
		this.momEyeCount=(this.momEyeCount+1)%2;
		if(this.momEyeCount==0)//睁眼的时候
		{
			this.momEyeInterval=Math.random()*1500+2000;//睁开的时候增大时间间隔
		}
		else
		{
			this.momEyeInterval=200;
		}
	}

	ctx1.save();
	ctx1.translate(this.x,this.y);//设置原点
	ctx1.rotate(this.angle);//旋转
	//momBody
	if(data.double==1)
	{
		ctx1.drawImage(momBodyOra[this.momBodyCount],-momBodyOra[this.momBodyCount].width*0.5,-momBodyOra[this.momBodyCount].height*0.5);
	}
	else
	{
		ctx1.drawImage(momBodyBlue[this.momBodyCount],-momBodyBlue[this.momBodyCount].width*0.5,-momBodyBlue[this.momBodyCount].height*0.5);
	}
	//momEye
	ctx1.drawImage(momEye[this.momEyeCount],-momEye[this.momEyeCount].width*0.5,-momEye[this.momEyeCount].height*0.5);
	//momTail
	ctx1.drawImage(momTail[this.momTailCount],-momTail[this.momTailCount].width*0.5+30,-momTail[this.momTailCount].height*0.5); 	
	ctx1.restore();

	//save restore设置只在当前有效
}