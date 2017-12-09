

[腾讯&妙味远程] 关于闭包的一段代码,不理解.
###javascript:广泛应用于客户端的脚本语言,在网页上使用,用来给HTML 网页增加动态功能.
###最初的设计是为了检验 HTML表单输入的正确性,运行在浏览器,node里.
>基本组成:ECMAScript ,BOM  ,DOM  

----------


>javascript 的特点 :   


 1. 列表内容能够让页面和浏览器与用户  产生交互行为.
 2. 可与服务器进行数据交互(node端)
 3. 能动态改页面中的结构和样式
 >javascript 学习阶段

 1. 基础语法结构
 2. 页面元素操作
 3. 深入学习------数据交互,组件实现 ,框架使用 等

----------
####javascript 出现的位置 ,

- 行间 ,`<input type="button" value = "测试" onclick = "alert(1)">
   `  ,优点 : 简单明了 .  
   缺点:可读性差,不易维护 ,不易扩展 

----------

-  内嵌 
    ,`<script>
   	alert(122)
   </script>`   
   优点: js和html 分离,可以复用代码 . 缺点:代码不能多文件使用 .

----------
- 外链接 js文件 


```
<script src= "demo.js"></script>
alert(345)
```
优点:多文件公用 

----------
// : 单行注释 
/**/ : 多行注释 
#position all 
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src= "demo.js"></script>
</head>
<body>
	<input type="button" value = "测试" onclick = "alert(1)">
	<script>
		alert(122)
	</script>
</body>
</html>
```

----------
通过id获取元素 , 单双引号 或者双双引号 ,都可以

----------
##style.html

```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		div{width: 100px;height: 100px;background: yellow;transition:1s;}
		input{width: 100px;}
		*{margin: 0;padding: 0;} 
	</style>
</head>
<body>
	<input type="button" value = "改变样式" id = "btn">
	<div id = "div1"></div>

	<script>
		//通过id获取元素
		var Btn = document.getElementById("btn");
		var Div = document.getElementById("div1");
		Btn.onclick = function(){
			Div.style.background= "pink";
			Div.style.width     = "300px";
			Div.style.height     = "300px";
		}
	</script>
</body>
</html>
```
----------
##variable 
```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<input type="button" value = "改变样式" id = "btn">
	<div id = "div1"></div>

	<script>
		/*
			标识符:
				变量名 , 常量名 , 函数名  ,函数参数名 ,对象属性名的统称
			变量:
				标识符的一种 ,是一种变化的量,用来存储任意类型的数据
			声明变量 :
				var x; 代表语句的结束 ";"
				###声明了变量 ,未赋值,默认是undefined
			运算符:
				= 赋值运算符 : 把右边的数据赋给左边的变量或者属性


		*/
		var x ;
		console.log(x);
		var q = 1;//声明变量并赋值(初始化)
		var w = 2;
		console.log(q+w);
		//console.log(e);未声明的变量 e is not defined 
		var a,b = 12,c;
		console.log(a,b);
		/*SyntaxError 语法错误 
		var 123  不可以   首字符不可以使用数字 _@#$%^&* 等特殊字符也可以用作变量
		关键字:js语法正在使用的
		驼峰命名法 getElementById 小驼峰   GetElemGentById 大驼峰
		*/
	</script>
</body>
</html>
```

 


