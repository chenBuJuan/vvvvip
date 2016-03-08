
function getStyle(obj,name){
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj,null)[name];
	}
}

function startMove(obj,json,fn){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
            
			var bStop=true;
			for(var attr in json){
                
				var cur=0;
				if(attr=='opacity')
				{
					cur=Math.round(parseFloat(getStyle(obj,attr))*100);
				}
				else
				{
					cur=parseInt(getStyle(obj,attr));
				}
                
				var speed=(json[attr]-cur)/15;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				
				if(cur!=json[attr]){
					bStop=false;
				}
                
				if(attr=='opacity')
				{
					obj.style.filter='alpha(opacity:'+(speed+cur)+')';
					obj.style.opacity=(cur+speed)/100;}
				else
				{
					obj.style[attr]=cur+speed+'px';
				}
			}
            
            if(bStop){
                clearInterval(obj.timer);
                if(fn)fn();
            }
		},30);
}

window.onload = function(){
    
        var cells = document.getElementsByClassName('cell');
        var images = document.getElementById('content-2').getElementsByTagName('img');
        var mes = document.getElementsByClassName('mes');
        var cell_left,index;
    
    for(var i =0 ; i < 5 ; i ++){
        
        images[i].index = i;
        
        images[i].onclick = function(){
            
            index = this.index;
            
            for(var j = 0 ; j < 5 ; j ++){
                
                images[j].style.opacity = 0;
                images[j].onclick = null;
            }
            
            cell_left = getStyle(cells[index],'left');
            
            images[index].style.opacity = 1;
            
            var fnNext = function(){
                
                startMove(mes[index],{'opacity':100})
            };
            
            startMove(cells[index],{'left':-100*index},fnNext);
        };
    }
};

function move(){
    
    var content_1 = document.getElementById('content-1');
    var content_2 = document.getElementById('content-2');
    
    var fnNext = function(){
        
        startMove(content_2,{'opacity':100})
    };
    
    startMove(content_1,{'opacity':0},fnNext);
    
    content_2.style.zIndex = 10;
}