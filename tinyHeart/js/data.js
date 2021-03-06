var dataObj=function()
{
	this.fruitNum=0;//吃到的果实计数
	this.double=1;//吃到蓝色果实就加倍。
	this.score=0;
	this.gameover=false;
	this.alpha=0;
}
dataObj.prototype.reset=function()//重置大鱼吃到的果实
{
	this.fruitNum=0;
	this.double=1;
}
dataObj.prototype.draw=function()
{
	var w=can1.width;
	var h=can1.height;
	ctx1.save();//
	ctx1.fillStyle="white";
	ctx1.shadowBlur=10;//设置阴影，模糊
	ctx1.shadowColor="white";
	ctx1.fillText("Score "+this.score,w*0.5,h-30);
	if(this.gameover)
	{
		this.alpha+=deltaTime*0.0002;
		if(this.alpha>1)
		{
			this.alpha=1;
		}
		ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
		ctx1.fillText("GAMEOVER",w*0.5,h*0.5);
	}
	//ctx1.fillText("num "+this.fruitNum,w*0.5,h-50);
	//ctx1.fillText("double "+this.double,w*0.5,h-80);
	ctx1.restore();
}
dataObj.prototype.addScore=function()
{
	this.score+=this.fruitNum*100*this.double;
	this.reset();//重置果实数量
}