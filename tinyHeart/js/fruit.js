var fruitObj=function()
{
	this.alive=[];//bool
	this.x=[];
	this.y=[];
	this.l=[];//果实的大小
	this.spd=[];//拥有自己的生长速度和上升的速度
	this.fruitType=[];
	this.orange=new Image();
	this.blue=new Image();
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function()
{
	for(var i=0;i<this.num;i++)
	{
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.spd[i]=Math.random()*0.017+0.003;//[0.003,0.020]
		//this.born(i);
	}
	this.orange.src="./src/fruit.png";
	this.blue.src="./src/blue.png";
}
fruitObj.prototype.draw=function()
{
	for(var i=0;i<this.num;i++)
	{
		//draw
		//find an ane 定位,grow,fly up 飘
		if(this.alive[i])
		{
			if(this.fruitType[i]=="blue")
			{
				var pic=this.blue;
			}
			else
			{
				var pic=this.orange;
			}
			if(deltaTime>40)
				deltaTime=40;

			if(this.l[i]<=14)
			{
				this.l[i]+=this.spd[i]*deltaTime;
			}
			else
			{
				this.y[i]-=this.spd[i]*7*deltaTime;
			}
			ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			if(this.y[i]<10)
			{
				this.alive[i]=false;
			}
		}	
	}
}
fruitObj.prototype.born=function(i)//果实出现的地方
{
	var aneID=Math.floor(Math.random()*ane.num);//随机出果实应该产生在哪个海葵上面
	this.x[i]=ane.x[aneID];//海葵的x
	this.y[i]=canHeight-ane.len[aneID];//海葵的高度坐标
	this.l[i]=0;//果实的大小
	var ran=Math.random();
	if(ran<0.3)
	{
		fruit.fruitType[i]="blue";
	}
	else
	{
		fruit.fruitType[i]="orange";
	}

}
function fruitMonitor()//果实控制器
{
	var num=0;
	for(var i=0;i<fruit.num;i++)
	{
		if(fruit.alive[i]) num++;
	}
	if(num<15)
	{
		//send fruit
		sendFruit();
		return;
	}
}
function sendFruit()
{
	for(var i=0;i<fruit.num;i++)
	{
		if(!fruit.alive[i])
		{
			fruit.alive[i]=true;
			fruit.born(i);
			return;
		}
	}
}
fruitObj.prototype.dead=function(i)
{
	this.alive[i]=false;
}