
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

var cells,images,mes;
var index;

function imageFn(){
    
    index = this.index;
    
    for(var j = 0 ; j < 5 ; j ++){
        
        images[j].style.opacity = 0;
        images[j].style.cursor = 'default';
        images[j].onclick = null;
    }
    
    images[index].style.opacity = 1;
    
    startMove(cells[index],{'left':-100*index},function(){
        
        startMove(mes[index],{'opacity':100});
    });
}

window.onload = function(){
    
    cells = document.getElementsByClassName('cell');
    images = document.getElementById('content-2').getElementsByTagName('img');
    mes = document.getElementsByClassName('mes');
    
    for(var i =0 ; i < 5 ; i ++){
        
        images[i].index = i;
        
        images[i].onclick = imageFn;
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

function back(){
    
    startMove(mes[index],{'opacity':0},function(){
        
        startMove(cells[index],{'left':0},function(){
            
            for(var i = 0 ; i < 5 ; i ++){
                
                startMove(images[i],{'opacity':100});
            }
            
            setTimeout(function(){
                
                for(var i = 0 ; i < 5 ; i ++){
                    
                    images[i].style.cursor = 'pointer';
                    images[i].onclick = imageFn;
                }
            },1300);
        });
    });
}