var babyObj=function()
{
	this.x;
	this.y;
	this.angle;
	//Tail
	this.babyTailTimer=0;
	this.babyTailCount=0;
	//Eye
	this.babyEyeTimer=0;//眼睛计时器
	this.babyEyeCount=0;//数组计数
	this.babyEyeInterval=1000;//自定义持续的时间间隔
	//Body
	this.babyBodyTimer=0;//身体计时器
	this.babyBodyCount=0;//数组计数

}
babyObj.prototype.init=function()
{
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
}
babyObj.prototype.draw=function()
{
	//坐标趋近于鼠标的位置
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.98);

	//babyTail
	this.babyTailTimer +=deltaTime;//隔一段时间在换图片
	if(this.babyTailTimer>50)
	{
		this.babyTailCount=(this.babyTailCount+1)%8;//不让数组越界
		this.babyTailTimer%=50;//计时器超过五十复原
	}
	//babyEye
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval)
	{
		this.babyEyeTimer%=this.babyEyeInterval;
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		if(this.babyEyeCount==0)//眼睛睁开的时候
		{
			this.babyEyeInterval=Math.random()*1500+2000;//[2000,3500)
		}
		else//眼睛眯着的时候
		{
			this.babyEyeInterval=200;
		}
	}

	//babyBody
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>300)
	{
		this.babyBodyTimer%=300;//归零重新计时
		this.babyBodyCount++;
		if(this.babyBodyCount>19)
		{
			this.babyBodyCount=19;
			//GG
			data.gameover=true;
		}

	}

	var deltaX=mom.x-this.x;
	var deltaY=mom.y-this.y;
	var deta=Math.atan2(deltaY,deltaX)+Math.PI;//计算角度
	//angle
	this.angle=lerpAngle(deta,this.angle,0.6);//趋向一个角度


	//画图的时候，画小鱼，先画的在下面,先画尾巴，最后画眼睛
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);//旋转角度
	ctx1.drawImage(babyTail[this.babyTailCount],-babyTail[this.babyTailCount].width*0.5+23,-babyTail[this.babyTailCount].height*0.5);//所画的图片
	ctx1.drawImage(babyBody[this.babyBodyCount],-babyBody[this.babyBodyCount].width*0.5,-babyBody[this.babyBodyCount].height*0.5);
	ctx1.drawImage(babyEye[this.babyEyeCount],-babyEye[this.babyEyeCount].width*0.5,-babyEye[this.babyEyeCount].height*0.5);
	ctx1.restore();
}