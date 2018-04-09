var aneObj=function()
{
	this.x=[];
	this.len=[];
}
aneObj.prototype.num=50;
aneObj.prototype.init=function()
{
		for(var i=0;i<this.num;i++)
		{
			this.x[i]=i*16+Math.random()*20;
			this.len[i]=200+Math.random()*50;
		}
}
aneObj.prototype.draw=function()
{
	ctx2.save();
	ctx2.globalAlpha=0.6;//设置透明度
	ctx2.strokeStyle="#3b154e";//设置颜色
	ctx2.lineWidth=20;//线宽
	ctx2.lineCap="round";//圆顶
	for(var i=0;i<this.num;i++)
	{
		//beginPath,moveTo,LineTo,stroke,strokeStyle,LineWidth,LineCap,globalAlpha
		ctx2.beginPath();
		ctx2.moveTo(this.x[i],canHeight);
		ctx2.lineTo(this.x[i],canHeight-this.len[i]);
		ctx2.stroke();
	}
	ctx2.restore();//与ctx2.save()配套使用，改变的设置只在当前区域有效
}