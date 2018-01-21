/*
* @Author: asus
* @Date:   2018-01-19 16:50:45
* @Last Modified by:   asus
* @Last Modified time: 2018-01-20 17:19:19
*/
//1.引入远程数据
//关于城市数据
  var city;
  $.ajax({
 	url: "https://www.toutiao.com/stream/widget/local_weather/city/",
 	dataType:"jsonp",
 	method:"get",
 	success:function(obj){
 		 city=obj.data;
 		 console.log(city);
 	}
 	
 })
 //关于天气的数据
  var tianqi;
  $.ajax({
  	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
    dataType:"jsonp",
    method:"get",
    success:function(obj){
 		 tianqi=obj.data;
 		 console.log(tianqi);
 	}

  })
  //页面加载函数
  window.onload=function(){
    update();

    //页面交互
    var pos=document.getElementsByClassName("pos")[0];
    var cityBox=document.getElementsByClassName("city")[0];
    //点击城市出现城市详情页
    pos.onclick=function(){
    	cityBox.style.display="block";
    }
    //点击城市详情，跳转首页，出现该城市的天气情况
    var BOX=$(".city .citys .con .box");
    for(let i in BOX){
    	BOX[i].onclick=function(){
          var chengshi=this.innerHTML;
    	  console.log(chengshi);
    	  //调用AIAX函数
    	  AJAX(chengshi);
    	}
    }
//搜索部分
    // var searchBox=document.getElementsByTagName("input")[0];
    var searchBox=$(".searchBox");
    console.log(searchBox);
    var button=document.getElementsByClassName("button")[0];
    var text;
    searchBox.onfocus=function(){
    	button.innerHTML="确认";
        text=searchBox.value;
   }

    button.onclick=function(){
    var neirong=button.innerHTML;
    if(neirong=="取消"){
    	var city3=document.getElementsByClassName("city")[0];
    	city3.style.display="none";
    } else{
    	 for(let i in city){
    		for(let j in city[i]){
    			
    			if(text==j){
    				AJAX(text);
    				return;
    			}else{
    				alert("没有此城市的天气情况");
    				return;
    			}
    		}
         }
     }
 }
}

  //获取点击城市的天气信息函数
   function AJAX(str){
   	$.ajax({
  	   url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
       dataType:"jsonp",
       method:"get",
       success:function(obj){
 		 tianqi=obj.data;
 		 update();
 		 var city2=$(".city")[0];
 		 city2.style.display="none";
 	}
  })
}
  //获取数据的函数
  function update(){

  	var pos=document.getElementsByClassName("pos")[0];
  	console.log(pos);
  	pos.innerHTML=tianqi.city;
  
    //当前空气质量
  	var quality_level=document.getElementsByTagName("h5")[0];
  	console.log(quality_level);
  	quality_level.innerHTML=tianqi.weather.quality_level;
  	
  	//当前温度
  	var current_temperature=document.getElementsByClassName("title1")[0];
  	console.log(current_temperature);
  	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";
  	
  	//当前天气状况
  	var current_condition=document.getElementsByClassName("title2")[0];
  	console.log(current_condition);
  	current_condition.innerHTML=tianqi.weather.current_condition;
  	
  	//当前风的方向
  	var wind_direction=document.getElementsByClassName("wind_der")[0];
  	wind_direction.innerHTML=tianqi.weather.wind_direction;
    
    //当前风的等级
    var wind_level=document.getElementsByClassName("wind_level")[0];
  	wind_level.innerHTML=tianqi.weather.wind_level+"级";
   
   //今天的天气情况图标
   var today_icon=document.getElementsByClassName("conpic")[0];
   today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;
   //明天的天气情况图标
   var tomorrow_icon=document.getElementsByClassName("tomorrow_icon")[0];
   tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;
   //每小时预报
  

   var hourlyArr=tianqi.weather.hourly_forecast;
   var wrap=document.getElementsByClassName("wrap")[0];
   for(let i in hourlyArr){
   var box1=document.createElement("div");
   box1.className="box";
   
   var time=document.createElement("div");
   time.className="time";
   box1.appendChild(time);
   time.innerHTML=hourlyArr[i].hour+":00";

   var icon=document.createElement("div");
   icon.className="icon";
   box1.appendChild(icon);
   icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`;

   var timeTem=document.createElement("div");
   timeTem.className="timeTem";
   box1.appendChild(timeTem);
   timeTem.innerHTML=hourlyArr[i].temperature+"°";
   	  // console.log(hourlyArr[i].hour);
   	  
    wrap.appendChild(box1);
}
//未来15天天气情况  
    var dayArr=tianqi.weather.forecast_list;
    var day=document.getElementsByClassName("day")[0];
    for(let i in dayArr){
 	var box2=document.createElement("div");
    box2.className="box";

    var date=document.createElement("div");
    date.className="date";
    box2.appendChild(date);
    date.innerHTML=dayArr[i].date;

    var weather=document.createElement("div");
    weather.className="weather";
    box2.appendChild(weather);
    weather.innerHTML=dayArr[i].condition;


    var photo=document.createElement("div");
    photo.className="photo";
    box2.appendChild(photo);
    photo.style=`background-image:url("img/${dayArr[i].weather_icon_id}.png")`;

    var heightr=document.createElement("div");
    heightr.className="heightr";
    box2.appendChild(heightr);
    heightr.innerHTML=dayArr[i].high_temperature;

    var lower=document.createElement("div");
    lower.className="lower";
    box2.appendChild(lower);
    lower.innerHTML=dayArr[i].low_temperature;

    var wind=document.createElement("div");
    wind.className="wind";
    box2.appendChild(wind);
    wind.innerHTML=dayArr[i].wind_direction;

    var rank=document.createElement("div");
    rank.className="rank";
    box2.appendChild(rank);
    rank.innerHTML=dayArr[i].wind_level;
   

    day.appendChild(box2);
}

//关于城市的信息
   
    var city1=document.getElementsByClassName("city")[0];
    for(let i in city){
 	   var citys=document.createElement("div");
       citys.className="citys";

       var title=document.createElement("div");
       title.className="title";
       title.innerHTML=i;
       citys.appendChild(title);

       var con=document.createElement("div");
       con.className="con";

        for(let j in city[i]){
        	var box=document.createElement("div");
        	box.className="box";
        	box.innerHTML=j;
        	con.appendChild(box);
        }
        citys.appendChild(con);
        city1.appendChild(citys);
   }
}
     




