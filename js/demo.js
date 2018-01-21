/*
* @Author: asus
* @Date:   2018-01-19 16:01:05
* @Last Modified by:   asus
* @Last Modified time: 2018-01-19 17:12:54
*/
var aa="123";
console.log(aa);

//当页面加载的时候
window.onload=function(){
	//当点击按钮时出现弹框
	var button=document.getElementsByClassName("button");
    console.log(button);
    button[0].onclick=function(){
		//alert(这是一个按钮)
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="none";
	}

 var pos =document.getElementsByClassName("pos");
 pos[0].onclick=function(){
 	var city=document.getElementsByClassName("city");
	console.log(city);
	city[0].style.display="block";
  }

}
//关于城市的数据
$.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		var city=obj.data;
		console.log(city);
		
	}
})
$.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		var tianqi=obj.data;
		console.log(tianqi)
		console.log(tianqi.weather.current_temperature);
	   }
})	   




//js
//1.当整个页面加完成时，才可以对元素进行操作。
//2.获取元素：document.getElementsByClassName("")[0];
//3.添加事件函数
//4.进行样式操作

