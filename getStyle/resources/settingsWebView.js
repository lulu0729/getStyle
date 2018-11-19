import pluginCall from 'sketch-module-web-view/client';
let btnConfirm = document.getElementById("btnConfirm");
let settingsArg = ['width','height','fontSize','lineHeight','border','boxShadow','textShadow'];
let settings;

//初始化显示的设置
window.innerSettings = function(key,value){
	//console.log("json"+ sJson);   
		let select = document.getElementById(key); 
		console.log('key:'+key); 
		console.log('value:'+value);   
		if(select){
			console.log('selectvalue:'+value);   
			for(let i=0; i<select.options.length; i++){  
			    if(select.options[i].innerHTML == value){ 
			    	 console.log(key + "is true");
			        select.options[i].selected = true;  
			        break;  
			    }  
			}  
		}

}
const selectionControl = function(unit){
	let select = document.getElementById(unit);
	let	index,value;
	if(select){
		index = select.selectedIndex, 
		value = select.options[index].value;

		console.log(value);
		pluginCall('nativeLog', unit , value);
	}else{
		console.log('没有这个选项');
		return
	}
		
}
btnConfirm.onclick = function(){
	let j,len;
	for(j = 0,len = settingsArg.length; j < len; j++) {
		console.log(settingsArg[j]);
   		selectionControl(settingsArg[j]);
	}
	/*
	let settings = { //初始化settings
	    width: 'vw',
	    height: 'vw',
	    fontSize: 'px',
	    lineHeight: 'px',
	    border: 'px',
	    boxShadow: 'px',
	    textShadow: 'px',
	    position: 'vw'
	  };
	innerSettings(settings);*/
};

