// JavaScript Document
Math.guid=function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
		var r = Math.random() * 16|0,v=c=='x'?r:(r&0x3|0x8);
		return v.toString(16);
	}).toUpperCase();
}



var Class = function(parent){
	var klass = function(){
		this.init.apply(this, arguments);
	};
	//klassのプロトタイプを変更
	if(parent){
		var subclass = function(){}
			subclass.prototype = parent.prototype;
			klass.prototype = new subclass();
		
	}
	
	klass.prototype.init = function(){};
	
	//proxy関数を追加
	klass.proxy = function(func){
		var self = this;
		return(function(){
			return func.apply(self, arguments);	
		});
	}

	//ショートカット
	klass.fn = klass.prototype;
	klass.fn.parent = klass;
	
	//クラスプロパティを追加
	klass.extend = function(obj){
		var extended = obj.extended;
		for(var i in obj){
			klass[i] = obj[i]
		}
		if(extended) extended(klass);
	}
	
	//インスタンスプロパティを追加します
	klass.include = function(obj){
		var included = obj.included;
		for(var i in obj){
			klass.fn[i] = obj[i]
		}
		if(included) included(klass);
	}
	return klass;
}
