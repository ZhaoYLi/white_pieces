var clock = null;
var speed = 4;
var state = 0;
/*
 * 初始化
 */
function init(){
	for(var i=0;i<4;i++){
		createrow();
	}
	//添加onclick事件
	$('main').onclick = function(ev){
		judge(ev);
	}
	//定时器，每30毫秒调用一次move()
	clock = window.setInterval('move()',30);
}

//判断是否点击黑块
function judge(ev){
	if(ev.target.className.indexOf('black') != -1){
		ev.target.className = 'cell';
		ev.target.parentNode.pass = 1;//定义pass属性，表明该行row的黑块已经被点击
		score();
	}
	
}
//游戏结束
function fail(){
	clearInterval(clock);
	confirm('你最终得分' + parseInt($('score').innerHTML) );
}


/****
 * 定义一个创建div的函数，类名为className
 */

function creatediv(className){
	var div = document.createElement('div');
	div.className = className;
	return div;
}
/*
 * 创建类名为row的div
 */
function createrow(){
	var con = $('con');
	var row = creatediv('row');
	var arr = createcell(); //创建类名为cell的div
	
	con.appendChild(row);
	
	for(var i = 0; i < 4;i++){
		row.appendChild(creatediv(arr[i]));
	}
	 if(con.firstChild == null){
                con.appendChild(row);
            }else{
                con.insertBefore(row, con.firstChild);
            }
	
}

//通过id来get DOM元素
function $(id){
	return document.getElementById(id);
}

/*
 * 创建一个类名数组，其中一个为 cell black,其余为cell
 */
function createcell(){
	var temp = ['cell','cell','cell','cell',];
	var i = Math.floor(Math.random()*4);     //i为0-4之间的整数,即随机生成黑块的位置
	temp[i] = 'cell black';
	return temp;
}

/*
 * 让黑块动起来（让黑块向下移动）
 */
function move(){
	var con = $('con');
	var top = parseInt(window.getComputedStyle(con,null)['top']);
	if(speed + top > 0){
		top = 0;
	}else{
		top += speed;
	}
	con.style.top = top + 'px';
	if(top == 0){
		createrow();
		con.style.top = '-100px';
		delrow();
	}
	else if(top == (-100 + speed)){
		var rows = con.childNodes;
		if((rows.length == 5)&&(rows[rows.length-1].pass !== 1)){
			fail();
		}
	}
}

//加速
function speedup(){
    speed +=2;
    if(speed == 20){
    	alert('你已经超神了');
    }
}
/*
 * 删除div#con子节点中最后那个                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     <div class="row">
 */
function delrow(){
	var con = $('con');
	if(con.childNodes.length == 6){
		con.removeChild(con.lastChild);
	} 
	
}

//记分
function score(){
	var newscore = parseInt($('score').innerHTML) + 1;
	$('score').innerHTML = newscore;
	if(newscore % 10 == 0){
		speedup();
	}
}
init();

