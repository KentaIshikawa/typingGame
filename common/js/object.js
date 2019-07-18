var RootStage = new Class();
RootStage.include({
	"addHtml":function(a,b){
		$("#"+a).append(b);
	},
	"removeHtml":function(a,b){
		$("#"+a+" #"+b).remove();
	}
});

var Stage = new Class(RootStage);
Stage.extend({
	"stageId":'stage',
	"stageWrap":"gameWrapper",
	"addStage":function(a){
		if(a.code()){
			this.fn.addHtml(this.stageId,a.code());
		}
		if(a.events.length){
			for(var i =0; i<a.events.length; i++){
				var e = a.events[i];
				if(Func.aCheckValue(StageObject.useId,e[0])){
					$("#"+e[0]).on(e[1],e[2]);
				}else{
					$(e[0]).on(e[1],e[2]);
				}
			}
		}
		if(Object.keys(a._class).length){
			for(var k in a._class){
				var classArray = a._class[k];
				for(var i=0; i<classArray.length; i++){
					$("#"+k).addClass(classArray[i]);
				}
			}
		}
		if(Object.keys(a.css).length){
			for(var key in a.css){
				var cssObject = a.css[key];
				$("#"+key).css(cssObject);
			}
		}
		try{a.added()}catch(e){};
	},
	"removeStage":function(a){
		if(a.id){
			this.fn.removeHtml(this.stageId,a.id);
		}
		try{a.removed()}catch(e){};
	},
	"init":function(){
		$("#"+this.stageWrap).append("<div id='" +this.stageId+ "'></div>");
		var userAgent = window.navigator.userAgent.toLowerCase();
		if(userAgent.indexOf("firefox") != -1){
			Func.keyCode["-"]=173;
		}
	}
});

var StageObject = new Class();
StageObject.include({
	"_class":{},
	"events":[],
	"html":"",
	"code":function(){
		var html = "<div id='"+this.id + "'>";
		html += this.html;
		html += "</div>";
		return html;
	},
	"addClass":function(a){
		if(this.id in this._class){
			this._class[this.id].push(a);
		}else{
			this._class[this.id]=new Array(a);
		}
	},
	"addEvent":function(selector,ev,func){
		var addEvent = [selector,ev,func];
		this.events.push(addEvent);
	},
	"init":function(){
	}
});

StageObject.extend({
	"useId":[],
	"setUseId":function(a){this.useId.push(a)}
});


var Seane = new Class(StageObject);
Seane.include({
	"css":{},
	"set":function(a){a.call()},
	"addChild":function(a){
		if(a.code()){
			this.html += a.code();
		}
		if(a.width||a.height||a.x||a.y){
			this.css[a.id]=new Object();
			a.width  ? this.css[a.id].width = a.width : "";
			a.height ? this.css[a.id].height = a.height : "";
			a.x ? this.css[a.id].left = a.x : "";
			a.y ? this.css[a.id].top = a.y : "";
		}
		
		if(a.added){this.added = a.added};
	},
	"removeChild":function(a){
		$("#"+a).remove();
	},

	"init":function(){
		this.id = Math.guid();
		StageObject.setUseId(this.id);
		this._class[this.id]=new Array("seane");
	}
});

var SeaneObject = new Class(StageObject);
SeaneObject.include({
	"width":0,
	"height":0,
	"x":0,
	"y":0,
	"init":function(){
		this.id=Math.guid();
	}
});


var Btn = new Class(SeaneObject);
Btn.include({
	"init":function(){
		this.id =  Math.guid();
		StageObject.setUseId(this.id);
		this._class[this.id]=new Array("btn");
	}
});

var Ob = new Class(StageObject);
Ob.include({
	"init":function(){
		this.id = Math.guid();
		StageObject.setUseId(this.id);
		this._class[this.id]=new Array("ob");
	}
});

var TypingGameObject = new Class(StageObject);
TypingGameObject.include({
//すべてのHTML
//	"hText":["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","br","button","canvas","cite","code","command","data","date","datalist","del","details","dfn","dialog","div","dl","em","embed","fieldset","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","i","iframe","img","input","ins","kbd","keygen","label","link","map","mark","math","menu","meta","meter","nav","noscript","object","ol","output","p","pre","progress","q","ruby","s","samp","script","section","select","small","span","strong","style","sub","sup","svg","table","textarea","time","u","ul","var","video","wbr"],
	"hText":["html","head","body","a","address","area","article","aside","audio","br","button","canvas","div","dl","dt","dd","em","embed","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hr","i","iframe","img","input","label","li","link","meta","nav","object","ol","p","script","section","small","span","strong","style","svg","table","tr","th","td","textarea","ul","video"],
	"hvText":["href","src","rel","stylesheet","name","id","class","action","method","type","text","password","radio","checkbox","file","hidden","submit","reset","image","checked","for","title","alt","lang","charset","cols","lows","colspan","rowspan","disabled","maxlength","selected","size","placeholder","autofocus"],
	"cText":["background-color","background-image","background-repeat","background-position","background","margin","margin-top","margin-right","margin-bottom","margin-left","padding","padding-top","padding-right","padding-bottom","padding-left","cursor","width","height","text-align","max-width","min-width","max-height","min-height","border","border-top","border-right","border-bottom","border-left","border-width","border-top-width","border-right-width","border-bottom-width","border-left-width","border-color","border-top-color","border-right-color","border-bottom-color","border-left-color","border-style","border-top-style","border-right-style","border-bottom-style","border-left-style","overflow","display","visibility","float","clear","position","color","font-size","font-weight","font-style","font-family","text-decoration","line-height","text-indent","vertical-align","content","outline","list-style-type","list-style-position","list-style-image","list-style","border-collapse"],
	"cvText":["no-repeat","repeat-x","repeat-y","bottom","top","left","right","auto","pointer","center","solid","dotted","dashed","none","hidden","block","inline","visible","both","absolute","relative","fixed","bold","normal","italic","collapse"],
	"qText":new Array(),
	"wordInit":function(a){
		var wordArr =new Array();
		if(a == "all"){
			wordArr = wordArr.concat(this.hText,this.hvText,this.cText,this.cvText);
		}
		Func.aShuffl(wordArr);
		for(var i =0; i<20;i++){
			this.qText.push(wordArr[i]);
		}
	},
	"setWord":function(){
		Rec.startTime= new Date();
		this.setCall(this.callBackSelector);
		$(".typing").html(this.createHtml());
		this.setClass();
	},
	"setClass":function(){
		$(".typing span").addClass("type");
		$("span:first-child").addClass("bb2f00");
	},
	"createHtml":function(){
		var qTextArray = this.qText;
		if(qTextArray.length){
			var qTextString = Func.sAllWrapSpan(qTextArray.shift());
			return qTextString;
		}else{
			$(window).trigger("over");
			return "お疲れさまでした。";
		}
	},
	"typing":function(e){
		if(e.keyCode == Func.keyCode[$(".type:first").text()]){
			$(".type:first").removeClass("type").removeClass("bb2f00");
			$(".type:first").addClass("bb2f00");
			if(!$(".type").length){
				Rec.endTime= new Date();
				Rec.addPoint();
				this.setWord();
			}
		}else{
			if(Rec.point>=1){
				Rec.point--;
			}
			$(".typing").addClass("ng");
			setTimeout(function(){$(".typing").removeClass("ng")},100)
		}
	},
	"callBackSelector":"",
	"setCall":function(){
		$("#"+this.callBackSelector).trigger("type");
	},
	"init":function(){
		this.id = Math.guid();
		StageObject.setUseId(this.id);
		this._class[this.id]=new Array("typing");
	}
});


var Func = new Class();
Func.extend({
	"keyCode":{"a":65,"b":66,"c":67,"d":68,"e":69,"f":70,"g":71,"h":72,"i":73,"j":74,"k":75,"l":76,"m":77,"n":78,"o":79,"p":80,"q":81,"r":82,"s":83,"t":84,"u":85,"v":86,"w":87,"x":88,"y":89,"z":90,"-":189,"0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,"8":56,"9":57},
	"sAllWrapSpan":function(a){
		var textArr = a.split("");
		var html = "";
		for(var i = 0; i<textArr.length; i++){
			html += "<span>";
			html += textArr[i];
			html += "</span>";
		}
		return html;
	},
	"aCheckValue":function(arr,val){
		if(arr.indexOf(val)===-1){
			return false;
		}else{
			return true;
		}
	},
	"aShuffl":function(arr){
		var i = arr.length;
		while(i){
			var nRandam = Math.floor(Math.random() * i--);
			var temp = arr[i];
			arr[i] = arr[nRandam];
			arr[nRandam] = temp;
		};
	}
})

