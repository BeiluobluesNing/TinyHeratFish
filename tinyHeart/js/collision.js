function momFruitCollision()//大鱼吃果实
{
	if(!data.gameover)
	{
		for(var i=0;i<fruit.num;i++)
		{
			var dis=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
			if(dis<900)
			{
				console.log("xxxxxxxxxxxxxxxxxxxxxx");
				fruit.dead(i);
				data.fruitNum++;//保存的果实量
				if(fruit.fruitType[i]=="blue")//蓝色果实
				{
					data.double=2;
				}
				mom.momBodyCount++;//吃果实身体变色
				if(mom.momBodyCount>7)
				{
					mom.momBodyCount=7;//不能越界
				}
				wave.born(mom.x,mom.y);
			}
		}
	}
}
function momBabyCollision()
{
	if(data.fruitNum!=0&&!data.gameover)
	{
		var l=calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900)
		{
			baby.babyBodyCount=0;//满血复活
			mom.momBodyCount=0;//从没有吃到果实那一张开始循环
			data.addScore();
		}
	}
}